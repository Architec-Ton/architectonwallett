import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { IBankHistoryOut } from '../../types/api/bank';
import { useTonAddress } from '@tonconnect/ui-react';
// import { useNavigate } from 'react-router-dom';
//import { useTonConnect } from '../../hooks/useTonConnect';
import useApi from '../../hooks/useApi';
import BankingHistoryItem from '../../components/bank/BankingHistoryItem';
import Footer from '../../components/ui/Footer';

function BankHistory() {
  const { t } = useTranslation();

  //const { auth, setAuth } = useAuth();

  //const wallet = useTonWallet();

  const [bankHistories, setbankHistories] = useState<IBankHistoryOut[]>([]);

  // const { connected } = useTonConnect();
  const userFriendlyAddress = useTonAddress();

  // const navigate = useNavigate();

  //const { crowdSale, sendInc } = useCrowdSaleContract();

  const { data, isLoading, fetchData, error } = useApi();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData(
        `/bank/${userFriendlyAddress ? userFriendlyAddress : 'none'}/history`
      );
    }, 100);
    return () => clearTimeout(timeout);
  }, [userFriendlyAddress]);

  useEffect(() => {
    if (!isLoading && error == null && data) {
      console.log('set data', data);
      setbankHistories(data);
    }
  }, [isLoading, error]);

  return (
    <Layout2Row>
      <Container isLoading={isLoading}>
        <div>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t(`bank_history_title`)}
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1.5rem',
            padding: '2rem',
            maxHeight: '70vh',
            overflowY: 'scroll',
          }}>
          {bankHistories.map((h) => (
            <BankingHistoryItem
              {...h}
              type={h.type}
              title={t(h.title)}
              changes={h.changes}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </Layout2Row>
  );
}

export default BankHistory;
