import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useSigninMutation } from '../../services/authService';
import { setCredentials } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert } from '../../components';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Grid,
  Typography,
  TextField,
  // Checkbox,
  Paper,
  Avatar,
  // FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin] = useSigninMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({
    message: '',
    error: false,
    visible: false,
  });

  const initialValues = {
    email: '',
    password: '',
    // remember: true,
  };

  const validations = yup.object({
    email: yup
      .string()
      .email('Formato inválido')
      .required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatório'),
  });

  return (
    <Formik
      validationSchema={validations}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        signin(values)
          .unwrap()
          .then(({ message, data }) => {
            setSubmitting(false);
            setMessage({ message, error: false, visible: true });

            dispatch(setCredentials(data));
            resetForm();
            navigate('/dashboard', { replace: true });
          })
          .catch((error) => {
            setSubmitting(false);
            setMessage({
              message: error.data.message,
              error: true,
              visible: true,
            });
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        isSubmitting,
        handleSubmit,
        setFieldValue,
      }) => (
        <Grid
          container
          rowGap={2}
          sx={{
            p: 2,
            height: '85vh',
            width: 450,
            m: '5vh auto',
            bgcolor: 'paper',
            borderRadius: 2,
          }}
          align="center"
        >
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: 'accent.main', mr: 2 }}>
              <LockOutlined />
            </Avatar>
            <Typography sx={{ gridColumn: 'span 2' }} variant="h5">
              Entre na sua conta
            </Typography>
          </Grid>

          <Grid xs={12}>
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
          </Grid>

          <Grid item xs={12}>
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
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* 
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    color="primary"
                    checked={values.remember}
                    onChange={() => setFieldValue('remember', !values.remember)}
                  />
                }
                label="Lembrar usuário"
              /> 
            </Grid>
          */}

          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              variant="contained"
              color="accent"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Entrar
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              <Link
                href="/forgot-password"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    color: 'accent.main',
                  },
                }}
              >
                Esqueci a senha
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              Não possui conta?&nbsp;
              <Link
                href="signup"
                sx={{ textDecoration: 'none', color: 'accent.main' }}
              >
                &nbsp;Cadastre-se.
              </Link>
            </Typography>
          </Grid>

          <Alert
            open={message.visible}
            handleClose={() =>
              setMessage((prev) => ({ ...prev, visible: !prev.visible }))
            }
            message={message.message}
            error={message.error}
          />
        </Grid>
      )}
    </Formik>
  );
};

export default Signin;
