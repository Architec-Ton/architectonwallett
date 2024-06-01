/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import './Balance.styles.css';
import assets from '../../assets';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import BalanceHeader from './BalanceHeader';
import { Address, JettonWallet, WalletContractV4 } from '@ton/ton';
// import BalanceHeader from './BalanceHeader';
// import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

import { Buffer } from 'buffer/';
type Props = {
  title: string;
  amount: string;
};

// import { useTonClient } from '../../hooks/useTonClient';
// import { WalletContractV4 } from 'ton';
// import { useState } from 'react';

function Balance({ title, amount }: Props) {
  const wallet = useTonWallet();
  //const wallet = false;

  if (true) {
    return (
      <>
        <div
          className={classNames('balance')}
          style={{ backgroundImage: `url('/icons/balance-bg.svg'})` }}>
          <div className="balance-body">
            <BalanceHeader
              name="Wallet"
              title="Architec.TON" //{wallet?.device.appName}
              chain={wallet?.account.chain}
            />
            <div className="balance-body-container">
              {wallet && <div className="balance-amount">${amount}</div>}
              {!wallet && <TonConnectButton />}
            </div>
          </div>
          <div className="balance-footer">
            {wallet && (
              <>
                {Address.parse(wallet.account.address).toString()}{' '}
                <img src={assets.svgcopy} />
              </>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div
        className={classNames('balance')}
        style={{ backgroundImage: `url(${assets.svgbalance})` }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: '1rem',
          }}></div>
      </div>
    );
  }
}

export default Balance;
