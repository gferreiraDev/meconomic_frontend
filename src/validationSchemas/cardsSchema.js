import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  brand: yup.string().required('Campo obrigatório'),
  lastNumbers: yup.string().required('Campo obrigatório'),
  limit: yup.string().min(0, 'Valor inválido').required('Campo obrigatório'),
  closingDay: yup
    .number()
    .min(1, 'Valor inválido')
    .max(31, 'Valor inválido')
    .required('Campo obrigatório'),
  dueDay: yup
    .number()
    .min(1, 'Valor inválido')
    .max(31, 'Valor inválido')
    .required('Campo obrigatório'),
  annuity: yup.string().required('Campo obrigatório'),
  fees: yup.string().required('Campo obrigatório'),
  chargeRule: yup.string().required('Campo obrigatório'),
  expiryDate: yup.string().required('Campo obrigatório'),
  status: yup.string().required('Campo obrigatório'),
});
