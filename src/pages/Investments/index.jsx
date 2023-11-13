import { useState } from 'react';
import { Alert, Loader, NoContent, PageHeader } from '../../components';
import Form from './Form';
import List from './List';
import {
  useListInvestmentsQuery,
  useDeleteInvestmentMutation,
} from '../../services/investmentService';

const Investments = () => {
  const [drop] = useDeleteInvestmentMutation();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState({
    message: '',
    error: false,
    visible: false,
  });
  const { data, isLoading, isError, isSuccess, refetch } =
    useListInvestmentsQuery();

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
    refetch();
  };

  return (
    <>
      <PageHeader
        title="Investimentos"
        subtitle="Listagem dos meus investimentos"
        label="Incluir"
        action={() => handleSelect(null)}
      />

      {isLoading ? (
        <Loader />
      ) : isSuccess && data?.data ? (
        <List
          rows={data?.data}
          onDelete={handleDelete}
          setSelected={setSelected}
          onEdit={() => setShowForm(true)}
          columns={[
            { id: 'type', label: 'Tipo', align: 'left', format: 'text' },
            {
              id: 'category',
              label: 'Categoria',
              align: 'left',
              format: 'text',
            },
            {
              id: 'description',
              label: 'Descrição',
              align: 'left',
              format: 'text',
            },
            {
              id: 'value',
              label: 'Valor Aportado',
              align: 'center',
              format: 'currency',
            },
            {
              id: 'dueDate',
              label: 'Vencimento',
              align: 'center',
              format: 'date',
            },
            {
              id: 'profitability',
              label: 'Rentabilidade',
              align: 'center',
              format: 'percent',
            },
          ]}
        />
      ) : (
        <NoContent text="Nenhum conteúdo a ser exibido" />
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
        onDelete={handleDelete}
        onEdit={() => setShowForm(true)}
      />
    </>
  );
};

export default Investments;
