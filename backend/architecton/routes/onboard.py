from fastapi import APIRouter

from architecton.controllers.project_controller import ProjectController
from architecton.views.info import InfoOut
from architecton.views.onboard import OnBoardIn

router = APIRouter(tags=["General route"])


# , response_model=InfoOut
@router.post("")
async def onboarding(onboard_in: OnBoardIn):

    return
