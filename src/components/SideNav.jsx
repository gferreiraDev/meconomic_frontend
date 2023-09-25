import { themeMode, toggleTheme } from '../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Typography, styled } from '@mui/material';
import { useState } from 'react';
import Logo from './Logo';
import {
  Sidebar,
  Menu,
  MenuItem,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
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

const NavContainer = styled(Sidebar)(({ theme }) => ({
  [`.${sidebarClasses.container}`]: {
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  [`.${menuClasses.button} :hover`]: {
    backgroundColor: theme.palette.accent.main,
  },
  [`.${menuClasses.active}`]: {
    color: theme.palette.accent.main,
  },
}));

const SideNav = () => {
  const theme = useSelector(themeMode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState('Dashboard');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate('/signin', { replace: true });
  };

  const toggleMode = () => {
    dispatch(toggleTheme());
    console.log(theme);
  };

  const menuItens = [
    { title: 'Dashboard', target: 'dashboard', icon: <AutoGraphOutlined /> },
    { title: 'Registros', target: 'statements', icon: <AutoStoriesOutlined /> },
    {
      title: 'Lançamentos',
      target: 'transactions',
      icon: <CurrencyExchangeOutlined />,
    },
    { title: 'Cartões', target: 'cards', icon: <CreditCardOutlined /> },
    { title: 'Faturas', target: 'invoices/all', icon: <SellOutlined /> },
    {
      title: 'Carteira',
      target: 'wallet',
      icon: <AccountBalanceWalletOutlined />,
    },
    {
      title: 'Investimentos',
      target: 'investments',
      icon: <SavingsOutlined />,
    },
    { title: 'Metas', target: 'targets', icon: <BeenhereOutlined /> },
    { title: 'Perfil', target: 'profile', icon: <PersonOutlineOutlined /> },
  ];

  return (
    <NavContainer collapsed={isCollapsed}>
      <Menu>
        <MenuItem
          onClick={() => setIsCollapsed((prev) => !prev)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Logo short={isCollapsed} />
        </MenuItem>
        <Divider variant="fullWidth" />
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

        <MenuItem
          icon={
            theme === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />
          }
          onClick={toggleMode}
        >
          <Typography variant="caption">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Typography>
        </MenuItem>
      </Menu>

      <Menu>
        <Divider variant="fullWidth" />

        <MenuItem icon={<PowerSettingsNewOutlined />} onClick={handleLogout}>
          <Typography variant="caption">Sair</Typography>
        </MenuItem>
      </Menu>
    </NavContainer>
  );
};

export default SideNav;
