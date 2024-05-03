import classNames from 'classnames';
import './ReferralBonus.styles.css';
import assets from '../../assets';
import { useTranslation } from 'react-i18next';

type Props = {
  link: string;
};

function ReferralBonus({ link }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames({
        'selected-block': true,
        'referral-bonus': true,
      })}>
      <h3>{t('referral_bonus_title')}</h3>
      <h4>
        Earn <span className="color-bg-primary">100%</span>
        <span> more from your friend </span>
        <span className="color-bg-primary">minted</span>
      </h4>
      <p
        className="text-small"
        style={{
          margin: 0,
        }}>
        The more people there are, the stronger your banks are. — Become a
        global banker!
      </p>
      <div className="referral-bonus-link">
        <input value={link} disabled={true} className="referral-bonus-input" />
        <button
          className="referral-bonus-copy"
          onClick={() => {
            navigator.clipboard.writeText(link);
          }}>
          <img src={assets.iconCopy} />
        </button>
      </div>
    </div>
  );
}

export default ReferralBonus;
