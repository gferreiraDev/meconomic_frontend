import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkPalette, lightPalette } from './utils/theme';
import { BrowserRouter } from 'react-router-dom';
import { themeMode } from './redux/themeSlice';
import Router from './router';
import { useSelector } from 'react-redux';

const App = () => {
  const mode = useSelector(themeMode);
  return (
    <ThemeProvider theme={mode === 'dark' ? darkPalette : lightPalette}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
