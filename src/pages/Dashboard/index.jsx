import { useEffect, useState } from 'react';
import { Loader } from '../../components';
import { Box, Grid } from '@mui/material';

import LineChart from './LineChart';
import PieChart from './PieChart';
import DataWidget from './DataWidget';

/* ======= | Page | ============================================================================== */
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const chartData = [
    {
      name: 'Despesa Total',
      type: 'line',
      fill: 'solid',
      data: [
        945.69, 606.05, 2623.33, 1032.33, 1224.13, 1978.18, 1277.89, 2731.49,
        1661.55, 1639.29, 742.91, 898.95,
      ],
    },
    {
      name: 'Receita Total',
      type: 'line',
      fill: 'solid',
      data: [
        2899.2, 2293.12, 2488.31, 2306.93, 2460.98, 2650.53, 2154.81, 3111.38,
        2851.56, 2168.59, 3278.24, 2419.66,
      ],
    },
    {
      name: 'Saldo',
      type: 'column',
      fill: 'solid',
      data: [
        1953.51, 1686.07, 135.02, 1247.6, 1236.85, 672.35, 876.92, 386.89,
        1190.01, 529.3, 2535.33, 1520.71,
      ],
    },
  ];

  const labels = [
    '01/01/2023',
    '02/01/2023',
    '03/01/2023',
    '04/01/2023',
    '05/01/2023',
    '06/01/2023',
    '07/01/2023',
    '08/01/2023',
    '09/01/2023',
    '10/01/2023',
    '11/01/2023',
    '12/01/2023',
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }, [loading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          sx={{ overflow: 'auto', height: '97vh' }}
        >
          <Grid item xs={6} sm={6} md={3}>
            <DataWidget title="Carteira" value={648.89} />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <DataWidget title="Investimentos" value={13800.33} />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <DataWidget title="Metas" value={25000.0} />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <DataWidget title="Outras Coisas" value={0} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LineChart
              title="Desempenho por mês"
              subtitle="(+25%) de variação"
              labels={labels}
              data={[...chartData]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChart
              title="Desempenho do Ano Atual"
              subtitle="% em valores totais"
              data={[
                { label: 'Despesa Fixa', value: 7133.13 },
                { label: 'Receita Fixa', value: 61269.2 },
                { label: 'Despesa Variável', value: 3443.34 },
                { label: 'Receita Variável', value: 1113.29 },
                { label: 'Despesa Adicional', value: 56819.21 },
                { label: 'Receita Adicional', value: 7001.08 },
              ]}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
