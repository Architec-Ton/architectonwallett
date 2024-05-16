import asyncio
from aiogram import Bot, Dispatcher
from aiogram import Bot, Dispatcher
import logging
from config import SUB_CHECKER_BOT_TOKEN
bot = Bot(SUB_CHECKER_BOT_TOKEN, parse_mode='HTML')
dp = Dispatcher() 

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def start_telegram():
    import handlers
    dp.include_routers(
        handlers.user_commands.router,
        handlers.bot_messages.router
    )
    await bot.delete_webhook(drop_pending_updates=True)
    asyncio.ensure_future(dp.start_polling(bot))
    logger.info("Бот запущен и работает...")

