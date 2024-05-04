import asyncio
import logging
from typing import List

from fastapi import APIRouter

from architecton.config import SMART_CONTRACT_CROWDSALE
from architecton.contracts.crowd_sale import CrowdSale
from architecton.controllers.account_controller import AccountController
from architecton.controllers.ton_client import get_ton_client
from architecton.models import Wallet, Notification, NotificationType, Account
from architecton.views.account import AccountBalanceOut, AccountIn, WalletOut
from architecton.views.bank import BankUpdatesOut

router = APIRouter()

from fastapi import APIRouter

from architecton.controllers.project_controller import ProjectController
from architecton.views.info import InfoOut

from TonTools import TonCenterClient

router = APIRouter(tags=["General route"])


# , response_model=InfoOut
@router.get("/{address}")
async def account(address: str = None):
    tons, banks = await asyncio.gather(AccountController.get_balance(address), AccountController.get_banks(address))
    return AccountBalanceOut(tons=tons, banks=banks, address=SMART_CONTRACT_CROWDSALE)


@router.get("/tg/{tgid}", response_model=List[WalletOut])
async def account(tgid: int):
    wallets = await Wallet.filter(tg_id=tgid)

    #
    # tons, banks = await asyncio.gather(AccountController.get_balance(address), AccountController.get_banks(address))
    # return AccountBalanceOut(tons=tons, banks=banks, address=SMART_CONTRACT_CROWDSALE)
    return [WalletOut(address=w.address) for w in wallets]


@router.get("/none/update", response_model=List[BankUpdatesOut])
async def last_updates():
    notifications = await Notification.filter(completed=False).order_by("created_at").limit(3)

    notifys = []

    for n in notifications:
        account = None
        if n.title is not None:
            wallet = await Wallet.filter(address=n.title).first()
            if wallet is not None and wallet.tg_id is not None:
                account = await Account.filter(id=wallet.tg_id).first()
        balance = await AccountController.get_balance(n.address)
        if balance >= n.bank_after:
            n.completed = True
            await n.save()
            notifys.append({"n": n, "a": account})

    #
    # tons, banks = await asyncio.gather(AccountController.get_balance(address), AccountController.get_banks(address))
    # return AccountBalanceOut(tons=tons, banks=banks, address=SMART_CONTRACT_CROWDSALE)
    return [
        BankUpdatesOut(
            tgid=n["n"].tg_id,
            type=n["n"].type,
            banks=n["n"].bank_after - n["n"].bank_before,
            address=n["n"].address,
            date=n["n"].created_at.isoformat(),
            stgid=n["a"].id if n["a"] is not None else None,
            sname=n["a"].username if n["a"] is not None else None,
        )
        for n in notifys
    ]


@router.post("/{address}")
async def account(address: str, account_in: AccountIn):
    tg_user = await AccountController.get_or_create(account_in)
    if address != "none":
        wallet = await Wallet.get_or_none(address=address, tg_id=tg_user.id)
        if wallet is None:
            await Wallet.create(address=address, tg_id=tg_user.id)
            await Notification.get_or_create(tg_id=tg_user.id, address=address, type=NotificationType.linked)
    #
    # tons, banks = await asyncio.gather(AccountController.get_balance(address), AccountController.get_banks(address))
    # return AccountBalanceOut(tons=tons, banks=banks, address=SMART_CONTRACT_CROWDSALE)
    return tg_user


@router.get("/test/")
async def test(address: str = None):
    client = get_ton_client()
    contract = CrowdSale(client)
    data = await contract.get_owner()

    return data
