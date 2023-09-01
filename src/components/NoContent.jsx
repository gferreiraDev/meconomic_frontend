import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

const NoContent = ({ text, action, actionLabel }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 450,
        height: 150,
        margin: '25vh auto',
        bgcolor: '#ffffff08',
        borderRadius: 5,
      }}
    >
      <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
        {text}
      </Typography>
      {action && actionLabel && (
        <Button variant="text" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

NoContent.propTypes = {
  text: PropTypes.string,
  actionLabel: PropTypes.string,
  action: PropTypes.func,
};

export default NoContent;
