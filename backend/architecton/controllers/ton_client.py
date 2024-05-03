from TonTools import TonCenterClient


client = TonCenterClient(testnet=False, key="88d5912ad2394e5cbae97a351bb6a3e1174e09f7956d096beaae3acab91324da")

# jetton_wallet_data = await client.get_jetton_wallet(address)


def get_ton_client() -> TonCenterClient:
    return client
