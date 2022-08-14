import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from './Modal';

export default function Home() {
  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);

  // function to handle modal open
  const handleOpenSignup = () => {
    setType('Sign Up');
    setOpen(true);
  };

  const handleOpenLogin = () => {
    setType('Log In');
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='App'>
      <Button variant='contained' color='primary' onClick={handleOpenSignup}>
        Signup
      </Button>
      <Button variant='contained' color='primary' onClick={handleOpenLogin}>
        Login
      </Button>

      <Modal open={open} handleClose={handleClose} type={type} />
    </div>
  );
}
