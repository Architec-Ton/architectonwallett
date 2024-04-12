from architecton.views.base import BaseViewModel
from pydantic import Field
from .token import TokenOut

class BalanceOut(BaseViewModel):
    token: str = TokenOut()
    amount: float = Field(description="Token amount")
    amount_usd: str = Field(description="Token amount in usd")

