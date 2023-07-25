import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoalSeries, fetchYCardsSeries } from '../redux/dataMiddleware';
import DnDArea from '../components/DnDArea/DnDArea';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TableSkeleton from '../components/TableSkeleton/TableSkeleton';

// export default function TomorrowSeriesPage() {
//   const dispatch = useDispatch();

//   const now = new Date();
//   now.setDate(now.getDate() + 1); // Set date to the next day
//   now.setHours(0, 0, 1, 0); // Set time to 00:00:01
//   const minTimeStamp = Math.floor(now.getTime() / 1000);

//   const maxTimeStamp = Math.floor(new Date(minTimeStamp * 1000).setHours(23, 59, 59, 999) / 1000);

//   // console.log(minTimeStamp, maxTimeStamp)

//   useEffect(() => {
//     dispatch(fetchGoalSeries(minTimeStamp, maxTimeStamp));
//   }, []);

//   const teams = useSelector((state) => state.mainInfo.teams);
//   const leagues = useSelector((state) => state.mainInfo.leagues);
//   const goalsSeries = useSelector((state) => state.series.goals);
//   const seriesLimit = useSelector((state) => state.series.seriesLimit);

//   const gamesPerTable = 5;

//   const [tableData, setTableData] = useState({});

//   useEffect(() => {
//     const updatedTableData = {};
//     let tableIndex = 0;

//     goalsSeries.forEach((game, index) => {
//       const { league_id, home_id, away_id, stat_home, stat_away, timestamp } = game;

//       const tableId = `table-${tableIndex}`;
//       if (!updatedTableData[tableId]) {
//         updatedTableData[tableId] = {
//           id: tableId,
//           games: []
//         };
//       }

//       const table = updatedTableData[tableId];
//       table.games.push({
//         id: index.toString(),
//         league_id,
//         home_id,
//         away_id,
//         stat_home,
//         stat_away,
//         timestamp
//       });

//       if (table.games.length === gamesPerTable) {
//         tableIndex++;
//       }
//     });

//     setTableData(updatedTableData);
//   }, [goalsSeries, gamesPerTable]);

//   const tableOrder = useMemo(() => Object.keys(tableData), [tableData]);
//   const [sortedTableOrder, setSortedTableOrder] = useState([]);
//   const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

//   useEffect(() => {
//     setSortedTableOrder(tableOrder);
//   }, [tableOrder]);

//   const handleDragEnd = useCallback((event) => {
//     const { active, over } = event;
//     if (active.id !== (over && over.id)) {
//       setSortedTableOrder((table) => {
//         const oldIndex = table.indexOf(active.id);
//         const newIndex = table.indexOf(over.id);
//         const newItems = arrayMove(table, oldIndex, newIndex);
//         return newItems;
//       });
//     }
//   }, []);

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//         alignContent: 'space-between',
//         '& > *': {
//           margin: '10px',
//         }
//       }}
//     >
//       {leagues.length > 0 && teams.length > 0 && goalsSeries.length > 0 ? (
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext items={sortedTableOrder} strategy={rectSortingStrategy}>
//             {sortedTableOrder.map((tableId) => (
//               <SortableItemSeries
//                 key={tableId}
//                 id={tableId}
//                 rowData={tableData[tableId].games}
//                 teams={teams}
//                 leagues={leagues}
//               />
//             ))}
//           </SortableContext>
//         </DndContext>
//       ) : 'No Data To Show'}
//     </Box>
//   );
// }


export default function TomorrowSeriesPage() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const now = new Date();
  now.setDate(now.getDate() + 1);
  now.setHours(0, 0, 1, 0);
  const minTimeStamp = Math.floor(now.getTime() / 1000);

  const maxTimeStamp = Math.floor(new Date(minTimeStamp * 1000).setHours(23, 59, 59, 999) / 1000);

  useEffect(() => {
    dispatch(fetchGoalSeries(minTimeStamp, maxTimeStamp));
    dispatch(fetchYCardsSeries(minTimeStamp, maxTimeStamp));
  }, []);

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