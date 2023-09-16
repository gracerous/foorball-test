import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { useState } from 'react';
import { usePeriod } from '../../../context/PeriodProvider';

export default function PeriodFilter() {
  const { setMinTimeStamp, setMaxTimeStamp } = usePeriod();

  const handleChange = (event) => {
    const presentDate = new Date();
    const selectedDate = new Date(presentDate);
    if (event.target.value === 'today') {
      selectedDate.setHours(0, 0, 1, 0);
    } else if (event.target.value === 'tomorrow') {
      selectedDate.setDate(presentDate.getDate() + 1);
      selectedDate.setHours(0, 0, 1, 0);
    }
    const minTime = new Date(selectedDate);
    const maxTime = new Date(selectedDate);
    minTime.setHours(0, 0, 1, 0);
    maxTime.setHours(23, 59, 59, 999);
    setMinTimeStamp(Math.floor(minTime.getTime() / 1000));
    setMaxTimeStamp(Math.floor(maxTime.getTime() / 1000));
  };

  return (
    <Box sx={{ minWidth: 125 }}>
      <FormControl fullWidth>
        <InputLabel id='dateFilter'>Выберите дату</InputLabel>
        <Select
          labelId='dateFilter'
          id='dateFilterSelect'
          label='Выберите дату'
          onChange={handleChange}
          defaultValue={'today'}
        >
          <MenuItem  value={'today'}>Сегодня</MenuItem>
          <MenuItem value={'tomorrow'}>Завтра</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}