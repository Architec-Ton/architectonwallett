import asyncio
from aiogram import Bot, Dispatcher
from config_reader import config
from aiogram import Bot, Dispatcher
import logging
import handlers.bot_messages
import handlers.user_commands
from app import app


bot = Bot(config.sub_checker_bot_token.get_secret_value(), parse_mode='HTML')
dp = Dispatcher() 

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("Бот запущен и работает...")

async def main():  
    
    dp.include_routers(
        handlers.user_commands.router,
        handlers.bot_messages.router
    )
    config = uvicorn.Config(app, 
                            loop=loop,
                            host="0.0.0.0",
                            port=config.sub_checker_bot_port.get_secret_value(),
                            reload=True,
                            workers=1,
                            log_config=log_config,
                            reload_dirs=["./"],
                            # reload_excludes=["../tests/"],
                            log_level="info",
                            access_log=True,)
    server = uvicorn.Server(config)
    
    async with application:

        await bot.delete_webhook(drop_pending_updates=True)
        await dp.start_polling(bot)
        await server.serve()
        await dp.stop()
    

if __name__ == "__main__":
    logging.info("Application SubCheckerBot RUN ")
    asyncio.run(main())

