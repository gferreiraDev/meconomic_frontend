import { useCreateCardMutation, useUpdateCardMutation } from '../../services/cardService';
import { brands, chargeRules, cardStatus } from '../../_mocks';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDate, format } from 'date-fns';
import { formatCurrency } from '../../utils';
import { stringToDate } from '../../utils';
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
  const [create] = useCreateCardMutation();
  const [update] = useUpdateCardMutation();

  const initialValues = data
    ? { ...data }
    : {
        name: 'Cartão Teste',
        brand: 'Amex',
        lastNumbers: '5678',
        limit: 4356,
        closingDay: 5,
        dueDay: 16,
        annuity: 689,
        fees: 186,
        chargeRule: 'always',
        expiryDate: '02/25',
        status: 'Ativo',
      };

  const validations = yup.object({
    name: yup.string().required('Campo obrigatório'),
    brand: yup.string().required('Campo obrigatório'),
    lastNumbers: yup.string().required('Campo obrigatório'),
    limit: yup.string().min(0, 'Valor inválido').required('Campo obrigatório'),
    closingDay: yup.number().min(1, 'Valor inválido').max(31, 'Valor inválido').required('Campo obrigatório'),
    dueDay: yup.number().min(1, 'Valor inválido').max(31, 'Valor inválido').required('Campo obrigatório'),
    annuity: yup.string().required('Campo obrigatório'),
    fees: yup.string().required('Campo obrigatório'),
    chargeRule: yup.string().required('Campo obrigatório'),
    expiryDate: yup.string().required('Campo obrigatório'),
    status: yup.string().required('Campo obrigatório'),
  });

  return (
    <Drawer open={open} anchor="right">
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
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
            <Typography variant="h5">Novo Cartão</Typography>

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
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.brand}>
                  <InputLabel>Bandeira</InputLabel>
                  <Select label="Tipo" onChange={handleChange} name="brand" value={values.brand}>
                    <MenuItem value="">Selecione</MenuItem>
                    {brands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.label}>
                        {brand.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.brand}</FormHelperText>
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
                  error={!!errors.lastNumbers}
                  helperText={errors.lastNumbers}
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
                  helperText={errors.limit}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.expiryDate}>
                  <DatePicker
                    label="Validade"
                    views={['year', 'month']}
                    value={stringToDate(values.expiryDate)}
                    format="MM/yy"
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('expiryDate', format(date, 'MM/yy'))}
                    name="expiryDate"
                    error={!!errors.expiryDate}
                  />
                  <FormHelperText>{errors.expiryDate}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.closingDay}>
                  <DatePicker
                    label="Dia de Fechamento"
                    views={['day']}
                    // format="DD"
                    value={getDate(values.closingDay)}
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('closingDay', getDate(date))}
                    name="closingDay"
                    error={!!errors.closingDay}
                  />
                  <FormHelperText>{errors.closingDay}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.dueDay}>
                  <DatePicker
                    label="Dia de Vencimento"
                    views={['day']}
                    value={getDate(values.dueDay)}
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('dueDay', getDate(date))}
                    name="dueDay"
                    error={!!errors.dueDay}
                  />
                  <FormHelperText>{errors.dueDay}</FormHelperText>
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
                  error={!!errors.annuity}
                  helperText={errors.annuity}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
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
                  error={!!errors.fees}
                  helperText={errors.fees}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.chargeRule}>
                  <InputLabel>Tipo de Cobrança</InputLabel>
                  <Select onChange={handleChange} name="chargeRule" value={values.chargeRule}>
                    <MenuItem value="">Selecione</MenuItem>
                    {chargeRules.map((rule) => (
                      <MenuItem key={rule.id} value={rule.value}>
                        {rule.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.chargeRule}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select onChange={handleChange} name="status" value={values.status}>
                    <MenuItem value="">Selecione</MenuItem>
                    {cardStatus.map((status) => (
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
