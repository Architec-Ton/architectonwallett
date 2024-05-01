import { createBrowserRouter } from 'react-router-dom';
//import Main from './views/pages/Main';
import Project from './views/pages/Project';
import Coin from './views/pages/Coin';
import Welcome from './views/pages/Welcome';
import AddWallet from './views/pages/AddWallet';
import NewWallet from './views/pages/NewWallet';
import Bank from './views/pages/Bank';
import Main from './views/pages/Main';
import Mint from './views/pages/Mint';
import BankHistory from './views/pages/BankHistory';
import Wallet from './views/pages/Wallet';

const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <Main />,
  },
  {
    path: '/',
    element: <Bank />,
  },
  {
    path: '/project/:projectId',
    element: <Project />,
  },
  {
    path: '/coin/:coinId',
    element: <Coin />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/wallet/add',
    element: <AddWallet />,
  },
  {
    path: '/wallet/new',
    element: <NewWallet />,
  },
  {
    path: '/bank',
    element: <Bank />,
  },
  {
    path: '/bank/mint',
    element: <Mint />,
  },
  {
    path: '/bank/history',
    element: <BankHistory />,
  },
  {
    path: '/wallet',
    element: <Wallet />,
  },
]);

export default router;
