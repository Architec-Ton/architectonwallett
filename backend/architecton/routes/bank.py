import asyncio
import datetime
import logging
from typing import List

from fastapi import APIRouter, Query

from architecton.controllers.account_controller import AccountController
from architecton.controllers.notification_controller import NotificationController
from architecton.controllers.project_controller import ProjectController
from architecton.models import Wallet, Notification, NotificationType
from architecton.views.bank import BankOut, BankBalanceOut, BankInfoOut, BankHistoryOut, BankIn
from architecton.views.info import InfoOut

router = APIRouter(tags=["General route"])


# , response_model=InfoOut
@router.get("/{address}", response_model=BankOut)
async def bank(address: str, tgid=Query(default=None)):
    if address == "none":
        bankers, total, account, notifications = await asyncio.gather(
            AccountController.get_total_bankers(),
            AccountController.get_total(),
            AccountController.get_or_none(tgid),
            NotificationController.get_notifications(tgid, address if address != "none" else None),
        )
        balance = BankBalanceOut(bank_amount=0, bnk_per_hour=0, bnk_amount=0)
    else:
        banks, total, bankers, account, notifications, wallet = await asyncio.gather(
            AccountController.get_banks(address),
            AccountController.get_total(),
            AccountController.get_total_bankers(),
            AccountController.get_or_none(tgid),
            NotificationController.get_notifications(tgid, address if address != "none" else None),
            Wallet.get_or_none(tg_id=tgid, address=address),
        )
        if wallet is None:
            account = None
        balance = BankBalanceOut(bank_amount=banks, bnk_per_hour=0, bnk_amount=0)
    round_finish = 50000
    if total > round_finish:
        round_finish = 500000
    if total > round_finish:
        round_finish = 1000000
    bank_info = BankInfoOut(bank_total=round_finish, bank_free=round_finish - total, bank_bankers=bankers)

    # AccountController.
    bank_out = BankOut(balance=balance, bank=bank_info, histories=notifications, account=account)

    return bank_out


@router.get("/{address}/history", response_model=List[BankHistoryOut])
async def history(address: str, tgid=Query(default=None)):
    notifications = await NotificationController.get_notifications(tgid, address if address != "none" else None, 100)
    return notifications


@router.post("/{address}")
async def bank_purchase(address: str, bank_in: BankIn, tgid=Query(default=None)):
    wallet = await Wallet(address=address, tg_id=int(tgid)).get_or_none()
    logging.info(f"Get wallet: {wallet} -> {address} {tgid}")
    if wallet is not None:
        await Notification.create(
            type=NotificationType.mint,
            bank_before=bank_in.bank_before,
            bank_after=bank_in.bank_after,
            completed=False,
            address=address,
            tg_id=tgid,
            symbol="TON",
            changes=f"+{bank_in.bank_after-bank_in.bank_before} bnk",
        )
        logging.info("notification created")

        if bank_in.ref:
            wallet = await Wallet(address=bank_in.ref).first()
            if wallet is not None:
                await Notification.create(
                    type=NotificationType.ref,
                    bank_before=bank_in.bank_before,
                    bank_after=bank_in.bank_after,
                    completed=False,
                    address=bank_in.ref,
                    tg_id=wallet.tg_id,
                    symbol="ref",
                    changes=f"+{bank_in.bank_after-bank_in.bank_before} bnk",
                )
    return {"status": "ok"}
