import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, MenuItem, TextField } from '@mui/material';

export const ComboBox = ({ options, value, onChange, label}) => {
  return (
    <FormControl fullWidth variant="outlined">
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        select
        value={value}
        onChange={onChange}
        required
      >
        {options.map((option) => (
          <MenuItem 
            key={option.value} 
            value={option.id} 
            disabled={option.disabled !== undefined && option.disabled}
          >
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}

ComboBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
