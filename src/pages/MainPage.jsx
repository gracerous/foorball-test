import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoalSeries, fetchYCardsSeries } from '../redux/reducers/seriesSlice';
import { Box } from '@mui/material';
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

export default function MainPage() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const minTimeStamp = 1687282001;
  const maxTimeStamp = 1887282001;
  const seriesLimit = 5;

  useEffect(() => {
    dispatch(fetchGoalSeries({ minTimeStamp, maxTimeStamp, seriesLimit }));
    dispatch(fetchYCardsSeries({ minTimeStamp, maxTimeStamp, seriesLimit }));
  }, [dispatch, minTimeStamp, maxTimeStamp, seriesLimit]);

  const series = useSelector((state) => state.series);

  const [items, setItems] = useState([]);


  useEffect(() => {
    const seriesArr = Object.values(series);
    setItems(seriesArr);
  }, [series]);

  const mainInfo = useSelector((state) => state.mainInfo)
  // const teams = useSelector((state) => state.mainInfo.teams);
  // const leagues = useSelector((state) => state.mainInfo.leagues);
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
    <>
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
      {/* <Box
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
            {items.map((item) =>
              <SortableItemSeries
                key={item.id}
                id={item.id}
                rowData={item.games}
                teams={teams}
                leagues={leagues}
                categoryName={items.categoryName}
              />
            )}
          </SortableContext>
        </DndContext>
      </Box> */}
    </>
  )
}