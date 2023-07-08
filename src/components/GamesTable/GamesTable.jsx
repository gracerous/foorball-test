import React, { useState, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Paper } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import './GamesTable.css';
import { useTheme } from '@mui/material/styles';


export default function GamesTable({ rowData, teams }) {
  const theme = useTheme();
  const gridRef = useRef();

  const teamName = (params, isHomeTeam) => {
    const teamId = isHomeTeam ? params.data.home_id : params.data.away_id;
    const team = teams.find((team) => team.id === teamId);
    return team ? team.name : '';
  };

  const gameScore = (params) => {
    const homeTeamScore = params.data.home_goals !== null ? params.data.home_goals : '';
    const awayTeamScore = params.data.away_goals !==null ? params.data.away_goals : '';
    return `${homeTeamScore} - ${awayTeamScore}`;
  };

  const gameDate = (params) => {
    const timestamp = params.data.timestamp;
    const date = new Date(timestamp * 1000);
    // const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} | ${hours}:${minutes}`;
    return formattedDate;
  };

  // const [columnDefs, setColumnDefs] = useState([
  //   { field: 'date', headerName: 'Дата', valueGetter: gameDate, wrapText: false },
  //   { field: 'home_id', headerName: 'Дома', valueGetter: (params) => teamName(params, true) },
  //   {
  //     field: 'score',
  //     headerName: 'Счет',
  //     valueGetter: gameScore,
  //   },
  //   { field: 'away_id', headerName: 'В гостях', valueGetter: (params) => teamName(params, false) },
  // ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'league_id', headerName: 'Лига', wrapText: false },
    { field: 'home_id', headerName: 'Дома', valueGetter: (params) => teamName(params, true) },
    {
      field: 'score',
      headerName: 'Счет',
      valueGetter: gameScore,
    },
    { field: 'away_id', headerName: 'В гостях', valueGetter: (params) => teamName(params, false) },
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

  const rowStyle = { background: theme.palette.table.primary };
  const getRowStyle = params => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: theme.palette.table.secondary };
    }
  };

  return (
    <Paper elevation={2} className='ag-theme-alpine my-ag-grid' sx={{ minWidth: '550px', borderRadius: '10px' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        defaultColDef={defaultColDef}
        autoHeaderHeight
        headerHeight={headerHeight}
        rowHeight='auto'
        domLayout={'autoHeight'}
        rowStyle={rowStyle}
        getRowStyle={getRowStyle}
      />
    </Paper>
  );
}