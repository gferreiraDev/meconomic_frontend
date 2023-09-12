import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import { Loader, NoContent, PageHeader, Alert } from '../../components';
import Form from './Form';
import { useListQuery, useDeleteMutation } from '../../services/statementService';

/* ======= | DataGrid | ============================================================================== */

const CustomGrid = ({ rows, edit, remove }) => {
  const columns = [
    { field: 'type', headerName: 'Tipo', flex: 0.2 },
    { field: 'category', headerName: 'Categoria', flex: 0.3 },
    { field: 'description', headerName: 'Descrição', flex: 0.6 },
    {
      field: 'expectedValue',
      headerName: 'Valor Esperado',
      flex: 0.3,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { expectedValue } }) =>
        expectedValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    },
    {
      field: 'dueDay',
      headerName: 'Vencimento',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { dueDay } }) => `dia ${dueDay}`,
    },
    {
      field: 'installments',
      headerName: 'Parcelas',
      flex: 0.3,
      headerAlign: 'center',
      align: 'center',
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
const Statements = () => {
  const [showContent, setShowContent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAttrs, setDialogAttrs] = useState(null);
  const [drop] = useDeleteMutation();
  const { data, isLoading, isError, isSuccess, refetch } = useListQuery();

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
    setDialogAttrs({ message: response, error: isError });
    setShowForm(false);
    setShowDialog(true);
  };

  useEffect(() => {
    if (!showForm) refetch();
  }, [showForm, refetch]);

  const displayMessage = () => {
    setShowDialog(true);
  };

  return (
    <Box
      sx={{
        border: 'solid 2px #fff',
        flex: 1,
        p: 2,
      }}
    >
      <PageHeader
        title="Meus Registros"
        subtitle="Índice de receitas & despesas"
        label="Incluir"
        action={() => handleSelect(null)}
      />

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

      <Alert
        open={showDialog}
        handleClose={() => setShowDialog(false)}
        message={dialogAttrs?.message}
        error={dialogAttrs?.error}
      />
    </Box>
  );
};

export default Statements;
