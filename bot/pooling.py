import asyncio
import aiohttp
from aiogram import Bot

async def get_updates():
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(verify_ssl=False)) as session:
        async with session.get('https://architecton.site/api/v1/account/none/update') as resp:
            if resp.status == 200:
                return await resp.json()
            else:
                print("GET UPDATE ERROR:", await resp.text())



async def worker(bot: Bot):
    while True:
        await asyncio.sleep(3*60)
        try:
            data = await get_updates()
            if data is not None:
                for msg in data:
                    banks = msg['banks']
                    print("id:", msg['tgid'], "t:", msg['type'], "b:", banks)
                    if msg['type'] == 'mint':
                        text = (f"🚀 You've has been minted a +{banks} BNK! \n "
                                "Check your wallet now."
                                )
                    elif msg['type'] == 'ref':
                        text = (f"""🎉 Congratulations! 
                        
    You've earned a reward through your referral link.
    Enjoy your bonus +{banks} BNK! 
    Check your wallet now."""
                                )
                    await bot.send_message(chat_id=msg['tgid'], text=text)

        except Exception as e:
            print('Error:', e)


def start_pooling(bot):
    asyncio.ensure_future(worker(bot))




