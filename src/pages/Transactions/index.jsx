import { useEffect, useState } from 'react';
import { Loader, NoContent, PageHeader } from '../../components';
import { Box } from '@mui/material';

/* ======= | Page | ============================================================================== */
const Transactions = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  return (
    <Box
      sx={{
        border: 'solid 2px #fff',
        flex: 1,
        p: 2,
      }}
    >
      <PageHeader
        title="Lançamentos"
        subtitle="Receitas e despesas mês a mês"
        label="Incluir"
        action={() => console.log('Form here')}
      />

      {loading ? (
        <Loader />
      ) : (
        <NoContent text="Nenhum conteúdo a ser exibido" action={() => setLoading(true)} actionLabel="Recarregar" />
      )}
    </Box>
  );
};

export default Transactions;
