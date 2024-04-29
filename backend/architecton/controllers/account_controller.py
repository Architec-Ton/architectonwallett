import json
import logging
import os.path

from TonTools.Contracts.Jetton import Jetton
from TonTools.Providers.TonCenterClient import TonCenterClient

from architecton.contracts.crowd_sale import CrowdSale
from architecton.controllers.ton_client import get_ton_client
from architecton.views.project_list import ProjectListOut

assets_dir = f"{os.path.dirname(os.path.dirname(__file__))}/assets"


class AccountController:

    @staticmethod
    async def get_balance(address: str):
        return await get_ton_client().get_balance(address)

    @staticmethod
    async def get_wallet(address: str):
        client = get_ton_client()
        contract = CrowdSale(client)

        tons = await contract.get_balance()

        print("TON on contract:", tons)

        banks = 0

        try:
            banks = await contract.get_banks(address)
        except BaseException as e:
            print("Get banks fail", e)

        print((banks))

        return banks

        # jetton = Jetton("EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwiuA", provider=client)

        # await jetton.update()
        # print(
        #     jetton
        # )  # Jetton({"supply": 4600000000000000000, "address": "EQBl3gg6AAdjgjO2ZoNU5Q5EzUIl8XMNZrix8Z5dJmkHUfxI", "decimals": 9, "symbol": "LAVE", "name": "Lavandos", "description": "This is a universal token for use in all areas of the decentralized Internet in the TON blockchain, web3, Telegram bots, TON sites. Issue of 4.6 billion coins. Telegram channels: Englishversion: @lave_eng \u0420\u0443\u0441\u0441\u043a\u043e\u044f\u0437\u044b\u0447\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f: @lavet", "image": "https://i.ibb.co/Bj5KqK4/IMG-20221213-115545-207.png", "token_supply": 4600000000.0})
        #
        # jetton_wallet = await jetton.get_jetton_wallet(address)  # for TonCenterClient and LsClient
        # print(jetton_wallet)  # JettonWallet({"address": "EQDgCBnCncRp4jOi3CMeLn-b71gymAX3W28YZT3Dn0a2dKj-"})
        # # return await get_ton_client().get_balance(address)
