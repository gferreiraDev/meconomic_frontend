import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { useSigninMutation } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin] = useSigninMutation();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
    // remember: true,
  };

  const validations = yup.object({
    email: yup.string().email('Formato inválido').required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatório'),
  });

  return (
    <Grid
      component={Paper}
      elevation={10}
      sx={{
        p: '20px',
        height: '80vh',
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
          SignIn
        </Typography>
      </Grid>

      <Formik
        validationSchema={validations}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);

          // setTimeout(() => {
          //   setSubmitting(false);
          //   resetForm();

          //   navigate('/profile', { replace: true });
          // });

          signin(values)
            .unwrap()
            .then((response) => {
              console.log(response);
              setSubmitting(false);

              alert(response.message);
              dispatch(setCredentials(response.data));
              resetForm();
              navigate('/profile', { replace: true });
            })
            .catch((error) => {
              console.log(error);
              setSubmitting(false);
              resetForm();
              alert(error.data.message);
            });
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting, handleSubmit, setFieldValue }) => (
          <Grid container rowGap={2} justifyContent="center">
            <TextField
              label="E-mail"
              placeholder="Digite seu e-mail"
              name="email"
              value={values.email}
              onChange={handleChange('email')}
              fullWidth
              error={touched.email && !!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              name="password"
              value={values.password}
              onChange={handleChange('password')}
              error={touched.password && !!errors.password}
              fullWidth
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  checked={values.remember}
                  onChange={() => setFieldValue('remember', !values.remember)}
                />
              }
              label="Lembrar usuário"
            /> */}

            <LoadingButton fullWidth variant="contained" color="primary" loading={isSubmitting} onClick={handleSubmit}>
              Entrar
            </LoadingButton>

            <Typography variant="body2" align="center">
              <Link
                href="/forgot-password"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    color: '#1976d2',
                  },
                }}
              >
                Esqueci a senha
              </Link>
            </Typography>
          </Grid>
        )}
      </Formik>

      <Grid>
        <Typography>
          Não possui conta?
          <Link href="signup" sx={{ textDecoration: 'none' }}>
            {' '}
            Cadastre-se.
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Signin;
