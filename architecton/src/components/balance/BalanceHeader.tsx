import classNames from 'classnames';
import './Balance.styles.css';

import assets from '../../assets';
import { CHAIN } from '@tonconnect/ui-react';

type Props = {
  title: string;
  chain: CHAIN;
};

function BalanceHeader({ title, chain }: Props) {
  return (
    <div className={classNames('balance-header')}>
      <h2>
        <span>Wallet</span> {title}
        {chain == CHAIN.TESTNET ? (
          <small style={{ color: 'red' }}> TESTNET </small>
        ) : (
          ''
        )}
      </h2>
      <img src={assets.svghdots} />
    </div>
  );
}

export default BalanceHeader;
