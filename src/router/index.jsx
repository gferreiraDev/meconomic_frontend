import { Navigate, useRoutes } from 'react-router-dom';
import { GlobalLayout, PrivateLayout } from '../layout';
import {
  Cards,
  Dashboard,
  ForgotPassword,
  Investments,
  Invoices,
  ResetPassword,
  Signup,
  Signin,
  Statements,
  Targets,
  Transactions,
  Profile,
  Wallet,
  NotFound,
} from '../pages';

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        { index: true, element: <Signin /> },
        { path: 'signup', element: <Signup /> },
        { path: 'signin', element: <Navigate to="/" replace /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'reset-password/:resetToken', element: <ResetPassword /> },
      ],
    },
    {
      path: '/',
      element: <PrivateLayout />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'statements', element: <Statements /> },
        { path: 'cards', element: <Cards /> },
        { path: 'invoices/:id', element: <Invoices /> },
        { path: 'investments', element: <Investments /> },
        { path: 'wallet', element: <Wallet /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'targets', element: <Targets /> },
        { path: 'profile', element: <Profile /> },
        { path: '404', element: <NotFound /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

  return routes;
};

export default Router;
