import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  coins: {
    color: theme.palette.secondary.main,
    fontSize: '1.25rem',
  },
  row: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
}));

export default useStyles;
