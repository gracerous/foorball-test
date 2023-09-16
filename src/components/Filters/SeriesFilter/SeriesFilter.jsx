import { Box, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSeriesLimits } from '../../../context/SeriesLimitsProvider';
import { useTheme } from '@mui/material/styles';

export default function SeriesFilter({ category }) {
  const { goalSeriesLimit, setGoalSeriesLimit, yCardsSeriesLimit, setYCardsSeriesLimit } = useSeriesLimits();
  const [selectedLimit, setSelectedLimit] = useState(5);
  const theme = useTheme();

  useEffect(() => {
    if (category === 'goals') {
      setSelectedLimit(goalSeriesLimit);
    } else if (category === 'yCards') {
      setSelectedLimit(yCardsSeriesLimit);
    }
  }, [category, goalSeriesLimit, yCardsSeriesLimit]);

  const handleSeriesLimitChange = (seriesLimit) => {
    setSelectedLimit(seriesLimit);

    if (category === 'goals') {
      setGoalSeriesLimit(seriesLimit);
    } else if (category === 'yCards') {
      setYCardsSeriesLimit(seriesLimit);
    }
  };

  const buttonStyle = {
    borderRadius: '50%',
    minWidth: 0,
    width: 32,
    height: 32,
    padding: 0,
    color: 'black',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography sx={{ mr: '1em' }} variant="subtitle1">Серия</Typography>
      <Box
        sx={{
          border: '1px solid #e1e1e1',
          borderRadius: 20,
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((limit) => (
          <Button
            key={limit}
            sx={{
              ...buttonStyle,
              backgroundColor: selectedLimit === limit ? theme.palette.table.secondary : 'transparent',
            }}
            onClick={() => handleSeriesLimitChange(limit)}
          >
            {limit}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
