import asyncio
import logging

import aiohttp
from aiogram import Bot
from config_reader import config
async def get_updates():
    #if config.local:
    #    base_url = "http://localhost:8000"
    #else:
    base_url = "https://architecton.site"

    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(verify_ssl=False)) as session:
        async with session.get(f'{base_url}/api/v1/account/none/update') as resp:
            if resp.status == 200:
                return await resp.json()
            else:
                logging.error(f"GET UPDATE ERROR: {await resp.text()}")



async def worker(bot: Bot):
    logging.info(f"local: {config.local}")

    while True:
        # await asyncio.sleep(60)
        await asyncio.sleep(90)
        try:
            data = await get_updates()

            if data is not None:
                logging.info(f"updates: {len(data)}")
                for msg in data:
                    banks = msg['banks']
                    logging.info(f"id: {msg['tgid']} t: {msg['type']} b: {banks}")
                    if msg['type'] == 'mint':
                        text = (f"🚀 You've has been minted a +{banks} BNK! \n "
                                "Check your wallet now."
                                )
                    elif msg['type'] == 'notcoin':
                        text = (f"♪ You've has been minted a +{banks} BNK! \n "
                                "Check your wallet now."
                                )
                    elif msg['type'] == 'ref':

                        if msg['stgid'] is not None:
                            if msg['stgid'] == msg['tgid']:
                                text = f"""🤑 Looks like you're your own best friend! 
You've just earned a reward for using your own referral link. 
Treat yourself with the bonus +{banks} BNK! 💰"""
                            else:
                                text = f"""🎉 Congratulations!                   
You've earned a reward through your referral link from @{msg['sname']} .
Enjoy your bonus +{banks} BNK! 
Check your wallet now."""
                        else:
                            text = f"""🎉 Congratulations!
You've earned a reward through your referral link.
Enjoy your bonus +{banks} BNK!
Check your wallet now."""
                    if msg['tgid'] is not None:
                        await bot.send_message(chat_id=msg['tgid'], text=text)

        except Exception as e:
            logging.error(f"Error: {e}")


def start_pooling(bot):
    asyncio.ensure_future(worker(bot))




