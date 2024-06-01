import Balance from '../../components/balance/Balance';
import MainMenu from '../../components/menu/MainMenu';
import CoinList from '../../components/coin/CoinList';
import Projects from '../../components/project/Projects';
import useSWR from 'swr';
import Layout2 from '../layout/Layout2';
import { useEffect, useState } from 'react';
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import assets from '../../assets';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { Address, JettonWallet, WalletContractV4 } from '@ton/ton';
import { useTonClient } from '../../hooks/useTonClient';
import { Buffer } from 'buffer/';

function Main() {
  // created function to handle API request
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  //const navigate = useNavigate();

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { data, error, isLoading } = useSWR(
  //   `http://127.0.0.1:8000/api/v1/info/test`,
  //   fetcher
  // );
  const wallet = useTonWallet();
  const { client } = useTonClient();
  //const wallet = false;

  const [tonAmount, setTonAmount] = useState<string>('----');
  const [usdAmount, setUsdAmount] = useState<string>(' ----');

  // //navigate('/welcome');

  // console.log(data, isLoading, error);
  useEffect(() => {
    const update = async () => {
      if (client && wallet) {
        const walletAddress = Address.parse(wallet.account.address);
        const v4: WalletContractV4 = WalletContractV4.create({
          workchain: 0,
          publicKey: Buffer.from(wallet.account.publicKey, 'base64') as Buffer,
        });
        console.log('sdsdssds', v4);
        client.getBalance(walletAddress).then((b) => {
          setUsdAmount(
            (Math.round(6.78 * Number(b / 1000_000_0n)) / 100).toString()
          );
          setTonAmount((Math.round(Number(b / 1000_000_0n)) / 100).toString());
        });

        //const jetton = JettonWallet.create(walletAddress);

        //jetton.getBalance(client).console.log('wallet:', v4);
      }
    };
    update();
  }, [wallet, client]);

  // if (error) return <div className="failed">failed to load</div>;
  // if (isLoading) return <div className="Loading">Loading...</div>;

  return (
    <Layout2>
      <Balance title="" amount={usdAmount}></Balance>
      <MainMenu />
      <CoinList tonAmount={tonAmount} />
      {/* <Projects tokens={data ? data.games : []} /> */}
    </Layout2>
  );

  // //{!isLoading && <Projects tokens={data.tokens} />}
}

export default Main;
