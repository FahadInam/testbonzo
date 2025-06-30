import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  topCard: {
    padding: theme.spacing(3, 4),
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  circleArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row-reverse',
      marginBottom: theme.spacing(0),
    },
  },
  circle: {
    background: theme.palette.text.secondary,
    height: '136px',
    width: '136px',
    borderRadius: '50%',
    textAlign: 'center',
    margin: `${theme.spacing(2)}px auto`,
    '& svg': {
      height: '108px',
      width: '108px',
    },
    [theme.breakpoints.up('md')]: {
      height: '95px',
      width: '95px',
      '& svg': {
        height: '75px',
        width: '75px',
      },
      flexDirection: 'row-reverse',
      margin: theme.spacing(0, 2, 0, 0),
    },
  },
  buttonArea: {
    flex: '0 0 260px',
    flexBasis: '260px',
    flexGrow: 0,
    flexShrink: 0,
    textAlign: 'right',
    maxWidth: '260px',
    margin: '0 0',
    maxHeight: '44px',
  },
  startChallenge: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(0),
      textAlign: 'left',
    },
  },
  resultIcon: {
    paddingTop: theme.spacing(0.75),
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(1),
    },
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
      paddingBottom: "32px",
      // marginBottom: '24px',
      '@media (max-width: 638.88px)': {
        // gap: '10px',
        '& .MuiBox-root ': {
          margin: '0px 10px',
        },
        maxWidth: '84%',
        paddingBottom: "24px",
    },  
  }
}));

export default useStyles;
