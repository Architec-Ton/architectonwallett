import os

from architecton.config import TORTOISE_ORM, description, origins
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise

from architecton.routes import router

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

# register_tortoise(app, generate_schemas=True, add_exception_handlers=True, config=TORTOISE_ORM)


app.add_middleware(
    CORSMiddleware,  # noqa
    allow_origins=["*"],
    allow_credentials=True,
    expose_headers=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix=ARCHITECTON_API_PREFIX)
