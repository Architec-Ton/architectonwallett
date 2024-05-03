from tortoise import fields
from tortoise.models import Model


class Wallet(Model):

    class Meta:
        table = "wallet"

    id = fields.UUIDField(pk=True, index=True)
    address = fields.CharField(max_length=128, null=True, index=True, default=None)
    tg_id = fields.BigIntField(index=True, null=True)
    tons = fields.CharField(max_length=128, index=True, null=True)
    banks = fields.IntField(default=0, index=True, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)
