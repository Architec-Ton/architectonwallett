import asyncio
import os
import time

from fastapi.exceptions import RequestValidationError
from starlette import status
from starlette.requests import Request
from starlette.responses import JSONResponse

from architecton.config import TORTOISE_ORM, description, origins
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise

from architecton.controllers.ton_client import init_ton_client
from architecton.routes import router

import logging

from architecton.routes.test import get_client

logging.basicConfig()
logging.getLogger().setLevel(logging.INFO)

ARCHITECTON_API_PREFIX = os.getenv("ARCHITECTON_API_PREFIX", "/api/v1")


app = FastAPI(
    title=f"Architecton Backend API",
    description=description,
    debug=True,
    version="0.0.1",
    # root_path=ARCHITECTON_API_PREFIX,
    docs_url=f"{ARCHITECTON_API_PREFIX}/docs",
    redoc_url=None,
    openapi_url=f"{ARCHITECTON_API_PREFIX}/apidoc.json",
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


@app.on_event("startup")
async def startup_event():
    logging.info("Init client")
    asyncio.ensure_future(init_ton_client())
    logging.info("Done client")


register_tortoise(app, generate_schemas=True, add_exception_handlers=True, config=TORTOISE_ORM)


app.add_middleware(
    CORSMiddleware,  # noqa
    allow_origins=["*"],
    allow_credentials=True,
    expose_headers=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix=ARCHITECTON_API_PREFIX)


@app.exception_handler(Exception)
async def validation_exception_handler(request: Request, exc: RequestValidationError):

    exc_str = f"{exc}".replace("\n", " ").replace("   ", " ")
    # or logger.error(f'{exc}')
    logging.error(request, exc_str)
    content = {"status_code": 10422, "message": exc_str, "data": None}
    return JSONResponse(content=content, status_code=status.HTTP_400_BAD_REQUEST)
