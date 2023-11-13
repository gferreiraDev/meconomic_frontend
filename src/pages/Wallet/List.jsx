import { currency, formatDate } from '../../utils';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { AlertDialog } from '../../components';
import {
  ArrowForwardIosSharp,
  DeleteForeverOutlined,
  EditOutlined,
} from '@mui/icons-material';
import { useDeleteReserveMutation } from '../../services/reserveService';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const List = ({ onEdit, onDelete, data }) => {
  const [expanded, setExpanded] = useState('panel1');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const sumTotalReserve = () => {
    let sum = 0;

    if (data.length) {
      sum = data.reduce((acc, current) => (acc += current.amount), 0);
    }

    return currency(sum);
  };

  const handleRemoveReserve = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const onConfirm = () => {
    setOpen(false);
    drop(selected.id).then(({ data }) => {
      onDelete(data.message);
    });
  };

  const [drop] = useDeleteReserveMutation();

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          p: 1,
          bgcolor: 'accent.main',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography variant="h6">Saldo Total</Typography>
        <Typography variant="h6">{sumTotalReserve()}</Typography>
      </Box>
      {data.map((reserve) => (
        <Accordion
          disableGutters
          key={reserve.id}
          expanded={expanded === reserve.id}
          onChange={handleChange(reserve.id)}
          sx={{
            border: `1px solid neutral.dark`,
            '&:not(:last-child)': {
              borderBottom: 0,
            },
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            sx={{
              bgcolor: 'neutral.dark',
              flexDirection: 'row-reverse',
              '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
              },
              '& .MuiAccordionSummary-content': {
                marginLeft: 1.5,
              },
            }}
            expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <Typography>{reserve.description}</Typography>

              {expanded === reserve.id && (
                <Typography>{`Subtotal: ${currency(
                  reserve.amount
                )}`}</Typography>
              )}
            </Box>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              borderTop: '1px solid rgba(0, 0, 0, .125)',
              bgcolor: 'paper',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} sx={{ p: 1 }} align="left">
                    Últimas movimentações
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onEdit(reserve)}>
                      <EditOutlined sx={{ fontSize: '18px' }} />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveReserve(reserve)}>
                      <DeleteForeverOutlined
                        sx={{ fontSize: '18px', color: 'error.main' }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Valor</TableCell>
                </TableRow>
              </TableHead>

              {reserve?.payments && (
                <TableBody>
                  {reserve?.payments.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        '& .MuiTableCell-root': {
                          color:
                            row.paymentType === 'deposit'
                              ? 'success.main'
                              : 'error.main',
                        },
                      }}
                    >
                      <TableCell>{formatDate(row?.payDate)}</TableCell>
                      <TableCell>{row?.transaction?.description}</TableCell>
                      <TableCell>{currency(row.value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}

      <AlertDialog
        title="Confirmação de Exclusão"
        content="Tem certeza que deseja remover este registro? Esta ação não poderá ser desfeita."
        onConfirm={onConfirm}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
};

List.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  data: PropTypes.array,
  selected: PropTypes.any,
  setSelected: PropTypes.func,
};

export default List;
