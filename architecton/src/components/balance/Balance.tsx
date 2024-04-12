import classNames from 'classnames';
import './Balance.styles.css';

import assets from '../../assets';
import BalanceHeader from './BalanceHeader';
import { useTonAddress } from '@tonconnect/ui-react';

type Props = {
  title: string;
};

function Balance({ title }: Props) {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  return (
    <div
      className={classNames('balance')}
      style={{ backgroundImage: `url(${assets.svgbalance})` }}>
      <div className="balance-body">
        <BalanceHeader title="Architec.TON" />
        <div className="balance-amount">{title}</div>
      </div>
      <div className="balance-footer">
        Wallet {userFriendlyAddress} <img src={assets.svgcopy} />
        <span>Raw address: {rawAddress}</span>
      </div>
    </div>
  );
}

export default Balance;
