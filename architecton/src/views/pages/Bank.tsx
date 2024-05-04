import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import { useTranslation } from 'react-i18next';
import BalanceBase from '../../components/balance/BalanceBase';
import Workspace from '../../components/bank/Workspace';
import Minting from '../../components/bank/MInting';
import { useEffect, useState } from 'react';
import BankingHistory from '../../components/bank/BankingHistory';
// import { useAuth } from '../../hooks/useAuth';
import { IBankOut } from '../../types/api/bank';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../../hooks/useTonConnect';
import useApi from '../../hooks/useApi';
import Footer from '../../components/ui/Footer';
import assets from '../../assets';
import Button from '../../components/buttons/Button';
import { useCloudStorage, useInitData } from '@tma.js/sdk-react';
import { use } from 'i18next';
//import { useTonClient } from '../../hooks/useTonClient';
//import { Address } from '@ton/core';
//import useCrowdSaleContract from '../../hooks/useCrowdSaleContract';

function Bank() {
  const { t } = useTranslation();

  //const { auth, setAuth } = useAuth();

  //const wallet = useTonWallet();

  const initData = useInitData();

  const [bankInfo, setBankInfo] = useState<IBankOut>({
    balance: null,
    bank: {
      bankBankers: 0,
      bankFree: 0,
      bankTotal: 0,
    },
  } as IBankOut);

  const { connected } = useTonConnect();

  const userFriendlyAddress = useTonAddress();

  const storageTelegram = useCloudStorage();

  const navigate = useNavigate();

  //const { crowdSale, sendInc } = useCrowdSaleContract();

  const { data, isLoading, fetchData, error, writeData, setIsLoading } =
    useApi();
  const ref = initData.startParam;
  useEffect(() => {
    if (ref && ref != '' && userFriendlyAddress != ref) {
      storageTelegram.set('ref', ref);
    }
  }, []);

  useEffect(() => {
    const preRun = async () => {
      const tgid = initData.user.id;
      console.log('connected', connected);
      console.log('userFriendlyAddress', userFriendlyAddress);
      console.log('fetch banks:', tgid, userFriendlyAddress);

      if (userFriendlyAddress) {
        await fetchData(
          `/bank/${
            userFriendlyAddress ? userFriendlyAddress : 'none'
          }?tgid=${tgid}`
        );
      } else {
        setIsLoading(false);
      }
      console.log('fetch banks finish:', tgid, userFriendlyAddress);
    };
    preRun();
  }, [userFriendlyAddress, connected]);

  useEffect(() => {
    if (!isLoading && error == null && data) {
      console.log('set data', data);
      const dt: IBankOut = data as IBankOut;

      if (bankInfo.balance && !dt.balance) {
        console.log('Skip this input ', dt);
        console.log('Skip this bankInfo ', bankInfo);
      } else {
        console.log('set this input ', dt);
        console.log('Set this bankInfo ', bankInfo);
        setBankInfo(dt);
      }
    }
  }, [isLoading, connected]);

  useEffect(() => {
    if (data && bankInfo) {
      console.log('bankInfo data', bankInfo);
      if (!bankInfo.account) {
        writeData(
          `/account/${userFriendlyAddress ? userFriendlyAddress : 'none'}`,
          initData.user
        );
      }
    }
  }, [bankInfo]);

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
            bankCount={bankInfo.balance?.bankAmount}
            amount={bankInfo.balance?.bnkAmount.toLocaleString(undefined, {
              minimumFractionDigits: 5,
            })}
            symbol="$BNK">
            {connected && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Button
                  title={t('Mint')}
                  icon={assets.iconBankWhite}
                  onClick={() => navigate('/bank/mint')}
                />
                <Button
                  title={t('Referrals')}
                  icon={assets.iconRef}
                  onClick={() => navigate('/bank/referral')}
                  disabled={bankInfo.balance?.bankAmount == 0}
                />
              </div>
            )}
            {!connected && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TonConnectButton />
              </div>
            )}
          </BalanceBase>
        </div>
        <div className="two-column">
          <Workspace
            bank_count={bankInfo.balance?.bankAmount}
            bank_income={0}
          />
          <Minting
            bankers_count={bankInfo.bank.bankBankers}
            maxBanks={bankInfo.bank.bankTotal}
            freeBanks={bankInfo.bank.bankFree}
            mintingPercent={
              bankInfo.bank.bankTotal
                ? (1 - bankInfo.bank.bankFree / bankInfo.bank.bankTotal) * 100
                : 0
            }
          />
        </div>
        <BankingHistory
          bankingHistory={bankInfo.histories ? bankInfo.histories : []}
        />
      </Container>
      <Footer />
    </Layout2Row>
  );
}

export default Bank;
