import { useGetDataQuery } from '../../services/dashboardService';
import { useEffect, useState } from 'react';
import { Loader } from '../../components';
import { Grid } from '@mui/material';

import DataWidget from './DataWidget';
import LineChart from './LineChart';
import PieChart from './PieChart';

/* ======= | Page | ============================================================================== */
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    incomes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    expenses: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    result: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalDF: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalDV: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalDA: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalRF: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalRV: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalRA: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalIncomes: 0,
    totalExpenses: 0,
    // labels: [
    //   '01/01/2023',
    //   '02/01/2023',
    //   '03/01/2023',
    //   '04/01/2023',
    //   '05/01/2023',
    //   '06/01/2023',
    //   '07/01/2023',
    //   '08/01/2023',
    //   '09/01/2023',
    //   '10/01/2023',
    //   '11/01/2023',
    //   '12/01/2023',
    // ],
  });

  const { data, isSuccess, isError, isLoading, refetch } = useGetDataQuery();

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
    // console.log(data.data);

    setDashboardData((prev) => ({
      ...prev,
      ...data?.data,
    }));
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !isLoading && isSuccess ? (
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
            <DataWidget title="Outros Valores" value={0} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LineChart
              title="Desempenho por mês"
              subtitle="(+25%) de variação"
              labels={labels}
              data={[
                {
                  name: 'Despesa Total',
                  type: 'line',
                  fill: 'solid',
                  data: dashboardData.expenses,
                },
                {
                  name: 'Receita Total',
                  type: 'line',
                  fill: 'solid',
                  data: dashboardData.incomes,
                },
                {
                  name: 'Saldo',
                  type: 'column',
                  fill: 'solid',
                  data: dashboardData.result,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChart
              title="Desempenho do Ano Atual"
              subtitle="% em valores totais"
              data={[
                {
                  label: 'Despesa Fixa',
                  value: dashboardData.totalDF.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Receita Fixa',
                  value: dashboardData.totalRF.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Despesa Variável',
                  value: dashboardData.totalDV.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Receita Variável',
                  value: dashboardData.totalRV.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Despesa Adicional',
                  value: dashboardData.totalDA.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Receita Adicional',
                  value: dashboardData.totalRA.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
              ]}
            />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default Dashboard;
