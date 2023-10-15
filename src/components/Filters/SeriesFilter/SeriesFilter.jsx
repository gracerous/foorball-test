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
    borderRadius: '1.875rem',
    minWidth: 0,
    width: '1.875rem',
    height: '1.875rem',
    padding: 0,
    fontSize: theme.typography.h3
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.25rem'
      }}
    >
      <Typography variant='h3'>Серия</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.3125rem',
          borderRadius: '2rem',
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset'
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((limit) => (
          <Button
            key={limit}
            sx={{
              ...buttonStyle,
              backgroundColor: selectedLimit === limit ? theme.palette.primary.secondary : 'transparent',
              color: selectedLimit === limit ? '#1d1d1f' : theme.palette.text.primary
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
