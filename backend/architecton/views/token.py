from pydantic import Field

from architecton.views.base import BaseViewModel


class TokenOut(BaseViewModel):
    symbol: str = Field(description="Token symbol")
    name: str = Field(description="Token symbol")
    name: str = Field(description="Token symbol")
    logo: str = Field(description="Token symbol")

    description: str = Field(description="Token symbol")
