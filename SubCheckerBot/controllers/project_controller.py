import os.path
from aiogram import Bot
import config

bot = Bot(config.sub_checker_bot_token.get_secret_value(), parse_mode='HTML')

class ProjectController:

    @staticmethod
    async def check_user_subscription(channel_id, user_id):
        member = await bot.get_chat_member(channel_id, user_id)
        return member.status == 'member' or member.status == 'creator'


