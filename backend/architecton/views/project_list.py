from typing import List

from pydantic import Field

from architecton.views.base import BaseViewModel
from architecton.views.jetton import JettonOut
from architecton.views.project import ProjectOut


class ProjectListOut(BaseViewModel):
    tokens: List[JettonOut] = Field(default=[])
    games: List[ProjectOut] = Field(default=[])
    websites: List[ProjectOut] = Field(default=[])
    channels: List[ProjectOut] = Field(default=[])
