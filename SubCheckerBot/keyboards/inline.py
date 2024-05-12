from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup


channel = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text="Подпишись", url="t.me/architecton_tech"),
            InlineKeyboardButton(text='Проверить', callback_data="check_subscription")
        ]
    ]
)