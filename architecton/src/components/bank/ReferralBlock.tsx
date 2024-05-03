import classNames from 'classnames';
import './Workspace.styles.css';
import assets from '../../assets';
import { useTranslation } from 'react-i18next';

type Props = {
  referralCount: number;
  referralBought: number;
  title?: string;
};

function ReferralBlock({ title, referralCount, referralBought }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames({
        'selected-block': true,
        'square-block': true,
        workspace: true,
      })}>
      <h3>{t(title)}</h3>
      <div className="workspace-banks">
        <div className="workspace-banks-icon">
          <img src={assets.iconRef} />
        </div>
        <div>{referralCount}</div>
      </div>
      <div className="workspace-bank-income">
        <h4>Bought a Bank</h4>
        <div>
          {referralBought} <span>Referral</span>
        </div>
      </div>
    </div>
  );
}

ReferralBlock.defaultProps = {
  title: 'referral',
};

export default ReferralBlock;
