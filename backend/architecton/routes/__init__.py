from fastapi import APIRouter

from .info import router as info_router
from .bank import router as bank_router
from .account import router as account_router

router = APIRouter()


router.include_router(bank_router, prefix="/bank")
router.include_router(info_router, prefix="/info")
router.include_router(account_router, prefix="/account")
