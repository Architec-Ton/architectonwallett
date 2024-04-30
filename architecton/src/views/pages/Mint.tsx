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
  // useTonWallet,
} from '@tonconnect/ui-react';
// import { TonClientData } from '@tonclient/core';
import { Address } from '@ton/ton';
import { BE_URL } from '../../constants';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../../hooks/useTonConnect';
import useCrowdSaleContract from '../../hooks/useCrowdSaleContract';

function Mint() {
  // if (error) return <div className="failed">failed to load</div>;
  // if (isLoading) return <div className="Loading">Loading...</div>;
  const tadddress = useTonAddress(false);

  const [tonBalance, setTonBalance] = useState<number | null>(null);
  const [bankBalance, setBankBalance] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [ContractAddress, setContractAddress] = useState<string | null>(null);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { connected, wallet } = useTonConnect();

  //const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading } = useSWR(
    `${BE_URL}/account/${tadddress}`,
    connected ? fetcher : null
  );

  const navigate = useNavigate();

  const { t } = useTranslation();

  //const walletAddress = '0QCto-hxbOIBe_G6ub3s3_murlWrPBo__j8zI4Fka8PAMGBK';

  const [recvBank, setRecvBank] = useState<number>(1);
  const [sendTon, setSendTon] = useState<number>(0.01);

  const onChangeBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    setRecvBank(value);
    setSendTon(value / 100);
  };
  //const ContractAddress = 'EQBXfJkeDheR_vzI1DDXcZipaKBhyMtkfophZI8CbKuvMZZX';
  const { crowdSale, buyBank } = useCrowdSaleContract();
  const handleBuyBanks = async () => {
    const tx = await buyBank(sendTon + 0.005);
    console.log(tx);

    navigate('/');
  };

  const fetchData = async () => {
    console.log('call balance', crowdSale);
    if (connected && crowdSale && wallet) {
      console.log('get balance');
      const amount = await crowdSale?.getBanks(Address.parse(wallet));
      console.log('getBanks:', amount);
      setBankBalance(Number(amount));
    }
  };

  useEffect(() => {
    if (!isLoading) {
      console.log('DATA:', data);
      if (data) {
        fetchData();
        setTonBalance(Number(data.tons) / 1e9);
        // setContractAddress(data.address);
        setBankBalance(data.banks);
      }
    }
  }, [isLoading]);

  return (
    <Layout2Row>
      <Container isLoading={isLoading}>
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
            balance={bankBalance ? bankBalance : 0}
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
