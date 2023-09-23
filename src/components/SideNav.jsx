import { Sidebar, Menu, MenuItem, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { clearCredentials } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
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
  DarkModeOutlined,
  LightModeOutlined,
} from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState('Dashboard');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate('/signin', { replace: true });
  };

  const menuItens = [
    { title: 'Dashboard', target: 'dashboard', icon: <AutoGraphOutlined /> },
    { title: 'Registros', target: 'statements', icon: <AutoStoriesOutlined /> },
    { title: 'Lançamentos', target: 'transactions', icon: <CurrencyExchangeOutlined /> },
    { title: 'Cartões', target: 'cards', icon: <CreditCardOutlined /> },
    { title: 'Faturas', target: 'invoices/all', icon: <SellOutlined /> },
    { title: 'Carteira', target: 'wallet', icon: <AccountBalanceWalletOutlined /> },
    { title: 'Investimentos', target: 'investments', icon: <SavingsOutlined /> },
    { title: 'Metas', target: 'targets', icon: <BeenhereOutlined /> },
    { title: 'Perfil', target: 'profile', icon: <PersonOutlineOutlined /> },
  ];

  return (
    <Sidebar
      collapsed={isCollapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: '#4349577a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        [`.${menuClasses.menuItemRoot} :hover`]: {
          backgroundColor: '#c3c6fd',
        },
        [`.${menuClasses.active}`]: {
          color: '#4cceac',
        },
      }}
    >
      <Menu>
        <MenuItem onClick={() => setIsCollapsed((prev) => !prev)}>{isCollapsed ? 'm€' : 'm€conomic'}</MenuItem>
        <Divider variant="fullWidth" sx={{ borderColor: '#fff' }} />
      </Menu>

      <Menu>
        {menuItens.map((item, idx) => (
          <MenuItem
            key={idx}
            icon={item.icon}
            active={selected === item.title}
            onClick={() => setSelected(item.title)}
            component={<Link to={item.target} />}
          >
            <Typography variant="caption">{item.title}</Typography>
          </MenuItem>
        ))}
      </Menu>

      <Menu>
        <Divider variant="fullWidth" sx={{ borderColor: '#fff' }} />

        <MenuItem icon={<PowerSettingsNewOutlined />} onClick={handleLogout}>
          <Typography variant="caption">Sair</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideNav;
