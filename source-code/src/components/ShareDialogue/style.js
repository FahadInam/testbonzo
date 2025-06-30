import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  twitter: {
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    background: theme.palette.common.twitter,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.common.twitter,
      color: theme.palette.common.white,
    },
  },
  modal_container: {
    display: "block",
    paddingTop: '0px',
    padding: '0px'
  },
  facebook: {
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    background: theme.palette.common.facebook,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.common.facebook,
      color: theme.palette.common.white,
    },
  },
  linkedin: {
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    background: theme.palette.common.linkedIn,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.common.linkedIn,
      color: theme.palette.common.white,
    },
  },
  shareText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '27px',
    margin: '18px 24px',
  },
  SocialBtn: {
    padding: '12px',
  },
  inputCustom: {
    width: '100%',
    maxWidth: '512px',
    margin: 'auto',
    display: 'flex',
    borderRadius: '15px',
    justifyContent: 'center',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.grey['200']}`,
      padding: 0,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.grey['200']}`,
      padding: 0,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.grey['200']}`,
    },
    '& .MuiOutlinedInput-adornedEnd': {
      padding: 0,
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.grey['200']}`,
    },
    '& .MuiOutlinedInput-input': {
      padding: '15px 0px 15px 9px',
    },
  },
}));

export default useStyles;
