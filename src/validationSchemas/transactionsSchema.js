import * as yup from 'yup';

export const schema = yup.object({
  type: yup
    .string()
    .matches(/['DA', 'RA']/)
    .required('Campo obrigatório'),
  category: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  value: yup.string().required('Campo obrigatório'),
  dueDate: yup.date().required('Campo obrigatório'),
  payDate: yup.date().required('Campo obrigatório'),
  installment: yup.number().min(1).required('Campo obrigatório'),
  installments: yup.number().min(1).required('Campo obrigatório'),
  status: yup.string().required('Campo obrigatório'),
});
