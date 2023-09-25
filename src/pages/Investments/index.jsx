import { useEffect, useState } from 'react';
import { Loader, NoContent, PageHeader } from '../../components';
import { Box } from '@mui/material';

/* ======= | Page | ============================================================================== */
const Investments = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  return (
    <>
      <PageHeader
        title="Investimentos"
        subtitle="Lista dos investimentos atuais"
        label="Incluir"
        action={() => console.log('Form here')}
      />

      {loading ? (
        <Loader />
      ) : (
        <NoContent text="Nenhum conteúdo a ser exibido" action={() => setLoading(true)} actionLabel="Recarregar" />
      )}
    </>
  );
};

export default Investments;
