import React from 'react';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FaceIcon from '@mui/icons-material/Face';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

export default function Header({ open, handleDrawerOpen, drawerWidth, value }) {
  const [name, setName] = React.useState('Composed TextField');

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleClick = (event) => {
    fetch('http://localhost:3000/markdown/download', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: name, body: value }),
    })
      .then((res) => res.json())
      .then((data) => navigate('/editor', { state: data }))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AppBar position='fixed' open={open} sx={{ backgroundColor: '#191919' }}>
      <Toolbar>
        <IconButton
          size='large'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <FaceIcon />
        <Typography sx={{ mr: 2 }} variant='h6' component='div'>
          MDNinja
        </Typography>
        <FormControl color='warning' variant='standard' sx={{ mr: 'auto' }}>
          <InputLabel sx={{ color: '#e6e8e6' }} htmlFor='component-simple'>
            Filename
          </InputLabel>
          <Input
            sx={{ color: '#e6e8e6' }}
            id='component-simple'
            value={name}
            onChange={handleChange}
          />
        </FormControl>

        <IconButton
          size='large'
          aria-label='menu'
          onClick={handleClick}
          color='inherit'
        >
          <DeleteForeverIcon />
        </IconButton>
        <Button sx={{ backgroundColor: '#f15025' }} color='inherit'>
          <FileDownloadIcon />
          Download
        </Button>
      </Toolbar>
    </AppBar>
  );
}
