const typography = {
  fontFamily: [
    'Fredoka',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),

  fontWeightSemiBold: 600,

  h1: {
    fontWeight: 700,
    fontSize: '2.375rem', // 38
    // lineHeight: 2.625,
  },
  h2: {
    fontWeight: 300,
    fontSize: '2rem', // 32
    // lineHeight: 2.125,
  },
  h3: {
    fontWeight: 500,
    fontSize: '1.75rem', // '1.875rem', // 30
    // lineHeight: 2,
  },
  h4: {
    fontWeight: 500,
    fontSize: '1.5rem', // '1.625rem', // 26
    // lineHeight: 1.875,
  },
  h5: {
    fontWeight: 400,
    fontSize: '1.25rem', // '1.5rem', // 24
    // lineHeight: 1.625,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.125rem', // '1.25rem', // 20
    // lineHeight: 1.375,
  },

  Body1: {
    fontWeight: 500,
    fontSize: '1rem',
    color: '#414141',
  },

  Body2: {
    fontWeight: 500,
    fontSize: '0.875rem',
  },

  Subtitle2: {
    fontWeight: 500,
    fontSize: '2.75rem', // 12
  },

  button: {
    fontWeight: 400,
    fontSize: '1rem', // 16
    textTransform: 'none',
  },

  buttonText: {
    fontWeight: 700,
    fontSize: '1.25rem',
  },

  TextCapitalize: {
    fontWeight: 400,
    fontSize: '1.125rem',
  },
};

// export { poppinsRegular };

export default typography;
