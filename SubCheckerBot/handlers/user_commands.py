from aiogram import Router, F, Bot
from aiogram.types import Message, LabeledPrice, CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import Command, CommandObject, CommandStart
from keyboards import inline

router = Router()

@router.message(CommandStart())
async def start(msg: Message):
    await msg.answer(f"I'll check: do you subscriber of channel or not")
    
