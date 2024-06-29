import { createBrowserRouter } from 'react-router-dom';

import Home from '@/routes/home';
import ErrorPage from '@/routes/error';
const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:city',
    element: <Home />,
  },
];

const routesWithError = routes.map(r => {
  r.errorElement = <ErrorPage />;
  return r;
});

export default function Router() {
  return createBrowserRouter(routesWithError);
}
