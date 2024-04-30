import base64

from TonTools.Contracts.Contract import Contract
from ton.utils import read_address
from tonsdk.boc import Cell
from architecton.config import crowd_sale_address
from tonsdk.utils import Address, bytes_to_b64str


class CrowdSale(Contract):
    def __init__(self, provider):
        self.provider = provider
        self.address = crowd_sale_address
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
        return int(data[0][1], 16)

    async def get_coins(self, address: str):
        cell = Cell()
        cell.bits.write_address(Address(address))
        data = await self.provider.run_get_method(
            address=self.address,
            method="Coins",
            stack=[["tvm.Slice", bytes_to_b64str(cell.to_boc(False))]],
        )
        return int(data[0][1], 16)

    async def get_counter(self, address: str):
        cell = Cell()
        cell.bits.write_address(Address(address))
        print("adress:", address)
        print("contract:", self.address)
        data = await self.provider.run_get_method(
            address=self.address,
            method="Banks",
            # stack=[],
            stack=[["tvm.Slice", bytes_to_b64str(cell.to_boc(False))]],
        )
        print(data)
        jetton_wallet_address = self.provider._process_address(
            read_address(Cell.one_from_boc(base64.b64decode(data[0][1]["bytes"]))).to_string()
        )

        return jetton_wallet_address
