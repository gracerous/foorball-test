import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoalSeries, fetchYCardsSeries } from '../redux/reducers/seriesSlice';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
import MobileTable from '../components/MobileTable/MobileTable';
import { useCategory } from '../context/CategoryProvider';

const MainPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { goalSeriesLimit, yCardsSeriesLimit, mobileSeriesLimit } = useSeriesLimits();
  const { minTimeStamp, maxTimeStamp } = usePeriod();
  const { category } = useCategory();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 899);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 899);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {
    const fetchSeries = () => {
      if (isMobile && mobileSeriesLimit !== undefined) {
        dispatch(fetchGoalSeries({ minTimeStamp, maxTimeStamp, goalSeriesLimit: mobileSeriesLimit }));
      } else if (goalSeriesLimit !== undefined) {
        dispatch(fetchGoalSeries({ minTimeStamp, maxTimeStamp, goalSeriesLimit }));
      }
    };
    fetchSeries();
  }, [dispatch, minTimeStamp, maxTimeStamp, goalSeriesLimit, isMobile, mobileSeriesLimit]);

  useEffect(() => {
    const fetchYCardSeries = () => {
      if (isMobile && mobileSeriesLimit !== undefined) {
        dispatch(fetchYCardsSeries({ minTimeStamp, maxTimeStamp, yCardsSeriesLimit: mobileSeriesLimit }));
      } else if (yCardsSeriesLimit !== undefined) {
        dispatch(fetchYCardsSeries({ minTimeStamp, maxTimeStamp, yCardsSeriesLimit }));
      }
    };
    fetchYCardSeries();
  }, [dispatch, minTimeStamp, maxTimeStamp, yCardsSeriesLimit, isMobile, mobileSeriesLimit]);


  const series = useSelector((state) => state.series);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const seriesArr = Object.values(series);
    const savedTableOrder = getTableOrder();
    const defaultOrder = seriesArr.map((item) => item.id);
    const combinedOrder = savedTableOrder.length > 0 ? savedTableOrder : defaultOrder;
    const sortedSeriesArr = combinedOrder.map((tableId) =>
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
      <Box sx={{
        maxWidth: '20%', height: '300px', padding: '10px', ...(isMobile && { display: 'none' })
      }}>
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
          },
          [theme.breakpoints.down('md')]: {
            width: '100%',
          }
        }}
      >
        {isMobile ? (Object.values(series).map((seriesCategory) => (
          seriesCategory.categoryName === category ? (
            seriesCategory.games.length > 0 ?
              <MobileTable key={seriesCategory.id} data={seriesCategory.games} /> :
              <Typography variant='h3 '>Нет игр по заданным параметрам</Typography>
          ) : null
        )))
          : (
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
          )}
      </Box>
    </Box>
  )
}
export default React.memo(MainPage);