import { useState } from 'react';
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
  FormLabel,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { types, categories } from '../../_mocks';
import { getDate } from 'date-fns';

const Form = ({ data, open, action }) => {
  const [selectAll, setSelectAll] = useState(false);

  const initialValues = {
    type: '',
    category: '',
    description: '',
    expectedValue: '',
    dueDay: 1,
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

  const validations = yup.object({
    type: yup
      .string()
      .matches(/['DF', 'DV', 'DA', 'RF', 'RV', 'RA']/)
      .required('Campo obrigatório'),
    category: yup.string().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
    expectedValue: yup.string().required('Campo obrigatório'),
    dueDay: yup.number().min(1, 'Valor inválido').max(31, 'Valor inválido').required('Campo obrigatório'),
    months: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          checked: yup.boolean(),
        })
      )
      .test('values', 'selecione pelo menos um mês', (months) =>
        months.reduce((sum, month) => (sum += month.checked ? 1 : 0), 0)
      ),
  });

  const handleSelect = (values, item, cb) => {
    const months = [...values];
    const currentIndex = months.indexOf(item);

    months[currentIndex] = {
      ...months[currentIndex],
      checked: !months[currentIndex].checked,
    };

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
        validationSchema={validations}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log('Form values beforeFormat:', values);

          const formatedValue = values.expectedValue.replace(',', '.');
          const dados = {
            ...values,
            expectedValue: formatedValue,
            installments: values.months.reduce((sum, month) => (sum += month.checked ? 1 : 0), 0),
          };

          console.log('Form values afterFormat:', dados);

          setTimeout(() => {
            setSubmitting(false);
            action();
          }, 1000);
        }}
        enableReinitialize
      >
        {({ errors, isSubmitting, values, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <Box
            sx={{
              width: 420,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Novo Registro</Typography>

            <Grid container columns={4} spacing={2} sx={{ border: 'solid 1px #cacaca', p: 2 }}>
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
                  label="Valor Esperado"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.expectedValue}
                  name="expectedValue"
                  error={!!errors.expectedValue}
                  helperText={errors.expectedValue}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                />
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

              <Grid item xs={4}>
                <FormControl error={!!errors.months}>
                  <FormLabel component="legend">Meses de recorrência</FormLabel>
                  <FormControlLabel
                    label="Selecionar todos"
                    control={
                      <Checkbox checked={selectAll} onChange={() => toggleSelectAll(values.months, setFieldValue)} />
                    }
                  />
                  <Grid container columns={4} gap={2} sx={{ bgcolor: '#d1d1d1', p: 1 }}>
                    {values.months.map((month) => (
                      <FormControlLabel
                        key={month.month}
                        label={month.label}
                        control={
                          <Checkbox
                            checked={month.checked}
                            onChange={() => handleSelect(values.months, month, setFieldValue)}
                          />
                        }
                      />
                    ))}
                  </Grid>
                  <FormHelperText>{errors.months}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            <Box
              sx={{
                border: 'solid 1px #000',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <LoadingButton variant="outlined" color="inherit" onClick={action}>
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
};

export default Form;