import { DataGrid } from '@mui/x-data-grid';
import { Box, Chip, IconButton, MenuItem, Popover } from '@mui/material';
import PropTypes from 'prop-types';
import {
  DeleteForeverOutlined,
  EditOutlined,
  MoreVertOutlined,
} from '@mui/icons-material';
import { useState } from 'react';

const List = ({ rows, edit, remove, children }) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenMenu = (event, item) => {
    setSelected(item);
    setOpen(event.currentTarget);
  };

  const handleRemove = () => {
    console.log('Editing data:', selected);
    setOpen(null);
    remove();
  };

  const handleEdit = () => {
    console.log('Editing data:', selected);
    setOpen(null);
    edit();
  };

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
      renderCell: ({ row: { value } }) =>
        value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    },
    {
      field: 'dueDate',
      headerName: 'Vencimento',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { dueDate } }) =>
        new Date(dueDate).toLocaleDateString('pt-Br'),
    },
    {
      field: 'installments',
      headerName: 'Parcela',
      flex: 0.3,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { installment, installments } }) =>
        `${installment} de ${installments}`,
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
          <IconButton size="small" onClick={(e) => handleOpenMenu(e, row)}>
            <MoreVertOutlined />
          </IconButton>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={() => setOpen(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  p: 1,
                  width: 140,
                  bgcolor: 'secondary.main',
                  '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleEdit}>
              <EditOutlined sx={{ mr: 2 }} />
              Editar
            </MenuItem>
            <MenuItem sx={{ color: 'error.main' }} onClick={handleRemove}>
              <DeleteForeverOutlined sx={{ mr: 2 }} />
              Excluir
            </MenuItem>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '75%',
        flex: 1,
        mt: 2,
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'accent.main',
          minHeight: '38px !important',
          maxHeight: '38px !important',
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: 'paper',
        },
        '& .MuiDataGrid-row:nth-of-type(odd)': {
          backgroundColor: 'paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          bgcolor: 'accent.main',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
          borderRadius: 1,
          mb: 0.5,
        }}
      >
        {children}
      </Box>
      <DataGrid rowHeight={40} columns={columns} rows={rows?.data} hideFooter />
    </Box>
  );
};

List.propTypes = {
  rows: PropTypes.object,
  edit: PropTypes.func,
  remove: PropTypes.func,
  children: PropTypes.node,
};

export default List;
