import os

description = """
Architecton backend API. 🚀 This is common microservice collected all routes in one.
"""

db_user = os.getenv("DB_USER", "architecton")
db_pass = os.getenv("DB_PASS", "architecton")
db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", "5438")
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
    "https://www.architecton.site",
    "https://192.168.10.162",
    "https://192.168.56.1",
]

# address = "EQByVJjaA9EM8SzoApOuF0eE2USMNB2kT8ZlMV1TmWLfhgLe"
# address = "EQDqDWdMUxmbd6EW4iCfUTCLYt5sy185eZnVop7rFXd2RzzA"
# address = "EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwiuA"
# address = "EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwiuA"
# "0QCtwujhh-vTomKvurFgHifJOb4mK-vHnBjELhkhfLVvJ0Tz"
aa = "kQBhx3nW5tVt4nIIx_zDfsw_LA5YWu79Gbyi6eFbfrUGnMfQ"
bbb = "0QCtwujhh-vTomKvurFgHifJOb4mK-vHnBjELhkhfLVvJ0Tz"
ccc = "EQD_E6xHRe9_FnF0IJYpQKJK62yANQsgOTA80_pyUhLWe6F6"
lll = "EQDIfqmP71phy7GlkRrx86eQrtufpj9HDjNAt5uhTFr-JUVH"
testnet_crowd_sale_v2 = "EQC64tH5_uPMRcfy2KOXm0h-udsL6FA5U3cfm60tCK4shNux"
bank_crowd_sale = "EQBhOhdA8vncTSH3ft2f-Nqj9PTmKTSZMbhkMN8DhFTeJC1g"

bank_crowd_sale = "EQBhOhdA8vncTSH3ft2f-Nqj9PTmKTSZMbhkMN8DhFTeJC1g"
SMART_CONTRACT_CROWDSALE = os.getenv("SMART_CONTRACT_CROWDSALE", bank_crowd_sale)
