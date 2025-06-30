import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  earningLost: {
    // color: theme.palette.secondary.main,
    fontSize: '20px',
    color: 'red',
  },
  select_grade_box: {
    padding: '0 !important',
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
    paddingBottom: '32px',
    // marginBottom: '24px',
    '@media (max-width: 638.88px)': {
      '& .MuiBox-root ': {
        margin: '0px 10px',
      },
      // gap: '10px',
      maxWidth: '84%',
      paddingBottom: '24px',
    },
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
      backgroundColor: '#f0f0f0',
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
  current_grade: {
    backgroundColor: '#d3d3d3' /* Example: gray background for disabled grade */,
  },
}));

export default useStyles;
