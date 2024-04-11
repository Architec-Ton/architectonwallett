from aiogram import Router, F, Bot
from aiogram.types import Message, LabeledPrice, CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import Command, CommandObject, CommandStart
from keyboards import reply, inline

router = Router()

@router.message(CommandStart())
async def start(msg: Message):
    await msg.reply(
        f"👋 Привет, {msg.from_user.full_name}! Я *Architecton* - Лучший криптокошелек в Telegram."
        f" Покупайте, продавайте, храните и платите криптовалютой когда хотите."
        f" Подписывайтесь на наш канал @architec_ton 💰"
        f"\nВаш кошелек создан и вы можете начать пользование системой 🛠", reply_markup=inline.menu)