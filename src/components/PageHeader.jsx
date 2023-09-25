import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

const PageHeader = ({ title, subtitle, label, action, children }) => {
  return (
    <Box
      sx={{
        bgcolor: 'paper',
        p: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h6" color="accent.main">
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ml: 2,
            fontStyle: 'italic',
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {children}

      {action && (
        <Button variant="outlined" color="accent" onClick={action}>
          {label}
        </Button>
      )}
    </Box>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  label: PropTypes.string,
  action: PropTypes.func,
  children: PropTypes.node,
};

export default PageHeader;
