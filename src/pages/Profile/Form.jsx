import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUpdatePasswordMutation } from '../../services/authService';
import { updateCredentials } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

const Form = ({ visible, setVisible }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [update] = useUpdatePasswordMutation();
  const dispatch = useDispatch();

  const initialValues = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
  };

  const validations = yup.object({
    currentPassword: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas não conferem')
      .required('Campo obrigatório'),
  });

  return (
    <Drawer open={visible} anchor="right">
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);

          update(values)
            .unwrap()
            .then((response) => {
              dispatch(updateCredentials(response.data));
              alert(response.message);
            })
            .catch((error) => {
              console.log(error);
              alert(error.data.message);
            })
            .finally(() => {
              setSubmitting(false);
              resetForm();
              setVisible(false);
            });

          setTimeout(() => {
            setSubmitting(false);
          }, 2000);
        }}
        enableReinitialize
      >
        {({
          errors,
          values,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          handleSubmit,
        }) => (
          <Grid
            container
            rowGap={3}
            columnSpacing={2}
            sx={{
              p: 2,
              width: 400,
              bgcolor: 'neutral.main',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Alteração de senha
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Senha atual"
                type={showCurrentPassword ? 'text' : 'password'}
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleChange('currentPassword')}
                onBlur={handleBlur}
                error={touched.currentPassword && !!errors.currentPassword}
                helperText={errors.currentPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nova Senha"
                type={showNewPassword ? 'text' : 'password'}
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
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Confirme a nova senha"
                type={showNewPassword ? 'text' : 'password'}
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
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <LoadingButton
                fullWidth
                size="small"
                variant="outlined"
                color="inherit"
                onClick={() => setVisible(!visible)}
              >
                Cancelar
              </LoadingButton>
            </Grid>

            <Grid item xs={6}>
              <LoadingButton
                fullWidth
                size="small"
                variant="contained"
                color="accent"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Cadastrar
              </LoadingButton>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Drawer>
  );
};

Form.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

export default Form;
