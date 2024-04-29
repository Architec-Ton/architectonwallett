from TonTools.Contracts.Contract import Contract
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
        return await self.provider.run_get_method(
            address=self.address,
            method="someoneBanksBalance",
            stack=[["tvm.Slice", bytes_to_b64str(cell.to_boc(False))]],
        )
