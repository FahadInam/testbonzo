import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  successCircle: {
    height: '128px',
    width: '128px',
    borderRadius: '50%',
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: '96px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  successText: {
    display: 'block',
    padding: '0 15px',
    margin: '0',
  },
  mainGrid: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    // paddingBottom: '80px',
  },
}));

export default useStyles;
