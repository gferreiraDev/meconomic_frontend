import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { GlobalLayout, PrivateLayout } from '../layout';

const Cards = lazy(() => import('../pages/Cards'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Investments = lazy(() => import('../pages/Investments'));
const Invoices = lazy(() => import('../pages/Invoices'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const Signup = lazy(() => import('../pages/Signup'));
const Signin = lazy(() => import('../pages/Signin'));
const Statements = lazy(() => import('../pages/Statements'));
const Targets = lazy(() => import('../pages/Targets'));
const Transactions = lazy(() => import('../pages/Transactions'));
const Profile = lazy(() => import('../pages/Profile'));
const Wallet = lazy(() => import('../pages/Wallet'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: () => import('../layout/Global'),
      children: [
        { index: true, element: () => import('../pages/Signin') },
        { path: 'signup', element: () => import('../pages/Signup') },
        { path: 'signin', element: <Navigate to="/" replace /> },
        {
          path: 'forgot-password',
          element: <ForgotPassword />,
        },
        {
          path: 'reset-password/:resetToken',
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: '/',
      element: () => import('../layout/Private'),
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'statements', element: <Statements /> },
        { path: 'cards', element: <Cards /> },
        { path: 'invoices/:id', element: <Invoices /> },
        { path: 'investments', element: <Investments /> },
        { path: 'wallet', element: <Wallet /> },
        {
          path: 'transactions',
          element: <Transactions />,
        },
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
