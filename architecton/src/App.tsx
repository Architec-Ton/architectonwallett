import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes';
import { SDKProvider, type SDKInitOptions } from '@tma.js/sdk-react';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { AuthProvider } from './components/ui/AuthProvider';
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
  return (
    <SDKProvider options={options}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SDKProvider>
  );
  // const options: SDKInitOptions = {
  //   acceptCustomStyles: true,
  //   cssVars: true,
  //   //async: true,
  // };
  // if (false) {
  //   return (
  //     <TonConnectUIProvider
  //       manifestUrl="https://architecton.site/tonconnect-manifest.json"
  //       uiPreferences={{ theme: THEME.LIGHT }}
  //       actionsConfiguration={{
  //         twaReturnUrl: import.meta.env.VITE_BE_TWA_RETURN,
  //       }}>
  //       <SDKProvider options={options}>
  //         <AuthProvider>
  //           <RouterProvider router={router} />
  //         </AuthProvider>
  //       </SDKProvider>
  //     </TonConnectUIProvider>
  //   );
  // } else {
  //   <RouterProvider router={router} />;
  // }
}

export default App;
