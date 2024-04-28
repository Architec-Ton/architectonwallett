from pydantic import Field

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


class BankOut(BaseViewModel):
    balance: BankBalanceOut | None = Field(default=None)
    bank: BankInfoOut = Field(default=BankInfoOut())



