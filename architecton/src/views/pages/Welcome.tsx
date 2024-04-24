import assets from '../../assets';
import Container from '../../components/ui/Container';
import BlockInfo from '../../components/ui/BlockInfo';
import { useTranslation } from 'react-i18next';
import FooterButton from '../../components/buttons/FooterButton';
import Layout2Row from '../layout/Layout2Row';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
            {t('footer_our')} <a href="#">{t('footer_support_team')}</a>
          </p>
          <p>{t('footer_in_telegram')}</p>
        </div>
        <FooterButton title="Further" onClick={() => navigate('/bank')} />
      </div>
    </Layout2Row>
  );
}

export default Welcome;
