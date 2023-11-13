import { Box, IconButton, MenuItem, Popover } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { EditOutlined, MoreVertOutlined } from '@mui/icons-material';

const List = ({ rows, selected, setSelected, edit, children, cards }) => {
  const [open, setOpen] = useState(false);

  const handleOpenMenu = (event, item) => {
    setSelected(item);
    setOpen(event.currentTarget);
  };

  const handleEdit = () => {
    setOpen(null);
    edit(selected);
  };

  const columns = [
    {
      field: 'purchaseDate',
      headerName: 'Data da Compra',
      flex: 0.3,
      renderCell: ({ row: { purchase } }) =>
        new Date(purchase.purchaseDate).toLocaleDateString('pt-br'),
    },
    {
      field: 'card',
      headerName: 'Cartão Utilizado',
      flex: 0.4,
      renderCell: ({ row: { purchase } }) => {
        if (cards) {
          return cards.find((card) => card.id === purchase.cardId).name;
        }

        return purchase.cardId;
      },
    },
    {
      field: 'description',
      headerName: 'Descrição',
      flex: 0.6,
      renderCell: ({ row: { purchase } }) => purchase.description,
    },
    {
      field: 'currentValue',
      headerName: 'Valor',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { currentValue } }) =>
        currentValue.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
    {
      field: 'currentInstallment',
      headerName: 'Parcela',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { purchase, currentInstallment } }) =>
        `${currentInstallment} de ${purchase.installments}`,
    },
    {
      field: 'dueDate',
      headerName: 'Data da Fatura',
      flex: 0.3,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { dueDate } }) =>
        new Date(dueDate).toLocaleDateString('pt-br'),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.1,
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
  selected: PropTypes.any,
  setSelected: PropTypes.func,
  edit: PropTypes.func,
  remove: PropTypes.func,
  children: PropTypes.node,
  cards: PropTypes.array,
};

export default List;
