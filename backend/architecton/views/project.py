from enum import Enum
from typing import List

from pydantic import Field

from architecton.views.base import BaseViewModel


class ProjectType(str, Enum):
    game = "game"
    website = "website"
    token = "token"


class ProjectContactType(str, Enum):
    telegram = "telegram"
    website = "website"
    whatsapp = "whatsapp"


class ProjectContactOut(BaseViewModel):
    type: ProjectContactType = Field()
    name: str
    description: str
    url: str


class ProjectOut(BaseViewModel):
    name: str = Field(description="Token symbol")
    description: str = Field(description="Token symbol")
    info: str = Field(default="", description="Token symbol")
    image: str = Field(description="Token symbol")
    gallery: List[str] = Field(default=[], description="Token symbol")
    contacts: List[ProjectContactOut] = Field(default=[], description="Project contacts")
