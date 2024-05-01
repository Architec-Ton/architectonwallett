import asyncio
import datetime

from fastapi import APIRouter

from architecton.controllers.account_controller import AccountController
from architecton.controllers.project_controller import ProjectController
from architecton.views.bank import BankOut, BankBalanceOut, BankInfoOut, BankHistoryOut
from architecton.views.info import InfoOut

router = APIRouter(tags=["General route"])


# , response_model=InfoOut
@router.get("/{address}", response_model=BankOut)
async def bank(address: str = None):
    if address == "none":
        bankers, total = await asyncio.gather(
            AccountController.get_total_bankers(),
            AccountController.get_total(),
        )
        balance = BankBalanceOut(bank_amount=0, bnk_per_hour=0, bnk_amount=0)
    else:
        banks, total, bankers = await asyncio.gather(
            AccountController.get_banks(address),
            AccountController.get_total(),
            AccountController.get_total_bankers(),
        )
        balance = BankBalanceOut(bank_amount=banks, bnk_per_hour=0, bnk_amount=0)
    round_finish = 50000
    if total > round_finish:
        round_finish = 500000
    if total > round_finish:
        round_finish = 1000000
    bank_info = BankInfoOut(bank_total=round_finish, bank_free=round_finish - total, bank_bankers=bankers)
    bank_out = BankOut(balance=balance, bank=bank_info)
    return bank_out


@router.get("/{address}/history")
async def history(address: str = None):
    a = BankHistoryOut(
        title="mint_ref",
        type="ref",
        date=datetime.datetime.now(tz=datetime.timezone.utc),
        symbol="ref",
        changes="2+ Banks",
    )
    b = BankHistoryOut(date=datetime.datetime.now(tz=datetime.timezone.utc), symbol="TON", changes="2+ Banks")

    return [b, a, b, a, b, b, b, b]
