import classNames from 'classnames';
import './Balance.styles.css';

import assets from '../../assets';

type Props = {
  title: string;
};

function BalanceHeader({ title }: Props) {
  return (
    <div className={classNames('balance-header')}>
      <h2>
        <span>Wallet</span> {title}
      </h2>
      <img src={assets.svghdots} />
    </div>
  );
}

export default BalanceHeader;
