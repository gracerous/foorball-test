import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoalSeries, fetchYCardsSeries } from '../redux/reducers/seriesSlice';
import DnDArea from '../components/DnDArea/DnDArea';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TableSkeleton from '../components/TableSkeleton/TableSkeleton';

export default function TomorrowSeriesPage() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [minTimeStamp, maxTimeStamp] = useMemo(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    now.setHours(0, 0, 1, 0);
    const minTimeStamp = Math.floor(now.getTime() / 1000);
    const maxTimeStamp = Math.floor(new Date(minTimeStamp * 1000).setHours(23, 59, 59, 999) / 1000);
    return [minTimeStamp, maxTimeStamp];
  }, []);


  useEffect(() => {
    dispatch(fetchGoalSeries({ minTimeStamp, maxTimeStamp }));
    dispatch(fetchYCardsSeries({ minTimeStamp, maxTimeStamp }));
  }, [dispatch, minTimeStamp, maxTimeStamp]);

  const goalsSeries = useSelector((state) => state.series.goals);
  const yCardsSeries = useSelector((state) => state.series.yCards);

  const containerStyle = useMemo(
    () => ({
      mt: '3em'
    }), []);

  return (
    <>
      <Box sx={containerStyle}>
        <Typography component="h2" variant='h5' sx={{ color: theme.palette.text.primary }}>Забивает в матче</Typography>
        {goalsSeries.length > 0 ? <DnDArea minTimeStamp={minTimeStamp} maxTimeStamp={maxTimeStamp} statSeries={goalsSeries} /> : <TableSkeleton />}
      </Box>
      <Box sx={containerStyle}>
        <Typography component="h2" variant='h5' sx={{ color: theme.palette.text.primary }} >Получает желтые карточки в матче</Typography>
        {yCardsSeries.length > 0 ? <DnDArea minTimeStamp={minTimeStamp} maxTimeStamp={maxTimeStamp} statSeries={yCardsSeries} /> : <TableSkeleton />}
      </Box>
    </>
  )
}