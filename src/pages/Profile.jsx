import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/signin', { replace: true });
  };

  return (
    <Box>
      <Typography variant="h5">Perfil</Typography>

      <Button variant="contained" color="primary" onClick={handleLogout}>
        Sair
      </Button>
    </Box>
  );
};

export default Profile;
