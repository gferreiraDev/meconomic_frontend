import { Box, Button, Chip, IconButton, Paper, TextField, Typography } from '@mui/material';
import { DeleteOutlineOutlined, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useListTransactionsQuery, useDeleteTransactionMutation } from '../../services/transactionService';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Alert, Loader, NoContent, PageHeader } from '../../components';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { addMonths } from 'date-fns';
import PropTypes from 'prop-types';
import ModalBox from './ModalBox';
import Form from './Form';

/* ======= | DataGrid | ============================================================================== */
const CustomGrid = ({ rows, edit, remove }) => {
  const columns = [
    { field: 'type', headerName: 'Tipo', flex: 0.2 },
    { field: 'category', headerName: 'Categoria', flex: 0.3 },
    { field: 'description', headerName: 'Descrição', flex: 0.6 },
    {
      field: 'value',
      headerName: 'Valor',
      flex: 0.3,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { value } }) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    },
    {
      field: 'dueDate',
      headerName: 'Vencimento',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { dueDate } }) => new Date(dueDate).toLocaleDateString('pt-Br'),
    },
    {
      field: 'installments',
      headerName: 'Parcela',
      flex: 0.3,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { installment, installments } }) => `${installment} de ${installments}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { status } }) => (
        <Chip
          variant="outlined"
          size="small"
          color={
            status === 'Pendente'
              ? 'warning'
              : status === 'Vencido'
              ? 'error'
              : status === 'Quitado'
              ? 'success'
              : 'inherit'
          }
          label={status}
        />
      ),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.25,
      align: 'center',
      renderCell: ({ row }) => (
        <>
          <IconButton size="small" onClick={() => edit(row)}>
            <EditOutlined fontSize="inherit" />
          </IconButton>

          <IconButton size="small" onClick={() => remove(row)}>
            <DeleteOutlineOutlined fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '80vh',
        mt: 2,
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#434957',
          color: '#fff',
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: '#fff',
        },
        '& .MuiDataGrid-row:nth-of-type(odd)': {
          backgroundColor: '#d0d1d5',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: '#c3c6fd !important',
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `#333 !important`,
        },
      }}
    >
      <DataGrid rowHeight={40} columns={columns} rows={rows?.data} hideFooter />
    </Box>
  );
};

CustomGrid.propTypes = {
  rows: PropTypes.object,
  edit: PropTypes.func,
  remove: PropTypes.func,
};

/* ======= | Page | ============================================================================== */
const Transactions = () => {
  const [showContent, setShowContent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [message, setMessage] = useState({ message: '', error: false, visible: false });
  const [showResume, setShowResume] = useState(false);
  const [drop] = useDeleteTransactionMutation();

  const { data, isLoading, isError, isSuccess, refetch } = useListTransactionsQuery(currentDate.toISOString());

  const handleSelect = (value) => {
    setSelected(value);
    setShowForm(true);
  };

  const handleRemove = (value) => {
    drop({ id: value.id })
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        refetch();
      });
  };

  const handleCloseForm = (response, isError) => {
    setMessage({ message: response, error: isError, visible: true });
    setShowForm(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const toggleResumeData = () => {
    setShowResume((prev) => !prev);
  };

  useEffect(() => {
    if (!showForm) refetch();
  }, [showForm, refetch]);

  return (
    <Box
      sx={{
        border: 'solid 2px #fff',
        flex: 1,
        p: 2,
      }}
    >
      <PageHeader
        title="Lançamentos"
        subtitle="Fluxo mensal de receitas e despesas"
        label="Incluir"
        action={() => handleSelect(null)}
      >
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <IconButton size="small" onClick={handlePrevMonth}>
            <ArrowLeftOutlined sx={{ color: '#fff' }} />
          </IconButton>

          <TextField
            component={Paper}
            sx={{ width: 180 }}
            value={currentDate.toLocaleString('pt-br', { month: 'long', year: 'numeric' })}
            disabled
          />

          <IconButton size="small" onClick={handleNextMonth}>
            <ArrowRightOutlined sx={{ color: '#fff' }} />
          </IconButton>
        </Box>

        <Box>
          <Button onClick={toggleResumeData}>
            <VisibilityOutlined sx={{ color: '#fff', fontSize: 20 }} />
            <Typography variant="caption" color="#fff" ml={1}>
              Ver Detalhes
            </Typography>
          </Button>
        </Box>
      </PageHeader>

      {isLoading ? (
        <Loader />
      ) : isSuccess && data ? (
        <CustomGrid rows={data} edit={handleSelect} remove={handleRemove} />
      ) : (
        <NoContent
          text="Nenhum conteúdo a ser exibido"
          action={() => setShowContent(!showContent)}
          actionLabel="Recarregar"
        />
      )}

      <Form open={showForm} action={handleCloseForm} data={selected} close={() => setShowForm(false)} />
      <ModalBox open={showResume} handleClose={toggleResumeData} list={data?.data} />

      <Alert
        open={message.visible}
        handleClose={() => setMessage((prev) => ({ ...prev, visible: !prev.visible }))}
        message={message.message}
        error={message.error}
      />
    </Box>
  );
};

export default Transactions;
