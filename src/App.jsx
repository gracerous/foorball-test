import { useEffect, useState, useMemo } from 'react';
import './App.css';
import { getMainInfo } from './redux/reducers/mainInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import ErrorPage from './pages/ErrorPage';
import '@fontsource/ubuntu';
import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import MainPage from './pages/MainPage';
import { SeriesLimitsProvider } from './context/SeriesLimitsProvider';
import { PeriodProvider } from './context/PeriodProvider';
import lighLargeBg from './img/bgLightLarge.svg';
import darkLargeBg from './img/bgDarkLarge.svg';
import { CategoryProvider } from './context/CategoryProvider';

const getDesignTokens = (mode) => ({
  typography: {
    fontFamily: [
      'Ubuntu'
    ],
    h3: {
      fontSize: '1.125rem',
      lineHeight: 'normal',
      fontStyle: 'normal'
    },
    p: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      verticalAlign: 'middle',
      fontStyle: 'normal',
      fontWeight: '400'
    }
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#3B4047',
          secondary: '#F6F88D'
        },
        background: {
          default: '#d9d9d9',
          paper: '#fbfbfd',
        },
        text: {
          primary: '#1d1d1f',
          secondary: '#fbfbfd',
          icons: '#686C72'
        },
        table: {
          header: '#3B4047',
          primary: '#fbfbfd',
          secondary: '#FFF'
        }
      }
      : {
        // palette values for dark mode
        primary: {
          main: '#3B4047',
          secondary: '#F6F88D'
        },
        background: {
          default: '#81858C',
          paper: '#545860'
        },
        text: {
          primary: '#fbfbfd',
          secondary: '#1d1d1f',
          icons: '#686C72'
        },
        table: {
          header: '#3B4047',
          primary: '#81858C',
        }
      }),
  },
});


function App() {

  const [mode, setMode] = useState('light');
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [darkMode]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainInfo());
  }, []);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <SeriesLimitsProvider>
        <PeriodProvider>
          <CategoryProvider>
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
                backgroundImage: theme.palette.mode === 'light' ? `url(${lighLargeBg})` : `url(${darkLargeBg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <Box className='App'>
                <ResponsiveAppBar />
                <Box sx={{
                  width: 'calc(100% - 60px)', mr: 'auto', ml: 'auto', [theme.breakpoints.down('sm')]: {
                    width: 'calc(100% - 10px)',
                  }
                }}>
                  <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='*' element={<ErrorPage />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          </CategoryProvider>
        </PeriodProvider>
      </SeriesLimitsProvider>
    </ThemeProvider>
  );
}

export default App;