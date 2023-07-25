import React, { useState, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Paper } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import './SeriesTable.css';
import { useTheme } from '@mui/material/styles';

export default function SeriesTable({ rowData, teams, leagues }) {
  const theme = useTheme();
  const gridRef = useRef();

  const teamName = (params, isHomeTeam) => {
    const teamId = isHomeTeam ? params.data.home_id : params.data.away_id;
    const team = teams.find((team) => team.id === teamId);
    return team ? team.name : '';
  };
  const leagueName = (params) => {
    const leagueId = params.data.league_id;
    const league = leagues.find((league) => league.id === leagueId);
    return league ? league.name : '';
  };

  const getCellStyle = (params) => {
    return { display: 'flex', alignItems: 'center', justifyContent: 'center' };
  };

  const gameDate = (params) => {
    const timestamp = params.data.timestamp;
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} | ${hours}:${minutes}`;
    return formattedDate;
  };

  const [columnDefs, setColumnDefs] = useState([
    { field: 'league_id', cellStyle: getCellStyle, maxWidth: 110, headerName: 'Лига', valueGetter: leagueName },
    { field: 'home_id', cellStyle: getCellStyle, headerName: 'Дома', valueGetter: (params) => teamName(params, true) },
    { field: 'series', cellStyle: getCellStyle, maxWidth: 60, headerName: 'Серия', valueGetter: (params) => params.data.stat_home || params.data.stat_away },
    { field: 'away_id', cellStyle: getCellStyle, headerName: 'В гостях', valueGetter: (params) => teamName(params, false) },
    { field: 'date', cellStyle: getCellStyle, maxWidth: 110, headerName: 'Дата', valueGetter: gameDate, wrapText: false },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      lockPosition: true,
      filter: false,
      sortable: true,
      wrapText: true,
      autoHeight: true,
    }), []);

  const headerHeight = 40;
  const rowHeight = 40;

  const rowStyle = { background: theme.palette.table.primary };
  const getRowStyle = params => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: theme.palette.table.secondary };
    }
  };

  return (
    <Paper elevation={2} className='ag-theme-alpine my-ag-grid' sx={{ minWidth: '515px', borderRadius: '10px' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        defaultColDef={defaultColDef}
        autoHeaderHeight
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        domLayout={'autoHeight'}
        rowStyle={rowStyle}
        getRowStyle={getRowStyle}
      />
    </Paper>
  );
}