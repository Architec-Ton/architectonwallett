import datetime
from typing import List, Dict

from pydantic import Field

from architecton.views.account import AccountOut
from architecton.views.base import BaseViewModel
from architecton.views.project_list import ProjectListOut
from architecton.views.token import TokenOut



class BankBalanceOut(BaseViewModel):
    bank_amount: int = Field(default=0)
    bnk_per_hour: float = Field(default=0)
    bnk_amount: float = Field(default=0)

class BankInfoOut(BaseViewModel):
    bank_total: int = Field(default=80000)
    bank_free: int = Field(default=72899)
    bank_bankers: int = Field(default=34)

class BankHistoryOut(BaseViewModel):
    type: str = Field(default="mint")
    created_at: datetime.datetime = Field( serialization_alias='date')
    title: str | None= Field(default="mint")
    symbol: str | None = Field(default=None)
    changes: str | None = Field(default=None)

class BankOut(BaseViewModel):
    balance: BankBalanceOut | None = Field(default=None)
    bank: BankInfoOut = Field(default=BankInfoOut())
    histories: List[BankHistoryOut] = Field(default=[])
    account: AccountOut | None =Field(default=None)

class BankIn(BaseViewModel):
    bank_before: int = Field(default=0)
    bank_after: int = Field(default=0)
    ref: str | None = Field(default=0)
    tx: Dict | None = Field(default=None)






