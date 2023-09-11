import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { PowerSettingsNewOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateCredentials, clearCredentials } from '../../redux/authSlice';
import { useUpdateUserMutation, useDeleteUserMutation, useSignoutMutation } from '../../services/authService';
import Form from './Form';
import { Formik } from 'formik';
import * as yup from 'yup';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [update] = useUpdateUserMutation();
  const [remove] = useDeleteUserMutation();
  const [signout] = useSignoutMutation();

  const validations = yup.object({
    firstName: yup.string().min(3, 'Nome muito curto').required('Nome é obrigatório'),
    lastName: yup.string().min(3, 'Sobrenome muito curto').required('Sobrenome é obrigatório'),
    email: yup.string().email('Formato inválido').required('E-mail é obrigatório'),
    phone: yup.string().required('Telefone é obrigatório'),
    document: yup
      .string()
      .matches(/^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[.-][0-9]{2}$/, 'CPF inválido')
      .required('CPF é obrigatório'),
  });

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleDeleteUser = () => {
    remove()
      .unwrap()
      .then(() => {
        dispatch(clearCredentials());
        navigate('/signin', { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert(error.data.message);
      });
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate('/signin', { replace: true });
  };

  return (
    <Box sx={{ border: 'solid 2px #fff', flex: 1, p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">Olá, {user.firstName}!</Typography>

        <Button size="small" variant="contained" color="secondary" onClick={handleLogout} sx={{ alignItems: 'center' }}>
          <PowerSettingsNewOutlined sx={{ width: 16, height: 16, pr: 2 }} />
          Sair
        </Button>
      </Box>

      <Formik
        initialValues={user}
        validationSchema={validations}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          update(values)
            .unwrap()
            .then((response) => {
              // console.log(response.message);
              dispatch(updateCredentials(response.data));
              alert(response.message);
            })
            .catch((error) => {
              console.log(error);
              alert(error.data.message);
            })
            .finally(() => {
              setSubmitting(false);
              setIsEditing(false);
            });
        }}
      >
        {({ values, errors, isSubmitting, handleChange, touched, handleSubmit }) => (
          <Grid
            container
            component={Paper}
            elevation={10}
            sx={{ margin: '40px auto', width: '80%', p: 2 }}
            columns={4}
            rowSpacing={4}
            columnSpacing={1}
          >
            <Grid item xs={4} md={2}>
              <TextField
                label="Nome"
                value={values.firstName}
                onChange={handleChange('firstName')}
                fullWidth
                disabled={!isEditing}
                error={isEditing && touched.firstName && !!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>

            <Grid item xs={4} md={2}>
              <TextField
                label="Sobrenome"
                value={values.lastName}
                onChange={handleChange('lastName')}
                fullWidth
                disabled={!isEditing}
                error={isEditing && touched.lastName && !!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="E-mail"
                value={values.email}
                onChange={handleChange('email')}
                fullWidth
                disabled={!isEditing}
                error={isEditing && touched.email && !!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={4} md={2}>
              <TextField
                label="CPF"
                value={values.document}
                onChange={handleChange('document')}
                fullWidth
                disabled={!isEditing}
                error={isEditing && touched.document && !!errors.document}
                helperText={errors.document}
              />
            </Grid>

            <Grid item xs={4} md={2}>
              <TextField
                label="Telefone"
                value={values.phone}
                onChange={handleChange('phone')}
                fullWidth
                disabled={!isEditing}
                error={isEditing && touched.phone && !!errors.phone}
                helperText={errors.phone}
              />
            </Grid>

            {isEditing ? (
              <Grid item xs={4} sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <LoadingButton
                  size="small"
                  loading={isSubmitting}
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Salvar
                </LoadingButton>

                <Button size="small" variant="outlined" color="inherit" onClick={handleCancelEditing} sx={{ mx: 2 }}>
                  Cancelar
                </Button>
              </Grid>
            ) : (
              <Grid item xs={4} sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={() => setShowForm(true)}
                  sx={{ mx: 4 }}
                >
                  Alterar Senha
                </Button>

                <Button size="small" variant="outlined" color="primary" onClick={() => setIsEditing(!isEditing)}>
                  Editar
                </Button>

                <Button size="small" variant="outlined" color="error" onClick={handleDeleteUser} sx={{ mx: 2 }}>
                  Excluir
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Formik>

      <Form visible={showForm} setVisible={setShowForm} />
    </Box>
  );
};

export default Profile;
