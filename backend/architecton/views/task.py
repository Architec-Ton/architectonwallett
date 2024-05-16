from typing import List

from pydantic import Field
from architecton.views.base import BaseViewModel

class TaskOut(BaseViewModel):
    id: str
    completed: bool = Field(default=False)


class TasksOut(BaseViewModel):
    tasks: List[TaskOut] = Field(default=[])
    completed: bool = Field(default=False)