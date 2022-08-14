import React, { useState } from 'react';
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
import Header from './Header';
import Anchor from './Anchor';
import Split from './Split';
const drawerWidth = 240;
import { useLocation } from 'react-router-dom';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function Editor() {
  const [user, setUser] = useState(useLocation().state.user);

  const [currentDoc, setCurrentDoc] = useState({});
  // console.log(user);

  const [value, setValue] = React.useState(currentDoc ? currentDoc.body : '');

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    fetch(`http://localhost:3000/${user._id}`, {
      method: 'GET', // or 'PUT'
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
        theme={theme}
        title={currentDoc.title}
        docid={currentDoc._id}
        value={value}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            // backgroundColor: '#ced0ce',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
            <Avatar sx={{ backgroundColor: '#f15025' }}>
              {user.username[0]}
            </Avatar>
            <Typography variant='h5' component='p'>
              {user.username}
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
        <Anchor
          fetchData={fetchData}
          docs={user.documents}
          setCurrentDoc={setCurrentDoc}
        />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Split
          currentDoc={currentDoc}
          docid={currentDoc._id}
          fetchData={fetchData}
          value={value}
          setValue={setValue}
        />
      </Main>
    </Box>
  );
}
