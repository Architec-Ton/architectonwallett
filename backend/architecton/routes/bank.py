import asyncio

from fastapi import APIRouter

from architecton.controllers.account_controller import AccountController
from architecton.controllers.project_controller import ProjectController
from architecton.views.bank import BankOut, BankBalanceOut
from architecton.views.info import InfoOut

router = APIRouter(tags=["General route"])


# , response_model=InfoOut
@router.get("/{address}", response_model=BankOut)
async def info(address: str = None):

    if address == "none":
        bank_out = BankOut()
    else:
        banks, coins = await asyncio.gather(
            # AccountController.get_balance(address),
            AccountController.get_banks(address),
            AccountController.get_coins(address),
        )
        balance = BankBalanceOut(bank_amount=banks, bnk_per_hour=0.03, bnk_amount=coins / 1000000)
        bank_out = BankOut(balance=balance)
    return bank_out
