import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),

  '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '300px',
  },
  '& .MuiButtonBase-root': {
    margin: theme.spacing(2),
  },
}));

export default function Form({ handleClose, type }) {
  // create state variables for each input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'Log In') {
      fetch('http://localhost:3000/user/login', {
        method: 'POST', // or 'PUT'
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => navigate('/editor', { state: data }))
        .catch((err) => {
          console.log(err);
        });
    } else if (type === 'Sign Up') {
      fetch('http://localhost:3000/user/signup', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => navigate('/editor', { state: data }))
        .catch((err) => {
          console.log(err);
        });
    }
    handleClose();
  };

  return (
    <SForm onSubmit={handleSubmit}>
      <TextField
        label='User Name'
        variant='filled'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        label='Password'
        variant='filled'
        type='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button variant='contained' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type='submit'
          variant='contained'
          onClick={handleSubmit}
          color='primary'
        >
          {type}
        </Button>
      </div>
    </SForm>
  );
}
