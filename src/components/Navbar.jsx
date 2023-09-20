import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MenuOutlined,
  AccountBalanceWalletOutlined,
  AutoStoriesOutlined,
  AutoGraphOutlined,
  CurrencyExchangeOutlined,
  PersonOutlineOutlined,
  SavingsOutlined,
  CreditCardOutlined,
  SellOutlined,
  PowerSettingsNewOutlined,
  BeenhereOutlined,
  CloseOutlined,
  DarkModeOutlined,
  LightModeOutlined,
} from '@mui/icons-material';

/* ===== | NavItem | ================================================================== */
const NavItem = ({ item, ...props }) => {
  const { title, icon } = item;

  return (
    <ListItemButton
      // component={NavLink}
      // to={target}
      sx={{
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        color: '#1f2a40',
        borderRadius: 5,
        '&:hover': {
          backgroundColor: '#',
        },
        '&.active': {
          color: '#47caff',
          fontWeight: 'bold',
        },
      }}
      {...props}
    >
      <ListItemIcon
        sx={{
          width: 18,
          height: 18,
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>

      <ListItemText disableTypography primary={title} />
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
};

/* ===== | NavBar | ================================================================== */
const Navbar = ({ ...props }) => {
  const menuItens = [
    { title: 'Dashboard', target: '/dashboard', icon: <AutoGraphOutlined /> },
    { title: 'Registros', target: '/statements', icon: <AutoStoriesOutlined /> },
    { title: 'Lançamentos', target: '/transactions', icon: <CurrencyExchangeOutlined /> },
    { title: 'Cartões', target: '/cards', icon: <CreditCardOutlined /> },
    { title: 'Faturas', target: '/invoices/all', icon: <SellOutlined /> },
    { title: 'Carteira', target: '/wallet', icon: <AccountBalanceWalletOutlined /> },
    { title: 'Investimentos', target: '/investments', icon: <SavingsOutlined /> },
    { title: 'Metas', target: '/targets', icon: <BeenhereOutlined /> },
    { title: 'Perfil', target: '/profile', icon: <PersonOutlineOutlined /> },
  ];

  const toggleTheme = () => {
    console.log('Alterando o tema para dark');
  };

  return (
    <Box
      sx={{
        bgcolor: '#fcfcfc',
        height: '100vh',
        display: { xs: 'none', md: 'block' },
      }}
      {...props}
    >
      <List>
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#47caff' }}>
          Meconomic
        </Typography>

        <Divider variant="middle" orientation="horizontal" />

        {menuItens.map((item, idx) => (
          <NavItem key={idx} item={item} component={NavLink} to={item.target} />
        ))}

        <Divider variant="middle" orientation="horizontal" />

        <NavItem item={{ title: 'LightMode', icon: <LightModeOutlined /> }} onClick={toggleTheme} />
      </List>
    </Box>
  );
};

export default Navbar;
