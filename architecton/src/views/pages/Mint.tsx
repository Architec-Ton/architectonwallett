// import Layout from '../layout/Layout';
// import Balance from '../../components/balance/Balance';
// import MainMenu from '../../components/menu/MainMenu';
// import CoinList from '../../components/coin/CoinList';
//import Projects from '../../components/project/Projects';
// import useSWR from 'swr';
import FooterButton from '../../components/buttons/FooterButton';
import { useTranslation } from 'react-i18next';
import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import MintInput from '../../components/bank/MintInput';
import assets from '../../assets';
import React, { useEffect, useState } from 'react';
//import { useTonClient } from '../../hooks/useTonClient';
//import { TonClientContext } from "tonconnect-react-ui";
import {
  useTonAddress,
  //   useTonClientUI,
  useTonWallet,
} from '@tonconnect/ui-react';
// import { TonClientData } from '@tonclient/core';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from '@ton/ton';
import { useTonClient } from '../../hooks/useTonClient';

function Mint() {
  // if (error) return <div className="failed">failed to load</div>;
  // if (isLoading) return <div className="Loading">Loading...</div>;
  const tadddress = useTonAddress(false);
  const [tonConnectUI] = useTonConnectUI();
  const [tonBalance, setTonBalance] = useState<number | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  console.log(walletAddress);

  const tonClient = useTonClient();

  const { t } = useTranslation();

  const tonWallet = useTonWallet();

  //const walletAddress = '0QCto-hxbOIBe_G6ub3s3_murlWrPBo__j8zI4Fka8PAMGBK';

  const [recvBank, setRecvBank] = useState<number>(1);
  const [sendTon, setSendTon] = useState<number>(2);

  const onChangeBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    setRecvBank(value);
    setSendTon(value / 50);
  };
  const ContractAddress = 'EQDqDWdMUxmbd6EW4iCfUTCLYt5sy185eZnVop7rFXd2RzzA';

  const handleBuyBanks = async () => {
    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: ContractAddress, // destination address
            amount: '20000000', //Toncoin in nanotons
          },
        ],
      };

      // Отправляем транзакцию для покупки банков
      const result = await tonConnectUI.sendTransaction(transaction);

      // Обрабатываем успешную транзакцию
      //setTransactionStatus('Banks purchased successfully!');
      console.log('Transaction result:', result);
    } catch (error) {
      // Обрабатываем ошибки
      console.error('Error buying banks:', error);
      //setTransactionStatus('Error buying banks');
    }
  };

  tonConnectUI.getWallets().then((value) => console.log(value));

  useEffect(() => {
    async function fetchBalance() {
      if (!tonConnectUI && !tadddress) return;

      try {
        //await tonClient.setup(tonConnectUI.config);
        const wallet = await tonClient.getBalance(
          Address.parseFriendly(tadddress).address
        );
        console.log('wallet balance', wallet);
        //const account = await tonClient.;
        //console.log(account);
        setTonBalance(Number(wallet) / 1e9);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }

    fetchBalance();
  }, [tonConnectUI]);

  //   useEffect(() => {
  //     async function fetchBalance() {
  //       if (!tonClient || !walletAddress) return;

  //       try {
  //         const accountData: TonClientData = await tonClient.net.query_account({
  //           account: walletAddress,
  //         });
  //         setTonBalance(accountData.balance);
  //       } catch (error) {
  //         console.error('Error fetching balance:', error);
  //       }
  //     }

  //     fetchBalance();
  //   }, [tonClient, walletAddress]);

  useEffect(() => {
    // Set wallet address here or pass it as a prop
    setWalletAddress('0QCto-hxbOIBe_G6ub3s3_murlWrPBo__j8zI4Fka8PAMGBK');
  }, []);

  console.log(tonWallet);

  return (
    <Layout2Row>
      <Container>
        <div>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t(`mint_title`)}
          </h2>
        </div>
        <div>
          <MintInput
            icon={assets.iconBank}
            onChange={onChangeBank}
            selected={false}
            value={recvBank}
          />
          <div>X</div>
          <MintInput
            icon={assets.iconBank}
            receive={false}
            title="TON"
            balance={tonBalance ? tonBalance : 0}
            value={sendTon}
            selected={false}
          />
        </div>
        <div>
          <button onClick={handleBuyBanks}>Buy</button>
        </div>
      </Container>
      <div className="footer">
        <div>
          <p>
            Our <a href="#">Support Team</a>
          </p>
          <p>in Telegram</p>
        </div>
        <FooterButton
          title={t('mint_buy')}
          onClick={handleBuyBanks}

          //disabled={walletState == 1 && !approved}
        />
      </div>
    </Layout2Row>
  );

  // //{!isLoading && <Projects tokens={data.tokens} />}
}

export default Mint;
