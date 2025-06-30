import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '320px',
    // maxWidth: '80%',
    marginLeft: theme.spacing(2),
    left: 'auto',
  },
  alert: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  // internetToast: {
  //   //  width: '600px'
  // },
}));

export default useStyles;
