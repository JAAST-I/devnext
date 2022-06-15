// TODO: Group imports based on source
import Navbar from '../components/Navbar';
import Anchor from '../components/Anchor';
import Home from '../components/Home';
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Favs from '../components/Favs';
import MOCK_DATA from '../../MOCK_DATA';

import { useLocation } from 'react-router-dom'; // Gets previous route

const drawerWidth = 240;

// This block is MUI boilerplate
//***************************************** */
const MainContainer = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
// Component used in the return statement below
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));
//******************************************** */

export default function MainPage() {
  const theme = useTheme();
  // Is drawer open? -- Default to false
  const [open, setOpen] = useState(false); // determines drawer to open or not

  const [searchInput, setSearchInput] = useState(''); //search bar input
  // item data is the result of fetching database items
  const [itemData, setItemData] = useState([]); // all items displayed in main, potentially rename

  const [current, setCurrent] = useState('home'); // determines current area by endpoint

  const filteredItemData = itemData.filter(({ name }) =>
    name.toLowerCase().includes(searchInput.toLocaleLowerCase())
  );
  //                              useLocation coming from Login.jsx
  const [userData, setUserData] = useState(useLocation().state.data); // {username,pas,fav, products, _id} -- TODO: Potential for cleanup, shouldn't pass password

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // TODO: Rename "reset" -- It gets user data, handleItemDataList
  const reset = () => {
    console.log('reseting!');
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setItemData(data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    reset(); // getting the item data
  }, []); // component did mount (if we didn't init empty array, would be invoked every time there is a change to component)

  let currentElement;
  // Sets currentElement to the component to be rendered depending of the value of the variable "current"
  if (current === 'home') {
    currentElement = (
      <Home
        itemData={filteredItemData} // TODO: to be renamed / State itemData and props itemData are unrelated
        reset={reset}
        userId={userData._id}
        username={userData.username}
      />
    );
  } else if (current === 'favs') {
    currentElement = <Favs favs={userData.favs} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
        theme={theme}
        setCurrent={setCurrent}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          justifyContent: 'space-between',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#9FAEE5',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
            <Avatar sx={{ backgroundColor: '#9FAEE5' }}>
              {userData.username[0]}
            </Avatar>
            <Typography variant='h5' component='p'>
              {userData.username}
            </Typography>
          </Stack>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Anchor setCurrent={setCurrent} />
      </Drawer>
      <MainContainer open={open}>
        <DrawerHeader />
        {/* Current element changes depending on the value of "current" -- Either render home, favs, or other | refer to line 91 */}
        {currentElement}
      </MainContainer>
    </Box>
  );
}
