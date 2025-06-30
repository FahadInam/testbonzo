const SUPPORTED_THEMES_BY_NAME = ['white', 'dark', 'blue', 'green', 'orange', 'red'];

const common = {
  black: '#000',
  blueBonzo: '#02BBFE',
  white: '#fff',
  dark: '#303030',
  gray: '#313644',
  bonzoLight: '#A3A8B5',
  darkGray: '#191B29',
  darkBlue: '#112D70',
  cyan: '#00BCFF',
  red: '#FF6377',
  red2: '#FF1010',
  green: '#00DBAA',
  darkGreen: '#0bbc93',
  //blue: '#5899e4', //  #5899e4 --> this is old PB blue color
  blue: '#0B5EB5',
  lightBlue: '#00bbff',
  orange: '#F7C72E',
  yellow: '#F8FF3A',
  purple: '#8457DE',
  facebook: '#3B5998',
  google: '#FF6377',
  twitter: '#1DA1F2',
  linkedIn: '#0e76a8',
  bonzoLightButton: '#02B5F5',

  grey: {
    50: '#fafafa',
    100: '#F6F6F6', // Adeel
    200: '#EEF1F3', // Adeel
    220: '#112D70', // Adeel
    250: '#DEDEDE', // Abdullah
    300: '#ABBFC7', // Adeel
    400: '#708891', // Adeel
    500: '#9ea9ae', // Adeel
    600: '#414141',
    700: '#415861',
  },
  All: SUPPORTED_THEMES_BY_NAME,
};

const light = {
  common,
  grey: common.grey,

  primary: {
    light: common.white, // it was grey I did for experimental purpose
    main: common.white,
    dark: common.white,
    contrastText: '#fff',
    contrastText2: '#ffff00',
    blueBonzo: '#02BBFE',
  },
  secondary: {
    light: '',
    main: common.bonzoLightButton,
    dark: '',
    contrastText: '#fff',
    contrastText2: '#ffff00',
    bonzoLight: '#A3A8B5',
    bonzoLightButton: '#02B5F5',
    bonzoDarkBlue: '#112D70',
  },

  text: {
    primary: common.grey['700'],
    secondary: common.grey['600'],

    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
    icon: common.grey['500'],
    divider: 'rgba(0, 0, 0, 0.12)',
  },

  btn: {
    light: '#FFED48',
    dark: '#FFC700',
  },

  background: {
    paper: '#ffffff',
    default: '#fbfbfb',
  },

  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff',
    contrastText2: '#ffff00',
  },
  Warning: {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
    contrastText2: '#ffff00',
  },
  info: {
    light: '#64b5f6',
    main: '#2196f3',
    dark: '#1976d2',
    contrastText: '#fff',
    contrastText2: '#ffff00',
  },
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
    contrastText: 'rgba(0, 0, 0, 0.87)',
    contrastText2: '#ffff00',
  },

  action: {
    active: common.green,
    hover: common.green,
    hoverOpacity: 0.15,
    selected: common.green,
    selectedOpacity: 0.08,
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: common.green,
    focusOpacity: 0.22,
    activatedOpacity: 0.22,
    skeleton: 'rgba(0,0,0,0.075)',
    lightSkeleton: 'rgba(255,255,255,0.375)',
  },
};

const blue = {
  common,
  grey: common.grey,

  primary: {
    light: 'rgba(255,255,255,.2)',
    main: common.white /* Adeel */,
    dark: common.white,
    contrastText: common.white,
    contrastText2: '#ffff00',
    blueBonzo: '#02BBFE',
  },

  secondary: {
    /* Adeel should be same in all  */
    light: '#ff8191',
    // main: common.red,
    main: common.bonzoLightButton,
    dark: '',
    contrastText: common.white,
    contrastText2: '#ffff00',
    bonzoLight: '#A3A8B5',
    bonzoDarkBlue: '#112D70',
  },

  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff',
    contrastText2: '#ffff00',
  },
  Warning: {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
    contrastText2: '#ffff00',
  },
  info: {
    light: '#64b5f6',
    main: '#2196f3',
    dark: '#1976d2',
    contrastText: '#fff',
    contrastText2: '#ffff00',
  },
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
    contrastText: 'rgba(0, 0, 0, 0.87)',
    contrastText2: '#ffff00',
  },

  text: {
    primary: common.white,
    secondary: common.grey['700'],
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: common.white,
    divider: 'rgba(255, 255, 255, 0.12)',
  },

  background: {
    paper: common.white,
    default: common.blue,
  },
  action: {
    active: common.red,
    hover: common.red,
    hoverOpacity: 0.08,
    selected: common.red,
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: common.red,
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
    skeleton: 'rgba(0,0,0,0.075)',
    lightSkeleton: 'rgba(255,255,255,0.375)',
  },
};

const green = {};

const orange = {};

const red = {};

const dark = {
  common,

  primary: {
    light: '#7986cb',
    main: '#fff' /* Adeel */,
    dark: '#303f9f',
    contrastText: '#fff',
    contrastText2: '#ffff00',
    blueBonzo: '#02BBFE',
  },

  secondary: {
    light: '#ff4081',
    main: '#f50057',
    dark: '#c51162',
    contrastText: '#fff',
    contrastText2: '#ffff00',
    bonzoLight: '#A3A8B5',
    bonzoDarkBlue: '#112D70',
  },

  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    250: '#A3A8B5',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#d5d5d5',
    A200: '#aaaaaa',
    A400: common.dark,
    A700: '#616161',
  },

  text: {
    primary: common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
    divider: 'rgba(255, 255, 255, 0.12)',
  },

  background: {
    paper: '#424242',
    default: common.dark,
  },

  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff',
    contrastText2: '#ffff00',
  },
  Warning: {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
    contrastText2: '#ffff00',
  },
  info: {
    light: '#64b5f6',
    main: '#2196f3',
    dark: '#1976d2',
    contrastText: '#fff',
    contrastText2: '#ffff00',
  },
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
    contrastText: 'rgba(0, 0, 0, 0.87)',
    contrastText2: '#ffff00',
  },

  action: {
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
};

export { light, dark, blue, green, orange, red, SUPPORTED_THEMES_BY_NAME };
