import React from 'react';
import Dialog from '@mui/material/Dialog';
import Form from './Form';

const ModalDialog = ({ open, handleClose, type }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose} type={type} />
    </Dialog>
  );
};

export default ModalDialog;
