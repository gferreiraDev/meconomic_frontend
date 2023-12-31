import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../../services/authService';
import {
  getUser,
  updateCredentials,
  clearCredentials,
} from '../../redux/authSlice';
import { Button, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from './Form';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [update] = useUpdateUserMutation();
  const [remove] = useDeleteUserMutation();

  const validations = yup.object({
    firstName: yup
      .string()
      .min(3, 'Nome muito curto')
      .required('Nome é obrigatório'),
    lastName: yup
      .string()
      .min(3, 'Sobrenome muito curto')
      .required('Sobrenome é obrigatório'),
    email: yup
      .string()
      .email('Formato inválido')
      .required('E-mail é obrigatório'),
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
        alert(error.data.message);
      });
  };

  return (
    <>
      <PageHeader title="Perfil" subtitle={`Olá, ${user.firstName}`} />

      <Formik
        initialValues={user}
        validationSchema={validations}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          update(values)
            .unwrap()
            .then((response) => {
              dispatch(updateCredentials(response.data));
              alert(response.message);
            })
            .catch((error) => {
              alert(error.data.message);
            })
            .finally(() => {
              setSubmitting(false);
              setIsEditing(false);
            });
        }}
      >
        {({
          values,
          errors,
          isSubmitting,
          handleChange,
          touched,
          handleSubmit,
        }) => (
          <Grid
            container
            elevation={10}
            sx={{
              margin: '40px auto',
              width: '80%',
              p: 2,
              bgcolor: 'paper',
              borderRadius: 2,
            }}
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
              <Grid
                item
                xs={4}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  onClick={handleCancelEditing}
                  sx={{ mx: 2 }}
                >
                  Cancelar
                </Button>

                <LoadingButton
                  size="small"
                  loading={isSubmitting}
                  variant="contained"
                  color="accent"
                  onClick={handleSubmit}
                >
                  Salvar
                </LoadingButton>
              </Grid>
            ) : (
              <Grid
                item
                xs={4}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  onClick={() => setShowForm(true)}
                  sx={{ mx: 4 }}
                >
                  Alterar Senha
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="accent"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Editar
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteUser}
                  sx={{ mx: 2 }}
                >
                  Excluir
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Formik>

      <Form visible={showForm} setVisible={setShowForm} />
    </>
  );
};

export default Profile;
