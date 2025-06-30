import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bordered: {
    boxShadow: '3px 0px 6px 0px rgba(0, 0, 0, 0.2)',
  },
  root: {
    background: 'rgba(0,0,0,0.0)',
    borderRadius: (props) => (props.topRounded ? `${theme.shape.borderRadius} ${theme.shape.borderRadius} 0 0` : 0),
  },
  hide_left_title: {
    maxWidth: '15px !important',
    '@media (max-width: 1023px)': {
      maxWidth: '35px !important',
      marginRight: '14px !important',
    },
  },
  menuButton: {
    width: '150px',
    //width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 638.88px)': {
      maxWidth: '30px',
      marginRight: '2px',
    },
    marginRight: theme.spacing(2),
    '& .MuiButton-root': {
      color: theme.palette.text.icon,
      background: 'unset',
      // width: '100px',
      width: '100%',
      margin: 0,
      padding: '0px',
      display: 'flex',
      justifyContent: 'start',
      opacity: '1 !important',
      '&:hover': {
        boxShadow: 'unset',
        background: 'unset',
      },
      '&:active': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '&:focus': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '& .MuiButton-iconSizeMedium > *:first-child': {
        fontSize: '1.5rem',
      },
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
  },
  title: {
    flexGrow: 1,
  },
  avatar_container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // gap: "12px",
    // [theme.breakpoints.down('sm')]: {
    //   transform: 'scale(0.95)',
    //   marginLeft: '-45px',
    // },
  },
  coinContainer: {
    display: 'flex',
    maxWidth: '185px',
    color: '#ffffff',
    background: 'rgba(0,0,0,0.4)',
    borderRadius: theme.shape.borderRadius,
    width: 'auto',
    minHeight: '40px',
    maxHeight: '40px',
  },
  premium_coin_container: {
    borderBottom: `3px solid ${theme.palette.common.orange}`,
  },
  avatarImgContainer: {
    padding: theme.spacing(0, 0, 0, 0),
    display: 'flex',
    height: 'inherit',
    width: 'inherit',
    borderRadius: theme.shape.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
  },
  hoverHeaderBtn: {
    backgroundColor: 'rgba(255, 255, 255,0.2)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.4)',
    },
  },
  topAvatar: {
    // border: '4px solid #0093dd'
    transition: 'all 300ms ease-out',
    '&:hover img': {
      filter: 'brightness(1.4)',
    },
  },
  logoContainer: {
    justifySelf: 'flex-start',
    order: -1,
    flexGrow: 1,
    height: '74px',
    '@media (max-width: 638.88px)': {
      height: '60px',
    },
    '& img': {
      width: '100%',
      height: 'auto',
      '@media (max-width: 638.88px)': {
        width: '100%',
        height: 'auto',
      },
    },
  },
  webLogoBox: {
    width: '178px',
    marginTop: '15px',
  },
  webLogoBoxGG: {
    width: '220px',
    marginTop: '15px',
  },
  webLogoBoxPG: {
    width: '140px',
    marginTop: '15px',
  },
  mobileLogoBox: {
    width: '40px',
    marginTop: '12px',
  },
  mobileLogoBoxShupavu: {
    width: '40px',
    marginTop: '12px',
  },
  coinsWrapper: {
    flex: '1 1 auto',
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    textAlign: 'right',
    height: theme.typography.pxToRem(24),
    overflow: 'hidden',
    display: 'flex',
    paddingLeft: '90px',
    padding: theme.spacing(0, 2, 0, 0.5),
    '& i': {
      fontSize: theme.typography.pxToRem(24),
      color: theme.palette.common.orange,
      marginRight: theme.spacing(1),
    },
  },
  coins: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: theme.typography.fontWeightSemiBold,
    color: 'white',
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    borderRadius: theme.shape.borderRadius,
  },
  earningLost: {
    color: theme.palette.secondary.main,
  },
  kpLogo: {
    // width: '150px',
    height: '44px',
    backgroundSize: 'contain',
    marginTop: '2px',
    '@media (max-width: 375px)': {
      marginTop: '4px',
      height: '35px',
      width: '78px',
    },
  },
  premium_tag: {
    backgroundColor: theme.palette.common.orange,
    // color: '#fff',
    color: 'white',
    borderRadius: '24px',
    // borderRadius: '24px 0px 0px 24px',
    // backgroundColor: 'rgba(255,255,255,0.3)',
    // padding: '9px 12px 9px 12px',
    // padding: '0px 12px',
    fontSize: '0.7rem',
    display: 'flex',
    height: '40px',
    padding: '0px 4px',
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: '16px',
    // marginTop: '0px',
    fontWeight: '800',
    position: 'absolute',
    left: '0',
    zIndex: '1',
    // '@media (max-width: 610px)': {
    //   padding: '0px 8px',
    // },
  },
  PremiumIcon: {
    width: '32px',
    height: '32px',
    marginRight: '0px',
    // marginRight: '6px',
    // '@media (max-width: 610px)': {
    //   width: '24px',
    //   height: '24px',
    // //   marginRight: '0px',
    // },
  },
  PremiumText: {
    display: 'none',
    // display: 'flex',
    // '@media (max-width: 610px)': {
    //   display: 'none',
    // },
  },
  confirmation_box: {
    padding: '0 !important',
  },
  sign_out_buttons_container: {
    display: 'flex',
    width: '100%',
    maxWidth: '440px',
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
  },
}));

export default useStyles;
