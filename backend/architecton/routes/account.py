import logging

from fastapi import APIRouter

from architecton.config import crowd_sale_address
from architecton.controllers.account_controller import AccountController
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

    tons = await AccountController.get_balance(address)
    banks = 10

    # test = await AccountController.get_wallet(address)
    return AccountBalanceOut(tons=tons, banks=banks, address=crowd_sale_address)
