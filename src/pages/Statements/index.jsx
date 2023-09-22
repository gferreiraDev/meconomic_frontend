import { useListQuery, useDeleteMutation } from '../../services/statementService';
import { Loader, PageHeader, Alert } from '../../components';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Form from './Form';
import List from './List';

const Statements = () => {
  const [drop] = useDeleteMutation();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState({ message: '', error: false, visible: false });
  const { data, isLoading, isError, isSuccess, refetch } = useListQuery();

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
      .catch((error) => setMessage({ message: error.data.message, error: true, visible: true }))
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
    <Box
      sx={{
        flex: 1,
        p: 2,
      }}
    >
      <PageHeader
        title="Registros"
        subtitle="Receitas e Despesas recorrentes"
        label="Incluir"
        action={() => handleSelect(null)}
      />

      {isLoading ? (
        <Loader />
      ) : isSuccess && data ? (
        <List
          columns={[
            { id: 'type', label: 'Tipo', align: 'center', format: 'text' },
            { id: 'category', label: 'Categoria', align: 'center', format: 'text' },
            { id: 'description', label: 'Descrição', align: 'center', format: 'text' },
            { id: 'expectedValue', label: 'Valor Médio', align: 'center', format: 'currency' },
            { id: 'dueDay', label: 'Dia de Vencimento', align: 'center', format: 'text' },
            { id: 'installments', label: 'Parcelas', align: 'center', format: 'text' },
          ]}
          rows={data.data}
          selected={selected}
          setSelected={setSelected}
          onEdit={() => setShowForm(true)}
          onDelete={handleDelete}
        />
      ) : null}

      <Form open={showForm} action={handleCloseForm} data={selected} close={() => setShowForm(false)} />

      <Alert
        open={message.visible}
        handleClose={() => setMessage((prev) => ({ ...prev, visible: !prev.visible }))}
        message={message.message}
        error={message.error}
      />
    </Box>
  );
};

export default Statements;
