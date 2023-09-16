import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Box, Paper, Tooltip } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import './SeriesTable.css';
import { useTheme } from '@mui/material/styles';

export default function SeriesTable({ rowData, teams, leagues, tableSeriesLimit }) {
  const theme = useTheme();
  const gridRef = useRef();

  const teamName = (params, isHomeTeam) => {
    const teamId = isHomeTeam ? params.data.home_id : params.data.away_id;
    const team = teams.find((team) => team.id === teamId);
    return team ? team.name : '';
  };

  const leagueLogoRenderer = (params) => {
    const leagueId = params.data.league_id;
    const league = leagues.find((league) => league.id === leagueId);

    if (league && league.logo) {
      return (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='100%'
        >
          <Tooltip title={league.name} placement='top'>
            <img
              src={league.logo}
              alt={`League Logo - ${league.name}`}
              style={{ width: '30px', height: '30px' }}
            />
          </Tooltip>
        </Box>
      );
    } else {
      return league.name;
    }
  };

  const getCellStyle = () => {
    return { display: 'flex', alignItems: 'center', justifyContent: 'center' };
  };

  const getDateCellStyle = () => {
    return { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px' };
  };

  const gameDate = (params) => {
    const timestamp = params.data.timestamp;
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  };

  const seriesLimit = (params) => {
    if (params.data.stat_home >= tableSeriesLimit) {
      return params.data.stat_home;
    } else if (params.data.stat_away >= tableSeriesLimit) {
      return params.data.stat_away;
    }
  }

  const [columnDefs, setColumnDefs] = useState([
    { field: 'league_id', cellStyle: getCellStyle, maxWidth: 80, headerName: 'Лига', cellRenderer: leagueLogoRenderer },
    { field: 'home_id', cellStyle: getCellStyle, headerName: 'Дома', valueGetter: (params) => teamName(params, true), wrapText: true },
    { field: 'series', cellStyle: getCellStyle, maxWidth: 60, headerName: 'Серия', valueGetter: seriesLimit },
    { field: 'away_id', cellStyle: getCellStyle, headerName: 'В гостях', valueGetter: (params) => teamName(params, false), wrapText: true },
    { field: 'date', cellStyle: getDateCellStyle, maxWidth: 62, headerName: 'Дата', valueGetter: gameDate, wrapText: true },
  ]);

  const defaultColDef = {
    flex: 1,
    lockPosition: true,
    filter: false,
    sortable: true,
    wrapText: true,
    autoHeight: true,
  };

  const headerHeight = 40;
  const rowHeight = 50;

  const rowStyle = { background: theme.palette.table.primary };
  const getRowStyle = params => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: theme.palette.table.secondary };
    }
  };

  return (
    <Paper elevation={2} className='ag-theme-alpine my-ag-grid' sx={{ minWidth: '470px', borderRadius: '10px', height: '290px' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        defaultColDef={defaultColDef}
        headerHeight={headerHeight}
        domLayout={'normal'}
        rowStyle={rowStyle}
        getRowStyle={getRowStyle}
      />
    </Paper>
  );
}