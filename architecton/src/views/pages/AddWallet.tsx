import assets from '../../assets';
import Container from '../../components/ui/Container';
import { useTranslation } from 'react-i18next';
import FooterButton from '../../components/buttons/FooterButton';
import Layout2Row from '../layout/Layout2Row';
import SelectButton from '../../components/buttons/SelectButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddWallet() {
  const { t } = useTranslation();
  const [menuIndex, setMenuIndex] = useState<number>(-1);
  const navigate = useNavigate();

  const nextAction = () => {
    if (menuIndex == 0) navigate('/wallet/new');
    if (menuIndex == 1) navigate('/wallet/exist');
  };

  return (
    <Layout2Row>
      <Container>
        <div>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t('add_wallet_header')}
          </h2>
          <div
            className="column"
            style={{
              margin: '2rem 0',
            }}>
            <SelectButton
              icon={assets.iconAdd}
              title={t('add_wallet_btn_new_title')}
              description={t('add_wallet_btn_new_desc')}
              selected={menuIndex == 0}
              onClick={(selected: boolean) =>
                selected ? setMenuIndex(0) : setMenuIndex(-1)
              }
            />
            <SelectButton
              icon={assets.iconExist}
              title={t('add_wallet_btn_existing_title')}
              description={t('add_wallet_btn_existing_desc')}
              selected={menuIndex == 1}
              onClick={(selected: boolean) => {
                selected ? setMenuIndex(1) : setMenuIndex(-1);
                console.log(menuIndex);
              }}
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
        <FooterButton
          title={menuIndex == 0 ? 'Create' : 'Futher'}
          disabled={menuIndex == -1}
          onClick={() => nextAction()}
        />
      </div>
    </Layout2Row>
  );
}

export default AddWallet;
