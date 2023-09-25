import PropTypes from 'prop-types';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const Alert = ({ open, message, handleClose, error }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: 'secondary.main',
        },
      }}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} severity={error ? 'error' : 'success'}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

Alert.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  handleClose: PropTypes.func,
  error: PropTypes.bool,
};

export default Alert;
