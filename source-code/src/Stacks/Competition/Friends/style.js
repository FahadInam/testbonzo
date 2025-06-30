import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  baseRoot: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  transparentBg: {
    background: 'transparent',
  },
  root: {
    flex: '1 1',
    flexGrow: 1,
    flexShrink: 1,
    '& .MuiInput-root': {
      height: '100%',
      border: '0',
      color: '#ffffff',
      padding: theme.spacing(0, 2),
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 0),
      height: '100%',
    },
  },
  searchIcon: {
    color: '#ffffff',
  },
  clearIcon: {
    color: theme.palette.grey['100'],
    fontSize: '24px',
  },
  indicator: {
    background: theme.palette.secondary.main,
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    position: 'absolute',
    right: '12px',
    bottom: '10px',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  searchBarContainer: {
    width: '100%',
    marginRight: '5px',
  },
  iconBtn: {
    width: '45px',
    height: '45px',
    background: 'rgba(255,255,255,0.2)',
    color: '#ffffff',
    margin: 'auto',
    '&:hover': {
      background: 'rgba(255,255,255,0.4)',
      color: '#ffffff',
    },
  },
  inviteBtn: {
    marginRight: '8px',
  },
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
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  inputCustom: {
    width: '100%',
    maxWidth: '445px',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `3px solid ${theme.palette.secondary.main}`,
      padding: 0,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: `3px solid ${theme.palette.secondary.main}`,
      padding: 0,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `3px solid ${theme.palette.secondary.main}`,
    },
    '& .MuiOutlinedInput-adornedEnd': {
      padding: 0,
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      border: `3px solid ${theme.palette.secondary.main}`,
    },
    '& .MuiOutlinedInput-input': {
      padding: '15px 0px 15px 9px',
    },
  },
  inviteFriends: {
    height: '36px',
    width: '175px',
    paddingTop: theme.spacing(0.5),
    background: 'rgb(255,255,255,0.25)',
    '&:hover': {
      background: 'rgb(255,255,255,0.25)',
    },
    '&:active': {
      background: 'rgb(255,255,255,0.25)',
    },
  },
  link: {
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    background: theme.palette.common.grey[600],
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.common.grey[600],
      color: theme.palette.common.white,
    },
  },
}));

export default useStyles;
