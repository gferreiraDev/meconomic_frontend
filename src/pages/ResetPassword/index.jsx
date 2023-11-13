import { useState } from 'react';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useResetPasswordMutation } from '../../services/authService';

const ResetPassword = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { resetToken } = useParams();
  const [sendData] = useResetPasswordMutation();

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validations = yup.object({
    password: yup.string().required('Senha é obrigatório'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas não conferem')
      .required('Campo obrigatório'),
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
          Alteração de Senha
        </Typography>
      </Grid>

      <Formik
        validationSchema={validations}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          sendData({ resetForm, ...values })
            .unwrap()
            .then((response) => {
              setSubmitting(false);
              resetForm();
            })
            .catch((error) => {})
            .finally(() => navigate('/signin', { replace: true }));
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
          <Grid container rowGap={2} justifyContent="center">
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

            <LoadingButton
              fullWidth
              variant="contained"
              color="primary"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Salvar
            </LoadingButton>

            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/signin', { replace: true })}
            >
              Cancelar
            </Button>
          </Grid>
        )}
      </Formik>
    </Grid>
  );
};

export default ResetPassword;
