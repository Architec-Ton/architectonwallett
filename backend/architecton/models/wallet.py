import logging

from tortoise import fields
from tortoise.models import Model
from tonsdk.utils import Address
from tortoise.expressions import Q


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

    @staticmethod
    async def get_wallet(address: str, tg_id: int | None = None):
        if address is not None:
            add = Address(address)
            query = Q(
                Q(address=address)
                | Q(address=add.hash_part.hex())
                | Q(address=add.to_string(is_user_friendly=True))
                | Q(address=add.to_string(is_bounceable=True))
                | Q(address=add.to_string(is_bounceable=False, is_user_friendly=True))
            )
            if tg_id is not None:
                query = Q(query & Q(tg_id=tg_id))

            return await Wallet.filter(query).first()
