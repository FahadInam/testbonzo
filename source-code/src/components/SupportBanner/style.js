import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  SupportPaper: {
    margin: '32px auto',
  },
  SupportPaperTop: {
    marginTop: '32px',
  },
  support_banner: {
    background: 'white',
    // height: '150px',
    width: '100%!important',
    borderRadius: '20px',
    // color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    padding: '12px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '@media (max-width: 1023.98px)': {
      flexDirection: 'column',
      paddingBottom: '0px',
    },
  },
  support_chat_banner_right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '@media (max-width: 1023.98px)': {
      // height: '120px',
      justifyContent: 'flex-start',
      overflow: 'hidden',
    },
  },
  support_banner_text_area: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  support_chat_banner_1on1_text_base: {
    fontWeight: '500',
    // color: 'white',
    fontSize: '1rem',
    padding: '10px 24px',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    // padding: '10px auto',
    textAlign: 'center',
    justifyContent: 'center',
    '@media (max-width: 1023.98px)': {
      fontSize: '0.9rem',
      textAlign: 'center',
      justifyContent: 'center',
    },
  },
  support_chat_banner_1on1_text_base_payment: {
    fontWeight: '500',
    // color: 'white',
    fontSize: '1rem',
    padding: '10px 24px',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    // padding: '10px auto',
    textAlign: 'left',
    justifyContent: 'flex-start',
    '@media (max-width: 1023.98px)': {
      fontSize: '0.9rem',
      textAlign: 'center',
      justifyContent: 'center',
    },
  },
  support_chat_banner_1on1_text: {
    fontWeight: '800',
    color: theme.palette.secondary.main,
    fontSize: '1.8rem',
    // marginBottom: '8px',
    // color: theme.palette.secondary.main,
  },
  support_chat_banner_price_line: {
    fontWeight: '800',
    marginTop: '24px',
    fontSize: '1rem',
    color: 'white',
    textAlign: 'left',
    '@media (max-width: 1023.98px)': {
      textAlign: 'center',
      justifyContent: 'center',
    },
  },
  BUY_BUTTON_SUPPORT: {
    display: 'flex',
    // backgroundColor: 'white',
    // color: theme.palette.secondary.main,
    margin: '18px 0px',
    width: '266px',
    // '&:hover': {
    //   background: theme.palette.grey['100'],
    //   color: theme.palette.grey['500'],
    // },
    '@media (max-width: 1023.98px)': {
      margin: '18px auto',
      textAlign: 'center',
      justifyContent: 'center',
    },
  },
}));

export default useStyles;
