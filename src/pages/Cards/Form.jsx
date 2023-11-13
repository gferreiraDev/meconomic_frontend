import { brands, chargeRules, cardStatus } from '../../_mocks';
import { schema } from '../../validationSchemas/cardsSchema';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatCurrency, dayToDate } from '../../utils';
import { getDate, format } from 'date-fns';
import { stringToDate } from '../../utils';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  useCreateCardMutation,
  useUpdateCardMutation,
} from '../../services/cardService';
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
  const [create] = useCreateCardMutation();
  const [update] = useUpdateCardMutation();

  const initialValues = data
    ? { ...data }
    : {
        name: '',
        brand: '',
        lastNumbers: '',
        limit: '',
        closingDay: null,
        dueDay: null,
        annuity: '',
        fees: '',
        chargeRule: '',
        expiryDate: '',
        status: '',
      };

  return (
    <Drawer open={open} anchor="right">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const data = {
            ...values,
            limit: formatCurrency(values.limit),
            annuity: formatCurrency(values.annuity),
            fees: formatCurrency(values.fees),
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
              {values?.id ? 'Editar Cartão' : 'Novo Cartão'}
            </Typography>

            <Grid container columns={4} spacing={2} sx={{ p: 2 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="text"
                  label="Nome do Cartão"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={touched.name && !!errors.name}
                  helperText={
                    touched.name && !!errors.name ? errors.name : undefined
                  }
                />
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={touched.brand && !!errors.brand}>
                  <InputLabel>Bandeira</InputLabel>
                  <Select
                    label="Tipo"
                    onChange={handleChange}
                    name="brand"
                    value={values.brand}
                  >
                    <MenuItem value="">Selecione</MenuItem>
                    {brands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.label}>
                        {brand.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.brand && !!errors.brand && (
                    <FormHelperText>{errors.brand}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Final"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastNumbers}
                  name="lastNumbers"
                  error={touched.lastNumbers && !!errors.lastNumbers}
                  helperText={
                    touched.lastNumbers && !!errors.lastNumbers
                      ? errors.lastNumbers
                      : undefined
                  }
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Limite"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.limit}
                  name="limit"
                  error={touched.limit && !!errors.limit}
                  helperText={
                    touched.limit && !!errors.limit ? errors.limit : undefined
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
                  error={touched.expiryDate && !!errors.expiryDate}
                >
                  <DatePicker
                    label="Validade"
                    views={['year', 'month']}
                    value={stringToDate(values.expiryDate)}
                    format="MM/yy"
                    onBlur={handleBlur}
                    onChange={(date) =>
                      setFieldValue('expiryDate', format(date, 'MM/yy'))
                    }
                    name="expiryDate"
                    slotProps={{
                      textField: {
                        helperText: errors.expiryDate,
                        error: touched.expiryDate && !!errors.expiryDate,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  fullWidth
                  error={touched.closingDay && !!errors.closingDay}
                >
                  <DatePicker
                    label="Dia de Fechamento"
                    views={['day']}
                    value={
                      values.closingDay ? dayToDate(values.closingDay) : null
                    }
                    onBlur={handleBlur}
                    onChange={(date) =>
                      setFieldValue('closingDay', getDate(date))
                    }
                    name="closingDay"
                    slotProps={{
                      textField: {
                        helperText: errors.closingDay,
                        error: touched.closingDay && !!errors.closingDay,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  fullWidth
                  error={touched.dueDay && !!errors.dueDay}
                >
                  <DatePicker
                    label="Dia de Vencimento"
                    views={['day']}
                    value={values.dueDay ? dayToDate(values.dueDay) : null}
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('dueDay', getDate(date))}
                    name="dueDay"
                    slotProps={{
                      textField: {
                        helperText: errors.dueDay,
                        error: touched.dueDay && !!errors.dueDay,
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Anuidade"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.annuity}
                  name="annuity"
                  error={touched.annuity && !!errors.annuity}
                  helperText={
                    touched.annuity && !!errors.annuity
                      ? errors.annuity
                      : undefined
                  }
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
                  label="Seguro e Taxas"
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
                  error={touched.chargeRule && !!errors.chargeRule}
                >
                  <InputLabel>Tipo de Cobrança</InputLabel>
                  <Select
                    onChange={handleChange}
                    name="chargeRule"
                    value={values.chargeRule}
                  >
                    <MenuItem value="">Selecione</MenuItem>
                    {chargeRules.map((rule) => (
                      <MenuItem key={rule.id} value={rule.value}>
                        {rule.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.chargeRule && !!errors.chargeRule && (
                    <FormHelperText>{errors.chargeRule}</FormHelperText>
                  )}
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
                    <MenuItem value="">Selecione</MenuItem>
                    {cardStatus.map((status) => (
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
