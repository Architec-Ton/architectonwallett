import { createBrowserRouter } from 'react-router-dom';
import Main from './views/pages/Main';
import Project from './views/pages/Project';
import Coin from './views/pages/Coin';
import Welcome from './views/pages/Welcome';
import AddWallet from './views/pages/AddWallet';
import NewWallet from './views/pages/NewWallet';
import Bank from './views/pages/Bank';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
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
]);

export default router;
