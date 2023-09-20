import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Loader, NoContent, PageHeader } from '../../components';
import { Box, Grid, Typography, IconButton, Card, Chip, CardContent, CardActions, CardActionArea } from '@mui/material';
import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import { useDeleteCardMutation, useListCardsQuery } from '../../services/cardService';

/* ======= | List | ============================================================================== */
const CardsList = ({ rows, edit, remove }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        height: '80vh',
        border: 'solid 2px #fff',
        mt: 2,
        overflowY: 'scroll',
      }}
    >
      {rows.map((card) => (
        <Card key={card.id} sx={{ display: { xs: 'block', md: 'flex' }, flexDirection: 'row', width: '100%', mb: 1 }}>
          <CardActionArea onClick={() => navigate(`/invoices/${card?.id}`)}>
            <CardContent sx={{ p: { xs: 1, md: 1.5 } }}>
              <Grid container columns={12} spacing={1}>
                <Grid item xs={2} sx={{ display: { xs: 'none', lg: 'block' } }}>
                  <Box sx={{ height: 70, p: 1, borderRadius: 2, bgcolor: '#00000033' }}>
                    <Typography variant="body2">****.****.****.{card?.lastNumbers}</Typography>
                    <Typography variant="body2">{card?.expiryDate}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={4} md={2}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Nome do Cartão
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', ml: 1 }}>
                    {card?.name}
                  </Typography>
                </Grid>

                <Grid item xs={4} md={2}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Limite Total
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', ml: 1 }}>
                    {card?.limit.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                </Grid>

                <Grid item xs={4} md={2}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Limite Disponível
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', ml: 1 }}>
                    {card?.currentLimit.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                </Grid>

                <Grid item xs={4} md={1.5}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Anuidade
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', ml: 1 }}>
                    {card?.annuity.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#aaa' }}>
                    12x {(card?.annuity / 12).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                </Grid>

                <Grid item xs={4} md={1.5}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Taxas
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', ml: 1 }}>
                    {card?.fees.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#aaa' }}>
                    12x {(card?.fees / 12).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                </Grid>

                <Grid item xs={4} md={1}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Status
                  </Typography>
                  <Chip
                    variant="outlined"
                    size="small"
                    color={card?.status === 'Ativo' ? 'success' : card?.status === 'Bloqueado' ? 'error' : 'info'}
                    label={card?.status}
                  />
                  <Typography variant="body2">{}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>

          <CardActions
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              alignItems: 'center',
              justifyContent: { xs: 'flex-end', md: 'space-around' },
              p: { xs: 0 },
            }}
          >
            <IconButton size="small" onClick={() => edit(card)}>
              <EditOutlined fontSize="inherit" />
            </IconButton>

            <IconButton size="small" onClick={() => remove(card)}>
              <DeleteOutlineOutlined fontSize="inherit" />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

CardsList.propTypes = {
  rows: PropTypes.array,
  edit: PropTypes.func,
  remove: PropTypes.func,
};

/* ======= | Page | ============================================================================== */
const Cards = () => {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAttrs, setDialogAttrs] = useState(null);
  const [drop] = useDeleteCardMutation();
  const { data, isLoading, isError, isSuccess, refetch } = useListCardsQuery();

  const handleSelect = (value) => {
    setSelected(value);
    setShowForm(true);
  };

  const handleRemove = (value) => {
    drop({ id: value.id })
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        refetch();
      });
  };

  const handleCloseForm = (response, isError) => {
    setDialogAttrs({ message: response, error: isError });
    setShowForm(false);
    setShowDialog(true);
  };

  useEffect(() => {
    if (!showForm) refetch();
  }, [showForm, refetch]);

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
        action={() => handleSelect(null)}
      />

      {isLoading ? (
        <Loader />
      ) : isSuccess && data ? (
        <CardsList rows={data.data} edit={handleSelect} remove={handleRemove} />
      ) : (
        <NoContent text="Nenhum conteúdo a ser exibido" action={() => refetch()} actionLabel="Recarregar" />
      )}

      <Form open={showForm} action={handleCloseForm} data={selected} close={() => setShowForm(false)} />
    </Box>
  );
};

export default Cards;
