import * as yup from 'yup';

export const schema = yup.object({
  description: yup.string().required('Campo obrigatório'),
  targetValue: yup.string().required('Campo obrigatório'),
  currentValue: yup.string().required('Campo obrigatório'),
  deadline: yup.date().required('Campo obrigatório'),
  status: yup.string().required('Campo obrigatório'),
});
