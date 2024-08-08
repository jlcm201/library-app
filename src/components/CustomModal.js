import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from '@mui/material';

export const CustomModal = ({ title, open, onOk, onCancel, message, icon: Icon }) => {
  return (
    <Dialog open={open} onClose={onOk} fullWidth maxWidth="sm">
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onOk}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {Icon && <Icon style={{ marginRight: 8 }} />}
          <Typography>{message}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button size='large' variant="contained" color="primary" onClick={onOk}>Aceptar</Button>
        {onCancel && <Button size='large' variant="contained" color="primary" onClick={onCancel}>Cancelar</Button>}
      </DialogActions>
    </Dialog>
  );
};

CustomModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  message: PropTypes.string.isRequired,
  icon: PropTypes.elementType
};

export default CustomModal;
