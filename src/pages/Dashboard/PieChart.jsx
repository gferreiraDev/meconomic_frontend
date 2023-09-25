import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeader } from '@mui/material';
import { useChart } from '../../hooks/useChart';

const PieChart = ({ title, subtitle, data, ...props }) => {
  const chartLabels = data.map((i) => i.label);

  const chartSeries = data.map((i) => i.value);

  const options = useChart({
    labels: chartLabels,
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) =>
          seriesName.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } }, customScale: 0.8 },
    },
  });

  return (
    <Card sx={{ bgcolor: 'paper' }} {...props}>
      <CardHeader
        title={title}
        subheader={subtitle}
        sx={{
          color: 'accent',
          '& .MuiCardHeader-subheader': {
            ml: 2,
          },
        }}
      />

      <Box
        sx={{
          mt: -5,
          height: 390,
          '& .apexcharts-canvas svg': { height: 270 },
          '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
            overflow: 'visible',
          },
          '& .apexcharts-legend': {
            height: 80,
            alignContent: 'center',
            position: 'relative !important',
            borderTop: `solid 1px #ccc`,
            top: '300px !important',
          },
        }}
      >
        <ReactApexChart type="pie" series={chartSeries} options={options} />
      </Box>
    </Card>
  );
};

PieChart.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.array,
};

export default PieChart;
