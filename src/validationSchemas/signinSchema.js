import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .email('Formato inválido')
    .required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
});
