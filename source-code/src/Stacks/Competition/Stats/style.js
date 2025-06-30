import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  row: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    borderRadius: '4px',
  },
  right: {
    float: 'right',
  },
  center: {
    margin: '4px auto',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats_screen: {
    width: '100%',
    maxWidth: '920px',
    paddingRight: '8px',
    paddingLeft: '8px',
    margin: '0 auto 20px auto',
  },
  stats_container: {
    padding: '0 !important',
    maxWidth: '920px',
    width: '100%',
    margin: '0 0 20px 0',
  },
  skeletonNumberCircle: {
    height: '95px',
    width: '95px',
    background: theme.palette.action.skeleton,
  },
  skeleton_box: {
    '@media (max-width: 638.88px)': {
      flexDirection: 'column',
    },
  },
}));

export default useStyles;
