import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import { Loader, NoContent, PageHeader } from '../../components';
import Form from './Form';

import { statements } from '../../_mocks';

/* ======= | DataGrid | ============================================================================== */

const CustomGrid = ({ data }) => {
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
      renderCell: ({ row: { months } }) => months.reduce((count, month) => (count += month.checked ? 1 : 0), 0),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.25,
      align: 'center',
      renderCell: ({ row }) => (
        <>
          <IconButton size="small" onClick={() => console.log('Editing item', row.id)}>
            <EditOutlined fontSize="inherit" />
          </IconButton>

          <IconButton size="small" onClick={() => console.log('Removing item', row.id)}>
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
      <DataGrid rowHeight={40} columns={columns} rows={data} hideFooter />
    </Box>
  );
};

CustomGrid.propTypes = {
  data: PropTypes.array,
};

/* ======= | Page | ============================================================================== */
const Statements = () => {
  const [loading, setLoading] = useState(true);
  const [data] = useState(statements);
  const [showContent, setShowContent] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log('Show content?', showContent);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [showContent]);

  return (
    <Box
      sx={{
        border: 'solid 2px #fff',
        flex: 1,
        p: 2,
      }}
    >
      <PageHeader
        title="Custo Fixo"
        subtitle="Receitas & Despesas"
        label="Incluir"
        action={() => setShowForm((prev) => !prev)}
      />

      {loading ? (
        <Loader />
      ) : showContent ? (
        <CustomGrid data={data} />
      ) : (
        <NoContent
          text="Nenhum conteúdo a ser exibido"
          action={() => setShowContent(!showContent)}
          actionLabel="Recarregar"
        />
      )}

      <Form open={showForm} action={() => setShowForm(false)} />
    </Box>
  );
};

export default Statements;
