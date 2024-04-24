/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import './Balance.styles.css';
import assets from '../../assets';
// import BalanceHeader from './BalanceHeader';
// import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

// import { Buffer } from 'buffer/';
type Props = {
  title: string;
};

// import { useTonClient } from '../../hooks/useTonClient';
// import { WalletContractV4 } from 'ton';
// import { useState } from 'react';

function Balance({ title }: Props) {
  // const wallet = useTonWallet();
  // const client = useTonClient();
  //const wallet = false;

  // const initF = async () => {
  //   console.log(wallet?.account.publicKey);

  //   ArrayBuffer;

  //   const walletContract = WalletContractV4.create({
  //     workchain: 0,
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     publicKey: Buffer.from(
  //       `${wallet?.account?.publicKey}`,
  //       'base64'
  //     ) as ArrayBuffer,
  //   });

  // console.log(walletContract);

  // const contract = client?.open(walletContract);

  // console.log(contract);

  console.log(title);

  // const balance = await contract?.getBalance();

  // console.log(balance);

  // setAmount(`${balance?.toString()}`);
  // };

  // if (wallet) {
  //   initF();
  // }

  //console.log(walletInit);

  if (false) {
    return (
      <></>
      // wallet && (
      //   <div
      //     className={classNames('balance')}
      //     style={{ backgroundImage: `url(${assets.svgbalance})` }}>
      //     <div className="balance-body">
      //       <BalanceHeader
      //         title={wallet.device.appName}
      //         chain={wallet.account.chain}
      //       />
      //       <div className="balance-amount">{amount} TON</div>
      //     </div>
      //     <div className="balance-footer">
      //       Wallet {wallet.account.address} <img src={assets.svgcopy} />
      //     </div>
      //     <TonConnectButton />
      //   </div>
      // )
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
