import os
from tonsdk.utils import Address
import asyncio
import aiohttp

base_url = "https://tonapi.nftscan.com/api/ton/"
api_key = os.environ["NFTSCAN_APIKEY"]
headers = {"X-API-KEY": api_key}
# session = aiohttp.ClientSession()


class NFTscanController:

    # https://docs.nftscan.com/reference/ton/get-all-nfts-by-account
    async def get_all_nfts_by_account(account: Address, **kwarg):
        url = base_url + "account/own/all/" + account.to_string(is_user_friendly=True)
        async with aiohttp.ClientSession(headers=headers) as session:
            async with session.get(url) as resp:
                return await resp.json()

    # https://docs.nftscan.com/reference/ton/get-nfts-by-account

    async def get_nfts_by_account(account: Address, **kwarg):
        url = base_url + "account/own/" + account.to_string(is_user_friendly=True)
        async with aiohttp.ClientSession(headers=headers) as session:
            async with session.get(url) as resp:
                return await resp.json()

    # https://docs.nftscan.com/reference/ton/get-single-nft

    async def get_single_nft(nft_address: Address, **kwarg):
        url = base_url + "assets/" + nft_address.to_string(is_user_friendly=True)
        async with aiohttp.ClientSession(headers=headers) as session:
            async with session.get(url) as resp:
                return await resp.json()

    # https://docs.nftscan.com/reference/ton/get-nfts-by-contract

    async def get_nfts_by_contract(nft_address: Address, **kwarg):
        url = base_url + "assets/contract/" + nft_address.to_string(is_user_friendly=True)
        async with aiohttp.ClientSession(headers=headers) as session:
            async with session.get(url) as resp:
                return await resp.json()

    # https://docs.nftscan.com/reference/ton/get-transactions-by-account

    async def get_transactions_by_account(account: Address, cursor=None):
        url = base_url + "transactions/account/" + account.to_string(is_user_friendly=True)
        if cursor is not None:
            url += f"?cursor={cursor}"
        async with aiohttp.ClientSession(headers=headers) as session:
            async with session.get(url) as resp:
                return await resp.json()

    # https://docs.nftscan.com/reference/ton/get-transactions-by-contract

    async def get_transactions_by_contract(contract_address: Address, **kwarg):
        url = base_url + "transactions/contract/" + contract_address.to_string(is_user_friendly=True)
        async with aiohttp.ClientSession(headers=headers) as session:
            async with session.get("GET", url, headers=headers, params=kwarg) as resp:
                return resp

    # https://docs.nftscan.com/reference/ton/get-transactions-by-nft

    async def get_transactions_by_nft(token_address: Address, **kwarg):
        url = base_url + "transactions/account/" + token_address.to_string(is_user_friendly=True)
        async with aiohttp.ClientSession(headers=headers) as session:
            async with session.get("GET", url, headers=headers, params=kwarg) as resp:
                return resp

    # if __name__ == "__main__":
    #     api_key = "JkHG8VHONeO6k9iu668SAfOm"
    #     account = "UQAeV4crAaUoCJo5igUIzosJXcOjtb4W7ff7Qr0DrgXPRle_"
    #     nft_address = "EQBGUL9GmFNKcCK2OV6I1PO0SwjxYTj8w7R5ULGe9yGQaAYS"
    #     contract_address = "EQDmkj65Ab_m0aZaW8IpKw4kYqIgITw_HRstYEkVQ6NIYCyW"
    #
    #     resp = get_all_nfts_by_account(account)
    #     print(resp)
