import { useEffect, useState } from 'react';
import { Loader, NoContent, PageHeader } from '../../components';
import { Box } from '@mui/material';

/* ======= | Page | ============================================================================== */
const Cards = () => {
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
        title="Meus Cartões"
        subtitle="Lista de cartões de crédito"
        label="Incluir"
        action={() => console.log('Card Form here')}
      />

      {loading ? (
        <Loader />
      ) : (
        <NoContent text="Nenhum conteúdo a ser exibido" action={() => setLoading(true)} actionLabel="Recarregar" />
      )}
    </Box>
  );
};

export default Cards;
