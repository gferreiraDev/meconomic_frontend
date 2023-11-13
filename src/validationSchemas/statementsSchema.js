import * as yup from 'yup';

export const schema = yup.object({
  type: yup
    .string()
    .matches(/['DF', 'DV', 'DA', 'RF', 'RV', 'RA']/)
    .required('Campo obrigatório'),
  category: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  expectedValue: yup.string().required('Campo obrigatório'),
  dueDay: yup
    .number()
    .min(1, 'Valor inválido')
    .max(31, 'Valor inválido')
    .required('Campo obrigatório'),
  months: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string(),
        checked: yup.boolean(),
      })
    )
    .test('values', 'Selecione pelo menos um mês', (months) =>
      months.reduce((sum, month) => (sum += month.checked ? 1 : 0), 0)
    ),
});
