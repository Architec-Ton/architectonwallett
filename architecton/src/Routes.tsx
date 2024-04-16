import { createBrowserRouter } from 'react-router-dom';
import Main from './views/pages/Main';
import Project from './views/pages/Project';
import Coin from './views/pages/Coin';
import Welcome from './views/pages/Welcome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
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
]);

export default router;
