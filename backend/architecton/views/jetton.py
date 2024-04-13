from pydantic import Field

from architecton.views.base import BaseViewModel


class JettonOut(BaseViewModel):
    address: str = Field(description="address address")
    decimals: int | None = Field(default=None, description="Token symbol")
    name: str = Field(description="Token symbol")
    image: str = Field(default="https://placeholder", description="Token symbol")
    description: str = Field(default="no description", description="Token symbol")
