import { Navigate, Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { getUser } from '../redux/authSlice';
import SideNav from '../components/SideNav';
import { useSelector } from 'react-redux';

const Private = () => {
  const user = useSelector(getUser);

  return user ? (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'primary.main',
        display: 'flex',
      }}
    >
      <Box sx={{ height: '100vh', display: { xs: 'none', sm: 'flex' } }}>
        <SideNav />
      </Box>

      <Box sx={{ flex: 1, p: 2, overflow: 'hidden' }}>
        <Outlet />
      </Box>
    </Container>
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default Private;
