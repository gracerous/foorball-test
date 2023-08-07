import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import SortableItemSeries from '../SortableItem/SortableItemSeries';


export default function DnDArea({ statSeries }) {

  const teams = useSelector((state) => state.mainInfo.teams);
  const leagues = useSelector((state) => state.mainInfo.leagues);

  const gamesPerTable = 5;

  const [tableData, setTableData] = useState({});

  useEffect(() => {
    const updatedTableData = {};
    let tableIndex = 0;

    statSeries.forEach((game, index) => {
      const { league_id, home_id, away_id, stat_home, stat_away, timestamp } = game;

      const tableId = `table-${tableIndex}`;
      if (!updatedTableData[tableId]) {
        updatedTableData[tableId] = {
          id: tableId,
          games: []
        };
      }

      const table = updatedTableData[tableId];
      table.games.push({
        id: index.toString(),
        league_id,
        home_id,
        away_id,
        stat_home,
        stat_away,
        timestamp
      });

      if (table.games.length === gamesPerTable) {
        tableIndex++;
      }
    });

    setTableData(updatedTableData);
  }, [statSeries, gamesPerTable]);

  const tableOrder = useMemo(() => Object.keys(tableData), [tableData]);
  const [sortedTableOrder, setSortedTableOrder] = useState([]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    setSortedTableOrder(tableOrder);
  }, [tableOrder]);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (active.id !== (over && over.id)) {
      setSortedTableOrder((table) => {
        const oldIndex = table.indexOf(active.id);
        const newIndex = table.indexOf(over.id);
        const newItems = arrayMove(table, oldIndex, newIndex);
        return newItems;
      });
    }
  }, []);
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
      {leagues.length > 0 && teams.length > 0 && statSeries.length > 0 && sortedTableOrder.length > 0 &&
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sortedTableOrder} strategy={rectSortingStrategy}>
            {sortedTableOrder.map((tableId) => (
              <SortableItemSeries
                key={tableId}
                id={tableId}
                rowData={tableData[tableId]?.games || []}
                teams={teams}
                leagues={leagues}
              />
            ))}
          </SortableContext>
        </DndContext>}
    </Box>
  );
}
