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
import { APP_URL, BE_URL } from '../../constants';
import useSWR from 'swr';
import { useInitData } from '@tma.js/sdk-react';
import { useEffect, useState } from 'react';
import { IBankReferralOut } from '../../types/api/bank';
import { Address } from '@ton/core';

function Referral() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { connected, wallet } = useTonConnect();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const tadddress = useTonAddress();

  const [refUrl, setRefUrl] = useState<string>('');

  const { t } = useTranslation();
  const userFriendlyAddress = useTonAddress();
  const initData = useInitData();

  const [referral, setReferral] = useState<IBankReferralOut>({
    bnkPerHour: 0,
    bankReward: 0,
    refBought: 0,
    refCount: 0,
  } as IBankReferralOut);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const tgid = initData.user.id;

  const { data, isLoading } = useSWR(
    `${BE_URL}/bank/${tadddress}/referral?tgid=${tgid}`,
    connected ? fetcher : null
  );

  useEffect(() => {
    if (userFriendlyAddress) {
      setRefUrl(
        Address.parse(userFriendlyAddress).toString({
          urlSafe: true,
          bounceable: true,
        })
      );
    }
  }, [userFriendlyAddress]);

  useEffect(() => {
    if (!isLoading && data) {
      setReferral(data as IBankReferralOut);
    }
  }, [isLoading, data]);

  return (
    <Layout2Row>
      <Container isLoading={isLoading} loadingTitle={t(`mint_title`)}>
        <div>
          <h2
            style={{
              textAlign: 'center',
              padding: '0.5rem 0',
            }}>
            {t(`referral_title`)}
          </h2>
        </div>
        <ReferralBonus link={`${APP_URL}?startapp=${refUrl}`} />

        <div className="two-column">
          <Workspace
            bank_count={referral.bankReward}
            bank_income={referral.bnkPerHour}
            title="rewards"
          />
          <ReferralBlock
            referralBought={referral.refBought}
            referralCount={referral.refCount}
          />
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
