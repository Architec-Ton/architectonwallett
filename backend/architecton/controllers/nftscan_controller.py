import os
from tonsdk.utils import Address
import asyncio
import aiohttp

base_url = 'https://tonapi.nftscan.com/api/ton/'
api_key = os.environ['NFTSCAN_APIKEY']
headers = {'X-API-KEY': api_key}        
session = aiohttp.ClientSession()

class NFTscanController:
    
    # https://docs.nftscan.com/reference/ton/get-all-nfts-by-account
    @asyncio.coroutine
    async def get_all_nfts_by_account(account: Address, **kwarg):
        url = base_url + 'account/own/all/' + address
        async with session.get('GET', url, headers=headers, params=kwarg) as resp:
            return resp
    
    # https://docs.nftscan.com/reference/ton/get-nfts-by-account
    @asyncio.coroutine
    async def get_nfts_by_account(account: Address, **kwarg):
        url = base_url + 'account/own/' + address
        async with session.get('GET', url, headers=headers, params=kwarg) as resp:
            return resp
    
    # https://docs.nftscan.com/reference/ton/get-single-nft 
    @asyncio.coroutine
    async def get_single_nft(nft_address: Address, **kwarg):
        url = base_url + 'assets/' + nft_address
        async with session.get('GET', url, headers=headers, params=kwarg) as resp:
            return resp
    
    # https://docs.nftscan.com/reference/ton/get-nfts-by-contract
    @asyncio.coroutine
    async def get_nfts_by_contract(nft_address: Address, **kwarg):
        url = base_url + 'assets/contract/' + nft_address
        async with session.get('GET', url, headers=headers, params=kwarg) as resp:
            return resp
    
    # https://docs.nftscan.com/reference/ton/get-transactions-by-account
    @asyncio.coroutine
    async def get_transactions_by_account(account: Address, **kwarg):
        url = base_url + 'transactions/account/' + account
        async with session.get('GET', url, headers=headers, params=kwarg) as resp:
            return resp
        
    # https://docs.nftscan.com/reference/ton/get-transactions-by-contract
    @asyncio.coroutine
    async def get_transactions_by_contract(contract_address: Address, **kwarg):
        url = base_url + 'transactions/contract/' + contract_address
        async with session.get('GET', url, headers=headers, params=kwarg) as resp:
            return resp
    
    # https://docs.nftscan.com/reference/ton/get-transactions-by-nft
    @asyncio.coroutine
    async def get_transactions_by_nft(token_address: Address, **kwarg):
        url = base_url + 'transactions/account/' + token_address
        async with session.get('GET', url, headers=headers, params=kwarg) as resp:
            return resp
        
    if __name__ == "__main__":
        api_key = "JkHG8VHONeO6k9iu668SAfOm"
        account = "UQAeV4crAaUoCJo5igUIzosJXcOjtb4W7ff7Qr0DrgXPRle_"
        nft_address = "EQBGUL9GmFNKcCK2OV6I1PO0SwjxYTj8w7R5ULGe9yGQaAYS"
        contract_address = "EQDmkj65Ab_m0aZaW8IpKw4kYqIgITw_HRstYEkVQ6NIYCyW"
        
        resp = get_all_nfts_by_account(account)
        print (resp)