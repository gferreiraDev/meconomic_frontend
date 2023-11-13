export const types = [
  { id: 1, label: 'DF', description: 'Despesa Fixa' },
  { id: 2, label: 'DV', description: 'Despesa Variável' },
  { id: 3, label: 'DA', description: 'Despesa Adicional' },
  { id: 4, label: 'RF', description: 'Receita Fixa' },
  { id: 5, label: 'RV', description: 'Receita Variável' },
  { id: 6, label: 'RA', description: 'Receita Adicional' },
];

export const categories = [
  { id: 1, label: 'Alimentação' },
  { id: 2, label: 'Cuidados Pessoais' },
  { id: 3, label: 'Salário' },
  { id: 4, label: 'Aluguel' },
  { id: 5, label: 'Impostos & Taxas' },
  { id: 6, label: 'Transporte' },
  { id: 7, label: 'Educação' },
  { id: 8, label: 'Saúde' },
  { id: 9, label: 'Doações' },
  { id: 10, label: 'Presentes' },
  { id: 11, label: 'Outros' },
];

export const days = (function getDays() {
  const items = [];

  for (let day = 1; day <= 31; day++) {
    items.push(day);
  }
  return items;
})();

export const cardStatus = [
  { id: 1, label: 'Ativo' },
  { id: 2, label: 'Bloqueado' },
  { id: 3, label: 'Cancelado' },
  { id: 4, label: 'Pendente' },
];

export const brands = [
  { id: 1, label: 'Amex' },
  { id: 2, label: 'Elo' },
  { id: 3, label: 'Mastercard' },
  { id: 4, label: 'Visa' },
  { id: 5, label: 'Outro' },
];

export const chargeRules = [
  { id: 1, value: 'always', label: 'Sempre' },
  { id: 2, value: 'invoice-only', label: 'Se houver fatura' },
  { id: 3, value: 'never', label: 'Nunca' },
];

export const transactionStatus = [
  { id: 1, label: 'Pendente' },
  { id: 2, label: 'Quitado' },
  { id: 3, label: 'Vencido' },
  { id: 4, label: 'Cancelado' },
  { id: 5, label: 'Isento' },
];

export const investmentTypes = [
  { id: 1, value: 'RF', description: 'Renda Fixa' },
  { id: 2, value: 'RV', description: 'Renda Variável' },
];

export const investmentCategories = [
  { id: 1, type: 'Renda Fixa', value: 'CDB' },
  { id: 2, type: 'Renda Fixa', value: 'CRI/CRA' },
  { id: 3, type: 'Renda Fixa', value: 'Debênture' },
  { id: 4, type: 'Renda Fixa', value: 'LCI/LCA' },
  { id: 5, type: 'Renda Fixa', value: 'Tesouro Direto' },
  { id: 6, type: 'Renda Fixa', value: 'Poupança' },
  { id: 7, type: 'Renda Variável', value: 'Ação' },
  { id: 8, type: 'Renda Variável', value: 'ETF' },
  { id: 9, type: 'Renda Variável', value: 'FII' },
  { id: 10, type: 'Renda Variável', value: 'BDR' },
];

export const investmentStatus = [
  { id: 1, label: 'Em Andamento' },
  { id: 2, label: 'Planejado' },
];
