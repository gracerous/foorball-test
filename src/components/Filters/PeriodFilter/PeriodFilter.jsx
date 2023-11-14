import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { usePeriod } from '../../../context/PeriodProvider';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

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

export default function PeriodFilter() {
  const theme = useTheme();
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
    <Box>
      <FormControl fullWidth>
        <InputLabel 
        sx={{ color: theme.palette.text.primary, '&.Mui-focused': { color: theme.palette.text.primary } }} 
        id='dateFilter'>Выберите дату</InputLabel>
        <Select
          labelId='dateFilter'
          id='dateFilterSelect'
          label='Выберите дату'
          onChange={handleChange}
          defaultValue={'today'}
          input={<StyledInput />}
        >
          <MenuItem value={'today'}>Сегодня</MenuItem>
          <MenuItem value={'tomorrow'}>Завтра</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}