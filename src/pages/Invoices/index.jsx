import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Alert, Loader, NoContent, PageHeader } from '../../components';
import { useListPurchasesQuery } from '../../services/purchaseService';
import { useListCardsQuery } from '../../services/cardService';
import { useEffect, useState } from 'react';
import { addMonths } from 'date-fns';
import List from './List';
import Form from './Form';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

/* ======= | Page | ============================================================================== */
const Invoices = () => {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [card, setCard] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [message, setMessage] = useState({
    message: '',
    error: false,
    visible: false,
  });

  const { data: cards } = useListCardsQuery();
  const { data, isLoading, isError, isSuccess, refetch } =
    useListPurchasesQuery({
      cardId: card,
      dueDate: currentDate.toISOString(),
    });

  const handleSelect = (value) => {
    setSelected(value);
    setShowForm(true);
  };

  const handleSelectCard = (card) => {
    setCard(card);
    refetch();
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => addMonths(prev, -1));
    refetch();
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
    refetch();
  };

  const handleGetInvoiceTotal = (data) => {
    let result = 0;

    if (data.length > 0)
      result = data.reduce((sum, current) => (sum += current.currentValue), 0);

    return result.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
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
        title="Faturas"
        subtitle="Calculo das compras no cartão"
        label="Incluir"
        action={() => handleSelect(null)}
      />

      {isLoading ? (
        <Loader />
      ) : isSuccess && data ? (
        <List
          rows={data}
          selected={selected}
          setSelected={setSelected}
          edit={handleSelect}
          cards={cards.data}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              '& .MuiOutlinedInput-input': {
                boxSizing: 'border-box',
                borderRadius: 1,
                padding: '5px 10px',
              },
            }}
          >
            <Typography mr={2}>Cartão</Typography>

            <Select
              sx={{ width: 180 }}
              value={card}
              onChange={(e) => handleSelectCard(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              {cards?.data &&
                cards.data.map((currentCard) => (
                  <MenuItem key={currentCard.id} value={currentCard.id}>
                    {currentCard.name}
                  </MenuItem>
                ))}
            </Select>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Período</Typography>

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
                disabled
              />

              <IconButton size="small" onClick={handleNextMonth}>
                <ArrowRightOutlined />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">TOTAL</Typography>
            <Typography variant="body1" sx={{ px: 2 }}>
              {handleGetInvoiceTotal(data?.data)}
            </Typography>
          </Box>
        </List>
      ) : (
        <NoContent
          text="Nenhum conteúdo a ser exibido"
          action={refetch}
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

export default Invoices;
