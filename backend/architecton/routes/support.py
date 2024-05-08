import asyncio
import datetime
import logging
import os.path
from typing import List

from fastapi import APIRouter, Form
from fastapi.templating import Jinja2Templates
from tonsdk.utils import Address

from architecton.config import SMART_CONTRACT_CROWDSALE
from architecton.contracts.crowd_sale import CrowdSale
from architecton.controllers.account_controller import AccountController
from architecton.controllers.nftscan_controller import NFTscanController
from architecton.controllers.ton_client import get_ton_client
from architecton.models import Wallet, Notification, NotificationType, Account, Notcoin
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


@router.get("")
async def get_support_form(request: Request):
    context = {"request": request}
    return render.TemplateResponse("support.html", context=context)


@router.post("")
async def post_support_form(request: Request, address: str = Form()):

    banks = await AccountController.get_banks(address)

    context = {"request": request, "banks": banks}

    return render.TemplateResponse("output.html", context=context)


@router.get("/test")
async def get_test(request: Request):
    # trxs = await AccountController.get_transactions("UQAeV4crAaUoCJo5igUIzosJXcOjtb4W7ff7Qr0DrgXPRle_")
    #
    # out = []
    # for tx in trxs:
    #     if tx.in_msg.source == "EQBhOhdA8vncTSH3ft2f-Nqj9PTmKTSZMbhkMN8DhFTeJC1g":
    #         continue
    #     print(tx.)
    #     out.append(tx)
    # return out
    return await AccountController.update_notcoin()
