import classNames from 'classnames';
import './Balance.styles.css';

import assets from '../../assets';
import BalanceHeader from './BalanceHeader';

type Props = {
  title: string;
};

function Balance({ title }: Props) {
  return (
    <div
      className={classNames('balance')}
      style={{ backgroundImage: `url(${assets.svgbalance})` }}>
      <div className="balance-body">
        <BalanceHeader title="Architec.TON" />
        <div className="balance-amount">{title}</div>
      </div>
      <div className="balance-footer">
        Wallet address: UAAN.....H7676 <img src={assets.svgcopy} />
      </div>
    </div>
  );
}

export default Balance;
