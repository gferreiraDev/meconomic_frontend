import { Navigate, useRoutes } from 'react-router-dom';
// import { GlobalLayout, PrivateLayout } from '../layout';
// import // Cards,
// Dashboard,
// ForgotPassword,
// Investments,
// Invoices,
// ResetPassword,
// Signup,
// Signin,
// Statements,
// Targets,
// Transactions,
// Profile,
// Wallet,
// NotFound,
// '../pages';

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
          element: () => import('../pages/ForgotPassword'),
        },
        {
          path: 'reset-password/:resetToken',
          element: () => import('../pages/ResetPassword'),
        },
      ],
    },
    {
      path: '/',
      element: () => import('../layout/Private'),
      children: [
        { path: 'dashboard', element: () => import('../pages/Dashboard') },
        { path: 'statements', element: () => import('../pages/Statements') },
        { path: 'cards', element: () => import('../pages/Cards') },
        { path: 'invoices/:id', element: () => import('../pages/Invoices') },
        { path: 'investments', element: () => import('../pages/Investments') },
        { path: 'wallet', element: () => import('../pages/Wallet') },
        {
          path: 'transactions',
          element: () => import('../pages/Transactions'),
        },
        { path: 'targets', element: () => import('../pages/Targets') },
        { path: 'profile', element: () => import('../pages/Profile') },
        { path: '404', element: () => import('../pages/NotFound') },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

  return routes;
};

export default Router;
