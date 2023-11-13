import {
  investmentTypes,
  investmentCategories,
  investmentStatus,
} from '../../_mocks';
import { schema } from '../../validationSchemas/investmentSchema';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatCurrency } from '../../utils';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  useAddInvestmentMutation,
  useUpdateInvestmentMutation,
} from '../../services/investmentService';
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
  const [create] = useAddInvestmentMutation();
  const [update] = useUpdateInvestmentMutation();

  const initialValues = data
    ? { ...data }
    : {
        type: '',
        category: '',
        description: '',
        value: '',
        emitter: '',
        dueDate: '',
        profitability: '',
        profitabilityType: '',
        fees: '',
        status: '',
      };

  return (
    <Drawer open={open} anchor="right">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const profit = formatCurrency(values.profitability);

          const data = {
            ...values,
            value: formatCurrency(values.value),
            fees: formatCurrency(values.fees),
            profitability: profit > 0 ? profit / 100 : profit,
          };

          if (values.id) {
            update({ id: values.id, data })
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
            create(data)
              .unwrap()
              .then(({ message }) => {
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
              {values?.id ? 'Editar Investimento' : 'Novo Investimento'}
            </Typography>

            <Grid container columns={4} spacing={2} sx={{ p: 2 }}>
              <Grid item xs={2}>
                <FormControl fullWidth error={touched.type && !!errors.type}>
                  <InputLabel>Tipo de Investimento</InputLabel>
                  <Select
                    onChange={handleChange}
                    name="type"
                    value={values.type}
                  >
                    <MenuItem value="">Selecione</MenuItem>
                    {investmentTypes.map((type) => (
                      <MenuItem key={type.id} value={type.description}>
                        {type.description}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.type && !!errors.type && (
                    <FormHelperText>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  fullWidth
                  error={touched.category && !!errors.category}
                >
                  <InputLabel>Categoria de Investimento</InputLabel>
                  <Select
                    onChange={handleChange}
                    name="category"
                    value={values.category}
                  >
                    <MenuItem value="">Selecione</MenuItem>
                    {investmentCategories
                      .filter((item) => item.type === values.type)
                      .map((category) => (
                        <MenuItem key={category.id} value={category.value}>
                          {category.value}
                        </MenuItem>
                      ))}
                  </Select>
                  {touched.category && !!errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="text"
                  label="Descrição do investimento"
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

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="text"
                  label="Emissor"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.emitter}
                  name="emitter"
                  error={touched.emitter && !!errors.emitter}
                  helperText={
                    touched.emitter && !!errors.emitter
                      ? errors.emitter
                      : undefined
                  }
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Valor Investido"
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
                <TextField
                  fullWidth
                  type="text"
                  label="Rendimento"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.profitability}
                  name="profitability"
                  error={touched.profitability && !!errors.profitability}
                  helperText={
                    touched.profitability && !!errors.profitability
                      ? errors.profitability
                      : undefined
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  fullWidth
                  error={
                    touched.profitabilityType && !!errors.profitabilityType
                  }
                >
                  <InputLabel>Periodicidade</InputLabel>
                  <Select
                    onChange={handleChange}
                    name="profitabilityType"
                    value={values.profitabilityType}
                  >
                    <MenuItem value="">Selecione</MenuItem>
                    {['a.m', 'a.a'].map((rule) => (
                      <MenuItem key={rule} value={rule}>
                        {rule}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.profitabilityType && !!errors.profitabilityType && (
                    <FormHelperText>{errors.profitabilityType}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Taxas"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fees}
                  name="fees"
                  error={touched.fees && !!errors.fees}
                  helperText={
                    touched.fees && !!errors.fees ? errors.fees : undefined
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
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
                    <MenuItem value="">Selecione</MenuItem>
                    {investmentStatus.map((status) => (
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
