import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '48px',
  },
  rootB: {
    position: 'relative',
    width: '70px',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('md')]: {
      width: '100px!important',
    },
  },
  basePosition: {
    height: '36px',
    width: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionImage: {
    height: '36px',
    width: '36px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionImageSelf: {
    filter: 'brightness(0) saturate(100%) invert(18%) sepia(22%) saturate(4323%) hue-rotate(197deg) brightness(92%) contrast(99%)',
  },
  position: {
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
    top: '0',
    borderRadius: '50%',
    // background: theme.palette.primary.blueBonzo,
    color: theme.palette.common.white,
    height: '36px',
    width: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: theme.typography.fontWeightSemiBold,
    paddingTop: '3px',
    overflow: 'hidden',
    fontSize: theme.typography.pxToRem(12),
  },
  smallSize: {
    fontSize: '11px !important',
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    borderRadius: 4,
  },
  skeletonCircle: {
    background: theme.palette.action.skeleton,
  },
  filterPaper: {
    maxWidth: '150px',
    width: '100%',
    // maxWidth: 'unset',
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
  dataNotFound: {
    '& .MuiPaper-elevation1': {
      boxShadow: 'unset',
    },
  },
  inviteFriends: {
    margin: '8px 4px',
    padding: '9px 8px 8px 9px',
    width: '150px',
    height: '36px',
    paddingTop: theme.spacing(0.5),
    background: 'transparent',
    boxShadow: 'unset',
    '&:hover': {
      textDecorationStyle: 'dotted',
      background: 'transparent',
      boxShadow: 'unset',
    },
    '&:active': {
      textDecorationStyle: 'dotted',
      background: 'transparent',
      boxShadow: 'unset',
    },
    '& .MuiTouchRipple-root': {
      display: 'none',
    },
  },
  clickState: {
    color: 'yellow',
    margin: '8px 4px',
    padding: '9px 8px 8px 9px',
    width: '150px',
    height: '36px',
    paddingTop: theme.spacing(0.5),
    background: 'transparent',
    boxShadow: 'unset',
    borderBottom: `4px dotted yellow`,
    borderRadius: '0px',
    '&:hover': {
      textDecorationStyle: 'dotted',
      background: 'transparent',
      boxShadow: 'unset',
    },
    '&:active': {
      textDecorationStyle: 'dotted',
      background: 'transparent',
      boxShadow: 'unset',
    },
    '& .MuiTouchRipple-root': {
      display: 'none',
    },
  },
  '& ul': {
    '& .MuiListItem-root': {
      '& .MuiBox-root': {
        // Your styles here
        [theme.breakpoints.down('md')]: {
          fontSize: '9px!important',
        },
        // add more styles as needed
      },
    },
  },
  '& .MuiListItemText-primary': {
    whiteSpace: 'nowrap' /* Prevent text from wrapping */,
    overflow: 'hidden' /* Hide the overflowing text */,
    textOverflow: 'ellipsis' /* Add the "..." at the end of the truncated text */,
    marginRight: '12px',
    [theme.breakpoints.down('md')]: {
      fontSize: '9px!important',
    },
  },
  dropdown_container: {
    maxWidth: '300px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
    '@media (max-width: 638.88px)': {
      maxWidth: '280px',
      gap: '8px',
    },
  },
}));

export default useStyles;
