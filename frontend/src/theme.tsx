import { createTheme, ThemeOptions } from '@mui/material/styles';


export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffb612',
    },
    secondary: {
      main: '#FFB612',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    info: {
      main: '#2196f3',
    },
    background: {
      default: '#101820',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;