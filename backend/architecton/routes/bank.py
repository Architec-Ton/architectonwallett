import asyncio

from fastapi import APIRouter

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
        balance = BankBalanceOut(bank_amount=3, bnk_per_hour=0.3, bnk_amount=10.03234)
        bank_out = BankOut(balance=balance)

    await asyncio.sleep(1)
    return bank_out
