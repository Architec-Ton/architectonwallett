import classNames from 'classnames';
import './Balance.styles.css';

import assets from '../../assets';
import { CHAIN } from '@tonconnect/ui-react';

type Props = {
  name: string;
  title: string;
  chain: CHAIN;
};

function BalanceHeader({ name, title, chain }: Props) {
  return (
    <div className={classNames('balance-header')}>
      <h2>
        <span>{name}</span> {title}
        {chain == CHAIN.TESTNET ? (
          <small style={{ color: 'red', fontSize: '8px' }}> TESTNET </small>
        ) : (
          ''
        )}
      </h2>
      <div></div>
    </div>
  );
  /* <img src={assets.svghdots} /> */
}

export default BalanceHeader;
