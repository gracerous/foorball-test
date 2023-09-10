import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { useSeriesLimits } from '../../../context/SeriesLimitsProvider';

export default function SeriesFilter() {
  const { setGoalSeriesLimit, setYCardsSeriesLimit } = useSeriesLimits(); // Use the hook to access the context values

  const handleSeriesLimitChange = (seriesLimit) => {
    setGoalSeriesLimit(seriesLimit);
    setYCardsSeriesLimit(seriesLimit);
  };

  const buttonStyle = {
    borderRadius: '50%',
    minWidth: 0,
    width: 32,
    height: 32,
    padding: 0,
    color: 'black'
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography sx={{ mr: '1em' }} variant="subtitle1">Серия</Typography>
      <Box sx={{
        border: '1px solid #e1e1e1',
        borderRadius: 20
      }}>
        <Button sx={buttonStyle} onClick={() => handleSeriesLimitChange(1)}>1</Button>
        <Button sx={buttonStyle} onClick={() => handleSeriesLimitChange(2)}>2</Button>
        <Button sx={buttonStyle} onClick={() => handleSeriesLimitChange(3)}>3</Button>
        <Button sx={buttonStyle} onClick={() => handleSeriesLimitChange(4)}>4</Button>
        <Button sx={buttonStyle} onClick={() => handleSeriesLimitChange(5)}>5</Button>
        <Button sx={buttonStyle}onClick={() => handleSeriesLimitChange(6)}>5+</Button>
      </Box>
    </Box>
  )
}
