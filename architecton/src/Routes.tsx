import { createBrowserRouter } from 'react-router-dom';
import Main from './views/pages/Main';
import Project from './views/pages/Project';
import Coin from './views/pages/Coin';

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
]);

export default router;
