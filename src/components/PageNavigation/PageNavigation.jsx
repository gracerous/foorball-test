import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';
import TodayIcon from '@mui/icons-material/Today';
import { NavLink, useLocation } from 'react-router-dom';
import './PageNavigation.css';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 100;

export default function PageNavigation() {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          top: 100,
          left: 20,
          width: drawerWidth,
          borderRadius: drawerWidth / 2,
          minHeight: 500,
          maxHeight: '50%',
          boxSizing: 'border-box',
          border: 'none',
          padding: '60px 5px',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List className='navItems'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& li': {
            position: 'relative',
            width: '70px',
            height: '70px',
            zIndex: 1,
            mb: '20px',
            '& .MuiButtonBase-root': {
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              borderRadius: '50%',
              bgcolor: 'transparent'
            }
          }
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to='/today-games'
            className={location.pathname === '/today-games' ? 'active' : 'inactive'}
            sx={{
              borderRadius: 'inherit'
            }}
          >
            <TodayIcon />
            <ListItemText primary={'Сегодня'} primaryTypographyProps={{ fontSize: '14px' }} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            borderRadius: 100
          }}
        >
          <ListItemButton
            component={NavLink}
            to='/tomorrow-games'
            className={location.pathname === '/tomorrow-games' ? 'active' : 'inactive'}
          >
            <TodayIcon />
            <ListItemText primary={'Завтра'} primaryTypographyProps={{ fontSize: '14px' }} />
          </ListItemButton>
        </ListItem>
        <Box 
          className='indicator'
          sx={{
            top: '-2px',
            right: '-5px',
            position: 'absolute',
            width: '95px',
            height: '90px',
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            bgcolor: theme.palette.background.default,
            transition: '0.4s',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& b': {
              position: 'absolute',
              bgcolor: theme.palette.background.default,
              width: '40%',
              height: '30px',
              right: 0,
              '&:first-child': {
                top: '-30px'
              },
              '&:last-child': {
                bottom: '-30px'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                bgcolor: theme.palette.background.paper,
                width: '100%',
                height: '30px',
                top: 0,
                right: 0
              }
            }
          }}
        >
          <b />
          <Typography 
            className='cirle'
            sx={{
              display: 'block',
              position: 'relative',
              right: '3px',
              width: '70px',
              height: '70px',
              bgcolor: theme.palette.background.paper,
              borderRadius: '50%'
            }}
          />
          <b />
        </Box>
      </List>
    </Drawer>
  )
}
