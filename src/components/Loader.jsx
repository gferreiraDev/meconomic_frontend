import { Box, Typography } from '@mui/material';
import { themeMode } from '../redux/themeSlice';
import { Hypnosis } from 'react-cssfx-loading';
import { useSelector } from 'react-redux';

const Loader = () => {
  const mode = useSelector(themeMode);

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
        color={mode === 'light' ? '#535ac8' : '#4CCEAC'}
        sx={{ margin: 'auto' }}
      />
      <Typography
        variant="body2"
        sx={{ fontStyle: 'italic', color: 'accent.main', mt: 2 }}
      >
        Carregando...
      </Typography>
    </Box>
  );
};

export default Loader;
