import base64
import logging
import decimal
import os

import aiohttp
import tonsdk
from TonTools.Contracts.Contract import Contract as TopContract
from TonTools.Contracts.Jetton import Jetton
from ton.utils import read_address
from tonsdk.boc import Cell
from tonsdk.contract import Contract
from tonsdk.contract.wallet import Wallets, WalletVersionEnum, SendModeEnum, WalletV4ContractR2

from architecton.config import SMART_CONTRACT_CROWDSALE2
from tonsdk.utils import Address, bytes_to_b64str, sign_message

from architecton.controllers.ton_client import TON_LSCLIENT, tc_client


async def get_ton_data(func: str):
    async with aiohttp.ClientSession() as session:
        url = "https://ton.architecton.site/api/v2/" + func
        response = await session.get(url=url)

        print("response.status:", response.status)
        if response.status == 200:
            data = await response.json()
            print("DATA: ", data)
            if data["ok"]:
                return data["result"]
            return None


class CrowdSale2(TopContract):
    def __init__(self, provider):
        self.options = {}
        self.provider = provider
        self.address = SMART_CONTRACT_CROWDSALE2
        if isinstance(self.address, str):
            super().__init__(self.address, provider)

    async def get_banks(self, address: str):
        cell = Cell()
        cell.bits.write_address(Address(address))
        stack = [["tvm.Slice", bytes_to_b64str(cell.to_boc(False))]]
        if TON_LSCLIENT:
            stack = [
                {
                    "@type": "tvm.stackEntrySlice",
                    "slice": {"@type": "tvm.slice", "bytes": bytes_to_b64str(cell.to_boc(False))},
                }
            ]
        try:
            data = await self.provider.run_get_method(
                address=self.address,
                method="Banks",
                stack=stack,
            )
            if TON_LSCLIENT:
                if data[0]:
                    return int(data[0].number.number)

            # print(data)
            if data[0][0] != "list":
                return int(data[0][1], 16)
        except Exception as e:
            logging.error(f"Get banks error: {e}")

        return 0

    async def get_total(self):
        data = await self.provider.run_get_method(
            address=self.address,
            method="TotalBanks",
            stack=[],
        )
        # logging.info(data)

        if TON_LSCLIENT:
            return int(data[0].number.number)
        return int(data[0][1], 16)

    def create_external_message(self, signing_message, seqno, dummy_signature=False):
        signature = (
            bytes(64)
            if dummy_signature
            else sign_message(bytes(signing_message.bytes_hash()), self.options["private_key"]).signature
        )

        body = Cell()
        body.bits.write_bytes(signature)
        body.write_cell(signing_message)

        state_init = code = data = None

        # if seqno == 0:
        #     deploy = self.create_state_init()
        #     state_init = deploy["state_init"]
        #     code = deploy["code"]
        #     data = deploy["data"]

        self_address = self.address
        header = Contract.create_external_message_header(self_address)
        result_message = Contract.create_common_msg_info(header, state_init, body)

        return {
            "address": self_address,
            "message": result_message,
            "body": body,
            "signature": signature,
            "signing_message": signing_message,
            "state_init": state_init,
            "code": code,
            "data": data,
        }

    def create_signing_message(self, seqno=None):
        seqno = seqno or 0
        cell = Cell()
        cell.bits.write_uint(seqno, 32)
        return cell

    async def set_bonus(self, address: Address, amount: int, mnemonic=None):
        mnemonic = os.getenv("TON_MANAGER_MNEMONIC", "")
        mnemonics, pub_k, priv_k, wallet = Wallets.from_mnemonics(mnemonic.split(" "), WalletVersionEnum("v4r2"), 0)

        # print("Pubk", pub_k.hex())
        # print("Wallet:", wallet.address.to_string(is_user_friendly=True))
        # Это какая то космическая хуйня
        # wallet = WalletV4ContractR2(public_key=pub_k, private_key=priv_k, wc=0)

        cell = Cell()
        cell.bits.write_uint(0xBA1C8008, 32)
        cell.bits.write_address(Address(address))
        cell.bits.write_uint(amount, 32)
        wallet_addr = wallet.address.to_string(is_user_friendly=True)
        contract_addr = "EQB8EPrSzysu6wAGH9JF6X2jIOah9wUs-5sHo8oK8afKsvDp"  # Address(SMART_CONTRACT_CROWDSALE2).to_string(is_user_friendly=True, is_bounceable=True)

        trxs = await self.provider.get_transactions(wallet_addr)
        # rxs = await tc_client.get_transactions(contract_addr)
        # mchain = await get_ton_data("getMasterchainInfo")
        #
        # if mchain is None:
        #     return False
        # lastSeqno = mchain["last"]["seqno"]
        #
        # print(lastSeqno)
        #
        # mchain = await get_ton_data(f"getAddressState?address={wallet_addr}")
        #
        # if mchain is None:
        #     return False
        # print(mchain)
        #
        # return

        # trxs = await self.provider.get_transactions(wallet.address.to_string(is_user_friendly=True))
        # print("Total:", len(trxs))
        # print(trxs)
        filtered_tx = [t for t in trxs if t.to_dict_user_friendly()["to"] == contract_addr]
        seqno = len(filtered_tx) + 1
        print("Set secno:", seqno, contract_addr)

        query = wallet.create_transfer_message(
            contract_addr,
            tonsdk.utils.to_nano(0.005, "ton"),
            seqno,
            payload=cell,
            send_mode=SendModeEnum.pay_gas_separately | SendModeEnum.ignore_errors,
        )
        boc = bytes_to_b64str(query["message"].to_boc(False))
        response = await tc_client.send_boc(boc)

        # async with aiohttp.ClientSession() as session:
        #     url = "https://ton.architecton.site/api/v2/" + "sendBocReturnHash"
        #     data = {"boc": boc}
        #     response = await session.post(url=url, json=data)
        #     print("DATA: ", await response.json())
        #     print("response.status:", response.status)
        # response = await tc_client.send_boc(boc)
        print("secno:", seqno)
        print("query:", query)

        print("Bonus on contract: ", response, "for:", address, " amount:", amount, "seqno", seqno)
        return response == 200
        # order_header = Contract.create_internal_message_header(to_addr, decimal.Decimal(0))
        #
        # signing_message = self.create_signing_message(1)
        # signing_message.bits.write_uint8(SendModeEnum.ignore_errors | SendModeEnum.pay_gas_separately)
        # signing_message.refs.append(cell)
        #
        # data = self.create_external_message(signing_message, 1, False)

        print(data)

        stack = [["tvm.Slice", bytes_to_b64str(data["message"].to_boc(False))]]

        print(stack)
        if TON_LSCLIENT:
            stack = [
                {
                    "@type": "tvm.stackEntrySlice",
                    "slice": {"@type": "tvm.slice", "bytes": bytes_to_b64str(cell.to_boc(False))},
                }
            ]

        boc = bytes_to_b64str(data["message"].to_boc(False))

        responce = await self.provider.send_boc(boc)

        print(responce)

        return responce

        # seqno = await self.provider.get_wallet_seqno(SMART_CONTRACT_CROWDSALE2)
        #
        # logging.info(f"seqno: {seqno}")

        # data = await self.provider.run_get_method(
        #     address=self.address,
        #     method="owner",
        #     stack=[],
        # )

    async def get_owner(self):
        data = await self.provider.run_get_method(
            address=self.address,
            method="owner",
            stack=[],
        )
        # print(data)
        jetton_wallet_address = self.provider._process_address(
            read_address(Cell.one_from_boc(base64.b64decode(data[1][1]["bytes"])))
        ).to_string()
        print(jetton_wallet_address)

    # return int(data[0][1], 16)

    async def get_total_banker(self):
        data = await self.provider.run_get_method(
            address=self.address,
            method="TotalBankers",
            stack=[],
        )
        # logging.info(data)

        if TON_LSCLIENT:
            return int(data[0].number.number)

        return int(data[0][1], 16)
