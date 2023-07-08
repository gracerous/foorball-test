// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
// import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
// import { CSS, Transform } from '@dnd-kit/utilities';
// import GamesTable from '../components/GamesTable/GamesTable';
// import { useSelector, useDispatch } from 'react-redux';
// import { Box, Button } from '@mui/material';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// import { useTheme } from '@mui/material/styles';
// import { fetchGoalSeries } from '../redux/dataMiddleware';
// import SeriesTable from '../components/SeriesTable/SeriesTable';


// function SortableItem(props) {
//   const theme = useTheme();
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition
//   } = useSortable({ id: props.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     position: 'relative',
//   };

// const buttonContainerStyle = {
//   position: 'absolute',
//   top: '0',
//   left: '0',
//   zIndex: 1,
//   height: '41px',
// };

//   return (
//     <div ref={setNodeRef} style={style}>
//       <div style={buttonContainerStyle}>
//         <Button sx={{
//           minWidth: '10px',
//           height: '100%',
//           borderRadius: '10px',
//           color: theme.palette.text.icons
//         }} {...listeners} {...attributes}>
//           <DragIndicatorIcon />
//         </Button>
//       </div>
//       <SeriesTable  rowData={props.rowData} teams={props.teams} leagues={props.leagues} />
//     </div>
//   )
// }



// export default function CurrentGamesPage() {
//   const dispatch = useDispatch();
//   const minTimeStamp = Math.floor(Date.now() / 1000);
//   useEffect(() => {
//     dispatch(fetchGoalSeries(minTimeStamp, 9999999999));
//   }, []);

//   const teams = useSelector((state) => state.mainInfo.teams);
//   const leagues = useSelector((state) => state.mainInfo.leagues);
//   const goalsSeries = useSelector((state) => state.series.goals);
//   const seriesLimit = useSelector((state) => state.series.seriesLimit);

//   const processedRowData = [];

//   goalsSeries.forEach((game) => {
//     const { league_id, home_id, away_id, stat_home, stat_away, timestamp } = game;

//     if (stat_home >= seriesLimit || stat_away >= seriesLimit) {
//       if (stat_home >= seriesLimit) {
//         processedRowData.push({ league_id, home_id, stat_home, away_id, timestamp });
//       }
//       if (stat_away >= seriesLimit) {
//         processedRowData.push({ league_id, home_id, stat_away, away_id, timestamp });
//       }
//     } else {
//       processedRowData.push(game);
//     }
//   });

//   const gamesPerTable = 5;

//   const tableData = useMemo(() => {
//     const data = [];
//     let currentTable = [];

//     goalsSeries.forEach((game) => {
//       const { league_id, home_id, away_id, stat_home, stat_away, timestamp } = game;

//       if (stat_home >= seriesLimit || stat_away >= seriesLimit) {
//         if (stat_home >= seriesLimit) {
//           currentTable.push({ league_id, home_id, stat_home, away_id, timestamp });
//         }
//         if (stat_away >= seriesLimit) {
//           currentTable.push({ league_id, home_id, stat_away, away_id, timestamp });
//         }
//       } else {
//         currentTable.push(game);
//       }

//       if (currentTable.length === gamesPerTable) {
//         data.push(currentTable);
//         currentTable = [];
//       }
//     });


//     if (currentTable.length > 0) {
//       data.push(currentTable);
//     }

//     return data;
//   }, [goalsSeries, seriesLimit, gamesPerTable]);

//   const [tables, setTables] = useState([]);

//   useEffect(() => {
//     setTables(tableData);
//   }, [tableData]);

//   return (
//     <Box sx={{ flexGrow: 2 }}>
//       {leagues.length > 0
//         && teams.length > 0
//         && goalsSeries.length > 0
//         ?
//         <Box sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           flexWrap: 'wrap',
//           alignContent: 'space-between',
//           '& > *': {
//             margin: '10px',
//           }
//         }}>
//           <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//             <SortableContext items={tables} strategy={rectSortingStrategy}>
//               {tables.map((table, index) => (
//                 <SortableItem
//                   key={index}
//                   id={index}
//                   leagues={leagues}
//                   rowData={table}
//                   teams={teams}
//                 />
//               ))}
//             </SortableContext>
//           </DndContext>
//         </Box> : 'nothing to show'}
//     </Box>
//   );


