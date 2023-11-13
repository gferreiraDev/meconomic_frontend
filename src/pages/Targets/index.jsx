import { Alert, Loader, NoContent, PageHeader } from '../../components';
import { useState } from 'react';
import { useListTargetsQuery } from '../../services/targetService';
import List from './List';
import Form from './Form';

/* ======= | Page | ============================================================================== */
const Targets = () => {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState({
    message: '',
    error: false,
    visible: false,
  });

  const { data, isLoading, isError, isSuccess, refetch } =
    useListTargetsQuery();

  const handleSelect = (value) => {
    setSelected(value);
    setShowForm(true);
  };

  const handleCloseForm = (response, isError) => {
    setMessage({ message: response, error: isError, visible: true });
    setShowForm(false);
    refetch();
  };

  return (
    <>
      <PageHeader
        title="Minhas Metas"
        subtitle="Planejamento das realizações"
        label="Incluir"
        action={() => handleSelect(null)}
      />

      {isLoading ? (
        <Loader />
      ) : isSuccess && data?.data && data?.data?.length ? (
        <List
          data={data?.data}
          setSelected={handleSelect}
          onResponse={handleCloseForm}
        />
      ) : (
        <NoContent
          text="Nenhum conteúdo a ser exibido"
          action={() => refetch()}
          actionLabel="Recarregar"
        />
      )}

      <Form
        open={showForm}
        action={handleCloseForm}
        data={selected}
        close={() => setShowForm(false)}
      />

      <Alert
        error={message.error}
        message={message.message}
        open={message.visible}
        handleClose={() => setMessage((prev) => ({ ...prev, visible: false }))}
      />
    </>
  );
};

export default Targets;
