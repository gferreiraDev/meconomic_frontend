import { VisibilityOutlined } from '@mui/icons-material';
import { Box, Card, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

const DataWidget = ({ title, value }) => {
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => setVisible((prev) => !prev);

  return (
    <Card
      sx={{
        bgcolor: '#ffffff19',
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="#4cceac">
          {title}
        </Typography>
        <IconButton onClick={toggleVisible} sx={{ p: 0 }}>
          <VisibilityOutlined sx={{ color: '#ffffff33' }} />
        </IconButton>
      </Box>

      <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center', mt: 1 }}>
        {visible ? value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '--'}
      </Typography>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      </Box> */}
    </Card>
  );
};

DataWidget.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};

export default DataWidget;
