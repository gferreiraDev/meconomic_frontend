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
    labels: [
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
    ],
    walletSum: 0,
    investmentsSum: 0,
    targetSum: 0,
    currentPendingSum: 0,
  });

  const { data, isSuccess, isError, isLoading, refetch } = useGetDataQuery();

  useEffect(() => {
    if (data?.data)
      setDashboardData((prev) => ({
        ...prev,
        ...data.data,
        labels: data.data?.labels.length < 12 ? prev.labels : data.data.labels,
      }));
  }, [data]);

  return (
    <>
      {isLoading || !data ? (
        <Loader />
      ) : !isLoading && isSuccess && data ? (
        <Grid
          container
          columnSpacing={{ xs: 1, md: 2 }}
          rowSpacing={{ xs: 1 }}
          sx={{ overflow: 'auto', height: '97vh' }}
        >
          <Grid item xs={6} md={3}>
            <DataWidget
              title="Saldo do Mês"
              value={dashboardData.currentPendingSum}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <DataWidget title="Carteira" value={dashboardData.walletSum} />
          </Grid>

          <Grid item xs={6} md={3}>
            <DataWidget
              title="Investimentos"
              value={dashboardData.investmentsSum}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <DataWidget title="Metas" value={dashboardData.targetSum} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LineChart
              title="Desempenho por mês"
              subtitle="Receita x Despesa & saldo"
              labels={dashboardData.labels}
              data={[
                {
                  name: 'Despesa Total',
                  type: 'line',
                  fill: 'solid',
                  data: data?.data?.expenses,
                },
                {
                  name: 'Receita Total',
                  type: 'line',
                  fill: 'solid',
                  data: data?.data?.incomes,
                },
                {
                  name: 'Saldo',
                  type: 'column',
                  fill: 'solid',
                  data: data?.data?.result,
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
                  value: data?.data?.totalDF.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Receita Fixa',
                  value: data?.data?.totalRF.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Despesa Variável',
                  value: data?.data?.totalDV.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Receita Variável',
                  value: data?.data?.totalRV.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Despesa Adicional',
                  value: data?.data?.totalDA.reduce(
                    (sum, value) => (sum = sum += value),
                    0
                  ),
                },
                {
                  label: 'Receita Adicional',
                  value: data?.data?.totalRA.reduce(
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
