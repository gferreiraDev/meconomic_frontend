import { Navigate, useRoutes } from 'react-router-dom';
import { GlobalLayout, PrivateLayout } from '../layout';
import { Profile, Signin, Signup, Statements } from '../pages';

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        { path: 'signin', element: <Signin /> },
        { path: 'signup', element: <Signup /> },
      ],
    },
    {
      path: '/',
      element: <PrivateLayout />,
      children: [
        { path: 'profile', element: <Profile /> },
        { path: 'statements', element: <Statements /> },
      ],
    },
    { path: '*', element: <Navigate to="/signin" replace /> },
  ]);

  return routes;
};

export default Router;
