import asyncio
import logging

from fastapi import APIRouter

from architecton.config import crowd_sale_address
from architecton.contracts.crowd_sale import CrowdSale
from architecton.controllers.account_controller import AccountController
from architecton.controllers.ton_client import get_ton_client
from architecton.views.account import AccountBalanceOut

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
    return AccountBalanceOut(tons=tons, banks=banks, address=crowd_sale_address)


@router.get("/test/{address}")
async def test(address: str = None):
    client = get_ton_client()
    contract = CrowdSale(client)
    data = await contract.get_banks(address)

    return data
