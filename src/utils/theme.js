import { createTheme } from '@mui/material';

const themeSettings = {
  typography: {
    fontFamily: ['Iceland', 'sans-serif'].join(','),
    fontSize: 14,
    h1: {
      fontFamily: ['Iceland', 'sans-serif'].join(','),
      fontSize: 40,
    },
    h2: { fontFamily: ['Iceland', 'sans-serif'].join(','), fontSize: 36 },
    h3: { fontFamily: ['Iceland', 'sans-serif'].join(','), fontSize: 32 },
    h4: { fontFamily: ['Iceland', 'sans-serif'].join(','), fontSize: 28 },
    h5: { fontFamily: ['Iceland', 'sans-serif'].join(','), fontSize: 24 },
    body1: { fontFamily: ['Iceland', 'sans-serif'].join(','), fontSize: 18 },
    body2: { fontFamily: ['Iceland', 'sans-serif'].join(','), fontSize: 16 },
    button: { fontFamily: ['Iceland', 'sans-serif'].join(','), fontSize: 16 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: 'accent.main',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'secondary.main',
            width: '5px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            backgroundColor: 'neutral.light',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: 'neutral.light',
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: 'neutral.light',
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: 'accent.main',
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: 'secondary.main',
          },
        },
      },
    },
  },
};

export const darkPalette = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#001429',
    },
    secondary: {
      main: '#252440',
    },
    accent: {
      main: '#4CCEAC',
      light: '#389a81',
      dark: '#63f9d2',
      contrastText: '#FFF',
    },
    neutral: {
      dark: '#434957',
      main: '#283b49',
    },
    paper: '#ffffff33',
    success: {
      main: '#01DE3F',
      light: '#01DE3F',
      dark: '#01DE3F',
      contrastText: '#FFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#cfcfcf',
      icon: '#FFF',
      disabled: '#D9D9D9',
    },
  },
  ...{ ...themeSettings },
});

export const lightPalette = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#cacaca',
    },
    secondary: {
      main: '#8c8c8c',
    },
    accent: {
      main: '#535ac8',
      light: '#8085d6',
      dark: '#747aec',
      contrastText: '#000',
    },
    neutral: {
      dark: '#677189',
      main: '#ffffff',
    },
    paper: '#FFFFFF69',
    text: {
      primary: '#000',
      secondary: '#787878',
      icon: '#000',
      disabled: '#666666',
    },
  },
  ...{ ...themeSettings },
});
