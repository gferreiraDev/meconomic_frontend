import * as yup from 'yup';

export const schema = yup.object({
  type: yup
    .string()
    .oneOf(['Carteira', 'Conta Bancária'], 'Tipo inválido')
    .required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  amount: yup.string().min(0, 'Valor inválido').required('Campo obrigatório'),
});
