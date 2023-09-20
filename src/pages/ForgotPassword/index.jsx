import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useForgotPasswordMutation } from '../../services/authService';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [sendData] = useForgotPasswordMutation();

  const initialValues = {
    email: '',
  };

  const validations = yup.object({
    email: yup.string().email('Formato inválido').required('E-mail é obrigatório'),
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
          Recuperação de Senha
        </Typography>
      </Grid>

      <Formik
        validationSchema={validations}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          sendData(values)
            .unwrap()
            .then(() => {
              setSubmitting(false);
              resetForm();

              navigate('/signin', { replace: true });
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
              onChange={handleChange}
              fullWidth
              error={touched.email && !!errors.email}
              helperText={errors.email}
            />

            <LoadingButton fullWidth variant="contained" color="primary" loading={isSubmitting} onClick={handleSubmit}>
              Enviar
            </LoadingButton>
          </Grid>
        )}
      </Formik>

      <Typography sx={{ gridColumn: 'span 3', fontStyle: 'italic', textAlign: 'justify' }} variant="body2">
        Se os dados informados estiverem registrados em nossa base de dados, você receberá um link de recuperação de
        senha, por e-mail ou SMS. Fique de olho em sua caixa de entrada.
      </Typography>

      <Button fullWidth variant="outlined" color="inherit" onClick={() => navigate('/signin', { replace: true })}>
        Voltar
      </Button>
    </Grid>
  );
};

export default ForgotPassword;
