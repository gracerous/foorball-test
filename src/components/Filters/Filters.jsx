import { Paper } from '@mui/material';
import React from 'react';
import PeriodFilter from './PeriodFilter/PeriodFilter';

export default function Filters() {
  return (
    <Paper sx={{height: '100%', width: '11.375rem', padding: '1.75rem 1rem', borderRadius:'40px'}}>
      <PeriodFilter/>
    </Paper>
  )
}