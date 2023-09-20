import { useState, useEffect, useMemo } from 'react';
import { Modal, Box, Typography, Grid, Paper, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import { Hypnosis } from 'react-cssfx-loading';

const ModalGraph = ({ title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 120,
        bgcolor: '#dadada',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        mb: 2,
      }}
    >
      <Hypnosis
        width="65px"
        height="65px"
        style={{
          margin: 'auto',
        }}
        color="#4cceac"
      />
      <Typography variant="h6" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
};

ModalGraph.propTypes = {
  title: PropTypes.string,
};

const ModalBox = ({ open, handleClose, list }) => {
  const [data, setData] = useState({
    rf: 0,
    rv: 0,
    ra: 0,
    rq: 0,
    rp: 0,
    df: 0,
    dv: 0,
    da: 0,
    dq: 0,
    dp: 0,
    saldo: 0,
  });

  const calculate = (list) => {
    const aux = { ...data };
    // const aux = {
    //   rf: 0,
    //   rv: 0,
    //   ra: 0,
    //   rp: 0,
    //   rq: 0,
    //   df: 0,
    //   dv: 0,
    //   da: 0,
    //   dq: 0,
    //   dp: 0,
    // };

    list?.forEach(({ type, status, value }) => {
      let index = type.toLowerCase();
      aux[index] += value;

      if (type.startsWith('R')) {
        status === 'Quitado' ? (aux.rq += value) : (aux.rp += value);
      } else if (type.startsWith('D')) {
        status === 'Quitado' ? (aux.dq += value) : (aux.dp += value);
      }
    });

    setData((prev) => Object.assign(prev, aux));
  };

  useMemo(() => calculate(list), [list]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box component={Paper} sx={{ width: '65%', margin: '10% auto', p: 2 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', borderBottom: 'solid 1px #ccc', mb: 1 }}>
          Resumo do mês
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* DESCRITIVO DE RECEITAS */}
          <Box
            sx={{
              width: '25%',
              justifyContent: 'center',
              border: 'solid 1px #ccc',
              borderRadius: 2,
              p: 1,
            }}
          >
            <ModalGraph title="Receitas" />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body1">Fixas</Typography>
              <Typography variant="caption">
                {data?.rf?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Variáveis</Typography>
              <Typography variant="caption">
                {data?.rv?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Adicionais</Typography>
              <Typography variant="caption">
                {data?.ra?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Quitadas</Typography>
              <Typography variant="caption">
                {data?.rq?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Pendente</Typography>
              <Typography variant="caption">
                {data?.rp?.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Totais</Typography>
              <Typography variant="caption">
                {(data?.rp + data?.rq).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>
          </Box>

          {/* DESCRITIVO DE DESPESAS */}
          <Box
            sx={{
              width: '25%',
              justifyContent: 'center',
              border: 'solid 1px #999',
              borderRadius: 2,
              p: 1,
            }}
          >
            <ModalGraph title="Despesas" />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body1">Fixas</Typography>
              <Typography variant="caption">
                {data?.df?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Variáveis</Typography>
              <Typography variant="caption">
                {data?.dv?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Adicionais</Typography>
              <Typography variant="caption">
                {data?.da?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Quitadas</Typography>
              <Typography variant="caption">
                {data?.dq?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Pendente</Typography>
              <Typography variant="caption">
                {data?.dp?.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Totais</Typography>
              <Typography variant="caption">
                {(data?.dp + data?.dq).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>
          </Box>

          {/* DESCRITIVO SOMATORIO */}
          <Box
            sx={{
              width: '25%',
              justifyContent: 'center',
              border: 'solid 1px #999',
              borderRadius: 2,
              p: 1,
            }}
          >
            <ModalGraph title="Resultado" />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body1">Saldo Atual</Typography>
              <Typography variant="caption">
                {data.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Saldo Previsto</Typography>
              <Typography variant="caption">
                {(data?.saldo + data?.rp - data?.dp).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

ModalBox.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  list: PropTypes.array,
};

export default ModalBox;
