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
import Referral from './views/pages/Referral';
import Tasks from './views/pages/Tasks';
import TasksFirst from './views/pages/TaskFirst';
import React from 'react';
import Apps from './components/project/Apps.tsx';
import Swap from './components/swap/Swap.tsx';
import Stocks from './components/Stocks/Stocks.tsx';
import ApplicationSubmit from './views/pages/ApplicationSubmit';
import { BASE_URL } from './constants.ts';
import Terms from './views/pages/Terms';

const router = createBrowserRouter([
  {
    path: `${BASE_URL}/`,
    element: <Main />,
  },
  { path: `${BASE_URL}/apps`, element: <Apps /> },
  { path: `${BASE_URL}/swap`, element: <Swap /> },
  { path: `${BASE_URL}/stocks`, element: <Stocks /> },
  {
    path: '/bank',
    element: <Bank />,
  },
  {
    path: `${BASE_URL}/project/:projectId`,
    element: <Project />,
  },
  {
    path: `${BASE_URL}/coin/:coinId`,
    element: <Coin />,
  },
  {
    path: `${BASE_URL}/welcome`,
    element: <Welcome />,
  },
  {
    path: `${BASE_URL}/wallet/add`,
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
    path: '/bank/referral',
    element: <Referral />,
  },
  {
    path: `${BASE_URL}/wallet`,
    element: <Wallet />,
  },
  {
    path: '/tasks',
    element: <Tasks />,
  },
  {
    path: '/tasks/first',
    element: <TasksFirst />,
  },
  {
    path: `${BASE_URL}/settings/application-submit`,
    element: <ApplicationSubmit />,
  },
  {
    path: '/settings/application-submit/terms',
    element: <Terms />,
  }
]);

export default router;
