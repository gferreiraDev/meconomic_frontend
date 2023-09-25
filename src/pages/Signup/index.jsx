import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useSignupMutation } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useMask } from '@react-input/mask';
import { LoadingButton } from '@mui/lab';
import { Alert } from '../../components';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Grid,
  Typography,
  TextField,
  Checkbox,
  Paper,
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
    password: yup.string().required('Senha é obrigatório'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas não conferem')
      .required('Campo obrigatório'),
    acceptTerms: yup.boolean().isTrue('É necessário aceitar os termos de uso'),
  });

  return (
    <Formik
      validationSchema={validations}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        signup(values)
          .unwrap()
          .then(({ message }) => {
            setSubmitting(false);
            setMessage({ error: false, message, visible: true });
            resetForm();
            navigate('/signin', { replace: true });
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
              onChange={handleChange('firstName')}
              onBlur={handleBlur}
              error={touched.firstName && !!errors.firstName}
              helperText={errors.firstName ? errors.firstName : ''}
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
              onChange={handleChange('lastName')}
              error={touched.lastName && !!errors.lastName}
              helperText={errors.lastName}
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
              helperText={errors.email}
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
              helperText={errors.phone}
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
              helperText={errors.document}
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
              <FormHelperText sx={{ color: 'error.light' }}>
                {errors.acceptTerms}
              </FormHelperText>
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

// import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
// import { useSignupMutation } from '../../services/authService';
// import { useNavigate } from 'react-router-dom';
// import { useMask } from '@react-input/mask';
// import { LoadingButton } from '@mui/lab';
// import { Alert } from '../../components';
// import { useState } from 'react';
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import {
//   Grid,
//   Typography,
//   TextField,
//   Checkbox,
//   Paper,
//   Avatar,
//   FormControlLabel,
//   Link,
//   InputAdornment,
//   IconButton,
//   FormControl,
//   FormHelperText,
// } from '@mui/material';

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState({
//     message: '',
//     error: false,
//     visible: false,
//   });
//   const [signup] = useSignupMutation();
//   const navigate = useNavigate();

//   const phoneMaskRef = useMask({ mask: '(__) _____-____', replacement: '_' });
//   const documentMaskRef = useMask({ mask: '___.___.___-__', replacement: '_' });

//   const initialValues = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     document: '',
//     password: '',
//     confirmPassword: '',
//     acceptTerms: false,
//   };

//   const validations = yup.object({
//     firstName: yup
//       .string()
//       .min(3, 'Nome muito curto')
//       .required('Nome é obrigatório'),
//     lastName: yup
//       .string()
//       .min(3, 'Sobrenome muito curto')
//       .required('Sobrenome é obrigatório'),
//     email: yup
//       .string()
//       .email('Formato inválido')
//       .required('E-mail é obrigatório'),
//     phone: yup.string().required('Telefone é obrigatório'),
//     document: yup
//       .string()
//       .matches(/^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[.-][0-9]{2}$/, 'CPF inválido')
//       .required('CPF é obrigatório'),
//     password: yup.string().required('Senha é obrigatório'),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref('password')], 'Senhas não conferem')
//       .required('Campo obrigatório'),
//     acceptTerms: yup.boolean().isTrue('É necessário aceitar os termos de uso'),
//   });

//   return (
//     <Grid
//       elevation={10}
//       sx={{
//         p: 2,
//         height: '80vh',
//         width: 400,
//         m: 'auto',
//         bgcolor: 'paper',
//       }}
//       align="center"
//     >
//       <Grid container alignItems="center" spacing={2}>
//         <Grid
//           item
//           xs={12}
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ bgcolor: 'accent.main', mr: 2 }}>
//             <LockOutlined />
//           </Avatar>
//           <Typography sx={{ gridColumn: 'span 2' }} variant="h5">
//             SignUp
//           </Typography>
//         </Grid>
//       </Grid>

//       <Formik
//         validationSchema={validations}
//         initialValues={initialValues}
//         onSubmit={(values, { setSubmitting, resetForm }) => {
//           signup(values)
//             .unwrap()
//             .then(({ message }) => {
//               setSubmitting(false);
//               setMessage({ error: false, message, visible: true });
//               resetForm();
//               navigate('/signin', { replace: true });
//             })
//             .catch((error) => {
//               setSubmitting(false);
//               setMessage({
//                 error: true,
//                 message: error.data.message,
//                 visible: true,
//               });
//             });
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           isSubmitting,
//           handleSubmit,
//           setFieldValue,
//         }) => (
//           <Grid container columns={4} rowGap={2} columnSpacing={1}>
//             <Grid item xs={2}>
//               <TextField
//                 label="Nome"
//                 placeholder="Digite seu primeiro nome"
//                 name="firstName"
//                 value={values.firstName}
//                 onChange={handleChange('firstName')}
//                 onBlur={handleBlur}
//                 error={touched.firstName && !!errors.firstName}
//                 helperText={errors.firstName ? errors.firstName : ''}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={2}>
//               <TextField
//                 label="Sobrenome"
//                 placeholder="Digite seu sobrenome"
//                 name="lastName"
//                 value={values.lastName}
//                 onBlur={handleBlur}
//                 onChange={handleChange('lastName')}
//                 error={touched.lastName && !!errors.lastName}
//                 helperText={errors.lastName}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={4}>
//               <TextField
//                 label="E-mail"
//                 placeholder="Digite seu e-mail"
//                 name="email"
//                 value={values.email}
//                 onChange={handleChange('email')}
//                 error={touched.email && !!errors.email}
//                 helperText={errors.email}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={2}>
//               <TextField
//                 inputRef={phoneMaskRef}
//                 label="Telefone"
//                 placeholder="Digite seu telefone"
//                 name="phone"
//                 value={values.phone}
//                 onChange={handleChange('phone')}
//                 error={touched.phone && !!errors.phone}
//                 helperText={errors.phone}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={2}>
//               <TextField
//                 inputRef={documentMaskRef}
//                 label="CPF"
//                 placeholder="Digite seu CPF"
//                 name="document"
//                 value={values.document}
//                 onChange={handleChange('document')}
//                 error={touched.document && !!errors.document}
//                 helperText={errors.document}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={2}>
//               <TextField
//                 label="Senha"
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Digite sua senha"
//                 name="password"
//                 value={values.password}
//                 onChange={handleChange('password')}
//                 error={touched.password && !!errors.password}
//                 helperText={errors.password}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={2}>
//               <TextField
//                 label="Confirme a senha"
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Confirme sua senha"
//                 name="confirmPassword"
//                 value={values.confirmPassword}
//                 onChange={handleChange('confirmPassword')}
//                 error={touched.confirmPassword && !!errors.confirmPassword}
//                 helperText={errors.confirmPassword}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth
//               />
//             </Grid>

//             <FormControl error={touched.acceptTerms && !!errors.acceptTerms}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     name="acceptTerms"
//                     color="primary"
//                     checked={values.acceptTerms}
//                     onChange={() =>
//                       setFieldValue('acceptTerms', !values.acceptTerms)
//                     }
//                   />
//                 }
//                 label="Aceito os Termos de Uso"
//               />
//               <FormHelperText sx={{ color: 'error.light' }}>
//                 {errors.acceptTerms}
//               </FormHelperText>
//             </FormControl>

//             <LoadingButton
//               fullWidth
//               variant="contained"
//               color="accent"
//               loading={isSubmitting}
//               onClick={handleSubmit}
//             >
//               Cadastrar
//             </LoadingButton>
//           </Grid>
//         )}
//       </Formik>

//       <Grid>
//         <Typography>
//           Já possui conta?&nbsp;
//           <Link
//             href="/signin"
//             sx={{ textDecoration: 'none', color: 'accent.main' }}
//           >
//             &nbsp;Entre
//           </Link>
//         </Typography>
//       </Grid>

//       <Alert
//         open={message.visible}
//         handleClose={() =>
//           setMessage((prev) => ({ ...prev, visible: !prev.visible }))
//         }
//         message={message.message}
//         error={message.error}
//       />
//     </Grid>
//   );
// };

// export default Signup;
