from aiogram import Router, F, Bot
from aiogram.types import Message, LabeledPrice, CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import Command, CommandObject, CommandStart
from keyboards import reply, inline

router = Router()

async def is_registered():
    return True

@router.message(CommandStart())
async def start(msg: Message):
    if await is_registered() == False:
        await msg.answer("Hi, you haven't registered yet. Connect your wallet here ⬇️⬇️⬇️", reply_markup=inline.not_register)
    else:
        await msg.answer("Hi, welcome back", reply_markup=inline.main)