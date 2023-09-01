import { Box, Typography } from '@mui/material';
import { Hypnosis } from 'react-cssfx-loading';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 450,
        p: 5,
        margin: '25vh auto',
      }}
    >
      <Hypnosis
        width="80px"
        height="80px"
        style={{
          margin: 'auto',
        }}
        color="#4cceac"
      />
      <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#4cceac', mt: 2 }}>
        Carregando...
      </Typography>
    </Box>
  );
};

export default Loader;
