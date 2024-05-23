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
from architecton.contracts.crowd_sale import CrowdSale
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

    # bonuses = await Bonus.all()

    client = get_ton_client()
    contract = CrowdSale(client)
    contract2 = CrowdSale2(client)

    # for b in bonuses:
    #     address = b.address
    #
    #     banks1 = await contract.get_banks(address)
    #     banks2 = await contract2.get_banks(address)
    #     print(b.address, "bonus:", b.bank_count, "b1:", banks1, "b2", banks2)
    #
    #     if banks2 < b.bank_count:
    #         b.on_contract = False
    #     else:
    #         b.on_contract = True
    #     await b.save()
    # # total_banks = await contract.get_total()
    # # total_banker = await contract.get_total_banker()
    # address = "UQCto-hxbOIBe_G6ub3s3_murlWrPBo__j8zI4Fka8PAMNvA"
    # address = "UQAqLU0JcyhEKmF4WjlQ9txMS3l9OZKZhfLr5kGF8tDUurra"
    banks1 = await contract.get_banks(address)
    # data = await contract2.set_bonus(address, 1)
    # # print(data)
    banks2 = await contract2.get_banks(address)

    return {
        "bank1": banks1,
        "bank2": banks2,
    }


@router.get("/config")
async def get_config():
    with open("local.config.json", "r") as f:
        config = json.loads(f.read())
        return config
