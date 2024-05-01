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
//import { useTonClient } from '../../hooks/useTonClient';
//import { Address } from '@ton/core';
//import useCrowdSaleContract from '../../hooks/useCrowdSaleContract';

function Bank() {
  const { t } = useTranslation();

  //const { auth, setAuth } = useAuth();

  //const wallet = useTonWallet();

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

  const navigate = useNavigate();

  //const { crowdSale, sendInc } = useCrowdSaleContract();

  const { data, isLoading, fetchData, error } = useApi();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData(`/bank/${userFriendlyAddress ? userFriendlyAddress : 'none'}`);
    }, 100);
    return () => clearTimeout(timeout);
  }, [userFriendlyAddress]);

  useEffect(() => {
    if (!isLoading && error == null && data) {
      console.log('set data', data);
      setBankInfo(data as IBankOut);
    }
  }, [isLoading, connected]);

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
                  title="Mint"
                  icon={assets.iconBankWhite}
                  onClick={() => navigate('/bank/mint')}
                />
                <Button
                  title="Referrals"
                  icon={assets.iconRef}
                  onClick={() => navigate('/bank/ref')}
                  disabled={true}
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
              (1 - bankInfo.bank.bankFree / bankInfo.bank.bankTotal) * 100
            }
          />
        </div>
        <BankingHistory bankingHistory={[]} />
      </Container>
      <Footer />
    </Layout2Row>
  );
}

export default Bank;
