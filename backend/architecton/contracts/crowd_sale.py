from TonTools.Contracts.Contract import Contract


class CrowdSale(Contract):
    def __init__(self, address, provider):
        self.provider = provider
        self.address = address
        if isinstance(address, str):
            super().__init__(address, provider)

    async def get_banks(self):
        return await self.provider.run_get_method(address=self.address, method="myBanksBalance", stack=[])
