from aiogram import Router, F, Bot
from aiogram.types import Message, LabeledPrice, CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import Command, CommandObject, CommandStart
from aiogram.fsm.context import FSMContext
from utils.states import Form
from keyboards import reply, inline
import requests
import json

router = Router()

async def is_registered(tgid):
    is_tgids = str(tgid)
    url = f"https://architecton.site/api/v1/account/tg/{is_tgids}"
    response = requests.get(url)
    data = json.loads(response.text)
    if not data: 
        return False 
    return True

def read_user_ids_from_csv(file_path):
    user_ids = []
    with open(file_path, mode='r', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            user_ids.append(row['id'])
    return user_ids

user_ids = read_user_ids_from_csv('account_2024-06-27_115450.csv')

@router.message(Command('broadcast'))
async def start_broadcast(message: Message, state: FSMContext):
    await message.answer("Введите сообщение для рассылки:")
    await state.set_state(Form.message)

@router.message(Form.message)
async def broadcast_message(message: Message, state: FSMContext):
    await state.clear()  
    text = message.text
    for user_id in user_ids:
        try:
            await bot.send_message(chat_id=user_id, text=text)
        except Exception as e:
            print(f"Не удалось отправить сообщение пользователю {user_id}: {e}")
    await message.answer("Сообщение успешно разослано всем пользователям.")


@router.message(CommandStart())
async def start(msg: Message):
    if msg.from_user.language_code == 'ru':
        if await is_registered(msg.from_user.id) == False:
            await msg.answer("Привет! Ты еще не зарегистрирован. ПОдключи кошелёк здесь ⬇️⬇️⬇️", reply_markup=inline.not_register)
        else:
            await msg.answer("С возвращением!", reply_markup=inline.main)
    else:
        if await is_registered(msg.from_user.id) == False:
            await msg.answer("Hi, you haven't registered yet. Connect your wallet here ⬇️⬇️⬇️", reply_markup=inline.not_register)
        else:
            await msg.answer("Hi, welcome back", reply_markup=inline.main)
