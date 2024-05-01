// import { useState } from 'react';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract, toNano } from '@ton/core';
//import { useQuery } from '@tanstack/react-query';
import { CHAIN } from '@tonconnect/protocol';
import {
  BanksCrowdSale as CrowdSale,
  ReferralAddress,
} from '../contracts/tact_BanksCrowdSale';
//import { useQuery } from '@tanstack/react-query';

function useCrowdSaleContract() {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();

  // if (network === CHAIN.MAINNET) {
  //   return null;
  // }

  const crowdSale = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = CrowdSale.fromAddress(
      Address.parse(
        network === CHAIN.MAINNET
          ? ''
          : 'EQAX7oplsImoCvaQRppCEO_NT4qlmhHE4z9UkzSrEvDNvpqV' //'EQD_E6xHRe9_FnF0IJYpQKJK62yANQsgOTA80_pyUhLWe6F6'
      ) // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<CrowdSale>;
  }, [client]);

  return {
    crowdSale: crowdSale,
    address: crowdSale?.address.toString(),
    getBankers: () => {
      return crowdSale?.getBankers();
    },
    getBanks: (address: Address) => {
      return crowdSale?.getBanks(address);
    },
    buyBank: (value: number) => {
      return crowdSale?.send(sender, { value: toNano(value) }, 'buyBank');
    },
    buyRefferalBank: (value: number, refAddress: Address) => {
      return crowdSale?.send(sender, { value: toNano(value) }, {
        $$type: 'ReferralAddress',
        referral: refAddress,
      } as ReferralAddress);
    },
    stopSale: () => {
      return crowdSale?.send(sender, { value: BigInt(0) }, 'stopSale');
    },
    resumeSale: () => {
      return crowdSale?.send(sender, { value: BigInt(0) }, 'resumeSale');
    },
  };
}

export default useCrowdSaleContract;
