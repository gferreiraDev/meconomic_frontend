import PropTypes from 'prop-types';
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
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { types, categories, transactionStatus } from '../../_mocks';
import { useAddTransactionMutation, useUpdateTransactionMutation } from '../../services/transactionService';
import { formatCurrency } from '../../utils';

const Form = ({ data, open, action, close }) => {
  const [create] = useAddTransactionMutation();
  const [update] = useUpdateTransactionMutation();

  const initialValues = data
    ? { ...data }
    : {
        type: 'DA',
        category: 'Transporte',
        description: 'Combustível',
        value: 100,
        dueDate: '',
        payDate: '',
        installments: 1,
        installment: 1,
        status: 'Quitado',
      };

  const validations = yup.object({
    type: yup
      .string()
      .matches(/['DF', 'DV', 'DA', 'RF', 'RV', 'RA']/)
      .required('Campo obrigatório'),
    category: yup.string().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
    value: yup.string().required('Campo obrigatório'),
    dueDate: yup.date().required('Campo obrigatório'),
    payDate: yup.date().required('Campo obrigatório'),
    installment: yup.number().min(1).required('Campo obrigatório'),
    installments: yup.number().min(1).required('Campo obrigatório'),
    status: yup.string().required('Campo obrigatório'),
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

          console.log(dados);

          if (values.id) {
            update({ id: values.id, data: dados })
              .unwrap()
              .then(({ message, data }) => {
                setSubmitting(false);
                resetForm();

                action(message, false);
              })
              .catch((error) => {
                console.log(error);
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
                console.log(error);
                action(error.data.message, true);
              });
          }
        }}
        enableReinitialize
      >
        {({ errors, isSubmitting, values, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <Box
            sx={{
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
            <Typography variant="h5">Nova Transação</Typography>

            <Grid container columns={4} spacing={2} sx={{ p: 2 }}>
              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel>Tipo</InputLabel>
                  <Select label="Tipo" onChange={handleChange} name="type" value={values.type}>
                    {types.map((type) => (
                      <MenuItem key={type.id} value={type.label}>
                        {type.description}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.type}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Categoria</InputLabel>
                  <Select onChange={handleChange} name="category" value={values.category}>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.label}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.category}</FormHelperText>
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
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Parcela"
                  value={`${values.installment} de ${values.installments}`}
                  aria-readonly={true}
                  disabled={true}
                />
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={touched.dueDate && !!errors.dueDate}>
                  <DatePicker
                    label="Vencimento"
                    views={['year', 'month', 'day']}
                    format="dd/MM/yyyy"
                    value={new Date(values.dueDate)}
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('dueDate', date)}
                    name="dueDate"
                    error={touched.dueDate && !!errors.dueDate}
                  />
                  <FormHelperText>{errors.dueDate}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={touched.payDate && !!errors.payDate}>
                  <DatePicker
                    label="Pagamento"
                    views={['year', 'month', 'day']}
                    format="dd/MM/yyyy"
                    value={new Date(values.payDate)}
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('payDate', date)}
                    name="payDate"
                    error={touched.payDate && !!errors.payDate}
                  />
                  <FormHelperText>{errors.payDate}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select onChange={handleChange} name="status" value={values.status}>
                    {transactionStatus.map((status) => (
                      <MenuItem key={status.id} value={status.label}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.status}</FormHelperText>
                </FormControl>
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
              <LoadingButton loading={isSubmitting} variant="contained" color="primary" onClick={handleSubmit}>
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
