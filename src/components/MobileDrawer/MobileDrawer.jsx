import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { useCategory } from '../../context/CategoryProvider';
import { useSeriesLimits } from '../../context/SeriesLimitsProvider';
import { usePeriod } from '../../context/PeriodProvider';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


export default function MobileDrawer() {
  const theme = useTheme();
  const { category, setCategory } = useCategory();
  const { mobileSeriesLimit, setMobileSeriesLimit } = useSeriesLimits();
  const { setMinTimeStamp, setMaxTimeStamp } = usePeriod();
  const [state, setState] = React.useState({
    left: false,
  });
  const [selectedPeriod, setSelectedPeriod] = React.useState('today');

  const StyledInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(1.5),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      border: '1px solid #ced4da',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        'Ubuntu',
      ],
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(246,248,141,.25)',
      },
    },
  }));

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const series = useSelector((state) => state.series);

  const handleCategoryChange = (event) => {
    const foundSeries = Object.entries(series).find(([_, seriesItem]) => seriesItem.categoryName === event.target.value);
    if (foundSeries) {
      const [, seriesItem] = foundSeries;
      setCategory(seriesItem.categoryName);
    }
  };

  const handleLimitChange = (event) => {
    setMobileSeriesLimit(event.target.value);
  }

  const handlePeriodChange = (event) => {
    const presentDate = new Date();
    const selectedDate = new Date(presentDate);
    if (event.target.value === 'today') {
      selectedDate.setHours(0, 0, 1, 0);
      setSelectedPeriod('today');
    } else if (event.target.value === 'tomorrow') {
      selectedDate.setDate(presentDate.getDate() + 1);
      selectedDate.setHours(0, 0, 1, 0);
      setSelectedPeriod('tomorrow');
    }
    const minTime = new Date(selectedDate);
    const maxTime = new Date(selectedDate);
    minTime.setHours(0, 0, 1, 0);
    maxTime.setHours(23, 59, 59, 999);
    setMinTimeStamp(Math.floor(minTime.getTime() / 1000));
    setMaxTimeStamp(Math.floor(maxTime.getTime() / 1000));
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250, padding: '10px', mt: 5 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <FormControl fullWidth sx={{ color: theme.palette.text.primary, mb: 3 }}>
        <InputLabel id='select-category-label' sx={{ color: theme.palette.text.primary }}>Выберите категорию</InputLabel>
        <Select
          labelId='select-category-mobile'
          id='select-category-mobile'
          value={category}
          label='Выберите категорию'
          onChange={handleCategoryChange}
          input={<StyledInput />}
        >
          {Object.values(series).map((seriesItem) => (
            <MenuItem key={seriesItem.id} value={seriesItem.categoryName}>
              {seriesItem.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ color: theme.palette.text.primary, mb: 3 }}>
        <InputLabel id='select-limit-label' sx={{ color: theme.palette.text.primary }}>Выберите лимит серии</InputLabel>
        <Select
          labelId='select-Limit-mobile'
          id='select-limit-mobile'
          value={mobileSeriesLimit}
          label='Выберите лимит серии'
          onChange={handleLimitChange}
          input={<StyledInput />}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>5+</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ color: theme.palette.text.primary }}>
        <InputLabel
          sx={{ color: theme.palette.text.primary, "&.Mui-focused": { color: theme.palette.text.primary } }}
          id='dateFilter'>Выберите дату</InputLabel>
        <Select
          labelId='dateFilter'
          id='select-period-mobile'
          label='Выберите дату'
          onChange={handlePeriodChange}
          value={selectedPeriod}
          defaultValue={'today'}
          input={<StyledInput />}
        >
          <MenuItem value={'today'}>Сегодня</MenuItem>
          <MenuItem value={'tomorrow'}>Завтра</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Box >
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        color='inherit'
        onClick={toggleDrawer('left', true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor='left'
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        // PaperProps={{
        //   sx: {
        //     bgcolor: theme.palette.background.default
        //   }
        // }}
      >
        {list('left')}
      </Drawer>
    </Box>
  );
}