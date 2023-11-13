import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const Logo = ({ short }) => {
  return (
    <Box
      component="img"
      src={short ? '/images/logo_short.png' : '/images/logo_full.png'}
      alt="logotipo"
      sx={{
        height: 16,
      }}
    />
  );
};

Logo.propTypes = {
  short: PropTypes.bool,
};

export default Logo;
