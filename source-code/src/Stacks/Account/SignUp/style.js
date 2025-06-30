import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  nextBtn: {
    height: '64px',
    width: '64px',
    borderRadius: '50%',
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
  smallCircle: {
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    background: theme.palette.grey['300'],
    display: 'inline-block',
    margin: '0 5px',
    '&.selected': {
      background: theme.palette.secondary.main,
    },
  },
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
}));
export default useStyles;
