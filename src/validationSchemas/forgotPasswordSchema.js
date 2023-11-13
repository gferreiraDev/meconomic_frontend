import * as yup from 'yup';

export const schema = yup.object().shape(
  {
    document: yup.string().when('email', {
      is: (email) => !email,
      then: () =>
        yup
          .string()
          .matches(
            /^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[.-][0-9]{2}$/,
            'CPF inválido'
          )
          .required('Informe e-mail ou o cpf cadastrados'),
    }),
    email: yup
      .string()
      .trim()
      .when('document', {
        is: (document) => !document,
        then: () =>
          yup
            .string()
            .email('Formato de e-mail inválido')
            .required('Informe e-mail ou o cpf cadastrados'),
      }),
  },
  [['document', 'email']]
);
