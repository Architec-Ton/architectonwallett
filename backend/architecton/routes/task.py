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
from architecton.views.task import TasksOut

router = APIRouter(tags=["General route"])


# , response_model=InfoOut
@router.get("/{task_id}/{address}", response_model=TasksOut)
async def get_tasks(task_id: str, address: str, tgid=Query(default=None), fail=Query(default=None)):
    wallet = await Wallet.get_wallet(address, tgid)
    if wallet is None:
        return TasksOut()
    tasks = []
    if task_id == "1" and address and tgid:
        check_subscription = ["main", "chat", "twitter"]
        for c_task in check_subscription:
            tasks.append({"id": c_task, "completed": False})
        balance = await AccountController.get_balance(wallet.address)
        tasks.append({"id": "balance", "completed": balance >= 3})

    completed = True
    for t in tasks:
        if not t["completed"]:
            completed = False
            break
    return TasksOut(tasks=tasks, completed=completed)
