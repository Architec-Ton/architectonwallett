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
import Footer from '../../components/ui/Footer';
import { useCloudStorage, useInitData } from '@tma.js/sdk-react';
import useApi from '../../hooks/useApi';

function Mint() {
  // if (error) return <div className="failed">failed to load</div>;
  // if (isLoading) return <div className="Loading">Loading...</div>;
  const tadddress = useTonAddress();

  const [tonBalance, setTonBalance] = useState<number | null>(null);
  const [isGLoading, setIsGLoading] = useState<boolean>(true);
  const [bankBalance, setBankBalance] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [ContractAddress, setContractAddress] = useState<string | null>(null);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { connected } = useTonConnect();

  //const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading } = useSWR(
    `${BE_URL}/account/${tadddress}`,
    connected ? fetcher : null
  );

  const navigate = useNavigate();

  const storageTelegram = useCloudStorage();

  const initData = useInitData();

  let ref = initData.startParam;

  useEffect(() => {
    const a = async () => {
      if (!ref || ref == '') {
        ref = await storageTelegram.get('ref');
      }

      console.log('REF in async:', ref);
    };
    a();
  }, []);

  const { t } = useTranslation();

  //const walletAddress = '0QCto-hxbOIBe_G6ub3s3_murlWrPBo__j8zI4Fka8PAMGBK';
  const { writeData } = useApi();
  const [recvBank, setRecvBank] = useState<number>(1);
  const [sendTon, setSendTon] = useState<number>(1);
  const [buyDisabled, setbuyDisabled] = useState<boolean>(false);

  const onChangeBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    setRecvBank(value);
    setSendTon(value); // /10
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangeTon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    setRecvBank(value);
    setSendTon(value); // /10
  };
  //const ContractAddress = 'EQBXfJkeDheR_vzI1DDXcZipaKBhyMtkfophZI8CbKuvMZZX';
  const { buyBank, buyRefferalBank } = useCrowdSaleContract();
  const handleBuyBanks = async () => {
    console.log('Try buy: ', sendTon, ref);
    const tx =
      ref && ref != '' && ref != tadddress
        ? await buyRefferalBank(sendTon, Address.parse(ref))
        : await buyBank(sendTon);
    console.log('Transaction responce:', tx);
    setIsGLoading(true);
    await writeData(`/bank/${tadddress}?tgid=${initData.user.id}`, {
      bankBefore: bankBalance,
      bankAfter: bankBalance + recvBank,
      ref: ref && ref != '' ? ref : null,
      tx: {
        tx: tx,
        ref: ref,
        sendTon: sendTon,
        recvBank: recvBank,
      },
    });
    navigate('/');
  };

  // const fetchData = async () => {
  //   console.log('call balance', crowdSale);
  //   if (connected && crowdSale && wallet) {
  //     console.log('get balance');
  //     const amount = await crowdSale?.getBanks(Address.parse(wallet));
  //     console.log('getBanks:', amount);
  //     setBankBalance(Number(amount));
  //   }
  // };

  useEffect(() => {
    if (isLoading === false) {
      console.log('DATA:', data);
      if (data) {
        // fetchData();
        setTonBalance(Number(data.tons) / 1e9);
        // setContractAddress(data.address);
        setBankBalance(data.banks);
        setIsGLoading(false);
        const tons = Math.floor(Number(data.tons) / 1e9);
        if (tons > 10) {
          setRecvBank(10);
          setSendTon(10); // /10
        } else if (tons <= 10 && tons > 0) {
          setRecvBank(tons);
          setSendTon(tons); // /10
        } else {
          setRecvBank(1);
          setSendTon(1); // /10
        }
      }
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (sendTon > tonBalance) {
      setbuyDisabled(true);
    } else {
      setbuyDisabled(false);
    }
  }, [sendTon, tonBalance]);

  return (
    <Layout2Row>
      <Container isLoading={isGLoading} loadingTitle={t(`mint_title`)}>
        <div>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t(`mint_title`)}
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '2rem',
          }}>
          <MintInput
            icon={assets.iconBankColor}
            onChange={onChangeBank}
            selected={false}
            value={recvBank}
            balance={bankBalance ? bankBalance : 0}
          />
          <div
            style={{
              margin: '-1rem 0',
              zIndex: 100,
            }}>
            <img src={assets.iconExchange} />
          </div>
          <MintInput
            icon={assets.iconTon}
            receive={false}
            title="TON"
            balance={tonBalance ? tonBalance : 0}
            value={sendTon}
            selected={false}
            onChange={onChangeTon}
          />
          <p
            className="text-small"
            style={{
              padding: '1rem 2rem',
              fontSize: '0.75rem',
            }}>
            * {t('mint_comment')}
          </p>
        </div>
      </Container>
      <Footer>
        <FooterButton
          disabled={buyDisabled}
          title={t('mint_buy')}
          onClick={handleBuyBanks}
        />
      </Footer>
    </Layout2Row>
  );

  // //{!isLoading && <Projects tokens={data.tokens} />}
}

export default Mint;
