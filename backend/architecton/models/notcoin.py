from tortoise import fields
from tortoise.models import Model


class Notcoin(Model):

    class Meta:
        table = "notcoin"

    id = fields.UUIDField(pk=True, index=True)
    account = fields.BigIntField(index=True, null=True)
    address = fields.CharField(max_length=128, null=True, index=True, default=None)
    address_hash = fields.CharField(max_length=128, null=True, index=True, default=None)

    nft = fields.CharField(max_length=128, null=True, index=True, default=None)
    nft_hash = fields.CharField(max_length=128, null=True, index=True, default=None)

    nft_count = fields.IntField(default=0)
    bank_count = fields.IntField(default=0)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)
