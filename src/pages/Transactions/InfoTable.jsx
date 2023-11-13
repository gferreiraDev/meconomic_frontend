import { currency } from '../../utils';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
} from '@mui/material';

const InfoTable = ({ data }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="resumo-do-mes">
        <TableHead>
          <TableRow>
            <TableCell align="center">Entrada</TableCell>
            <TableCell align="center">Fixa</TableCell>
            <TableCell align="center">Variável</TableCell>
            <TableCell align="center">Adicional</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Pendente</TableCell>
            <TableCell align="center">Quitado</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow sx={{ '& .MuiTableCell-root': { color: '#558955' } }}>
            <TableCell align="center">Receita Prevista</TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.incomes?.fixed)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.incomes?.variable)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.incomes?.discretionary)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.incomes?.total)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.incomes?.pending)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.incomes?.paid)}
            </TableCell>
          </TableRow>
          <TableRow sx={{ '& .MuiTableCell-root': { color: '#67a356' } }}>
            <TableCell align="center">Receita Realizada</TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.incomes?.fixed)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.incomes?.variable)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.incomes?.discretionary)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.incomes?.total)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.incomes?.pending)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.incomes?.paid)}
            </TableCell>
          </TableRow>
          <TableRow sx={{ '& .MuiTableCell-root': { color: '#eb6262' } }}>
            <TableCell align="center">Despesa Prevista</TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.expenses?.fixed)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.expenses?.variable)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.expenses?.discretionary)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.expenses?.total)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.expenses?.pending)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.expectedIndexes?.expenses?.paid)}
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              '& .MuiTableCell-root': { color: '#ff0101' },
              '&:last-child td, &:last-child th': { border: 0 },
            }}
          >
            <TableCell align="center">Despesa Realizada</TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.expenses?.fixed)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.expenses?.variable)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.expenses?.discretionary)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.expenses?.total)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.expenses?.pending)}
            </TableCell>
            <TableCell align="center">
              {currency(data?.indexes?.expenses?.paid)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

InfoTable.propTypes = {
  data: PropTypes.object,
};

export default InfoTable;
