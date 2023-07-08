import React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TodayIcon from '@mui/icons-material/Today';
import { useNavigate, NavLink } from 'react-router-dom';
import './PageNavigation.css';
import { Box } from '@mui/material';

const drawerWidth = 100;

export default function PageNavigation() {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          top: 100,
          left: 40,
          width: drawerWidth,
          borderRadius: drawerWidth/2,
          maxHeight: 550,
          boxSizing: 'border-box',
          border: 'none',
          padding: '60px 5px'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar className='navToolBar' /> */}
      <List className='navItems'>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            // onClick={() => navigate('/current-games')}
            to='/current-games'
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            sx={{
              borderRadius: 'inherit'
            }}
          >
            <TodayIcon />
            <ListItemText primary={'Сегодня'} primaryTypographyProps={{fontSize: '14px'}} />
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
          to='/error-page'
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            // onClick={() => navigate('/current-games')}
          >
            <TodayIcon />
            <ListItemText primary={'Завтра'} primaryTypographyProps={{fontSize: '14px'}} />
          </ListItemButton>
        </ListItem>
        <Box className='indicator'>
          <b></b>
          <span className='cirle'></span>
          <b></b>
        </Box>
      </List>
    </Drawer>
  )
}
