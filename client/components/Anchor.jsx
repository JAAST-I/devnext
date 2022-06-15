import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  PeopleAlt as PeopleAltIcon,
  Settings as SettingsIcon,
  PowerSettingsNew as PowerSettingsNewIcon,
} from '@mui/icons-material';

/**
 *@represents container for Home, Profile, Settings, Logout buttons in Drawer Component
 *@returns {component} Anchor
 */
export default function Anchor({ setCurrent }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'inherit',
      }}
    >
      <nav aria-label="main navigation files">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setCurrent('home')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>

      <nav aria-label="secondary markdown files">
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
