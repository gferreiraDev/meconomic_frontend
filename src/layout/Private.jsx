import { Navigate, Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/authSlice';
import { Navbar } from '../components';
import SideNav from '../components/SideNav';

const Private = () => {
  const user = useSelector(getUser);

  return user ? (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#001429',
        display: 'flex',
      }}
    >
      {/* <Navbar /> */}
      <SideNav />

      <Outlet />
    </Container>
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default Private;
