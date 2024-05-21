import asyncio
import os

from aiogram import Bot, Dispatcher
from config_reader import config
from aiogram import Bot, Dispatcher
import logging
import handlers.bot_messages
import handlers.user_commands

from pooling import start_pooling

bot_token = os.getenv("BOT_TOKEN", None)
bot = Bot(bot_token, parse_mode='HTML')
dp = Dispatcher() 

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("Бот запущен и работает...")

async def main():  
    
    dp.include_routers(
        handlers.user_commands.router,
        handlers.bot_messages.router
    )
    await bot.delete_webhook(drop_pending_updates=True)
    start_pooling(bot)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())


