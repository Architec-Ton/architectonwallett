import asyncio
import logging
import os

from TonTools import TonCenterClient, LsClient, TonApiClient

TON_TESTNET = int(os.getenv("TON_TESTNET", 1))

TON_LSCLIENT = bool(int(os.getenv("TON_LSCLIENT", 0)))

TON_LSCLIENT = False
TON_TESTNET = False

client = TonCenterClient(
    # testnet=bool(TON_TESTNET),
    key="88d5912ad2394e5cbae97a351bb6a3e1174e09f7956d096beaae3acab91324da",
    base_url="https://ton.architecton.site/api/v2/",
)

tc_client = TonCenterClient(
    testnet=bool(TON_TESTNET),
    key="88d5912ad2394e5cbae97a351bb6a3e1174e09f7956d096beaae3acab91324da",
)

# lsclient = LsClient(ls_index=0, default_timeout=60, config="https://architecton.site/ton.config.json")
# lsclient = LsClient(ls_index=5, default_timeout=60)


# jetton_wallet_data = await client.get_jetton_wallet(address)
async def init_ton_client():
    pass
    # if bool(TON_LSCLIENT):
    #     logging.info("Initialize ton ls client")
    #     await asyncio.sleep(2)
    #     await lsclient.init_tonlib()
    #     logging.info("Done ton ls client")


def get_ton_client() -> TonCenterClient:
    # if bool(TON_LSCLIENT):
    #     return lsclient
    return client
