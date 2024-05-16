from fastapi import APIRouter

from .info import router as info_router
from .bank import router as bank_router
from .account import router as account_router
from .support import router as support_router
from .task import router as task_router


router = APIRouter()


router.include_router(bank_router, prefix="/bank")
router.include_router(info_router, prefix="/info")
router.include_router(task_router, prefix="/task")
router.include_router(account_router, prefix="/account", include_in_schema=True)
router.include_router(support_router, prefix="/support", include_in_schema=True)
