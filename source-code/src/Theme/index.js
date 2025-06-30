import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import APP_TEXT, { SUPPORTED_LANGUAGES } from 'Constants/texts.constants';
import { light, dark, blue, green, orange, red, SUPPORTED_THEMES_BY_NAME } from './Colors';
import { shape, breakpoints, shadows } from './Metrics';
// import typography, { poppinsRegular } from './Typography';
import typography from './Typography';

const THEME = {
  SET: 'SET_THEME',
};

const SUPPORTED_THEMES = {
  LIGHT: 0,
  DARK: 1,
  BLUE: 2,
  GREEN: 3,
  ORANGE: 4,
  RED: 5,
};

const GetThemeIndexByColor = (c) => {
  return SUPPORTED_THEMES_BY_NAME.indexOf(c);
};

const colors = [light, dark, blue, green, orange, red];

const gameTheme = {
  typography,
  shape,
  breakpoints,
  shadows,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        // '@font-face': [poppinsRegular],
        '@media (min-width: 992px)': {
          '*::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'transparent',
          },
          '*::-webkit-scrollbar-track': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            boxShadow: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '8px',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.55)',
            },
            '&:active': {
              background: 'rgba(0, 0, 0, 0.55)',
            },
          },
        },
        sup: {
          fontSize: '1rem',
        },
      },
    },
  },
};

const Themes = {
  getTheme: (t = SUPPORTED_THEMES.LIGHT, language = SUPPORTED_LANGUAGES.ENGLISH) => {
    gameTheme.palette = { ...colors[t] };
    const theme = createTheme({ ...gameTheme, texts: APP_TEXT[language] });
    return responsiveFontSizes(theme);
  },
};

export default Themes;

export { THEME, SUPPORTED_THEMES, GetThemeIndexByColor };
