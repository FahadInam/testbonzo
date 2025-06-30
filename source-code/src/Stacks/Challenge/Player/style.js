import { makeStyles } from '@material-ui/core';
import { Cordova } from 'Utils';
import TimerOpen from 'Assets/images/timer_open_bg.png';
import TimerClose from 'Assets/images/timer_close_bg.png';

const useStyles = makeStyles((theme) => ({
  timerBox: {
    height: '90px',
    // width: '140px',
    width: '120px',
    position: 'absolute',
    zIndex: 2,
    fontSize: theme.typography.pxToRem(22),
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey['700'],
    top: '10px',
    left: '50%',
    marginLeft: '-70px',
    paddingTop: '11px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url('${Cordova.Path(TimerClose)}')`,
    transform: 'translateY(-53px)',
    transition: 'transform 0.75s',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': 'transparent',
    span: {
      color: '#fff',
    },
    [theme.breakpoints.down('md')]: {
      width: '100px',
      fontSize: theme.typography.pxToRem(20),
      paddingTop: '8px',
      top: '16px',
    },
  },
  timerBoxDown: {
    top: '12px',
    backgroundImage: `url('${Cordova.Path(TimerOpen)}')`,
    transform: 'translateY(-15px)',
  },
  resignCustomBtn: {
    position: 'absolute',
    // left: '135px',
    left: 'calc( 50vw - 28px )',
    top: '12px',
    width: '85px',
    height: '33px',
  },
  fullscreenCustomBtn: {
    position: 'absolute',
    // left: '135px',
    left: 'calc( 50vw - 28px )',
    top: '12px',
    width: '50px',
    height: '50px',
  },
  hide: {
    display: 'none',
  },
  tutorial: {
    width: 'auto',
    height: 'auto',
    padding: '4px 16px',
    zIndex: '1000',
  },
  boxClassName: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  containerClass: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    margin: 0,
    display: 'flex',
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
  },
  mcdStyle: {
    top: 59,
  },
  confirmation_box: {
    padding: '0 !important',
  },
  sign_out_buttons_container: {
    display: 'flex',
    width: '100%',
    // maxWidth: '480px',
    maxWidth: '520px',
    // gap: '20px',
    '& .MuiBox-root  ': {
      margin: '0px 20px',
    },
    // paddingTop: "16px",
    paddingBottom: '32px',
    // marginBottom: '24px',
    '@media (max-width: 638.88px)': {
      // gap: '10px',
      '& .MuiBox-root ': {
        margin: '0px 10px',
      },
      maxWidth: '84%',
      paddingBottom: '24px',
    },
    [theme.breakpoints.down('sm')]: {
      gap: '15px',
      flexWrap: 'wrap',
    },
  },
}));

export default useStyles;
