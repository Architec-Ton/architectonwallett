from pydantic import Field

from architecton.views.base import BaseViewModel
from architecton.views.token import TokenOut


class OnBoardIn(BaseViewModel):
   asset_name: str = Field(description="Token amount")
   small_description: str = Field(description="Token amount")
   full_description: str = Field(description="Token amount")
   tags: str = Field(description="Token amount")
   telegram: str = Field(description="Token amount")
   youtube: str | None = Field(description="Token amount")
   twitter: str | None = Field(description="Token amount")
   discord: str | None = Field(description="Token amount")
   resources: str | None = Field(description="Token amount")
   project_owner: str = Field(description="Token amount")
   videoAbout: str = Field(description="Token amount")
   agreement: bool = Field(description="Token amount")

