import { Navigate, useRoutes } from 'react-router-dom';
import { GlobalLayout, PrivateLayout } from '../layout';
import {
  Cards,
  Dashboard,
  Investments,
  Invoices,
  Signup,
  Signin,
  Statements,
  Targets,
  Transactions,
  Profile,
  Wallet,
} from '../pages';

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        { path: '/', element: <Signin /> },
        { path: 'signup', element: <Signup /> },
        { path: 'signin', element: <Navigate to="/" replace /> },
      ],
    },
    {
      path: '/',
      element: <PrivateLayout />,
      children: [
        { path: 'profile', element: <Profile /> },
        { path: 'statements', element: <Statements /> },
        { path: 'cards', element: <Cards /> },
        { path: 'invoices', element: <Invoices /> },
        { path: 'investments', element: <Investments /> },
        { path: 'wallet', element: <Wallet /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'targets', element: <Targets /> },
        { path: 'dashboard', element: <Dashboard /> },
      ],
    },
    { path: '*', element: <Navigate to="/signin" replace /> },
  ]);

  return routes;
};

export default Router;
