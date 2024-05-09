import asyncio
import datetime
import logging
import os.path
from typing import List

from fastapi import APIRouter, Form, Query
from fastapi.templating import Jinja2Templates
from tonsdk.utils import Address

from architecton.config import SMART_CONTRACT_CROWDSALE
from architecton.contracts.crowd_sale import CrowdSale
from architecton.controllers.account_controller import AccountController
from architecton.controllers.nftscan_controller import NFTscanController
from architecton.controllers.ton_client import get_ton_client
from architecton.models import Wallet, Notification, NotificationType, Account, Notcoin, ReferralsNotification
from architecton.views.account import AccountBalanceOut, AccountIn, WalletOut
from architecton.views.bank import BankUpdatesOut

router = APIRouter()

from fastapi import APIRouter, Request

from architecton.controllers.project_controller import ProjectController
from architecton.views.info import InfoOut

from TonTools import TonCenterClient
from fastapi.templating import Jinja2Templates

path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
render = Jinja2Templates(directory=f"{path}/templates")


router = APIRouter(tags=["Support"])


async def update_contect(context, request, address, username):
    account = await Account.filter(username=username).first()

    if account is None and address:
        wallet = await Wallet.get_wallet(address)
        if wallet is not None:
            account = await Account.get_or_none(id=wallet.tg_id)

    wo = []
    notifications = []
    refferer = []
    if account is not None:
        wallets = await Wallet.filter(tg_id=account.id)
        notifications = await Notification.filter(tg_id=account.id).order_by("-created_at")
        refferer = await ReferralsNotification.filter(tg_id=account.id).order_by("-created_at")
        wo = []
        for w in wallets:
            banks = await AccountController.get_banks(w.address)

            wo.append({"wallet": w, "banks": banks})

    context.update({"account": account, "wallets": wo, "notifications": notifications, "refferer": refferer})

    return context


@router.get("")
async def get_support_form(
    request: Request, address=Query(default=None), username=Query(default=None), secret=Query(default=None)
):
    context = {"request": request, "address": address, "username": username, "secret": secret}
    if address is None and username is None:
        return render.TemplateResponse("support.html", context=context)

    if secret != "archibank":
        return render.TemplateResponse("support.html", context=context)

    context = await update_contect(context, request, address, username)

    logging.info(context)
    return render.TemplateResponse("support.html", context=context)


@router.get("/test")
async def get_test(request: Request):
    trxs = await AccountController.get_transactions("UQAeV4crAaUoCJo5igUIzosJXcOjtb4W7ff7Qr0DrgXPRle_", 1000)

    out = []
    for tx in trxs:
        if tx.in_msg.source == "EQBhOhdA8vncTSH3ft2f-Nqj9PTmKTSZMbhkMN8DhFTeJC1g":
            continue
        if (
            tx.in_msg is None
            or tx.out_msgs
            or tx.status is False
            or tx.in_msg.source == "EQAeV4crAaUoCJo5igUIzosJXcOjtb4W7ff7Qr0DrgXPRgp6"
        ):
            continue
        logging.info(tx.in_msg.source)
        logging.info(tx)
        nft_address = Address(tx.in_msg.source)

        notcoin = await Notcoin.get_or_none(nft_hash=nft_address.hash_part.hex())
        if notcoin is not None:
            continue
        try:
            is_our = await AccountController.get_nft_is_our(tx.in_msg.source)
        except BaseException as e:
            logging.warning(f"Wrong: {tx.in_msg.source} {e}")
            continue
        if is_our is False:
            continue

        logging.info(f"Notcoin : {tx.in_msg.source}")
        try:
            is_collection = await AccountController.get_check_collection(tx.in_msg.source)
        except Exception as e:
            logging.error(e)
        if is_collection is False:
            continue

        nft_trx = await AccountController.get_transactions(tx.in_msg.source)
        sender = None
        for ntx in nft_trx:
            if ntx.in_msg.op_code == "5fcc3d14":
                sender = ntx.in_msg.source
                break

        if sender is not None:
            src_address = Address(sender)
            token_address = tx.in_msg.source
            token_add = Address(token_address)
            wallet = await Wallet.get_wallet(src_address.to_string(is_user_friendly=True, is_bounceable=True))
            account_id = None
            if wallet is not None:
                account_id = wallet.tg_id

            await Notcoin.create(
                account=account_id,
                address=sender,
                address_hash=src_address.hash_part.hex(),
                nft=token_address,
                nft_hash=token_add.hash_part.hex(),
                nft_count=10000,
                bank_count=19,
            )
            await Notification.create(
                title=src_address.to_string(is_bounceable=True, is_user_friendly=True),
                type=NotificationType.notcoin,
                bank_before=0,
                bank_after=19,
                completed=False,
                address=src_address.to_string(),
                address_orig=src_address.hash_part.hex(),
                tg_id=account_id,
                symbol="$NOT",
                changes=f"+19 bnk",
            )

            out.append(nft_trx)

    return out
    # return await AccountController.update_notcoin()
