export const formatCurrency = (value) => {
  if (typeof value === 'string') {
    return parseFloat(value.replace(',', '.'));
  }
  return value;
};

export const stringToDate = (dateString) => {
  if (!dateString || dateString === '') {
    // return new Date();
    return null;
  }

  const [month, year] = dateString.split('/');

  const parserMonth = parseInt(month, 10);
  const parserYear = parseInt(20 + year, 10);

  return new Date(parserYear, parserMonth, 1);
};
