import {
  useAddPurchaseMutation,
  useUpdatePurchaseMutation,
} from '../../services/purchaseService';
import { useListCardsQuery } from '../../services/cardService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatCurrency } from '../../utils';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Grid,
  Drawer,
  FormControl,
  FormHelperText,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  TextField,
  InputLabel,
} from '@mui/material';

const Form = ({ data, open, action, close }) => {
  const [create] = useAddPurchaseMutation();
  const [update] = useUpdatePurchaseMutation();

  const { data: cards } = useListCardsQuery();

  const initialValues = data
    ? { ...data }
    : {
        cardId: '',
        purchaseDate: '',
        description: '',
        value: '',
        installments: '',
      };

  const validations = yup.object({
    cardId: yup.string().uuid('Cartão inválido').required('Campo obrigatório'),
    purchaseDate: yup.date().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
    value: yup.string().required('Campo obrigatório'),
    installments: yup
      .number()
      .typeError('Valor inválido')
      .min(1, 'Insira um valor entre 1 e 12')
      .max(12, 'Insira um valor entre 1 e 12')
      .required('Campo obrigatório'),
  });

  return (
    <Drawer open={open} anchor="right">
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const dados = {
            ...values,
            value: formatCurrency(values.value),
          };

          if (values.id) {
            update({ id: values.id, data: dados })
              .unwrap()
              .then(({ message }) => {
                setSubmitting(false);
                resetForm();

                action(message, false);
              })
              .catch((error) => {
                action(error.data.message, true);
              });
          } else {
            create(dados)
              .unwrap()
              .then(({ message, data }) => {
                setSubmitting(false);
                resetForm();
                action(message, false);
              })
              .catch((error) => {
                action(error.data.message, true);
              });
          }
        }}
        enableReinitialize
      >
        {({
          errors,
          isSubmitting,
          values,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <Box
            sx={{
              bgcolor: 'neutral.main',
              width: 430,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2,
              overflowX: 'hidden',
            }}
          >
            <Typography variant="h5">
              {values?.id ? 'Editar Compra' : 'Adicionar Compra'}
            </Typography>

            <Grid container columns={4} spacing={2} sx={{ p: 2 }}>
              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.cardId}>
                  <InputLabel>Cartão</InputLabel>
                  <Select
                    label="Tipo"
                    onChange={handleChange}
                    name="cardId"
                    value={values.cardId}
                  >
                    {cards?.data?.map((card) => (
                      <MenuItem key={card.id} value={card.id}>
                        {card.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.cardId}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  fullWidth
                  error={touched.purchaseDate && !!errors.purchaseDate}
                >
                  <DatePicker
                    label="Data da Compra"
                    views={['year', 'month', 'day']}
                    format="dd/MM/yyyy"
                    value={
                      values.purchaseDate ? new Date(values.purchaseDate) : null
                    }
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('purchaseDate', date)}
                    name="purchaseDate"
                    error={touched.purchaseDate && !!errors.purchaseDate}
                  />
                  <FormHelperText>{errors.purchaseDate}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="text"
                  label="Descrição"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Valor"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.value}
                  name="value"
                  error={touched.value && !!errors.value}
                  helperText={errors.value}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Parcelas"
                  value={values.installments}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="installments"
                  error={!!errors.installments}
                  helperText={errors.installments}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <LoadingButton variant="outlined" color="inherit" onClick={close}>
                Cancelar
              </LoadingButton>
              <LoadingButton
                loading={isSubmitting}
                variant="contained"
                color="accent"
                onClick={handleSubmit}
              >
                Salvar
              </LoadingButton>
            </Box>
          </Box>
        )}
      </Formik>
    </Drawer>
  );
};

Form.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
  action: PropTypes.func,
  close: PropTypes.func,
};

export default Form;
