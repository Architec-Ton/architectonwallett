import base64

from TonTools.Contracts.Contract import Contract
from TonTools.Contracts.Jetton import Jetton
from ton.utils import read_address
from tonsdk.boc import Cell
from architecton.config import SMART_CONTRACT_CROWDSALE
from tonsdk.utils import Address, bytes_to_b64str


class CrowdSale(Contract):
    def __init__(self, provider):
        self.provider = provider
        self.address = SMART_CONTRACT_CROWDSALE
        if isinstance(self.address, str):
            super().__init__(self.address, provider)

    async def get_banks(self, address: str):
        cell = Cell()
        cell.bits.write_address(Address(address))
        data = await self.provider.run_get_method(
            address=self.address,
            method="Banks",
            stack=[["tvm.Slice", bytes_to_b64str(cell.to_boc(False))]],
        )
        print(data)
        if data[0][0] != "list":
            return int(data[0][1], 16)

        return 0

    async def get_total(self):
        data = await self.provider.run_get_method(
            address=self.address,
            method="TotalBanks",
            stack=[],
        )
        return int(data[0][1], 16)

    async def get_owner(self):
        data = await self.provider.run_get_method(
            address=self.address,
            method="owner",
            stack=[],
        )
        print(data)
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
        return int(data[0][1], 16)
