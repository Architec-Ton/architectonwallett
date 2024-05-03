import FooterButton from '../../components/buttons/FooterButton';
import { useTranslation } from 'react-i18next';
import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../../hooks/useTonConnect';
import Footer from '../../components/ui/Footer';
import Workspace from '../../components/bank/Workspace';
import ReferralBlock from '../../components/bank/ReferralBlock';
import ReferralBonus from '../../components/bank/ReferralBonus';
import { useTonAddress } from '@tonconnect/ui-react';
import { APP_URL } from '../../constants';

function Referral() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { connected, wallet } = useTonConnect();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const { t } = useTranslation();
  const userFriendlyAddress = useTonAddress();

  return (
    <Layout2Row>
      <Container isLoading={false} loadingTitle={t(`mint_title`)}>
        <div>
          <h2
            style={{
              textAlign: 'center',
              padding: '0.5rem 0',
            }}>
            {t(`referral_title`)}
          </h2>
        </div>
        <ReferralBonus link={`${APP_URL}?startapp=${userFriendlyAddress}`} />

        <div className="two-column">
          <Workspace bank_count={0} bank_income={0} title="rewards" />
          <ReferralBlock referralBought={0} referralCount={0} />
        </div>
      </Container>
      <Footer>
        <FooterButton title={t('referral_button')} />
      </Footer>
    </Layout2Row>
  );

  // //{!isLoading && <Projects tokens={data.tokens} />}
}

export default Referral;
