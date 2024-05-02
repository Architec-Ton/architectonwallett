import asyncio
import datetime
from typing import List

from fastapi import APIRouter, Query

from architecton.controllers.account_controller import AccountController
from architecton.controllers.notification_controller import NotificationController
from architecton.controllers.project_controller import ProjectController
from architecton.views.bank import BankOut, BankBalanceOut, BankInfoOut, BankHistoryOut
from architecton.views.info import InfoOut

router = APIRouter(tags=["General route"])


# , response_model=InfoOut
@router.get("/{address}", response_model=BankOut)
async def bank(address: str, tgid=Query(default=None)):
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

    # if tgid is not None:
    # account = await AccountController.get_or_create(tgid)
    notifications = await NotificationController.get_notifications(tgid, address if address != "none" else None)
    # else:
    #     notifications = []

    # AccountController.
    bank_out = BankOut(balance=balance, bank=bank_info, histories=notifications)

    return bank_out


@router.get("/{address}/history", response_model=List[BankHistoryOut])
async def history(address: str, tgid=Query(default=None)):
    notifications = await NotificationController.get_notifications(tgid, address if address != "none" else None)
    return notifications
