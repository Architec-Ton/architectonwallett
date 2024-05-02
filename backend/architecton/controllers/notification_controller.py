import json
import logging
import os.path
from typing import List

from TonTools.Contracts.Jetton import Jetton
from TonTools.Providers.TonCenterClient import TonCenterClient

from architecton.contracts.crowd_sale import CrowdSale
from architecton.controllers.ton_client import get_ton_client
from architecton.models import Notification, NotificationType
from architecton.views.project_list import ProjectListOut
from tortoise.queryset import Q

assets_dir = f"{os.path.dirname(os.path.dirname(__file__))}/assets"


class NotificationController:

    @staticmethod
    async def update_notification(tg_id: int | None, address: str | None) -> List[Notification]:
        if tg_id is not None or address is not None:
            await Notification.get_or_create(tg_id=tg_id, address=address, type=NotificationType.registration)
        if address is not None:
            check = await Notification.get_or_none(tg_id=tg_id, address=address, type=NotificationType.linked)
            if check is None:
                await Notification.create(tg_id=tg_id, address=address, type=NotificationType.linked)

        if tg_id is not None:
            query = Q(Q(tg_id=tg_id) & Q(Q(address=address) | Q(address__isnull=True)) | Q(tg_id__isnull=True))
        else:
            query = Q(Q(Q(address=address) | Q(address__isnull=True)) | Q(tg_id__isnull=True))
        notifications = await Notification.filter(query).order_by("-created_at")
        return notifications

    @staticmethod
    async def get_notifications(tg_id: int, address: str | None, limit: int = 3) -> List[Notification]:
        if tg_id is not None:
            query = Q(Q(tg_id=tg_id) & Q(Q(address=address) | Q(address__isnull=True)) | Q(tg_id__isnull=True))
        else:
            query = Q(Q(Q(address=address) | Q(address__isnull=True)) | Q(tg_id__isnull=True))

        notifications = await Notification.filter(query).limit(limit).order_by("-created_at")
        count = len(notifications)
        if count < 3:
            notifications = await NotificationController.update_notification(tg_id, address)
        return notifications
