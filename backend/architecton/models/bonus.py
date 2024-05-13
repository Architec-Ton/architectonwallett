from tortoise import fields
from tortoise.models import Model


class Bonus(Model):

    class Meta:
        table = "bonus"

    id = fields.IntField(pk=True)
    tg_id = fields.BigIntField(index=True, null=True)
    address = fields.CharField(max_length=128, null=True, index=True, default=None)
    address_raw = fields.CharField(max_length=128, null=True, index=True, default=None)
    referral_tg_id = fields.BigIntField(index=True, null=True)
    referral = fields.CharField(max_length=128, null=True, index=True, default=None)
    type = fields.CharField(max_length=32, null=True, default=None)
    completed = fields.BooleanField(default=True)
    bank_count = fields.IntField(default=0)
    comment = fields.TextField(null=True, default=None)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)
