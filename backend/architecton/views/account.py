from pydantic import Field

from architecton.views.base import BaseViewModel
from architecton.views.project_list import ProjectListOut
from architecton.views.token import TokenOut


class AccountOut(BaseViewModel):

    balance: TokenOut = Field()
    projects: ProjectListOut = Field()


class AccountBalanceOut(BaseViewModel):
    tons: int
    banks: int
    address: str