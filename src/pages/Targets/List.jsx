import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AlertDialog } from '../../components';
import { currency, formatDate } from '../../utils/index';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDeleteTargetMutation } from '../../services/targetService';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';

const TargetCard = ({ item, action, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getCurrentPercentage = (data) => {
    const percent = (data.currentValue / data.targetValue) * 100;

    return percent.toFixed(2) + '%';
  };

  const calculateMonths = () => {
    const endDate = new Date(item.deadline);
    const currentDate = new Date();

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const result = endMonth + 12 * (endYear - currentYear) + 1 - currentMonth;
    return result;
  };

  const calculateTargetSteps = () => {
    const months = calculateMonths();

    const difference = item?.targetValue - item?.currentValue;

    return currency(difference / months);
  };

  return (
    <Card sx={{ bgcolor: 'paper' }}>
      <CardHeader
        sx={{ pb: 1 }}
        title={item?.description}
        subheader={`Data Limite: ${formatDate(item?.deadline)}`}
        action={
          <IconButton onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        }
      />
      <Divider variant="middle" />

      <CardContent sx={{ p: 1 }}>
        {showDetails && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              mb: 1,
            }}
          >
            <Typography variant="body2">
              Valor Alvo:&nbsp; {currency(item?.targetValue)}
            </Typography>
            <Typography variant="body2">
              Valor Atual:&nbsp; {currency(item?.currentValue)}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            p: 1,
          }}
        >
          <LinearProgress
            sx={{ width: '80%', mr: 2 }}
            variant="determinate"
            value={(item?.currentValue / item?.targetValue) * 100}
            color="accent"
          />
          <Typography variant="h4" /*sx={{ position: 'absolute', right: 1 }}*/>
            {getCurrentPercentage(item)}
          </Typography>
        </Box>

        {showDetails && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <AlertTitle>Tempo restante: {calculateMonths()} meses</AlertTitle>
            Para atingir a meta estipulada será necessário adicionar o valor
            mínimo de {calculateTargetSteps()} por mês.
          </Alert>
        )}
      </CardContent>

      <Divider variant="middle" />
      <CardActions>
        <Button size="small" color="info" onClick={() => action(item)}>
          Editar
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(item)}>
          Excluir
        </Button>
      </CardActions>
    </Card>
  );
};

TargetCard.propTypes = {
  item: PropTypes.object,
  action: PropTypes.func,
  onDelete: PropTypes.func,
};

const List = ({ data, setSelected, onResponse }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectTarget, setSelectTarget] = useState(null);

  const [drop] = useDeleteTargetMutation();

  const handleDeleteTarget = (item) => {
    setSelectTarget(item);
    setShowDeleteDialog(true);
  };

  const deleteTarget = () => {
    setShowDeleteDialog(false);
    drop(selectTarget.id)
      .then(({ data }) => {
        onResponse(data?.message, false);
      })
      .catch((error) => onResponse(error, true));
  };

  return (
    <>
      <Grid container mt={2} spacing={1}>
        {data.map((target) => (
          <Grid key={target.id} item xs={12} md={4}>
            <TargetCard
              item={target}
              action={() => setSelected(target)}
              onDelete={handleDeleteTarget}
            />
          </Grid>
        ))}
      </Grid>

      <AlertDialog
        title="Exclusão de registro"
        content="Tem certeza que deseja excluir este registro? Esta ação não poderá ser desfeita."
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        onConfirm={deleteTarget}
      />
    </>
  );
};

List.propTypes = {
  data: PropTypes.array,
  setSelected: PropTypes.func,
  onResponse: PropTypes.func,
};

export default List;
