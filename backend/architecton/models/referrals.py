import uuid
from enum import Enum

from tortoise import fields

from tortoise.models import Model


class ReferralsNotificationType(str, Enum):
    open = "open"
    update = "update"
    view = "view"


class ReferralsNotification(Model):

    class Meta:
        table = "referral"

    id = fields.UUIDField(pk=True, index=True)
    address = fields.CharField(max_length=128, null=True, index=True, default=None)
    address_raw = fields.CharField(max_length=128, null=True, index=True, default=None)
    ref_raw = fields.CharField(max_length=128, null=True, index=True, default=None)
    ref = fields.CharField(max_length=128, null=True, index=True, default=None)
    tg_id = fields.BigIntField(index=True, null=True)
    type = fields.CharEnumField(ReferralsNotificationType, max_length=32, null=True, default=None)
    direction = fields.CharField(max_length=128, null=True, default=None)
    url = fields.CharField(max_length=512, null=True, default=None)
    payload = fields.JSONField(null=True, default=None)
    banks_balance = fields.IntField(default=0)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)
