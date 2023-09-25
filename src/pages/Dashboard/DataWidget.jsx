import { Box, Card, IconButton, Typography } from '@mui/material';
import { VisibilityOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useState } from 'react';

const DataWidget = ({ title, value }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible((prev) => !prev);

  return (
    <Card
      sx={{
        bgcolor: 'paper',
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1" color="accent.main">
          {title}
        </Typography>
        <IconButton onClick={toggleVisible} sx={{ p: 0 }}>
          <VisibilityOutlined />
        </IconButton>
      </Box>

      <Typography variant="h6" sx={{ textAlign: 'center', mt: 1 }}>
        {visible
          ? value.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })
          : '--'}
      </Typography>
    </Card>
  );
};

DataWidget.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};

export default DataWidget;
