from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram.types.web_app_info import WebAppInfo

menu = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(
                text="Кошелек", web_app=WebAppInfo(url="https://architecton.site")
            ),
            InlineKeyboardButton(
                text="Кошелек (local)", web_app=WebAppInfo(url="https://architecton.local")
            ),
            InlineKeyboardButton(
                text="Кошелек (mobile)", web_app=WebAppInfo(url="https://192.168.10.239")
            )


        ]
    ]
)
