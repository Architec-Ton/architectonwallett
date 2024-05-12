from aiogram import Bot, Router, F
from aiogram.types import Message, CallbackQuery
from config_reader import config
from keyboards import inline


router = Router()
CHANNEL_ID="@architecton_tech"

bot = Bot(config.bot_token.get_secret_value(), parse_mode='HTML')

async def check_user_subscription(user_id):
    member = await bot.get_chat_member(CHANNEL_ID, user_id)
    return member.status == 'member' or member.status == 'creator'



@router.message()
async def start_handler(message: Message):
    if await check_user_subscription(message.from_user.id):
        await message.answer("Вы подписаны на канал. Все хорошо!")
    else:
        await message.answer("Пожалуйста, подпишитесь на наш канал:", reply_markup=inline.channel)

@router.callback_query(F.data=='check_subscription')
async def check_subscription_callback(callback: CallbackQuery):
    user_id = callback.from_user.id
    if await check_user_subscription(user_id):
        await callback.message.answer("Вы подписаны на канал. Все хорошо!")
    else:
        await callback.message.edit_text("Вы не подписаны на канал. Пожалуйста, подпишитесь:", reply_markup=inline.channel)