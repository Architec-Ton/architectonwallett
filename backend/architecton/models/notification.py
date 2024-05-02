import uuid
from enum import Enum

from tortoise import fields

from tortoise.models import Model


class NotificationType(str, Enum):
    mint = "mint"
    ref = "ref"
    launch = "launch"
    linked = "linked"
    registration = "registration"


class Notification(Model):

    class Meta:
        table = "notification"

    id = fields.UUIDField(pk=True, index=True)
    address = fields.CharField(max_length=128, null=True, index=True, default=None)
    tg_id = fields.BigIntField(index=True, null=True)
    type = fields.CharEnumField(NotificationType, max_length=32, null=True, default=None)
    title = fields.CharField(max_length=128, null=True, default=None)
    symbol = fields.CharField(max_length=128, null=True, default=None)
    changes = fields.CharField(max_length=512, null=True, default=None)
    created_at = fields.DatetimeField(auto_now_add=True)
