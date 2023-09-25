import { useForgotPasswordMutation } from '../../services/authService';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [sendData] = useForgotPasswordMutation();

  const initialValues = {
    email: '',
  };

  const validations = yup.object({
    email: yup
      .string()
      .email('Formato inválido')
      .required('E-mail é obrigatório'),
  });

  return (
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
          sx={{
            p: 2,
            height: '80vh',
            width: 450,
            m: 'auto',
            borderRadius: 2,
            bgcolor: 'paper',
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
              Recuperação de Senha
            </Typography>
          </Grid>

          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{
                gridColumn: 'span 3',
                fontStyle: 'italic',
                textAlign: 'justify',
              }}
              variant="body2"
            >
              Se os dados informados estiverem registrados em nossa base de
              dados, você receberá um link de recuperação de senha, por e-mail
              ou SMS. Fique de olho em sua caixa de entrada.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              variant="contained"
              color="accent"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Enviar
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/signin', { replace: true })}
            >
              Voltar
            </Button>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default ForgotPassword;
