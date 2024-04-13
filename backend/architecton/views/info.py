from pydantic import Field

from architecton.views.balance import BalanceOut
from architecton.views.base import BaseViewModel


class InfoOut(BaseViewModel):
    balance: BalanceOut
