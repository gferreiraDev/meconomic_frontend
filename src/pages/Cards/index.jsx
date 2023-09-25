import {
  useDeleteCardMutation,
  useListCardsQuery,
} from '../../services/cardService';
import { Alert, Loader, PageHeader } from '../../components';
import { useEffect, useState } from 'react';
import Form from './Form';
import List from './List';

const Cards = () => {
  const [drop] = useDeleteCardMutation();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState({
    message: '',
    error: false,
    visible: false,
  });
  const { data, isLoading, isError, isSuccess, refetch } = useListCardsQuery();

  const handleSelect = (value) => {
    setSelected(value);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (!selected) return;

    drop({ id: selected.id })
      .unwrap()
      .then(({ message }) => {
        setMessage({ message, error: false, visible: true });
      })
      .catch((error) =>
        setMessage({ message: error.data.message, error: true, visible: true })
      )
      .finally(() => {
        refetch();
      });
  };

  const handleCloseForm = (response, isError) => {
    setMessage({ message: response, error: isError, visible: true });
    setShowForm(false);
  };

  useEffect(() => {
    if (!showForm) refetch();
  }, [showForm, refetch]);

  return (
    <>
      <PageHeader
        title="Meus Cartões"
        subtitle="Lista de cartões de crédito"
        label="Incluir"
        action={() => handleSelect(null)}
      />

      {isLoading ? (
        <Loader />
      ) : isSuccess && data ? (
        <List
          columns={[
            { id: 'name', label: 'Nome', align: 'left', format: 'text' },
            {
              id: 'limit',
              label: 'Limite Total',
              align: 'center',
              format: 'currency',
            },
            {
              id: 'currentLimit',
              label: 'Limite Disponível',
              align: 'center',
              format: 'currency',
            },
            {
              id: 'annuity',
              label: 'Anuidade',
              align: 'center',
              format: 'currency',
            },
            { id: 'fees', label: 'Taxas', align: 'center', format: 'currency' },
            {
              id: 'expiryDate',
              label: 'Validade',
              align: 'center',
              format: 'text',
            },
            { id: 'status', label: 'Status', align: 'center', format: 'text' },
          ]}
          rows={data.data}
          selected={selected}
          setSelected={setSelected}
          onEdit={() => setShowForm(true)}
          onDelete={handleDelete}
        />
      ) : null}

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

export default Cards;
