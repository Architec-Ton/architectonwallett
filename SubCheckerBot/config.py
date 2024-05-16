import os

description = """
CHECKER API. 🚀 This is common microservice collected all routes in one.
"""

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5173",
    "http://architecton.site",
    "https://architecton.local",
    "https://architecton.site",
    "https://www.architecton.site",
    "https://192.168.10.162",
    "https://192.168.56.1",
]

SUB_CHECKER_BOT_TOKEN = os.getenv('SUB_CHECKER_BOT_TOKEN', 'xxxxxxxx')
