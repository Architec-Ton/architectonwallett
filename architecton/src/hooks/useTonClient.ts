import { useEffect, useState } from 'react';
// import { TonClient } from 'ton';

export function useInit<T>(func: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<T | undefined>();
  useEffect(() => {
    (async () => {
      setState(await func());
    })();
  }, deps);

  return state;
}

export function useTonClient() {
  // return useInit(
  return null;
  //   async () =>
  //     new TonClient({
  //       endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       //apiKey:
  //       //  '88d5912ad2394e5cbae97a351bb6a3e1174e09f7956d096beaae3acab91324da',
  //     })
  // );
}
