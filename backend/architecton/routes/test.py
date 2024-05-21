from TonTools import TonCenterClient, LsClient, TonlibClient
from TonTools.Providers.TonApiClient import TonApiClient
from tonsdk.contract.wallet import Wallets, WalletVersionEnum

# client = LsClient(ls_index=0, default_timeout=30, config="http://127.0.0.1:5500/local.config.json")
#
# # jetton_wallet_data = await client.get_jetton_wallet(address)
# client = TonCenterClient(base_url="http://103.219.170.103:8080/")


import asyncio
import datetime
import logging
import os.path
from typing import List

from fastapi import APIRouter, Form, Query
from fastapi.templating import Jinja2Templates
from tonsdk.utils import Address

from architecton.config import SMART_CONTRACT_CROWDSALE, SMART_CONTRACT_CROWDSALE2
from architecton.contracts.crowd_sale2 import CrowdSale2
from architecton.controllers.account_controller import AccountController
from architecton.controllers.nftscan_controller import NFTscanController
from architecton.controllers.ton_client import get_ton_client, client, tc_client
from architecton.models import Wallet, Notification, NotificationType, Account, Notcoin, ReferralsNotification, Bonus
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
import asyncio
from pytonlib import TonlibClient
from pathlib import Path
import json

router = APIRouter(tags=["Support"])

# with open("local.config.json", "r") as f:
#     config = json.loads(f.read())
#
# keystore_dir = "./ton_keystore"
# Path(keystore_dir).mkdir(parents=True, exist_ok=True)
#
# client = TonlibClient(ls_index=0, config=config, keystore=keystore_dir, tonlib_timeout=10)


async def get_client():

    await asyncio.sleep(2)
    logging.info("Start init")
    await client.init_tonlib(
        "C:/Users/ds/.virtualenvs/backend-cp1b7-L0/Lib/site-packages/pytonlib/distlib/windows/tonlibjson.amd64.dll"
    )

    logging.info("Completed init")

    return client


@router.get("")
async def get_balance(address: str):

    trx = await tc_client.get_transactions(address)

    return len(trx)

    # client = get_ton_client()
    # contract = CrowdSale2(client)
    # banks = await contract.get_banks(address)
    # total_banks = await contract.get_total()
    # total_banker = await contract.get_total_banker()
    #
    # return await contract.set_bonus(address, 1)
    #
    # return {
    #     "mmm": 0,
    #     "banks": banks,
    #     "total_banks": total_banks,
    #     "total_banker": total_banker,
    # }


@router.get("/config")
async def get_config():
    with open("local.config.json", "r") as f:
        config = json.loads(f.read())
        return config
