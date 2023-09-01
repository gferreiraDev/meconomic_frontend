import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

const PageHeader = ({ title, subtitle, label, action }) => {
  return (
    <Box
      sx={{
        bgcolor: '#ffffff19',
        p: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography
          variant="body1"
          sx={{
            ml: 2,
            color: '#4cceac',
            fontStyle: 'italic',
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {action && (
        <Button variant="outlined" color="secondary" onClick={action}>
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
};

export default PageHeader;
