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
  filterPaper: {
    width: '150px',
    maxWidth: 'unset',
    background: theme.palette.primary.light,
    margin: theme.spacing(1, 0.5),
    padding: theme.spacing(1.125, 1, 1, 1.125),
    justifyContent: 'space-between',
    flexDirection: 'row',
    '& p': {
      paddingTop: theme.spacing(0.25),
      paddingLeft: theme.spacing(0.25),
    },
    '& .MuiIconButton-root': {
      marginLeft: theme.spacing(0.5),
    },
    '& .MuiIconButton-root i': {
      fontSize: '1rem',
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: '150px',
    },
    '& .MuiFormControl-root': {
      maxWidth: '100%',
    },
    '& .MuiOutlinedInput-input': {
      padding: ' 0px 22px 0px 2px !important',
      overflow: 'hidden',
    },
  },
  select: {
    width: '100%',
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
    '& .MuiInputBase-root': {
      color: theme.palette.common.white,
    },
    '& label.Mui-focused': {
      color: theme.palette.common.white,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.common.white,
      right: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  progress_table_heading: {
    fontSize: "13px", 
    color: "#414141", 
    fontWeight: "500",
    [theme.breakpoints.up('lg')]: {
      fontSize: '17px',
    },
    '@media (max-width: 450px)': {
      fontSize: '12px',
      fontWeight: "600",
    },
    '@media (max-width: 422px)': {
      fontSize: '10px',
      fontWeight: "600",
    },
  }
}));

export default useStyles;
