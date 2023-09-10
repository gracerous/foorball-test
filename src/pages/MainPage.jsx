import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoalSeries, fetchYCardsSeries } from '../redux/reducers/seriesSlice';
import { Box } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import TableSkeleton from '../components/TableSkeleton/TableSkeleton';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableItemSeries from '../components/SortableItem/SortableItemSeries';
import { useSeriesLimits } from '../context/SeriesLimitsProvider';

const MainPage =() => {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const { goalSeriesLimit, yCardsSeriesLimit } = useSeriesLimits();

  const minTimeStamp = 1687282001;
  const maxTimeStamp = 1687292001;
  const seriesLimit = 5;

  useEffect(() => {
    dispatch(fetchGoalSeries({ minTimeStamp, maxTimeStamp, goalSeriesLimit }));
  }, [dispatch, minTimeStamp, maxTimeStamp, goalSeriesLimit]);
  
  useEffect(() => {
    dispatch(fetchYCardsSeries({ minTimeStamp, maxTimeStamp, yCardsSeriesLimit }));
  }, [dispatch, minTimeStamp, maxTimeStamp, yCardsSeriesLimit]);

  const series = useSelector((state) => state.series);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const seriesArr = Object.values(series);
    setItems(seriesArr);
  }, [series]);

  const mainInfo = useSelector((state) => state.mainInfo)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== (over && over.id)) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex);
        } else {
          return items;
        }
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignContent: 'space-between',
        '& > *': {
          margin: '10px',
        }
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((item) => (
            item.isLoading || mainInfo.isLoading ? (
              <TableSkeleton key={item.id} />
            ) : (
              <SortableItemSeries
                key={item.id}
                id={item.id}
                rowData={item.games}
                teams={mainInfo.teams}
                leagues={mainInfo.leagues}
                categoryName={item.categoryName}
              />
            )
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  )
}
export default React.memo(MainPage);