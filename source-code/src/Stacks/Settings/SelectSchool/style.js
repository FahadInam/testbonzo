import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  filterPaper: {
    //width: '244px',
    maxWidth: 'unset',
    background: theme.palette.primary.light,
    border: `1.5px solid ${theme.palette.grey['600']}`,
    // margin: theme.spacing(1, 0.5),
    //padding: theme.spacing(1.125, 1, 1, 1.125),
    justifyContent: 'space-between',
    flexDirection: 'row',
    '& p': {
      // paddingTop: theme.spacing(0.25),
      //paddingLeft: theme.spacing(0.25),
    },
    '& .MuiIconButton-root': {
      // marginLeft: theme.spacing(0.5),
    },
    '& .MuiIconButton-root i': {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('xs')]: {
      //maxWidth: '244px',
    },
    '& .MuiFormControl-root': {
      // maxWidth: '100%',
    },
    '& .MuiOutlinedInput-input': {
      padding: ' 0px 22px 0px 2px !important',
      overflow: 'hidden',
    },
  },
  select: {
    margin: 0,
    '& .MuiOutlinedInput-input': {
      padding: 0,
      border: 'none',
      background: 'transparent',
      textAlign: 'left',
    },
    '& .MuiOutlinedInput-input.Mui-focused': {
      border: 'none',
    },
    '& .MuiSelect-icon': {
      right: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
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
  skeletonButton: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.action.skeleton,
    marginBottom: theme.spacing(1),
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    height: '180px',
    width: '272px',
  },
  skeletonCircle: {
    background: theme.palette.action.skeleton,
  },
  select_school_box: {
    padding: '0 !important'
  },
  skeletonNumberCircle: {
    height: '95px',
    width: '95px',
    background: theme.palette.action.skeleton,
  },
  
}));

export default useStyles;
