import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  override: {
    zIndex: 1400,
  },
  button: {
    backgroundColor: theme.palette.common.green,
    '&:hover': {
      background: theme.palette.common.green,
    },
  },
  TextBox: {
    textAlign: 'left',
    // maxHeight: '313px',
    // overflow: 'auto',
    flex: '1',
    width: '100%',
    padding: '0px 3vw',
    overflowY: 'auto',
    marginTop: '32px',
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
    minHeight: '70vh',
    maxHeight: '80vh',
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
    position: 'relative',
    display: 'flex',
    flex: '1',
    maxHeight: '100%',
    // margin: '0 auto',
    '@media (max-height: 635px)': {
      position: 'absolute',
      top: '-30px',
      left: '0',
    },
  },
  buttons_container: {
    display: 'flex',
    width: '100%',
    maxWidth: '440px',
    '& .MuiBox-root  ': {
      margin: '0px 10px',
    },
    // gap: '20px',
    // marginBottom: '24px',
    '@media (max-width: 638.88px)': {
      '& .MuiBox-root ': {
        margin: '0px 10px',
      },
      // gap: '10px',
      maxWidth: '84%',
    },
  },
}));

export default useStyles;
