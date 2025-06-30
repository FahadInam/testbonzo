import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  body: {
    // backgroundColor: '#5899e4', //  #5899e4 --> this is old PB blue color
    backgroundColor: '#0B5EB5',
    // backgroundColor: theme.palette.common.blue,
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'auto',
    // background: theme.palette.common.white,
    backgroundColor: `${theme.palette.common.blue}!important`,
    //background: '#5899e4', //  #5899e4 --> this is old PB blue color
    background: '#0B5EB5',
  },
  PaymentSuccessRoot: {
    userSelect: 'text',
    cursor: 'initial',
    width: '100%',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'auto',
    background: theme.palette.common.blue,
  },

  PaymentSuccessGrid: {
    padding: '16px',
    margin: 'auto',
  },

  image: {
    width: 150,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.common.red,
    alignItems: 'center',
    '& i': {
      fontSize: '120px',
    },
  },
  retry: {
    background: theme.palette.common.red,
    '&:hover': {
      background: theme.palette.common.red,
    },
    '&:active': {
      background: theme.palette.common.red,
    },
  },
  view: {
    width: '100%',
  },
  fab: {
    margin: '48px 12px 24px 12px',
  },
  sub_heading_icon_paper: {
    fontSize: '1.2rem!important',
    marginBottom: '1rem',
  },
  error_text_content: {
    // maxWidth: '540px',
    margin: 'auto',
    width: '100%',
  },
  takeOverWhenSmall: {
    // maxWidth: '90%',
    margin: 'auto',
    // maxWidth: '680px',
  },
  fab2: {
    margin: '0px',
    top: 'auto',
    right: '28px',
    bottom: '12px',
    left: 'auto',
    position: 'fixed',
    zIndex: 3,
    '@media (min-width: 980px)': {
      position: 'relative',
      right: 'auto',
      bottom: '24px',
      marginTop: '24px',
    },
    // [theme.breakpoints.up('md')]: {
    //    display: 'none',
    // },
    // [theme.breakpoints.up('lg')]: {
    //    display: 'none',
    // },
    // [theme.breakpoints.up('xl')]: {
    //    display: 'none',
    // },
  },
  headingPage: {
    color: 'white',
    marginTop: '48px',
    paddingBottom: '0px',
    marginBottom: '0px',
    // maxHeight: '0px',
    // margin: '12px',
  },
  icoPaperStd: {
    maxWidth: '860px',
    margin: 'auto',
    marginTop: '0px!important',
  },
  error_text_paper: {
    fontSize: '0.9rem!important',
  },
  m_auto: {
    margin: 'auto',
  },
  tableRowOdd: {
    color: theme.palette.common.dark,
    backgroundColor: theme.palette.grey['200'],
    borderRadius: '12px',
    width: '100%',
    padding: '8px 12px',
  },
  tableRow: {
    color: theme.palette.common.dark,
    width: '100%',
    padding: '8px 12px',
    borderRadius: '12px',
    flexDirection: 'row',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey['100'],
    },
    '@media (max-width: 638.88px)': {
      flexDirection: 'column',
    },
  },
  table_col_left: {
    width: '50%',
    color: theme.palette.grey['400'],
    textAlign: 'right',
    padding: '0px 12px',
    '@media (max-width: 638.88px)': {
      width: '100%',
      textAlign: 'center',
    },
  },
  table_col_right: {
    width: '50%',
    textAlign: 'left',
    padding: '0px 12px',
    '@media (max-width: 638.88px)': {
      width: '100%',
      textAlign: 'center',
    },
  },
  printBtn: {
    position: 'absolute',
    // color: 'blue',
    right: '-8px',
    top: '20px',
    display: 'flex',
    flexDirection: 'column',
    padding: 'auto 0px',
    margin: '0px',
  },
  print_icon_btn: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px',
    '& MuiIconButton-label': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  print_ico_label: {
    color: theme.palette.secondary.main,
    height: '40px',
    width: '80px',
    overflow: 'hidden',
    display: 'inline-block',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    lineHeight: '1rem',
  },
  noPrint: {
    marginTop: '0px',
    '@media print': {
      visibility: 'hidden',
    },
  },
}));

export default useStyle;
