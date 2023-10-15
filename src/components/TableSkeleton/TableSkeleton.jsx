import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function TableSkeleton() {

  const skeletonStyle = useMemo(
    () => ({
      width: 550,
      height: 406,
      borderRadius: '40px'
    }), []);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignContent: 'space-between',
      // '& > *': {
      //   margin: '10px',
      // }
    }}>
      <Skeleton variant='rounded' animation='wave' sx={skeletonStyle} />
    </Box>
  )
}
