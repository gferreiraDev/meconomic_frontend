import { types, categories, transactionStatus } from '../../_mocks';
import { schema } from '../../validationSchemas/transactionsSchema';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatCurrency } from '../../utils';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  useAddTransactionMutation,
  useUpdateTransactionMutation,
} from '../../services/transactionService';
import { useListReservesQuery } from '../../services/reserveService';
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
  const [create] = useAddTransactionMutation();
  const [update] = useUpdateTransactionMutation();

  const {
    data: reserves,
    isLoading,
    isError,
    isSuccess,
  } = useListReservesQuery();

  const initialValues = data
    ? { ...data, reserveId: '' }
    : {
        type: '',
        category: '',
        description: '',
        value: '',
        dueDate: '',
        payDate: '',
        installments: 1,
        installment: 1,
        status: '',
        reserveId: '',
      };

  return (
    <Drawer open={open} anchor="right">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const formattedData = {
            ...values,
            value: formatCurrency(values.value),
          };

          if (values.id) {
            update({ id: values.id, data: formattedData })
              .unwrap()
              .then(({ message, data }) => {
                setSubmitting(false);
                resetForm();

                action(message, false);
              })
              .catch((error) => {
                action(error.data.message, true);
              });
          } else {
            create(formattedData)
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
              {values.id ? 'Editar' : 'Novo'} Lançamento
            </Typography>

            <Grid container columns={4} spacing={2} sx={{ p: 2 }}>
              <Grid item xs={2}>
                <FormControl fullWidth error={touched.type && !!errors.type}>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    label="Tipo"
                    onChange={handleChange}
                    name="type"
                    value={values.type}
                  >
                    {types.map((type) => (
                      <MenuItem key={type.id} value={type.label}>
                        {type.description}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.type && errors.type && (
                    <FormHelperText>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  fullWidth
                  error={touched.category && !!errors.category}
                >
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    onChange={handleChange}
                    name="category"
                    value={values.category}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.label}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category && errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
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
                  error={touched.description && !!errors.description}
                  helperText={
                    touched.description && !!errors.description
                      ? errors.description
                      : undefined
                  }
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
                  helperText={
                    touched.value && !!errors.value ? errors.value : undefined
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                {values.id ? (
                  <TextField
                    fullWidth
                    type="text"
                    label="Parcela"
                    value={`${values.installment} de ${values.installments}`}
                    aria-readonly={true}
                    disabled={true}
                  />
                ) : (
                  <FormControl
                    fullWidth
                    error={touched.installments && !!errors.installments}
                  >
                    <InputLabel>Parcelas</InputLabel>
                    <Select
                      onChange={handleChange}
                      name="installments"
                      value={values.installments}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                        (installment) => (
                          <MenuItem key={installment} value={installment}>
                            {installment}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    {touched.installments && errors.installments && (
                      <FormHelperText>{errors.installments}</FormHelperText>
                    )}
                  </FormControl>
                )}
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  fullWidth
                  error={touched.dueDate && !!errors.dueDate}
                >
                  <DatePicker
                    label="Vencimento"
                    views={['year', 'month', 'day']}
                    format="dd/MM/yyyy"
                    value={values.dueDate ? new Date(values.dueDate) : null}
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('dueDate', date)}
                    name="dueDate"
                    slotProps={{
                      textField: {
                        helperText: errors.dueDate,
                        error: touched.dueDate && !!errors.dueDate,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  fullWidth
                  error={touched.payDate && !!errors.payDate}
                >
                  <DatePicker
                    label="Pagamento"
                    views={['year', 'month', 'day']}
                    format="dd/MM/yyyy"
                    value={values.payDate ? new Date(values.payDate) : null}
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('payDate', date)}
                    name="payDate"
                    slotProps={{
                      textField: {
                        helperText: errors.payDate,
                        error: touched.payDate && !!errors.payDate,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  fullWidth
                  error={touched.status && !!errors.status}
                >
                  <InputLabel>Status</InputLabel>
                  <Select
                    onChange={handleChange}
                    name="status"
                    value={values.status}
                  >
                    {transactionStatus.map((status) => (
                      <MenuItem key={status.id} value={status.label}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.status && !!errors.status && (
                    <FormHelperText>{errors.status}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {values.status === 'Quitado' && (
                <Grid item xs={2}>
                  <FormControl
                    fullWidth
                    error={touched.reserveId && !!errors.reserveId}
                  >
                    <InputLabel>Origem/Destino</InputLabel>
                    <Select
                      onChange={handleChange}
                      name="reserveId"
                      value={values.reserveId}
                    >
                      <MenuItem value="">Selecione</MenuItem>
                      {reserves?.data?.map((reserve) => (
                        <MenuItem key={reserve.id} value={reserve.id}>
                          {reserve.description}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.reserveId && !!errors.reserveId && (
                      <FormHelperText>{errors.reserveId}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              )}
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
