import { makeStyles } from '@material-ui/core';
import bgPattern from 'Assets/home-img/gameon_bg.png';
import { Cordova } from 'Utils';

const useStyles = makeStyles((theme) => ({
  gapToNotShowInLargeScreen: {
    display: 'inherit',
    '@media(min-width: 901px)': {
      display: 'none',
    },
  },
  createNewAccountRow: {
    backgroundColor: '#F9DEE2',
    padding: '0',
    margin: '50px 0px 0px 0px',
    cursor: 'pointer',
    display: 'flex',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    borderTop: '3px solid #FFFFFF',
    '@media(min-width: 901px)': {
      borderTop: '0px',
      position: 'relative',
      borderRadius: '250px',
      maxWidth: '245px',
      margin: 'auto auto auto auto',
      padding: '3px',
    },
    '@media(max-width: 900px) and (min-height: 600px)': {
      padding: '20px 3px',
      fontSize: '1.5rem',
    },
  },
  createNewAccountLink: {
    // padding: '0',
    margin: 'auto ',
    color: '#FF6377',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '100%',
    borderRadius: '0px',
    border: '0',
    '&:hover': {
      background: 'transparent',
      boxShadow: 'none',
      transition: 'none',
    },
    '&:active': {
      background: 'transparent',
      boxShadow: 'none',
      transition: 'none',
    },
  },
  rootX2: {
    height: '100%!important',
    // maxWidth: '900px',
    maxWidth: '100%',
    width: '100%',
    padding: '0',
    alignSelf: 'center!important',
    alignItems: 'center!important',
    alignContent: 'center!important',
    margin: 'auto!important',
    flexDirection: 'row!important',
    overflow: 'scroll',
    // '&::before': {
    background: `#ffffff url(${Cordova.Path(bgPattern)}) repeat-x 0 0`,
    // backgroundSize: 'cover',
    animation: `spin 46s linear infinite`,
    color: theme.palette.grey['600'],
    fontSize: '1rem!important',
    fontWeight: '500',
    // },
  },
  rootY2: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    display: 'flex',
    margin: 'auto!important',
    flexDirection: 'column',
  },
  guestBtn: {
    '& .MuiButton-outlined': {
      background: theme.palette.common.red,
      borderColor: theme.palette.common.red,
      color: theme.palette.common.white,
    },
  },
}));

export default useStyles;
