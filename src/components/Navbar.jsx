import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
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
import { useState } from 'react';

/* ===== | NavItem | ================================================================== */
const NavItem = ({ item, collapsed, ...props }) => {
  const { title, icon } = item;

  return (
    <ListItemButton
      // component={NavLink}
      // to={target}
      sx={{
        position: 'relative',
        textTransform: 'capitalize',
        color: '#1f2a40',
        borderRadius: 5,
        '&:hover': {
          backgroundColor: '#4cceac',
        },
        '&.active': {
          // color: '#47caff',
          color: '#4cceac',
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
      {!collapsed && <ListItemText disableTypography primary={title} />}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  collapsed: PropTypes.bool,
};

/* ===== | NavBar | ================================================================== */
const Navbar = ({ ...props }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState('Dashboard');

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
        width: collapsed ? 60 : 200,
      }}
      {...props}
    >
      <List
        disablePadding
        sx={{
          bgcolor: 'salmon',
          height: '100%',
          border: 'solid 1px #f00',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <ListItemButton
          onClick={() => setCollapsed((prev) => !prev)}
          sx={{
            bgcolor: '#fcfcfc',
            color: '#000',
            justifyContent: 'space-between',
            '& :hover': {
              bgcolor: '#c3c6fd',
            },
          }}
        >
          <Typography variant="h6">{collapsed ? 'm€' : 'm€conomic'}</Typography>

          <MenuOutlined />
        </ListItemButton>
        {/* <ListItem sx={{ color: '#47caff', bgcolor: '#fcfcfc', justifyContent: 'space-between' }}>
        </ListItem> */}

        <Divider variant="fullWidth" orientation="horizontal" />

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
