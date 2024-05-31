import { createBrowserRouter } from 'react-router-dom';
//import Main from './views/pages/Main';
import Project from './views/pages/Project';
import Projects from './components/project/Projects';
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
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/v1/info/test`,
    fetcher
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  { path: '/projects',
    element: <Projects tokens={data ? data.games : []}/>,
  },
  {
    path: '/bank',
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
    path: '/bank/referral',
    element: <Referral />,
  },
  {
    path: '/wallet',
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

]);

export default router;
