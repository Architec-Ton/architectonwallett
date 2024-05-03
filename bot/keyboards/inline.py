from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram.types.web_app_info import WebAppInfo

menu = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(
                text="Кошелек", web_app=WebAppInfo(url="https://architecton.site")
            ),
            # InlineKeyboardButton(
            #     text="Кошелек (local)", web_app=WebAppInfo(url="https://architecton.local")
            # ),
            # InlineKeyboardButton(
            #     text="Кошелек (mobile)", web_app=WebAppInfo(url="https://192.168.10.239")
            # )


        ]
    ]
)

not_register = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(
                text="📱Wallet", web_app=WebAppInfo(url="https://architecton.site")
            )
        ]
    ]
)

main = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(
                text="📱Wallet", web_app=WebAppInfo(url="https://architecton.site")
            ),
            InlineKeyboardButton(
                text="💰My Account", callback_data="my_account"
            )
        ]
    ]
)


def generate_wallet_keyboard(wallet_addresses):
    keyboard = InlineKeyboardBuilder()
    
    for address in wallet_addresses:
        # Формируем текст кнопки (первые три буквы...последние три буквы адреса)
        button_text = address[:3] + "..." + address[-3:]
        # Используем адрес кошелька как callback_data
        button_callback_data = address
        keyboard.button(text=button_text, callback_data=button_callback_data)
    keyboard.adjust(*[2]*2)
    keyboard.button(text="🔙Back", callback_data="backone")
    
    return keyboard.as_markup()


my_account = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(
                text="🏦Balance", callback_data="balance"
            ),
            InlineKeyboardButton(
                text="👥Friends", callback_data="friends"
            ),
            InlineKeyboardButton(
                text="🔙Back", callback_data="back"
            )
        ]
    ]
)