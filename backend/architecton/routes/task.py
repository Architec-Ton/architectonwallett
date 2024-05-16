import asyncio
import datetime
import logging
import os
from typing import List

import aiohttp
from fastapi import APIRouter, Query
from tonsdk.utils import Address
from tortoise.expressions import Q

from architecton.controllers.account_controller import AccountController
from architecton.controllers.notification_controller import NotificationController
from architecton.controllers.project_controller import ProjectController
from architecton.models import Wallet, Notification, NotificationType, Bonus
from architecton.views.bank import (
    BankOut,
    BankBalanceOut,
    BankInfoOut,
    BankHistoryOut,
    BankIn,
    BankReferralOut,
)
from architecton.views.info import InfoOut
from architecton.views.task import TasksOut

router = APIRouter(tags=["General route"])


async def check_channel_subscription(channel: str, tgid: int):
    url = f"{os.getenv('SUB_CHECKER_BOT_HOST')}/api/v1/info/{channel}/{tgid}"
    logging.info(f"Call: {url}")
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            resp = await resp.json()
            if "status" in resp:
                return resp["status"]


# , response_model=InfoOut
@router.get("/{task_id}/{address}", response_model=TasksOut)
async def get_tasks(task_id: str, address: str, tgid=Query(default=None), fail=Query(default=None)):
    wallet = await Wallet.get_wallet(address, tgid)
    if wallet is None:
        return TasksOut()
    tasks = []
    if task_id == "1" and address and tgid:
        check_subscription = ["main", "chat"]
        for c_task in check_subscription:
            completed = False
            if c_task == "main":
                completed = await check_channel_subscription("@architecton_tech", int(tgid))
            if c_task == "chat":
                completed = await check_channel_subscription("@architec_ton", int(tgid))
            tasks.append({"id": c_task, "completed": completed})
        balance = await AccountController.get_balance(wallet.address)
        tasks.append({"id": "balance", "completed": balance >= 3})

        completed = True
        for t in tasks:
            if not t["completed"]:
                completed = False
                break
        if fail != "false":
            completed = False
        if completed:
            bonus = await Bonus.get_or_none(address_raw=Address(address).hash_part.hex(), type="tsk1")
            if bonus is None:
                await Bonus.create(
                    tg_id=wallet.tg_id,
                    address=address,
                    address_raw=Address(address).hash_part.hex(),
                    type="tsk1",
                    bank_count=1,
                    completed=False,
                )

        return TasksOut(tasks=tasks, completed=completed)
    else:
        return TasksOut()
