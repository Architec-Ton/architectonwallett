import classNames from 'classnames';
import './Balance.styles.css';
import assets from '../../assets';
import BalanceHeader from './BalanceHeader';
import { CHAIN } from '@tonconnect/ui-react';

//import { Buffer } from 'buffer/';
import { ReactNode } from 'react';
type Props = {
  title: string;
  amount: string;
  bankCount: number;
  symbol: string;
  children: ReactNode;
};

function BalanceBase({ title, amount, symbol, children, bankCount }: Props) {
  return (
    <div
      className={classNames('balance', 'selected-block')}
      style={{ backgroundImage: `url(${assets.svgbalance})` }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0rem',
        }}>
        <BalanceHeader name="Bank" title={title} chain={CHAIN.TESTNET} />
        <h3
          style={{
            margin: '0.5rem 0',
          }}>
          {amount} {symbol}
          <span
            style={{
              paddingLeft: '0.3rem',
              color: 'var(--color-bg-primary)',
              fontSize: '0.875rem',
            }}>
            ({bankCount} banks)
          </span>
        </h3>
      </div>
      {children}
    </div>
  );
}

export default BalanceBase;
