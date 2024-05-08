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
async def get_support_form(request: Request, address=Query(default=None), username=Query(default=None)):
    context = {"request": request, "address": address, "username": username}

    context = await update_contect(context, request, address, username)

    logging.info(context)
    return render.TemplateResponse("support.html", context=context)


@router.get("/test")
async def get_test(request: Request):
    trxs = await AccountController.get_transactions("UQAeV4crAaUoCJo5igUIzosJXcOjtb4W7ff7Qr0DrgXPRle_")

    out = []
    for tx in trxs:
        if tx.in_msg.source == "EQBhOhdA8vncTSH3ft2f-Nqj9PTmKTSZMbhkMN8DhFTeJC1g":
            continue
        print(tx)
        out.append(tx)
    return out
    # return await AccountController.update_notcoin()
