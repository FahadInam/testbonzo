import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  daily_rewards_banner: {
    // background: 'linear-gradient(to top right, #fd2d2d, #ffa72b)',
    background: '#ffffff',
    color: '#000000',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    // height: '150px',
    width: '100%!important',
    borderRadius: '20px',
    // color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    padding: '24px 12px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: '0px',
    '@media (max-width: 1023.98px)': {
      flexDirection: 'column',
      paddingBottom: '0px',
    },
  },
  daily_rewards_banner_pending: {
    background: '#ffffff',
    // background: 'linear-gradient(to top right, #EE481C, #55B4C6)',
  },
  rewards_banner_right: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '@media (max-width: 1023.98px)': {
      height: '120px',
      justifyContent: 'flex-start',
      overflow: 'hidden',
    },
  },
  rewards_banner_1on1_text_base: {
    fontWeight: '400',
    color: '#000000',
    fontSize: '1rem',
    fontFamily: 'Poppins',
    padding: 'auto 24px',
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'column',
    // textAlign: 'center',
    justifyContent: 'center',
    '@media (max-width: 1023.98px)': {
      fontSize: '0.9rem',
      // textAlign: 'center',
      justifyContent: 'center',
    },
  },
  rewards_banner_1on1_text: {
    fontWeight: '700',
    color: '#000000',
    fontSize: '1.4rem',
    lineHeight: '1.4rem',
    fontFamily: 'Fredoka',
    marginBottom: '8px',
    // color: theme.palette.secondary.main,
  },
  rewards_banner_price_line: {
    fontWeight: '800',
    marginTop: '24px',
    fontSize: '1rem',
    color: '#000000',
    // textAlign: 'center',
    '@media (max-width: 1023.98px)': {
      // textAlign: 'center',
      // justifyContent: 'center',
    },
  },
  BUY_BUTTON_PAYMENT: {
    display: 'flex',
    backgroundColor: theme.palette.common.bonzoLightButton,
    color: '#fffffff',
    margin: '18px auto',
    width: '100%',
    '&:hover': {
      background: theme.palette.common.bonzoLightButton,
      color: '#ffffff',
    },
    '@media (max-width: 1023.98px)': {
      margin: '18px auto',
      textAlign: 'center',
      justifyContent: 'center',
    },
  },
  premium_rewards_image: {
    '@media (max-width: 1023.98px)': {
      // position: 'fixed',
      // top: '25%',
      // marginTop: '-250px',
      // opacity: '0.3',
      zIndex: '0',
    },
    d_none: {
      display: 'none',
    },
  },
}));

export default useStyles;
