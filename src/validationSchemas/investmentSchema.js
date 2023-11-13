import * as yup from 'yup';

export const schema = yup.object({
  type: yup.string().required('Campo obrigatório'),
  category: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  value: yup.string().required('Campo obrigatório'),
  emitter: yup.string(),
  dueDate: yup.date().required('Campo obrigatório'),
  profitability: yup.string().required('Campo obrigatório'),
  profitabilityType: yup.string().required('Campo obrigtório'),
  fees: yup.string().required('Campo obrigatório'),
  status: yup.string().required('Campo obrigatório'),
});
