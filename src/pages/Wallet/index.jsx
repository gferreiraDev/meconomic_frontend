import { Alert, Loader, NoContent, PageHeader } from '../../components';
import { useEffect, useState } from 'react';
import List from './List';
import Form from './Form';
import { useListReservesQuery } from '../../services/reserveService';

/* ======= | Page | ============================================================================== */
const Wallet = () => {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState({
    message: '',
    error: false,
    visible: false,
  });

  const { data, isLoading, isError, isSuccess, refetch } =
    useListReservesQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCloseForm = (response, isError) => {
    setMessage({ message: response, error: isError, visible: true });
    setShowForm(false);
    refetch();
  };

  const handleSelect = (value) => {
    setSelected(value);
    setShowForm(true);
  };

  const handleDelete = (message) => {
    setMessage((prev) => ({ ...prev, message: message, visible: true }));
    refetch();
  };

  return (
    <>
      <PageHeader
        title="Minha Carteira"
        subtitle="Saldo atual em carteira e/ou conta"
        label="Incluir"
        action={() => handleSelect(null)}
      />
      {isLoading ? (
        <Loader />
      ) : isSuccess && data?.data?.length ? (
        <List data={data.data} onEdit={handleSelect} onDelete={handleDelete} />
      ) : (
        <NoContent text="Nenhum registro para exibir" />
      )}
      <Form
        open={showForm}
        action={handleCloseForm}
        data={selected}
        close={() => setShowForm(false)}
      />
      <Alert
        open={message.visible}
        handleClose={() =>
          setMessage((prev) => ({ ...prev, visible: !prev.visible }))
        }
        message={message.message}
        error={message.error}
      />
    </>
  );
};

export default Wallet;