//   // function handleDragEnd(event) {
//   //   const { active, over } = event;
//   //   console.log(active)
//   //   if (active.id !== over.id) {
//   //     setTables((items) => {
//   //       const activeIndex = items.indexOf(active.id);
//   //       const overIndex = items.indexOf(over.id);
//   //       return arrayMove(items, activeIndex, overIndex);
//   //     });
//   //   }
//   // }

//   function handleDragEnd(event) {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       setTables((items) => {
//         const activeIndex = active.id;
//         const overIndex = over.id;
//         const newTables = [...items];
//         newTables[activeIndex] = items[overIndex];
//         newTables[overIndex] = items[activeIndex];
//         return newTables;
//       });
//     }
//   }

// }


import React, { useState, useEffect, useMemo, useCallback, forwardRef } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
// import { DndContext, closestCenter, useDroppable, useDraggable } from '@dnd-kit/core';
// import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS, Transform } from '@dnd-kit/utilities';
import GamesTable from '../components/GamesTable/GamesTable';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useTheme } from '@mui/material/styles';
import { fetchGoalSeries } from '../redux/dataMiddleware';
import SeriesTable from '../components/SeriesTable/SeriesTable';

const SortableItem = (props) => {
  const theme = useTheme();
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    position: 'relative',
  };

  const buttonContainerStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 1,
    height: '41px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div style={buttonContainerStyle}>
        <Button sx={{
          minWidth: '10px',
          height: '100%',
          borderRadius: '10px',
          color: theme.palette.text.icons
        }} {...listeners} {...attributes} {...props}>
          <DragIndicatorIcon />
        </Button>
      </div>
      <SeriesTable rowData={props.rowData} teams={props.teams} leagues={props.leagues} />
    </div>
  );
};

export default function CurrentGamesPage() {
  const dispatch = useDispatch();
  const minTimeStamp = Math.floor(Date.now() / 1000);
  useEffect(() => {
    dispatch(fetchGoalSeries(minTimeStamp, 9999999999));
  }, []);

  const teams = useSelector((state) => state.mainInfo.teams);
  const leagues = useSelector((state) => state.mainInfo.leagues);
  const goalsSeries = useSelector((state) => state.series.goals);
  const seriesLimit = useSelector((state) => state.series.seriesLimit);

  const gamesPerTable = 5;

  const tableData = useMemo(() => {
    const data = [];
    let currentTable = [];

    goalsSeries.forEach((game) => {
      const { league_id, home_id, away_id, stat_home, stat_away, timestamp } = game;

      if (stat_home >= seriesLimit || stat_away >= seriesLimit) {
        if (stat_home >= seriesLimit) {
          currentTable.push({ league_id, home_id, stat_home, away_id, timestamp });
        } if (stat_away >= seriesLimit) {
          currentTable.push({ league_id, home_id, stat_away, away_id, timestamp });
        }
      } else {
        currentTable.push(game);
      } if (currentTable.length === gamesPerTable) {
        data.push(currentTable);
        currentTable = [];
      }
    });
    if (currentTable.length > 0) {
      data.push(currentTable);
    }
    return data;
  }, [goalsSeries, seriesLimit, gamesPerTable]);

  tableData.map((item) => {
    console.log(item)
  })



  const [items, setItems] = useState(Array.from({ length: 3 }, (_, i) => (i + 1).toString()));
  // const [items, setItems] = useState(tableData);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (active.id !== (over && over.id)) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

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
      {leagues.length > 0 && teams.length > 0 && goalsSeries.length > 0 ?
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((item) => (
              <SortableItem key={item} id={item} rowData={goalsSeries} teams={teams} leagues={leagues} />
            ))}
          </SortableContext>
          {/* <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
          {activeId ? <SortableItem id={activeId} rowData={goalsSeries} teams={teams} leagues={leagues}/> : null}
        </DragOverlay> */}
        </DndContext>
        : null}
    </Box>
  )
}
