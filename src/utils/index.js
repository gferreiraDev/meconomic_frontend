export const formatCurrency = (value) => {
  if (typeof value === 'string') {
    return parseFloat(value.replace(',', '.'));
  }
  return value;
};

export const stringToDate = (dateString) => {
  if (!dateString || dateString === '') {
    return null;
  }

  const [month, year] = dateString.split('/');

  const parserMonth = parseInt(month, 10) - 1;
  const parserYear = parseInt(20 + year, 10);

  return new Date(parserYear, parserMonth, 1);
};

export const dayToDate = (day) => {
  const refDate = new Date();

  return new Date(refDate.getFullYear(), refDate.getMonth(), day);
};

export const currency = (value) => {
  const format = typeof value === 'number' ? value : 0;

  return format.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

export const formatDate = (date) => {
  if (!date) return new Date().toLocaleDateString('pt-br');

  return new Date(date).toLocaleDateString('pt-br');
};
