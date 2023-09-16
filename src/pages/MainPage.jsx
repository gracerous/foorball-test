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
import Filters from '../components/Filters/Filters';
import { usePeriod } from '../context/PeriodProvider';

const MainPage = () => {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const { goalSeriesLimit, yCardsSeriesLimit } = useSeriesLimits();
  const { minTimeStamp, maxTimeStamp } = usePeriod();

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
    const savedTableOrder = getTableOrder();
    const sortedSeriesArr = savedTableOrder.map((tableId) =>
      seriesArr.find((item) => item.id === tableId)
    );
    const filteredSortedSeriesArr = sortedSeriesArr.filter((item) => item !== undefined);
    setItems(filteredSortedSeriesArr);
  }, [series]);

  const mainInfo = useSelector((state) => state.mainInfo)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const saveTableOrder = (order) => {
    const tableIds = order.map((item) => item.id);
    localStorage.setItem('tableOrder', JSON.stringify(tableIds));
  };

  const getTableOrder = () => {
    const tableOrderJSON = localStorage.getItem('tableOrder');
    try {
      const parsedTableOrder = JSON.parse(tableOrderJSON);
      if (Array.isArray(parsedTableOrder)) {
        return parsedTableOrder;
      }
    } catch (error) {
      console.error('Error parsing tableOrder:', error);
    }
    return [];
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== (over && over.id)) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          const newTableOrder = arrayMove(items, oldIndex, newIndex);
          saveTableOrder(newTableOrder);
          return newTableOrder;
        } else {
          return items;
        }
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: '20%', height: '300px', padding: '10px' }}>
        <Filters />
      </Box>
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
    </Box>
  )
}
export default React.memo(MainPage);