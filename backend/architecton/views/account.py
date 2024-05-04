from pydantic import Field

from architecton.models import Account
from architecton.views.base import BaseViewModel
from architecton.views.project_list import ProjectListOut
from architecton.views.token import TokenOut
from tortoise.contrib.pydantic import pydantic_model_creator

AccountInGen = pydantic_model_creator(Account, exclude=('created_at', 'modified_at'))

class AccountIn(AccountInGen, BaseViewModel):
    pass

class AccountOut(AccountIn):
    pass

    # balance: TokenOut = Field()
    # projects: ProjectListOut = Field()


class AccountBalanceOut(BaseViewModel):
    tons: int
    banks: int
    address: str

class WalletOut(BaseViewModel):
    address: str


