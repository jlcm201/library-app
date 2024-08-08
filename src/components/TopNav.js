import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { AddOutlined, ArrowBackOutlined, DeleteOutline, HomeOutlined, LocalLibraryOutlined } from "@mui/icons-material";

export const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState('/');

  useEffect(() => {
    setValue(location.pathname);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleChange}
      sx={{ width: '100%', top: 0, mb: 2 }}
    >
      <BottomNavigationAction label="Inicio" icon={<HomeOutlined />} value="/" />
      <BottomNavigationAction label="Agregar Libro" icon={<AddOutlined />} value="/AddBook" />
      <BottomNavigationAction label="Eliminar Libro" icon={<DeleteOutline />} value="/DeleteBook" />
      <BottomNavigationAction label="Prestar Libro" icon={<LocalLibraryOutlined />} value="/LibraryLoan" />
      <BottomNavigationAction label="Devolver Libro" icon={<ArrowBackOutlined />} value="/ReturnBook" />
    </BottomNavigation>
  );
}

export default TopNav;
