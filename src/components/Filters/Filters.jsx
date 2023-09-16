import { Paper } from '@mui/material';
import React from 'react';
import PeriodFilter from './PeriodFilter/PeriodFilter';


export default function Filters() {
  return (
    <Paper elevation={3} sx={{height: '100%', padding: '10px'}}>
      <PeriodFilter/>
    </Paper>
  )
}
