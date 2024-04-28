import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import { useTranslation } from 'react-i18next';
import BalanceBase from '../../components/balance/BalanceBase';
import Workspace from '../../components/bank/Workspace';
import Minting from '../../components/bank/MInting';
import { useEffect, useState } from 'react';
import BankingHistory from '../../components/bank/BankingHistory';
import { useAuth } from '../../hooks/useAuth';
import useSWR from 'swr';
import { BE_URL } from '../../constants';
import { IBankOut } from '../../types/api/bank';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';

function Bank() {
  const { t } = useTranslation();

  const [isGLoading, setIsGLoading] = useState<boolean>(true);

  const { auth, setAuth } = useAuth();

  //const wallet = useTonWallet();

  const [mintingPercent, setMintingPercent] = useState<number>(0);
  const [tokenMint, setTokenMint] = useState<number>(0);

  // eslint-disable-next-line no-var
  //var mintingPercentValue = mintingPercent;
  // eslint-disable-next-line no-var
  //var tokenMintValue = tokenMint;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const address = auth && auth.address ? auth.address : 'none';

  const [tonConnectUI] = useTonConnectUI();

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading } = useSWR(
    `${BE_URL}/bank/${address}`,
    fetcher
  );

  useEffect(
    () =>
      tonConnectUI.onStatusChange((wallet) => {
        console.log('Wallet info2:', wallet);
        if (wallet) {
          if (!auth || !auth.address) {
            if (!auth) {
              setAuth({
                address: wallet.account?.address,
                tgid: '',
              });
              console.log('Auth:', auth);
            } else {
              auth.address = wallet.account?.address;
              setAuth(auth);
              console.log('Auth2:', auth);
            }
          }

          console.log('Wallet info:', wallet);
          console.log('send info to backend');
          console.log(auth);
          // checkProofInYourBackend(
          //   wallet.connectItems.tonProof.proof,
          //   wallet.account
          // );
        }
      }),
    []
  );

  const bank = data as IBankOut;

  useEffect(() => {
    setIsGLoading(isLoading);
    console.log(data, error, isLoading);
    if (!isLoading) {
      setMintingPercent(
        (100 * (data.bank.bankTotal - data.bank.bankFree)) / data.bank.bankTotal
      );
      if (bank && bank.balance) setTokenMint(bank?.balance?.bnkAmount);
      // if (bank?.balance?.bankAmount > 0) {
      //   setInterval(() => {
      //     //setMintingPercent(mintingPercentValue);
      //     //mintingPercentValue += 0.1;
      //     const increase = 0.00001 * bank?.balance?.bankAmount;
      //     setTokenMint(tokenMintValue + increase);
      //   }, 1000);
      // }
    }
  }, [isLoading]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMintingPercent(mintingPercentValue);
  //     setTokenMint(tokenMintValue);
  //     mintingPercentValue += 0.1;
  //     tokenMintValue += 0.00001;
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Layout2Row>
      <Container isLoading={isGLoading} loadingTitle="Bank Mint">
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
            bankCount={bank?.balance?.bankAmount}
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
              {!!auth && (
                <button onClick={() => navigate('/bank/mint')}>Mint</button>
              )}
            </div>
          </BalanceBase>
        </div>
        <div className="two-column">
          <Workspace
            bank_count={bank?.balance?.bankAmount}
            bank_income={bank?.balance?.bnkPerHour}
          />
          <Minting
            bankers_count={bank?.bank.bankBankers}
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
