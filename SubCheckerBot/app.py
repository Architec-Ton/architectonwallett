import os
from contextlib import asynccontextmanager

from fastapi.exceptions import RequestValidationError
from starlette import status
from starlette.requests import Request
from starlette.responses import JSONResponse

from config import description, origins
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from tortoise.contrib.fastapi import register_tortoise

from routes import router

import logging

logging.basicConfig()
logging.getLogger().setLevel(logging.INFO)

SUBCHECKERBOT_API_PREFIX = os.getenv("SUBCHECKERBOT_API_PREFIX", "/api/v1")

@asynccontextmanager
async def lifespan(application: FastAPI):
    logging.info("🚀 Starting application")
    from bot import start_telegram
    await start_telegram()
    yield
    logging.info("⛔ Stopping application")


app = FastAPI(
    title=f"SubCheckerBot Backend API",
    description=description,
    debug=True,
    version="0.0.1",
    # root_path=SUBCHECKERBOT_API_PREFIX,
    docs_url=f"{SUBCHECKERBOT_API_PREFIX}/docs",
    redoc_url=None,
    openapi_url=f"{SUBCHECKERBOT_API_PREFIX}/apidoc.json",
)

# register_tortoise(app, generate_schemas=True, add_exception_handlers=True, config=TORTOISE_ORM)


app.add_middleware(
    CORSMiddleware,  # noqa
    allow_origins=["*"],
    allow_credentials=True,
    expose_headers=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix=SUBCHECKERBOT_API_PREFIX)


@app.exception_handler(Exception)
async def validation_exception_handler(request: Request, exc: RequestValidationError):

    exc_str = f"{exc}".replace("\n", " ").replace("   ", " ")
    # or logger.error(f'{exc}')
    logging.error(request, exc_str)
    content = {"status_code": 10422, "message": exc_str, "data": None}
    return JSONResponse(content=content, status_code=status.HTTP_400_BAD_REQUEST)
