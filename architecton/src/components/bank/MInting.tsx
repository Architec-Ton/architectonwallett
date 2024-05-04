import classNames from 'classnames';
import './Workspace.styles.css';

import './Minting.styles.css';
import { useTranslation } from 'react-i18next';

type Props = {
  bankers_count: number;
  mintingPercent: number;
  maxBanks: number;
  freeBanks: number;
};

function Minting({
  bankers_count,
  mintingPercent,
  maxBanks,
  freeBanks,
}: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames({
        'selected-block': true,
        'square-block': true,
        workspace: true,
      })}>
      <h3>{t('Minting')}</h3>
      <div className="minting-banks">
        <div className="minting-progress-bar">
          <div
            className="minting-progress-bar-completed"
            style={{
              height: `${mintingPercent}%`,
            }}>
            {`${Math.round(mintingPercent)}%`}
          </div>
        </div>
        <div className="minting-banks-info">
          <div>
            <h4>{t('Bankers')}</h4>
            <div>{bankers_count} / ∞ </div>
          </div>
          <div>
            <h4>{t('Free banks')}</h4>
            <div>
              {freeBanks} / {maxBanks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Minting;
