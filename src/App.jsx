import { useEffect, useState, useMemo } from 'react';
import './App.css';
import { fetchTeamsAndLeagues } from './redux/dataMiddleware';
import { useDispatch, useSelector } from 'react-redux';
import PageNavigation from './components/PageNavigation/PageNavigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { toggleTheme } from './redux/reducers/themeSlice';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import TodaySeriesPage from './pages/TodaySeriesPage';
import TomorrowSeriesPage from './pages/TomorrowSeriesPage';
import ErrorPage from './pages/ErrorPage';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        // palette values for light mode
        primary: {
          main: "#E7E6E1",
        },
        divider: "#C1C0B9",
        background: {
          default: "#C1C0B9",
          paper: "#E7E6E1",
        },
        text: {
          primary: "#537791",
          secondary: "#27272a",
          icons: '#537791'
        },
        table: {
          // primary: '#C1C0B9',
          // secondary: '#E7E6E1'
          primary: '#DDE6ED',
          secondary: '#9DB2BF'
        }
      }
      : {
        // palette values for dark mode
        primary: {
          main: "#526D82",
        },
        divider: "#27374D",
        background: {
          default: "#27374D",
          paper: "#000e21",
        },
        text: {
          primary: "#fff",
          secondary: "#71717a",
          icons: '#9DB2BF'
        },
        table: {
          primary: '#DDE6ED',
          secondary: '#9DB2BF'
        }
      }),
  },
});


function App() {

  const [mode, setMode] = useState('light');
  const darkMode = useSelector((state) => state.theme.darkMode);

  useMemo(() => {
    if (darkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [darkMode]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamsAndLeagues());
  }, []);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter >
        <Box
          className='backgroundContainer'
          sx={{
            position: 'sticky',
            display: 'block',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: theme.palette.background.default,
          }}
        >
          <Box className='App'>
            <ResponsiveAppBar />
            <PageNavigation />
            <Box sx={{ width: 'calc(100% - 240px)', mr: 'auto', ml: 'auto' }}>
              <Routes>
                <Route path='/today-games' element={<TodaySeriesPage />} />
                <Route path='/tomorrow-games' element={<TomorrowSeriesPage />} />
                <Route path='*' element={<ErrorPage />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;