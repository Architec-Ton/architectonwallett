from aiogram import Router, F, Bot
from aiogram.types import Message, LabeledPrice, CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import Command, CommandObject, CommandStart
from keyboards import reply, inline

router = Router()

async def is_registered(tgid):
    is_tgids = str(tgid)
    url = f"https://architecton.site/api/v1/account/tg/{tgids}"
    response = requests.get(url)
    data = json.loads(response.text)
    if not data: 
        return False 
    return True

@router.message(CommandStart())
async def start(msg: Message):
    if await is_registered() == False:
        await msg.answer("Hi, you haven't registered yet. Connect your wallet here ⬇️⬇️⬇️", reply_markup=inline.not_register)
    else:
        await msg.answer("Hi, welcome back", reply_markup=inline.main)