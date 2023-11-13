import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useSignupMutation } from '../../services/authService';
import { schema } from '../../validationSchemas/signupSchema';
import { useNavigate } from 'react-router-dom';
import { useMask } from '@react-input/mask';
import { LoadingButton } from '@mui/lab';
import { Alert } from '../../components';
import { useState } from 'react';
import { Formik } from 'formik';
import {
  Grid,
  Typography,
  TextField,
  Checkbox,
  Avatar,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
} from '@mui/material';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({
    message: '',
    error: false,
    visible: false,
  });
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
    acceptTerms: false,
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        signup(values)
          .unwrap()
          .then(({ message }) => {
            setSubmitting(false);
            resetForm();
            setMessage({ error: false, message, visible: true });
            setTimeout(() => navigate('/signin', { replace: true }), 2000);
          })
          .catch((error) => {
            setSubmitting(false);
            setMessage({
              error: true,
              message: error.data.message,
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
        handleBlur,
        isSubmitting,
        handleSubmit,
        setFieldValue,
      }) => (
        <Grid
          container
          columnSpacing={2}
          rowGap={2}
          sx={{
            pr: 2,
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
              Criar Conta
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Nome"
              placeholder="Digite seu primeiro nome"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.firstName && !!errors?.firstName}
              helperText={
                touched.firstName && !!errors.firstName
                  ? errors.firstName
                  : undefined
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Sobrenome"
              placeholder="Digite seu sobrenome"
              name="lastName"
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.lastName && !!errors.lastName}
              helperText={
                touched.lastName && !!errors.lastName
                  ? errors.lastName
                  : undefined
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="E-mail"
              placeholder="Digite seu e-mail"
              name="email"
              value={values.email}
              onChange={handleChange('email')}
              error={touched.email && !!errors.email}
              helperText={
                touched.email && !!errors.email ? errors.email : undefined
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              inputRef={phoneMaskRef}
              label="Telefone"
              placeholder="Digite seu telefone"
              name="phone"
              value={values.phone}
              onChange={handleChange('phone')}
              error={touched.phone && !!errors.phone}
              helperText={
                touched.phone && !!errors.phone ? errors.phone : undefined
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              inputRef={documentMaskRef}
              label="CPF"
              placeholder="Digite seu CPF"
              name="document"
              value={values.document}
              onChange={handleChange('document')}
              error={touched.document && !!errors.document}
              helperText={
                touched.document && !!errors.document
                  ? errors.document
                  : undefined
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              name="password"
              value={values.password}
              onChange={handleChange('password')}
              error={touched.password && !!errors.password}
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
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Confirme a senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={
                touched.confirmPassword && !!errors.confirmPassword
                  ? errors.confirmPassword
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
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl error={touched.acceptTerms && !!errors.acceptTerms}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    color="primary"
                    checked={values.acceptTerms}
                    onChange={() =>
                      setFieldValue('acceptTerms', !values.acceptTerms)
                    }
                  />
                }
                label="Aceito os Termos de Uso"
              />
              {touched.acceptTerms && !!errors.acceptTerms && (
                <FormHelperText sx={{ color: 'error.light' }}>
                  {errors.acceptTerms}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              variant="contained"
              color="accent"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Cadastrar
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              Já possui conta?&nbsp;
              <Link
                href="/signin"
                sx={{ textDecoration: 'none', color: 'accent.main' }}
              >
                &nbsp;Entre
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

export default Signup;
