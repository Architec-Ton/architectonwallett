import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes';
import { SDKProvider, type SDKInitOptions } from '@tma.js/sdk-react';
//import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
//import assets from './assets';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//import { Buffer } from 'buffer/';

function App() {
  const options: SDKInitOptions = {
    acceptCustomStyles: true,
    cssVars: true,
    //async: true,
  };
  if (import.meta.env.VITE_ENABLE_MINIAPP) {
    return (
      // <TonConnectUIProvider
      //   manifestUrl="https://architecton.site/tonconnect-manifest.json"
      //   uiPreferences={{ theme: THEME.LIGHT }}
      //   walletsListConfiguration={{
      //     includeWallets: [
      //       {
      //         appName: 'tonwallet',
      //         name: 'TON Wallet',
      //         imageUrl: 'https://wallet.ton.org/assets/ui/qr-logo.png',
      //         aboutUrl:
      //           'https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd',
      //         universalLink: 'https://wallet.ton.org/ton-connect',
      //         jsBridgeKey: 'tonwallet',
      //         bridgeUrl: 'https://bridge.tonapi.io/bridge',
      //         platforms: ['chrome', 'android'],
      //       },
      //     ],
      //   }}
      //   actionsConfiguration={{
      //     twaReturnUrl: 'https://t.me/SmartHomeBell15354_bot/app',
      //   }}>
      <SDKProvider options={options}>
        <RouterProvider router={router} />
      </SDKProvider>
      // </TonConnectUIProvider>
    );
  } else {
    <RouterProvider router={router} />;
  }
}

export default App;
