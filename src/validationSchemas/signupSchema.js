import * as yup from 'yup';

const phoneRegEx = /^\([1-9]{2}\) [0-9]{5}-[0-9]{4}$/;

export const schema = yup.object({
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
    .email('Formato de e-mail inválido')
    .required('E-mail é obrigatório'),
  phone: yup
    .string()
    .matches(phoneRegEx, 'Telefone inválido')
    .required('Telefone é obrigatório'),
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
