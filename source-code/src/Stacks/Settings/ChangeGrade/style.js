import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  filterPaper: {
    width: '244px',
    maxWidth: 'unset',
    background: theme.palette.primary.light,
    border: `1.5px solid ${theme.palette.grey['600']}`,
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
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: '244px',
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

  select_grade_box: {
    padding: '0 !important',
  },
  /* select grade btn styling  */
  selectGradeBtn: {
    width: '100%',
    padding: '12px !important',
    marginBottom: theme.spacing(2),
    borderRadius: '15px !important',
    backgroundColor: '#ffffff',
    border: '1px solid #d3d3d3 !important',
    color: '#000000 !important', // Text color set to black
    '&:hover': {
      backgroundColor: '#f0f0f0 !important',
    },
    '&.MuiToggleButton-root.Mui-selected': {
      backgroundColor: '#e3e3e3 !important',
      color: '#0033a0',
      border: '1px solid #0033a0',
    },
  },
  container: {
    width: '100%',
    padding: theme.spacing(4),
  },
}));

export default useStyles;
