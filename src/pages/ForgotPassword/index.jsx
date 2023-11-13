import { useForgotPasswordMutation } from '../../services/authService';
import { schema } from '../../validationSchemas/forgotPasswordSchema';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMask } from '@react-input/mask';
import { LoadingButton } from '@mui/lab';
import { Alert } from '../../components';
import { Formik } from 'formik';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [sendData] = useForgotPasswordMutation();
  const [message, setMessage] = useState({
    message: '',
    error: false,
    visible: false,
  });

  const documentMaskRef = useMask({ mask: '___.___.___-__', replacement: '_' });

  const initialValues = {
    email: '',
    document: '',
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendData(values)
          .unwrap()
          .then(() => {
            setSubmitting(false);
            resetForm();

            setMessage((prev) => ({
              ...prev,
              message: 'E-mail enviado.',
              visible: true,
            }));
            setTimeout(() => navigate('/signin', { replace: true }), 5000);
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
              name="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              error={touched.email && !!errors.email}
              helperText={
                touched.email && !!errors.email ? errors.email : undefined
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              inputRef={documentMaskRef}
              label="CPF"
              name="document"
              value={values.document}
              onChange={handleChange}
              fullWidth
              error={touched.document && !!errors.document}
              helperText={
                touched.document && !!errors.document
                  ? errors.document
                  : undefined
              }
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

export default ForgotPassword;
