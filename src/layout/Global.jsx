import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Global = () => {
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
      <Outlet />
    </Container>
  );
};

export default Global;
