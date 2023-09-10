import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function TableSkeleton() {

  const skeletonStyle = useMemo(
    () => ({
      width: 515,
      height: 515,
      borderRadius: '10px'
    }), []);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignContent: 'space-between',
      '& > *': {
        margin: '10px',
      }
    }}>
      <Skeleton variant='rounded' animation='wave' sx={skeletonStyle} />
    </Box>
  )
}
