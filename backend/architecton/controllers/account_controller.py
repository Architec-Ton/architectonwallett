import asyncio
import json
import logging
import os.path

from TonTools.Contracts.Jetton import Jetton
from TonTools.Providers.TonCenterClient import TonCenterClient
from tonsdk.utils import Address
from fastapi.exceptions import HTTPException
from tortoise.functions import Sum

from architecton.contracts.crowd_sale import CrowdSale
from architecton.contracts.crowd_sale2 import CrowdSale2
from architecton.controllers.nftscan_controller import NFTscanController
from architecton.controllers.notification_controller import NotificationController
from architecton.controllers.ton_client import get_ton_client

from architecton.models import (
    Account,
    Notification,
    NotificationType,
    ReferralsNotification,
    ReferralsNotificationType,
    Notcoin,
    Wallet,
    Bonus,
)
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
        contract2 = CrowdSale2(client)
        banks, banks2, notcoin_banks = await asyncio.gather(
            contract.get_banks(address),
            contract2.get_banks(address),
            Notcoin.filter(address_hash=Address(address).hash_part.hex())
            .annotate(notcoin_banks=Sum("bank_count"))
            .values("notcoin_banks"),
            # Bonus.filter(address_raw=Address(address).hash_part.hex(), completed=True)
            # .annotate(bonus_banks=Sum("bank_count"))
            # .values("bonus_banks"),
        )
        if (
            len(notcoin_banks) > 0
            and "notcoin_banks" in notcoin_banks[0]
            and notcoin_banks[0]["notcoin_banks"] is not None
        ):
            total_notcoins = notcoin_banks[0]["notcoin_banks"]
        else:
            total_notcoins = 0
        # if len(bonus_banks) > 0 and "bonus_banks" in bonus_banks[0] and bonus_banks[0]["bonus_banks"] is not None:
        #     total_bonus = bonus_banks[0]["bonus_banks"]
        # else:
        #     total_bonus = 0
        # logging.info(f"{address} banks: {banks} notcoin: {total_notcoins} bonus: {total_bonus}")
        return total_notcoins + banks + banks2

    @staticmethod
    async def get_total():
        client = get_ton_client()
        # contract = CrowdSale(client) total_notcoins, bonus_banks
        contract2 = CrowdSale2(client)
        total_contract = await contract2.get_total()
        # Notcoin.all().annotate(notcoin_banks=Sum("bank_count")).values("notcoin_banks"),
        # Bonus.filter(completed=True).annotate(bonus_banks=Sum("bank_count")).values("bonus_banks"),

        # if (
        #     len(total_notcoins) > 0
        #     and "notcoin_banks" in total_notcoins[0]
        #     and total_notcoins[0]["notcoin_banks"] is not None
        # ):
        #     total_notcoins = total_notcoins[0]["notcoin_banks"]
        # else:
        #     total_notcoins = 0

        # if len(bonus_banks) > 0 and "total_bonus" in bonus_banks[0] and bonus_banks[0]["total_bonus"] is not None:
        #     total_bonus = bonus_banks[0]["total_bonus"]
        # else:
        #     total_bonus = 0
        logging.info(f"Contract banks: {total_contract} ")
        return total_contract  #  + total_notcoins + total_bonus

    @staticmethod
    async def get_total_bankers():
        client = get_ton_client()
        # contract = CrowdSale(client)
        contract2 = CrowdSale2(client)
        total_contract_bankers = await contract2.get_total_banker()
        # total_contract_bankers, total_contract_bankers2 = await asyncio.gather(
        #     contract.get_total_banker(),
        #     contract2.get_total_banker(),
        #     Notcoin.all().distinct().count(),
        # )
        # logging.info(f"Bankers: {total_contract_bankers} notcoin: {notcoins_bankers}")
        return total_contract_bankers

    @staticmethod
    async def get_transactions(address: str, limit=5):
        client = get_ton_client()
        # contract = CrowdSale(client)
        # client.get_nft_owner()
        return await client.get_transactions(address, limit=limit)

        return await contract.get_banks(address)

    @staticmethod
    async def get_nft_is_our(address: str):
        client = get_ton_client()
        # contract = CrowdSale(client)
        # client.get_nft_owner()
        res = await client.get_nft_owner(address)
        if res.address == "EQAeV4crAaUoCJo5igUIzosJXcOjtb4W7ff7Qr0DrgXPRgp6":
            return True
        return False

    @staticmethod
    async def get_check_collection(address: str):
        client = get_ton_client()
        # contract = CrowdSale(client)
        # client.get_nft_owner()
        res = await client.get_nft_items([address])
        if len(res) > 0 and str(res[0].collection_address) == "EQDmkj65Ab_m0aZaW8IpKw4kYqIgITw_HRstYEkVQ6NIYCyW":
            return True
        return False

    @staticmethod
    async def get_nft(address: str):
        client = get_ton_client()
        # contract = CrowdSale(client)
        # client.get_nft_owner()
        return await client.get_nft_owner(address)

    @staticmethod
    async def get_wallet(address: str):
        client = get_ton_client()
        contract = CrowdSale(client)

        tons = await contract.get_balance()

        # print("TON on contract:", tons)

        banks = 0

        try:
            banks = await contract.get_banks(address)
        except BaseException as e:
            print("Get banks fail", e)

        # print((banks))

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

    # @staticmethod
    # async def get_total_bankers():
    #     client = get_ton_client()
    #     contract = CrowdSale(client)
    #     return await contract.get_total_banker()

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
            # logging.info("create")
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

    @staticmethod
    async def update_notcoin():
        address = Address("UQAeV4crAaUoCJo5igUIzosJXcOjtb4W7ff7Qr0DrgXPRle_")
        # nft = Address("EQAw03ANjnM1qvHwputIZIzQbDpLmpD_StejKybrpFxdqBzR")
        # resp = await NFTscanController.get_all_nfts_by_account(address)
        # return resp
        # resp = await NFTscanController.get_single_nft(nft)
        resp = await NFTscanController.get_transactions_by_account(address)

        # resp = await NFTscanController.get_transactions_by_account(address)

        if "data" in resp and "content" in resp["data"]:
            content = resp["data"]["content"]
            for nft in content:
                if nft["contract_address"] == "EQDmkj65Ab_m0aZaW8IpKw4kYqIgITw_HRstYEkVQ6NIYCyW":
                    source = nft["source"]
                    token_address = nft["token_address"]
                    src_address = Address(source)
                    nft_address = Address(token_address)
                    nft_model = await Notcoin.get_or_none(nft_hash=nft_address.hash_part.hex())

                    if nft_model is None:
                        wallet = await Wallet.get_wallet(
                            src_address.to_string(is_user_friendly=True, is_bounceable=True)
                        )
                        account_id = None
                        if wallet is not None:
                            account_id = wallet.tg_id

                        await Notcoin.create(
                            account=account_id,
                            address=source,
                            address_hash=src_address.hash_part.hex(),
                            nft=token_address,
                            nft_hash=nft_address.hash_part.hex(),
                            nft_count=10000,
                            bank_count=19,
                        )
                        addr = Address(address).hash_part.hex()
                        await Notification.create(
                            title=src_address.to_string(is_bounceable=True, is_user_friendly=True),
                            type=NotificationType.notcoin,
                            bank_before=0,
                            bank_after=19,
                            completed=False,
                            address=src_address.to_string(),
                            address_orig=src_address.hash_part.hex(),
                            tg_id=account_id,
                            symbol="$NOT",
                            changes=f"+19 bnk",
                        )
        return resp

    @staticmethod
    async def update_bonus():
        bonuses = await Bonus.filter(on_contract=False)
        for bonus in bonuses:
            wallet = await Wallet.get_wallet(bonus.address, bonus.tg_id)
            if wallet is None or wallet is None:
                continue
            if bonus.tg_id is not None and bonus.tg_id != wallet.tg_id:
                logging.info(f"Wallet different: {bonus.tg_id} <--> {wallet.tg_id}")
                continue
            elif bonus.tg_id is None:
                bonus.tg_id = wallet.tg_id
            src_address = Address(wallet.address)
            if bonus.referral is not None:
                ref_wallet = await Wallet.get_wallet(bonus.referral)
                if wallet is not None:
                    bonus.referral_tg_id = ref_wallet.tg_id

            if bonus.bank_count > 100:
                continue

            client = get_ton_client()
            contract = CrowdSale2(client)

            if await contract.set_bonus(bonus.address, bonus.bank_count):
                bonus.on_contract = True
                await bonus.save()
            else:
                bonus.on_contract = True
                bonus.comment = f"Problem for set bonus"
                await bonus.save()
                continue

            await Notification.create(
                title=src_address.to_string(is_bounceable=True, is_user_friendly=True),
                type=NotificationType.ref if bonus.type == "ref" else NotificationType.tsk,
                bank_before=0,
                bank_after=bonus.bank_count,
                completed=False,
                address=src_address.to_string(),
                address_orig=src_address.hash_part.hex(),
                tg_id=wallet.tg_id,
                symbol="*ref" if bonus.type == "ref" else bonus.type,
                changes=f"+{bonus.bank_count} bnk",
            )
            bonus.address_raw = src_address.hash_part.hex()
            bonus.completed = True
            await bonus.save()
        return {"status": "ok"}
