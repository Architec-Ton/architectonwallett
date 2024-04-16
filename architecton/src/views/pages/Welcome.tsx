import assets from '../../assets';
import Container from '../../components/ui/Container';
import BlockInfo from '../../components/ui/BlockInfo';
import { useTranslation } from 'react-i18next';
import FooterButton from '../../components/buttons/FooterButton';
import Layout2Row from '../layout/Layout2Row';

function Welcome() {
  const { t } = useTranslation();
  return (
    <Layout2Row>
      <Container>
        <div>
          <h2>{t('welcome_to')}</h2>
          <h2 className="color-bg-primary">Architec.TON</h2>
          <div
            className="column"
            style={{
              margin: '2rem 0',
            }}>
            <BlockInfo
              icon={assets.iconFees}
              title={t('welcome_info_ltf_title')}
              description={t('welcome_info_ltf_desc')}
            />
            <BlockInfo
              icon={assets.iconBank}
              title={t('welcome_info_cgp_title')}
              description={t('welcome_info_cgp_desc')}
            />
            <BlockInfo
              icon={assets.iconBank}
              title={t('welcome_info_dsl_title')}
              description={t('welcome_info_dsl_desc')}
            />
          </div>
        </div>
      </Container>
      <div className="footer">
        <div>
          <p>
            Our <a href="#">Support Team</a>
          </p>
          <p>in Telegram</p>
        </div>
        <FooterButton title="Further" />
      </div>
    </Layout2Row>
  );
}

export default Welcome;
