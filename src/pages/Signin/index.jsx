import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useSigninMutation } from '../../services/authService';
import { schema } from '../../validationSchemas/signinSchema';
import { setCredentials } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert } from '../../components';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Formik } from 'formik';
import {
  Grid,
  Typography,
  TextField,
  Avatar,
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
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        signin(values)
          .unwrap()
          .then(({ message, data }) => {
            dispatch(setCredentials(data));
            resetForm();

            setMessage({ message, error: false, visible: true });
            setTimeout(() => {
              setSubmitting(false);
              navigate('/dashboard', { replace: true });
            }, 2000);
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

          <Grid item xs={12}>
            <TextField
              label="E-mail"
              placeholder="Digite seu e-mail"
              name="email"
              value={values.email}
              onChange={handleChange('email')}
              fullWidth
              error={touched.email && !!errors.email}
              helperText={
                touched.email && !!errors.email ? errors.email : undefined
              }
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
              helperText={
                touched.password && !!errors.password
                  ? errors.password
                  : undefined
              }
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
