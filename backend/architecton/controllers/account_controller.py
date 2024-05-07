import json
import logging
import os.path

from TonTools.Contracts.Jetton import Jetton
from TonTools.Providers.TonCenterClient import TonCenterClient
from tonsdk.utils import Address
from fastapi.exceptions import HTTPException

from architecton.contracts.crowd_sale import CrowdSale
from architecton.controllers.notification_controller import NotificationController
from architecton.controllers.ton_client import get_ton_client

from architecton.models import Account, Notification, NotificationType, ReferralsNotification, ReferralsNotificationType
from architecton.views.account import AccountIn
from architecton.views.project_list import ProjectListOut

assets_dir = f"{os.path.dirname(os.path.dirname(__file__))}/assets"


class AccountController:

    @staticmethod
    async def get_balance(address: str):
        return await get_ton_client().get_balance(address)

    @staticmethod
    async def get_banks(address: str):
        client = get_ton_client()
        contract = CrowdSale(client)
        return await contract.get_banks(address)

    @staticmethod
    async def get_total():
        client = get_ton_client()
        contract = CrowdSale(client)
        return await contract.get_total()

    @staticmethod
    async def get_total_bankers():
        client = get_ton_client()
        contract = CrowdSale(client)
        return await contract.get_total_banker()

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

        return 0

        # jetton = Jetton("EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwiuA", provider=client)

        # await jetton.update()
        # print(
        #     jetton
        # )  # Jetton({"supply": 4600000000000000000, "address": "EQBl3gg6AAdjgjO2ZoNU5Q5EzUIl8XMNZrix8Z5dJmkHUfxI", "decimals": 9, "symbol": "LAVE", "name": "Lavandos", "description": "This is a universal token for use in all areas of the decentralized Internet in the TON blockchain, web3, Telegram bots, TON sites. Issue of 4.6 billion coins. Telegram channels: Englishversion: @lave_eng \u0420\u0443\u0441\u0441\u043a\u043e\u044f\u0437\u044b\u0447\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f: @lavet", "image": "https://i.ibb.co/Bj5KqK4/IMG-20221213-115545-207.png", "token_supply": 4600000000.0})
        #
        # jetton_wallet = await jetton.get_jetton_wallet(address)  # for TonCenterClient and LsClient
        # print(jetton_wallet)  # JettonWallet({"address": "EQDgCBnCncRp4jOi3CMeLn-b71gymAX3W28YZT3Dn0a2dKj-"})
        # # return await get_ton_client().get_balance(address)

    @staticmethod
    async def get_total_bankers():
        client = get_ton_client()
        contract = CrowdSale(client)
        return await contract.get_total_banker()

    @staticmethod
    async def get_or_create(account_in: AccountIn) -> Account:
        a = await Account.get_or_none(id=account_in.id)
        if a is None:
            a = await Account.create(**account_in.model_dump())
            n = await Notification.get_or_none(tg_id=a.id, type=NotificationType.registration)
            if n is None:
                await Notification.create(tg_id=a.id, type=NotificationType.registration)

        return a

    @staticmethod
    async def get_or_none(tg_id: int) -> Account:
        return await Account.get_or_none(id=tg_id)

    @staticmethod
    async def update_referral(tg_id: int, address: str, ref: str, banks: int):
        logging.info(f"update ref ref: {ref} tgid: {tg_id} address:{address} banks: {banks}")
        ref_address = None
        try:
            owner_address = Address(address)
            if ref is not None and len(ref) > 40:
                ref_address = Address(ref)
        except Exception as e:
            raise HTTPException(400, "Wrong TON address")

        if ref_address is not None:
            if owner_address.hash_part.hex() == ref_address.hash_part.hex():
                logging.warning(f"Referal same: {address} {ref}")
                return None
                # raise HTTPException(400, "Referral same as wallet")

        # logging.info(owner_address.to_string(is_bounceable=True))
        # logging.info(owner_address.to_string(is_user_friendly=True))
        # logging.info(owner_address.to_string(is_url_safe=True))
        # logging.info(owner_address.to_string(is_test_only=True))
        # logging.info(owner_address)
        #
        # logging.info(Address("UQDX96iy4NuIM-opmGoIuRLHm5y12AlC9oAJbiP_xjvQhHVa").hash_part.hex())
        # logging.info(Address("EQDX96iy4NuIM-opmGoIuRLHm5y12AlC9oAJbiP_xjvQhCif").hash_part.hex())
        # logging.info(Address("UQDX96iy4NuIM-opmGoIuRLHm5y12AlC9oAJbiP_xjvQhHVa").hash_part.hex())
        # logging.info(Address("0QDX96iy4NuIM-opmGoIuRLHm5y12AlC9oAJbiP_xjvQhM7Q").hash_part.hex())
        last_update = (
            await ReferralsNotification.filter(tg_id=tg_id, address_raw=owner_address.hash_part.hex())
            .order_by("-created_at")
            .first()
        )

        if last_update is None or (ref_address is not None and ref_address.hash_part.hex() != last_update.ref_raw):
            logging.info("create")
            await ReferralsNotification.create(
                tg_id=tg_id,
                address_raw=owner_address.hash_part.hex(),
                address=address,
                ref=ref,
                ref_raw=ref_address.hash_part.hex() if ref_address is not None else None,
                type=ReferralsNotificationType.open if last_update is None else ReferralsNotificationType.update,
                banks_balance=banks,
                direction="in",
            )

        # logging.info(ref_address.to_string(is_bounceable=True))

        if ref_address is not None:
            return ref_address.to_string(is_bounceable=True)
