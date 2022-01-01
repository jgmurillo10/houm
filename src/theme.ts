import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF452B',
    },
    secondary: {
      main: '#FEF1F0',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
