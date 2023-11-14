import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const Global = () => {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'primary.main',
        py: 6,
      }}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default Global;
