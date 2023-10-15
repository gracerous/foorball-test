import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Box, Paper, Tooltip } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import './SeriesTable.scss';
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
              style={{ width: '75px', height: '50px' }}
            />
          </Tooltip>
        </Box>
      );
    } else {
      return league.name;
    }
  };

  const getCellStyle = () => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  const gameDate = (params) => {
    const timestamp = params.data.timestamp;
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}.${month} | ${hours}:${minutes}`;
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
    {
      field: 'league_id',
      cellStyle: getCellStyle,
      headerClass: 'headerLeague',
      maxWidth: 100,
      headerName: 'Лига',
      cellRenderer: leagueLogoRenderer,
      unSortIcon: true
    },
    {
      field: 'home_id',
      cellStyle: getCellStyle,
      maxWidth: 128, headerName: 'Дома',
      valueGetter: (params) => teamName(params, true),
      unSortIcon: true
    },
    {
      field: 'series',
      cellStyle: getCellStyle,
      maxWidth: 70,
      headerName: 'Серия',
      valueGetter: seriesLimit,
      unSortIcon: true
    },
    {
      field: 'away_id',
      cellStyle: getCellStyle,
      maxWidth: 128,
      headerName: 'В гостях',
      valueGetter: (params) => teamName(params, false),
      wrapText: true,
      unSortIcon: true
    },
    {
      field: 'date',
      cellStyle: getCellStyle,
      maxWidth: 100,
      headerName: 'Дата',
      valueGetter: gameDate,
      wrapText: true,
      unSortIcon: true
    },
  ]);

  const defaultColDef = {
    flex: 1,
    lockPosition: true,
    filter: false,
    sortable: true,
    wrapText: true,
    autoHeight: true,
  };

  const headerHeight = 60;
  const rowHeight = 50;

  return (
    <Paper elevation={0}
      className={`ag-theme-alpine my-ag-grid ${theme.palette.mode === 'light' ? 'light-theme-table' : 'dark-theme-table'}`}
      sx={{ minWidth: '520px', borderRadius: '40px', height: '288px' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        defaultColDef={defaultColDef}
        headerHeight={headerHeight}
        domLayout={'normal'}
        rowHeight={rowHeight}
      />
    </Paper>
  );
}