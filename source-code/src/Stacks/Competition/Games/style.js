import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    background: theme.palette.action.lightSkeleton,
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useStyles;
