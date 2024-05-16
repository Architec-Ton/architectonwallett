import logging
import os.path

import aiogram.exceptions
from aiogram import Bot
from bot import bot


class ProjectController:

    @staticmethod
    async def check_user_subscription(channel_id, user_id):
        try:
            member = await bot.get_chat_member(channel_id, user_id)
        except aiogram.exceptions.TelegramBadRequest as e:
            logging.warning(f"Exception: {e}")
            return False
        logging.info(member)
        return member.status == 'member' or member.status == 'creator'


