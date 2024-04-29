import os

description = """
Architecton backend API. 🚀 This is common microservice collected all routes in one.
"""

db_user = os.getenv("DB_USER", "architecton")
db_pass = os.getenv("DB_PASS", "architecton")
db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", "5432")
db_name = os.getenv("DB_NAME", "architecton")

db_url = f"postgres://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

TORTOISE_ORM = {
    "connections": {
        "default": db_url,
    },
    "apps": {
        "models": {
            "models": ["architecton.models"],  # , "aerich.models"],
            "default_connection": "default",
        },
    },
    "use_tz": True,
    "timezone": "UTC",
}


origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5173",
    "http://architecton.site",
    "https://architecton.local",
    "https://architecton.site",
    "https://192.168.10.162",
    "https://192.168.56.1",
]

# address = "EQByVJjaA9EM8SzoApOuF0eE2USMNB2kT8ZlMV1TmWLfhgLe"
# address = "EQDqDWdMUxmbd6EW4iCfUTCLYt5sy185eZnVop7rFXd2RzzA"
# address = "EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwiuA"
# address = "EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwiuA"

crowd_sale_address = os.getenv("CROWDSALE_ADDRESS", "0QCtwujhh-vTomKvurFgHifJOb4mK-vHnBjELhkhfLVvJ0Tz")
