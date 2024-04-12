from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from fastapi.middleware.cors import CORSMiddleware

from config import description, TORTOISE_ORM, origins

from architecton.routes import router


app = FastAPI(
    title=f"Architecton Backend API",
    description=description,
    debug=True,
    version="0.0.1",
    # docs_url=f"{app_base}/docs",
    redoc_url=None,
    # openapi_url=f"{app_base}/apidoc.json",
)

register_tortoise(app, generate_schemas=True, add_exception_handlers=True, config=TORTOISE_ORM)


app.add_middleware(
    CORSMiddleware,  # noqa
    allow_origins=origins,
    allow_credentials=True,
    expose_headers="*",
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
