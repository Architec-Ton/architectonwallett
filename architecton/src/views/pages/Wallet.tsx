import FooterButton from '../../components/buttons/FooterButton';
import { useTranslation } from 'react-i18next';
import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../../hooks/useTonConnect';
import Footer from '../../components/ui/Footer';

function Wallet() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { connected, wallet } = useTonConnect();

  const [tonConnectUI] = useTonConnectUI();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const { t } = useTranslation();

  const disconnect = async () => {
    await tonConnectUI.disconnect();
    navigate('/');
  };

  return (
    <Layout2Row>
      <Container isLoading={false} loadingTitle={t(`mint_title`)}>
        <div>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t(`wallet_title`)}
          </h2>
        </div>
      </Container>
      <Footer>
        <FooterButton title={t('wallet_disconnect')} onClick={disconnect} />
      </Footer>
    </Layout2Row>
  );

  // //{!isLoading && <Projects tokens={data.tokens} />}
}

export default Wallet;
