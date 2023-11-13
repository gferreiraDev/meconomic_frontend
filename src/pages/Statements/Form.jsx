import { schema } from '../../validationSchemas/statementsSchema';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatCurrency, dayToDate } from '../../utils';
import { types, categories } from '../../_mocks';
import { LoadingButton } from '@mui/lab';
import { getDate } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Formik } from 'formik';
import {
  useCreateMutation,
  useUpdateMutation,
} from '../../services/statementService';
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
  FormLabel,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const Form = ({ data, open, action, close }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [create] = useCreateMutation();
  const [update] = useUpdateMutation();

  const initialValues = data
    ? { ...data }
    : {
        type: '',
        category: '',
        description: '',
        expectedValue: '',
        dueDay: null,
        months: [
          { month: '1', label: 'Jan', checked: false },
          { month: '2', label: 'Fev', checked: false },
          { month: '3', label: 'Mar', checked: false },
          { month: '4', label: 'Abr', checked: false },
          { month: '5', label: 'Mai', checked: false },
          { month: '6', label: 'Jun', checked: false },
          { month: '7', label: 'Jul', checked: false },
          { month: '8', label: 'Ago', checked: false },
          { month: '9', label: 'Set', checked: false },
          { month: '10', label: 'Out', checked: false },
          { month: '11', label: 'Nov', checked: false },
          { month: '12', label: 'Dez', checked: false },
        ],
      };

  const handleSelect = (values, item, cb) => {
    const months = [...values];
    const currentIndex = months.indexOf(item);

    months[currentIndex] = {
      ...months[currentIndex],
      checked: !months[currentIndex].checked,
    };

    const allSelected = months.reduce(
      (sum, month) => (sum += month?.checked ? 1 : 0),
      0
    );
    setSelectAll(allSelected === 12);

    cb('months', months);
  };

  const toggleSelectAll = (values, cb) => {
    setSelectAll(!selectAll);

    const months = values.map((month) => ({ ...month, checked: !selectAll }));
    cb('months', months);
  };

  return (
    <Drawer open={open} anchor="right">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const dados = {
            ...values,
            expectedValue: formatCurrency(values.expectedValue),
            installments: values.months.reduce(
              (sum, month) => (sum += month.checked ? 1 : 0),
              0
            ),
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
            <Typography variant="h5">Novo Registro</Typography>

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
                  {touched.category && !!errors.category && (
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
                  label="Valor Esperado"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.expectedValue}
                  name="expectedValue"
                  error={touched.expectedValue && !!errors.expectedValue}
                  helperText={
                    touched.expectedValue && !!errors.expectedValue
                      ? errors.expectedValue
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
                  error={touched.dueDay && !!errors.dueDay}
                >
                  <DatePicker
                    label="Dia de Vencimento"
                    views={['day']}
                    format="dd"
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

              <Grid item xs={4}>
                <FormControl error={touched.months && !!errors.months}>
                  <FormLabel component="legend">Meses de recorrência</FormLabel>
                  <FormControlLabel
                    label="Selecionar todos"
                    control={
                      <Checkbox
                        checked={selectAll}
                        onChange={() =>
                          toggleSelectAll(values.months, setFieldValue)
                        }
                        sx={{
                          '&.Mui-checked': {
                            color: 'accent.dark',
                          },
                        }}
                      />
                    }
                  />
                  <Grid
                    container
                    columns={4}
                    gap={2}
                    sx={{
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: errors.months
                        ? 'error.main'
                        : 'neutral.main',
                      justifyContent: 'center',
                      p: 1,
                    }}
                  >
                    {values.months.map((month) => (
                      <FormControlLabel
                        key={month.month}
                        label={month.label}
                        control={
                          <Checkbox
                            checked={month.checked}
                            onChange={() =>
                              handleSelect(values.months, month, setFieldValue)
                            }
                            sx={{
                              '&.Mui-checked': {
                                color: 'accent.dark',
                              },
                            }}
                          />
                        }
                      />
                    ))}
                  </Grid>
                  {touched.months && !!errors.months && (
                    <FormHelperText>{errors.months}</FormHelperText>
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
