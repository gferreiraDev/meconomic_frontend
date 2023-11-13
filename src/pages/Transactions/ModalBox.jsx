import { Box, Grid, Modal, Typography } from '@mui/material';
import { useChart } from '../../hooks/useChart';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import InfoTable from './InfoTable';
import PropTypes from 'prop-types';

const ModalBox = ({ open, handleClose, report }) => {
  const [data, setData] = useState({
    expenses: {
      fixed: 0,
      variable: 0,
      discretionary: 0,
      pending: 0,
      paid: 0,
      total: 0,
    },
    incomes: {
      fixed: 0,
      variable: 0,
      discretionary: 0,
      pending: 0,
      paid: 0,
      total: 0,
    },
    balance: 0,
  });
  const [refData, setRefData] = useState({
    expenses: {
      fixed: 0,
      variable: 0,
      discretionary: 0,
      total: 0,
    },
    incomes: {
      fixed: 0,
      variable: 0,
      discretionary: 0,
      total: 0,
    },
  });

  useEffect(() => {
    if (report?.indexes) {
      setData(report.indexes);
    }

    if (report?.expectedIndexes) setRefData(report.expectedIndexes);
  }, [report]);

  const options = useChart({
    plotOptions: { bar: { columnWidth: '45%' } },
    fill: {
      type: 'solid',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          return typeof y === 'number'
            ? y.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })
            : y;
        },
      },
      theme: false,
      style: {
        foreColor: 'theme.paper',
        color: '#f00',
      },
    },
    xaxis: {
      categories: [
        'RF',
        'RV',
        'RA',
        'RP',
        'RQ',
        'RT',
        'DF',
        'DV',
        'DA',
        'DP',
        'DQ',
        'DT',
      ],
    },
    series: [
      {
        name: 'previsto',
        data: Object.keys(refData.incomes)
          .map((key) => refData.incomes[key])
          .concat(
            Object.keys(refData.expenses).map((key) => refData.expenses[key])
          ),
      },
      {
        name: 'realizado',
        data: Object.keys(data.incomes)
          .map((key) => data.incomes[key])
          .concat(Object.keys(data.expenses).map((key) => data.expenses[key])),
      },
    ],
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid
        container
        sx={{
          bgcolor: 'primary.main',
          width: '65%',
          minWidth: 700,
          margin: '5% auto',
          borderRadius: 2,
          p: 1,
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              borderBottomWidth: 1,
              borderBottomStyle: 'solid',
              borderBottomColor: 'paper',
            }}
          >
            Resumo do mês
          </Typography>
        </Grid>

        <InfoTable data={report} />

        <Box sx={{ width: '100%' }}>
          <ReactApexChart
            type="bar"
            series={options.series}
            options={options}
            height={250}
          />
        </Box>
      </Grid>
    </Modal>
  );
};

ModalBox.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  report: PropTypes.object,
};

export default ModalBox;
