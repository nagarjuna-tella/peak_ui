import { createTheme } from '@mui/material/styles';

// Define the color palette
const colors = {
    persianRed: '#CB2B2D',
    blueZodiac: '#0D1A3B',
    creamCan: '#F8C662',
    steelBlue: '#5585BC',
    darkCerulean: '#034f84',
    sandyBrown: '#f4a460',
    cadetBlue: '#5f9ea0',
    rosyBrown: '#bc8f8f',
    darkSlateGray: '#2f4f4f',
    forestGreen: '#2A9D8F',
    lightGray: '#E0E1DD',
    charcoalGray: '#333F44'
  };

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: colors.blueZodiac, // Primary color for your theme
      contrastText: colors.creamCan, // Text color on primary color
    },
    secondary: {
      main: colors.persianRed, // Secondary color for your theme
      contrastText: '#fff', // Text color on secondary color
    },
    info: {
      main: colors.steelBlue, // Another color for your theme
    },
    warning: {
      main: colors.creamCan, // Warning color for your theme
    },
    background: {
        default: colors.darkCerulean, // Set the background color
      },
    // You can also define other color intentions (error, success, etc.)
  },
  // You can also customize other theme aspects like typography, components, etc.
});

export default theme;
