import {
  DeleteForeverOutlined,
  EditOutlined,
  MoreVertOutlined,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Box,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { currency, formatDate } from '../../utils';

const List = ({ columns, rows, setSelected, onEdit, onDelete }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('type');
  const [open, setOpen] = useState(null);

  const comparator = (a, b, orderBy) => {
    return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => comparator(a, b, orderBy)
      : (a, b) => -comparator(a, b, orderBy);
  };

  const applySorter = (list, comparator) => {
    return list
      .map((elm, idx) => [elm, idx])
      .sort((a, b) => {
        const order = comparator(a[0], b[0]);
        return order !== 0 ? order : a[1] - b[1];
      })
      .map((item) => item[0]);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOpenMenu = (event, item) => {
    setSelected(item);
    setOpen(event.currentTarget);
  };

  const handleRemove = () => {
    setOpen(null);
    onDelete();
  };

  const handleEdit = () => {
    setOpen(null);
    onEdit();
  };

  const sortedRows = applySorter(rows, getComparator(order, orderBy));

  const formatData = (row, column) => {
    const format = column.format;

    if (format === 'date') return formatDate(row[column.id]);
    else if (format === 'currency') return currency(row[column.id]);
    else if (format === 'percent')
      return `${(row.profitability * 100).toFixed(2)}% ${
        row.profitabilityType
      }`;
    else return row[column.id];
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ height: '80vh', overflowY: 'auto', mt: 2, bgcolor: 'paper' }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.align}
                sortDirection={orderBy === col.id ? order : false}
                sx={{
                  bgcolor: 'accent.main',
                }}
              >
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? order : 'asc'}
                  onClick={() => handleRequestSort(col.id)}
                >
                  {col.label}
                  {orderBy === col.id ? (
                    <Box
                      sx={{
                        border: 0,
                        margin: -1,
                        padding: 0,
                        width: '1px',
                        height: '1px',
                        overflow: 'hidden',
                        position: 'absolute',
                        whiteSpace: 'nowrap',
                        clip: 'rect(0 0 0 0)',
                      }}
                    >
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}

            <TableCell
              sx={{
                bgcolor: 'accent.main',
              }}
              align="center"
            ></TableCell>
          </TableRow>
        </TableHead>

        {sortedRows.length ? (
          <TableBody>
            {sortedRows.map((row, i) => (
              <TableRow key={i} hover>
                {columns.map((col, idx) => (
                  <TableCell key={idx} align={col.align}>
                    {formatData(row, col)}
                  </TableCell>
                ))}

                <TableCell align="right">
                  <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                    <MoreVertOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={9} sx={{ py: 3 }}>
                <Typography variant="body1" textAlign="center">
                  Não há registros para exibir
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>

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
    </TableContainer>
  );
};

List.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  selected: PropTypes.object,
  setSelected: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default List;
