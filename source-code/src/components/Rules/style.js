import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  override: {
    zIndex: 1400,
  },
  // button: {
  //   backgroundColor: theme.palette.common.red,
  //   '&:hover': {
  //     background: theme.palette.common.red,
  //   },
  // },
  TextBox: {
    textAlign: 'left',
    maxHeight: '80vh',
    background: 'white',
    // overflow: 'auto',
    flex: '1',
    width: '100%',
    padding: '32px 2vw 0px 2vw',
    overflowY: 'auto',
    // marginTop: '32px',
    [theme.breakpoints.up('sm')]: {
      // margin: '5px 28px',
    },
  },
  rulesPaper: {
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    flex: '1',
    flexDirection: 'column',
    width: '100%',
    // maxWidth: '920px',
    paddingRight: '8px',
    paddingLeft: '8px',
    // margin: '0 auto 20px auto',
  },
  rulesPopup: {
    display: 'flex',
    flex: '1',
    // margin: '0 auto',
    // border: '1px solid green',
    background: 'transparent',

    padding: '0px',
    paddingTop: '0px',
    minHeight: '70vh',
    maxHeight: '80vh',
    boxShadow: 'none',
    // maxHeight: 'calc( 100vh - 56px)',
    '@media (min-height: 636px)': {
      // maxHeight: 'calc( 100vh - 300px)',
    },
    // height: '80%',
    // maxHeight: '80%',
  },
  noSmallDisplay: {
    '@media (max-height: 635px)': {
      display: 'none',
    },
  },
  takeOverWhenSmall: {
    // position: 'relative',
    display: 'flex',
    flex: '1',
    maxWidth: '748px !important',
    paddingTop: '0px !important',
    padding: '0px !important',
    boxShadow: 'none',
    background: 'transparent',
    borderRadius: '22px',
    marginTop: '-44px',
    margin: '0 auto',
    // '@media (max-height: 635px)': {
    //   position: 'absolute',
    //   top: '-30px',
    //   left: '0',
    // },
  },
  buttons_container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    padding: '26px',
    transform: 'translateY(-34px)',
    borderBottomLeftRadius: '22px',
    borderBottomRightRadius: '22px',
    background: 'white',
    '& .MuiBox-root  ': {
      maxWidth: '300px',
      padding: '0px 0px 10px 0px',
    },
    // gap: '20px',
    // marginBottom: '24px',
    '@media (max-width: 638.88px)': {
      '& .MuiBox-root ': {
        // margin: '0px 10px',
      },
      // gap: '10px',
      // maxWidth: '84%',
    },
  },
}));

export default useStyles;
