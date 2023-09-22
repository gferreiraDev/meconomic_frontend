import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeader } from '@mui/material';
import { useChart } from '../../hooks/useChart';

const LineChart = ({ title, subtitle, labels, data, ...props }) => {
  const options = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: data.map((i) => i.fill) },
    labels: labels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card sx={{ bgcolor: '#ffffff19' }} {...props}>
      <CardHeader
        sx={{
          color: '#4cceac',
          '& .MuiCardHeader-subheader': {
            color: '#fff',
            ml: 2,
          },
        }}
        title={title}
        subheader={subtitle}
      />

      <Box sx={{ p: 1 }}>
        <ReactApexChart type="line" series={data} options={options} height={320} />
      </Box>
    </Card>
  );
};

LineChart.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.array.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string),
};

export default LineChart;
