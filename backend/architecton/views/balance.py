from pydantic import Field

from architecton.views.base import BaseViewModel
from architecton.views.token import TokenOut


class BalanceOut(BaseViewModel):
    token: TokenOut
    amount: float = Field(description="Token amount")
    amount_usd: str = Field(description="Token amount in usd")
