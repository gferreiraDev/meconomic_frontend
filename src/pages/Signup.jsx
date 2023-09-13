import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Typography,
  TextField,
  Checkbox,
  Paper,
  Avatar,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Formik } from 'formik';
import { useState, forwardRef } from 'react';
import * as yup from 'yup';
import { useSignupMutation } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useMask } from '@react-input/mask';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const phoneMaskRef = useMask({ mask: '(__) _____-____', replacement: '_' });
  const documentMaskRef = useMask({ mask: '___.___.___-__', replacement: '_' });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    document: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true,
  };

  const validations = yup.object({
    firstName: yup.string().min(3, 'Nome muito curto').required('Nome é obrigatório'),
    lastName: yup.string().min(3, 'Sobrenome muito curto').required('Sobrenome é obrigatório'),
    email: yup.string().email('Formato inválido').required('E-mail é obrigatório'),
    phone: yup.string().required('Telefone é obrigatório'),
    document: yup
      .string()
      .matches(/^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[.-][0-9]{2}$/, 'CPF inválido')
      .required('CPF é obrigatório'),
    password: yup.string().required('Senha é obrigatório'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas não conferem')
      .required('Campo obrigatório'),
    acceptTerms: yup.boolean().isTrue('É necessário aceitar os termos de uso'),
  });

  return (
    <Grid
      component={Paper}
      elevation={10}
      sx={{
        p: '20px',
        height: '90vh',
        width: 400,
        m: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      align="center"
    >
      <Grid container columns={3} alignItems="center" columnGap={2}>
        <Avatar sx={{ gridColumn: 'span 1', bgcolor: '#1976d2' }}>
          <LockOutlined />
        </Avatar>
        <Typography sx={{ gridColumn: 'span 2' }} variant="h5">
          SignUp
        </Typography>
      </Grid>

      <Formik
        validationSchema={validations}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);

          signup(values)
            .unwrap()
            .then((response) => {
              console.log(response);
              setSubmitting(false);

              alert(response.message);

              resetForm();
              navigate('/signin', { replace: true });
            })
            .catch((error) => {
              console.log(error);
              setSubmitting(false);
              alert(error.data.message);
            });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setFieldValue }) => (
          <Grid container columns={4} rowGap={2} columnSpacing={1}>
            <Grid item xs={2}>
              <TextField
                label="Nome"
                placeholder="Digite seu primeiro nome"
                name="firstName"
                value={values.firstName}
                onChange={handleChange('firstName')}
                onBlur={handleBlur}
                error={touched.firstName && !!errors.firstName}
                helperText={errors.firstName}
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Sobrenome"
                placeholder="Digite seu sobrenome"
                name="lastName"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange('lastName')}
                error={touched.lastName && !!errors.lastName}
                helperText={errors.lastName}
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="E-mail"
                placeholder="Digite seu e-mail"
                name="email"
                value={values.email}
                onChange={handleChange('email')}
                error={touched.email && !!errors.email}
                helperText={errors.email}
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                inputRef={phoneMaskRef}
                label="Telefone"
                placeholder="Digite seu telefone"
                name="phone"
                value={values.phone}
                onChange={handleChange('phone')}
                error={touched.phone && !!errors.phone}
                helperText={errors.phone}
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                inputRef={documentMaskRef}
                label="CPF"
                placeholder="Digite seu CPF"
                name="document"
                value={values.document}
                onChange={handleChange('document')}
                error={touched.document && !!errors.document}
                helperText={errors.document}
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                name="password"
                value={values.password}
                onChange={handleChange('password')}
                error={touched.password && !!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Confirme a senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>

            <FormControl error={touched.acceptTerms && !!errors.acceptTerms}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    color="primary"
                    checked={values.acceptTerms}
                    onChange={() => setFieldValue('acceptTerms', !values.acceptTerms)}
                  />
                }
                label="Aceito os Termos de Uso"
              />
              <FormHelperText sx={{ color: 'error.light' }}>{errors.acceptTerms}</FormHelperText>
            </FormControl>

            <LoadingButton fullWidth variant="contained" color="primary" loading={isSubmitting} onClick={handleSubmit}>
              Cadastrar
            </LoadingButton>
          </Grid>
        )}
      </Formik>

      <Grid>
        <Typography>
          Já possui conta?
          <Link href="/signin" sx={{ textDecoration: 'none' }}>
            {' '}
            Entre
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Signup;
