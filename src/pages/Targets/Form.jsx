import { schema } from '../../validationSchemas/targetSchema';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatCurrency } from '../../utils';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  useAddTargetMutation,
  useUpdateTargetMutation,
} from '../../services/targetService';
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
  const [create] = useAddTargetMutation();
  const [update] = useUpdateTargetMutation();

  const initialValues = data
    ? { ...data }
    : {
        description: '',
        targetValue: '',
        currentValue: '',
        deadline: null,
        status: '',
      };

  return (
    <Drawer open={open} anchor="right">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const dados = {
            ...values,
            targetValue: formatCurrency(values.targetValue),
            currentValue: formatCurrency(values.currentValue),
          };

          if (values.id) {
            update({ id: values.id, data: dados })
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
              {values?.id ? 'Editar' : 'Nova'} Meta
            </Typography>

            <Grid container columns={4} spacing={2} sx={{ p: 2 }}>
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
                  label="Valor Desejado"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.targetValue}
                  name="targetValue"
                  error={touched.targetValue && !!errors.targetValue}
                  helperText={
                    touched.targetValue && !!errors.targetValue
                      ? errors.targetValue
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
                  label="Valor Atual"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.currentValue}
                  name="currentValue"
                  error={touched.currentValue && !!errors.currentValue}
                  helperText={
                    touched.currentValue && !!errors.currentValue
                      ? errors.currentValue
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
                <FormControl
                  fullWidth
                  error={touched.deadline && !!errors.deadline}
                >
                  <DatePicker
                    label="Data Limite"
                    views={['year', 'month', 'day']}
                    disablePast
                    format="dd/MM/yyyy"
                    value={values.deadline ? new Date(values.deadline) : null}
                    onBlur={handleBlur}
                    onChange={(date) => setFieldValue('deadline', date)}
                    name="deadline"
                    slotProps={{
                      textField: {
                        helperText: errors.deadline,
                        error: touched.deadline && !!errors.deadline,
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
                    {['Planejado', 'Em andamento', 'Pausado', 'Cancelado'].map(
                      (status, idx) => (
                        <MenuItem key={idx} value={status}>
                          {status}
                        </MenuItem>
                      )
                    )}
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
