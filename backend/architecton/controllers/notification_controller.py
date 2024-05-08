import json
import logging
import os.path
from typing import List

from TonTools.Contracts.Jetton import Jetton
from TonTools.Providers.TonCenterClient import TonCenterClient
from tonsdk.utils import Address

from architecton.contracts.crowd_sale import CrowdSale
from architecton.controllers.ton_client import get_ton_client
from architecton.models import Notification, NotificationType, ReferralsNotification, ReferralsNotificationType
from architecton.views.project_list import ProjectListOut
from tortoise.queryset import Q

assets_dir = f"{os.path.dirname(os.path.dirname(__file__))}/assets"


class NotificationController:

    @staticmethod
    def get_query(tg_id: int, address: str | None):
        if tg_id is not None:
            addr = Address(address).hash_part.hex() if address else None
            query = Q(
                Q(address=addr)
                | Q(address=address)
                | Q(address_orig=addr)
                | Q(address__isnull=True, tg_id__isnull=True)
                | Q(address__isnull=True, tg_id=tg_id)
            )
        elif address is None:
            query = Q(address__isnull=True, tg_id__isnull=True)
        else:
            addr = Address(address).hash_part.hex() if address else None
            query = Q(Q(address=address) | Q(address__isnull=True, tg_id__isnull=True) | Q(address_orig=addr))
        return query

    @staticmethod
    async def update_notification(tg_id: int | None, address: str | None) -> List[Notification]:
        if tg_id is not None or address is not None:
            await Notification.get_or_create(tg_id=tg_id, address=address, type=NotificationType.registration)
        if address is not None:
            check = await Notification.get_or_none(tg_id=tg_id, address=address, type=NotificationType.linked)
            if check is None:
                await Notification.create(tg_id=tg_id, address=address, type=NotificationType.linked)

        query = NotificationController.get_query(tg_id, address)
        notifications = await Notification.filter(query).order_by("-created_at")
        return notifications

    @staticmethod
    async def get_notifications(tg_id: int, address: str | None, limit: int = 2) -> List[Notification]:
        query = NotificationController.get_query(tg_id, address)
        notifications = await Notification.filter(query).limit(limit).order_by("-created_at")
        # count = len(notifications)
        # if count < limit:
        #     notifications = await NotificationController.update_notification(tg_id, address)
        return notifications

    @staticmethod
    async def get_referal_view(tg_id: int, address: str | None) -> int:
        if address is not None:
            address_raw = Address(address).hash_part.hex()
            return await ReferralsNotification.filter(ref_raw=address_raw).count()

        # count = len(notifications)
        # if count < limit:
        #     notifications = await NotificationController.update_notification(tg_id, address)
        return 0
