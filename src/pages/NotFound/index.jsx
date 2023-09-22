import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        maxWidth: 480,
        margin: 'auto',
        maxHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2" align="center">
        Oops!
      </Typography>

      <Typography sx={{ mt: 5, textAlign: 'justify' }}>
        Parece que a página que você está buscando não existe. Verifique se a página existe e se a url está correta.
      </Typography>

      <Box component="img" src="/images/404_not_found.svg" sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }} />

      <Button to="/" size="large" variant="contained" component={Link}>
        Voltar
      </Button>
    </Box>
  );
};

export default NotFound;
