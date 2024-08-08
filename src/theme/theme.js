import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0c355e',
    },
    secondary: {
      main: '#8c0735',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 8,
          marginBottom: 8,
        },
      },
    },
  },
});

export default theme;