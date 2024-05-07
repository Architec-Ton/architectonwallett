import FooterButton from '../../components/buttons/FooterButton';
import { useTranslation } from 'react-i18next';
import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import {
  CHAIN,
  WalletInfoWithOpenMethod,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';
//import { useTonConnect } from '../../hooks/useTonConnect';
import Footer from '../../components/ui/Footer';
import { useTonConnect } from '../../hooks/useTonConnect';

function Wallet() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const { connected } = useTonConnect();

  const wallet = useTonWallet() as WalletInfoWithOpenMethod;
  //const wallet2 = useTonWallet();

  const address = useTonAddress();

  const [tonConnectUI] = useTonConnectUI();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const { t } = useTranslation();

  const disconnect = async () => {
    await tonConnectUI.disconnect();
    navigate('/');
  };
  const { network } = useTonConnect();
  console.log(wallet);
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
          <div
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <h3>{wallet?.name}</h3>
            <p>{network === CHAIN.MAINNET ? 'mainnet' : 'testnet'}</p>
            <p
              className="text-small"
              style={{
                fontSize: '0.6rem',
              }}>
              {address}
            </p>
          </div>
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
