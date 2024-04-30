import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import { useTranslation } from 'react-i18next';
import BalanceBase from '../../components/balance/BalanceBase';
import Workspace from '../../components/bank/Workspace';
import Minting from '../../components/bank/MInting';
import { useEffect, useState } from 'react';
import BankingHistory from '../../components/bank/BankingHistory';
// import { useAuth } from '../../hooks/useAuth';
import useSWR from 'swr';
import { BE_URL } from '../../constants';
import { IBankOut } from '../../types/api/bank';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../../hooks/useTonConnect';
//import { useTonClient } from '../../hooks/useTonClient';
//import { Address } from '@ton/core';
//import useCrowdSaleContract from '../../hooks/useCrowdSaleContract';

function Bank() {
  const { t } = useTranslation();

  //const { auth, setAuth } = useAuth();

  //const wallet = useTonWallet();

  const [mintingPercent, setMintingPercent] = useState<number>(0);
  const [tokenMint, setTokenMint] = useState<number>(0);

  const [bankCount, setBankCount] = useState<number>(0);
  const [bankersCount, setBankersCount] = useState<number>(0);
  const [bankIncome, setBankIncome] = useState<number>(0);

  // eslint-disable-next-line no-var
  //var mintingPercentValue = mintingPercent;
  // eslint-disable-next-line no-var
  //var tokenMintValue = tokenMint;

  const { connected } = useTonConnect();

  const userFriendlyAddress = useTonAddress();

  //const { client } = useTonClient();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const navigate = useNavigate();

  //const { crowdSale, sendInc } = useCrowdSaleContract();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading } = useSWR(
    `${BE_URL}/bank/${userFriendlyAddress ? userFriendlyAddress : 'none'}`,
    fetcher
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (connected && crowdSale && wallet) {
  //       crowdSale
  //         ?.getBanks(Address.parse(wallet))
  //         .then((amount: bigint) => setBankCount(Number(amount)));
  //       crowdSale
  //         ?.getCoins(Address.parse(wallet))
  //         .then((amount: bigint) => setTokenMint(Number(amount) / 100_000));
  //     }
  //   };

  //   fetchData();
  // }, [connected, crowdSale, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const bank = data as IBankOut;
      if (connected) {
        if (bank?.balance) {
          setBankCount(bank?.balance?.bankAmount);
          setTokenMint(bank?.balance?.bnkAmount);
          setBankIncome(bank?.balance?.bnkPerHour);
        }
        setBankersCount(bank.bank.bankBankers);

        setMintingPercent(
          (100 * (data.bank.bankTotal - data.bank.bankFree)) /
            data.bank.bankTotal
        );
      }
    }
  }, [isLoading]);

  return (
    <Layout2Row>
      <Container isLoading={isLoading} loadingTitle="Bank Mint">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
          }}>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t('bank_mint_header')}
          </h2>

          <BalanceBase
            title="Architec.TON"
            bankCount={bankCount}
            amount={tokenMint.toLocaleString(undefined, {
              minimumFractionDigits: 5,
            })}
            symbol="$BNK">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TonConnectButton
                style={{
                  width: '100%',
                }}
              />
              {connected && (
                <button onClick={() => navigate('/bank/mint')}>Mint</button>
              )}
            </div>
          </BalanceBase>
        </div>
        <div className="two-column">
          <Workspace bank_count={bankCount} bank_income={bankIncome} />
          <Minting
            bankers_count={bankersCount}
            mintingPercent={mintingPercent}
          />
        </div>
        <BankingHistory bankingHistory={[]} />
      </Container>
      <div className="footer" style={{ paddingBottom: '1rem' }}>
        <div>
          <p>
            Our <a href="#">Support Team</a>
          </p>
          <p>in Telegram</p>
        </div>
      </div>
    </Layout2Row>
  );
}

export default Bank;
