import asyncio
import datetime
import logging
from typing import List

from fastapi import APIRouter, Query
from tonsdk.utils import Address
from tortoise.expressions import Q

from architecton.controllers.account_controller import AccountController
from architecton.controllers.notification_controller import NotificationController
from architecton.controllers.project_controller import ProjectController
from architecton.models import Wallet, Notification, NotificationType
from architecton.views.bank import BankOut, BankBalanceOut, BankInfoOut, BankHistoryOut, BankIn, BankReferralOut
from architecton.views.info import InfoOut

router = APIRouter(tags=["General route"])


# , response_model=InfoOut
@router.get("/{address}", response_model=BankOut)
async def bank(address: str, tgid=Query(default=None), ref=Query(default=None)):
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
    banks = 0
    if balance is not None:
        banks = balance.bank_amount
    referral = await AccountController.update_referral(tgid, address, ref, banks)

    # AccountController.
    bank_out = BankOut(balance=balance, bank=bank_info, histories=notifications, account=account, referral=referral)

    return bank_out


@router.get("/{address}/history", response_model=List[BankHistoryOut])
async def history(address: str, tgid=Query(default=None)):
    notifications = await NotificationController.get_notifications(tgid, address if address != "none" else None, 100)
    return notifications


@router.get("/{address}/referral", response_model=BankReferralOut)
async def referral_info(address: str, tgid=Query(default=None)):
    notifications = await NotificationController.get_notifications(tgid, address if address != "none" else None, 10000)
    referals = await NotificationController.get_referal_view(tgid, address if address != "none" else None)
    bank_balance = await AccountController.get_banks(address)
    add = Address(address)
    query = Q(
        Q(type="ref") & Q(Q(title=add.to_string(is_bounceable=True)) | Q(title=address) | Q(title=add.hash_part.hex()))
    )
    ref_bought = await Notification.filter(query).count()
    mint = 0
    for n in notifications:
        if n.type == NotificationType.mint:
            mint += n.bank_after - n.bank_before
            # ref_bought += 1

    if mint >= bank_balance:
        mint = bank_balance - 1

    if ref_bought > referals:
        ref_bought = referals

    return BankReferralOut(bank_reward=bank_balance - mint, ref_bought=ref_bought, ref_count=referals)


@router.post("/{address}")
async def bank_purchase(address: str, bank_in: BankIn, tgid=Query(default=None)):
    logging.info(f"Data wallet: {bank_in.model_dump_json(indent=4)} -> {address} {tgid}")
    wallet = await Wallet.get_wallet(address=address, tg_id=tgid)
    logging.info(f"Get wallet: {wallet} -> {address} {tgid}")
    if wallet is not None:
        addr = Address(address).hash_part.hex()
        await Notification.create(
            title=address,
            type=NotificationType.mint,
            bank_before=bank_in.bank_before,
            bank_after=bank_in.bank_after,
            completed=False,
            address=addr,
            tg_id=tgid,
            symbol="TON",
            changes=f"+{bank_in.bank_after-bank_in.bank_before} bnk",
        )
        logging.info("notification created")

        if bank_in.ref:
            wallet = await Wallet.get_wallet(address=bank_in.ref)
            ref = Address(bank_in.ref).hash_part.hex()
            if wallet is not None:
                await Notification.create(
                    title=address,
                    type=NotificationType.ref,
                    bank_before=bank_in.bank_before,
                    bank_after=bank_in.bank_after,
                    completed=False,
                    address=ref,
                    tg_id=wallet.tg_id,
                    symbol="ref",
                    changes=f"+{bank_in.bank_after-bank_in.bank_before} bnk",
                )
    return {"status": "ok"}
