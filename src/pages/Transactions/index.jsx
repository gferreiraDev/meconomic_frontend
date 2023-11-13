import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Alert, Loader, NoContent, PageHeader } from '../../components';
import { VisibilityOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { addMonths } from 'date-fns';
import ModalBox from './ModalBox';
import Form from './Form';
import List from './List';
import {
  useListTransactionsQuery,
  useDeleteTransactionMutation,
} from '../../services/transactionService';

const Transactions = () => {
  const [showContent, setShowContent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [message, setMessage] = useState({
    message: '',
    error: false,
    visible: false,
  });
  const [showResume, setShowResume] = useState(false);
  const [drop] = useDeleteTransactionMutation();

  const { data, isLoading, isError, isSuccess, refetch } =
    useListTransactionsQuery(currentDate.toISOString());

  const handleSelect = (value) => {
    setSelected(value);
    setShowForm(true);
  };

  const handleRemove = (value) => {
    drop({ id: value.id })
      .unwrap()
      .then((response) => {
        response;
      })
      .catch((error) => {})
      .finally(() => {
        refetch();
      });
  };

  const handleCloseForm = (response, isError) => {
    setMessage({ message: response, error: isError, visible: true });
    setShowForm(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const toggleResumeData = () => {
    setShowResume((prev) => !prev);
  };

  useEffect(() => {
    if (!showForm) refetch();
  }, [showForm, refetch]);

  return (
    <>
      <PageHeader
        title="Lançamentos"
        subtitle="Fluxo mensal de receitas e despesas"
        label="Incluir"
        action={() => handleSelect(null)}
      />

      {isLoading || !data ? (
        <Loader />
      ) : isSuccess && data ? (
        <List
          rows={data?.data}
          selected={selected}
          setSelected={setSelected}
          edit={handleSelect}
          remove={handleRemove}
        >
          <Typography
            variant="h6"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            Período
          </Typography>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              '& .MuiTextField-root .MuiOutlinedInput-input': {
                boxSizing: 'border-box',
                borderRadius: 1,
                p: 2,
              },
            }}
          >
            <IconButton size="small" onClick={handlePrevMonth}>
              <ArrowLeftOutlined />
            </IconButton>

            <TextField
              sx={{ width: 180 }}
              value={currentDate.toLocaleString('pt-br', {
                month: 'long',
                year: 'numeric',
              })}
              aria-readonly
            />

            <IconButton size="small" onClick={handleNextMonth}>
              <ArrowRightOutlined />
            </IconButton>
          </Box>

          <Box>
            <Button onClick={toggleResumeData}>
              <VisibilityOutlined
                sx={{ fontSize: 20, color: 'text.primary' }}
              />
              <Typography
                variant="caption"
                ml={1}
                color="text.primary"
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                Ver Detalhes
              </Typography>
            </Button>
          </Box>
        </List>
      ) : (
        <NoContent
          text="Nenhum conteúdo a ser exibido"
          action={() => setShowContent(!showContent)}
          actionLabel="Recarregar"
        />
      )}

      <Form
        open={showForm}
        action={handleCloseForm}
        data={selected}
        close={() => setShowForm(false)}
      />
      <ModalBox
        open={showResume}
        handleClose={toggleResumeData}
        report={data?.data?.report}
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

export default Transactions;
