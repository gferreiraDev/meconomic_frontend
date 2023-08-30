import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const Private = () => {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#001429',
        py: 6,
      }}
    >
      {/* <Navigate to='/signin' replace /> */}

      <Outlet />
    </Container>
  );
};

export default Private;
