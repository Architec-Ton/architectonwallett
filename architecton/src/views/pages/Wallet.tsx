import FooterButton from '../../components/buttons/FooterButton';
import { useTranslation } from 'react-i18next';
import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../../hooks/useTonConnect';
import Footer from '../../components/ui/Footer';

function Wallet() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { connected, wallet } = useTonConnect();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const { t } = useTranslation();

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
        <TonConnectButton />
      </Container>
      <Footer>
        <FooterButton title={t('wallet_disconnect')} />
      </Footer>
    </Layout2Row>
  );

  // //{!isLoading && <Projects tokens={data.tokens} />}
}

export default Wallet;
