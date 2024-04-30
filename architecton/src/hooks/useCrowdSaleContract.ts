// import { useState } from 'react';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract, toNano } from '@ton/core';
//import { useQuery } from '@tanstack/react-query';
import { CHAIN } from '@tonconnect/protocol';
import { CrowdSalev2 as CrowdSale } from '../contracts/tact_CrowdSalev2';
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
          : 'EQC64tH5_uPMRcfy2KOXm0h-udsL6FA5U3cfm60tCK4shNux' //'EQD_E6xHRe9_FnF0IJYpQKJK62yANQsgOTA80_pyUhLWe6F6'
      ) // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<CrowdSale>;
  }, [client]);

  return {
    crowdSale: crowdSale,
    address: crowdSale?.address.toString(),
    getAccounts: () => {
      return crowdSale?.getAccounts();
    },
    getBanker: (address: Address) => {
      return crowdSale?.getBanker(address);
    },
    getCoins: (address: Address) => {
      return crowdSale?.getCoins(address);
    },
    getBanks: (address: Address) => {
      return crowdSale?.getBanks(address);
    },
    buyBank: (value: number) => {
      return crowdSale?.send(sender, { value: toNano(value) }, 'buyBank');
    },
  };
}

export default useCrowdSaleContract;
