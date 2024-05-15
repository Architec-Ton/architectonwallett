from fastapi import APIRouter

from controllers.project_controller import ProjectController

router = APIRouter(tags=["General route"])


@router.get("/{chat_id}/{user_id}")
async def info(address: str = None):
    res =  await ProjectController.check_user_subscription(chat_id, user_id)
    return res


