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
  root: {
    position: 'relative',
    width: '48px',
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    borderRadius: 4,
  },
  skeletonCircle: {
    background: theme.palette.action.skeleton,
  },
  position: {
    borderRadius: '50%',
    background: theme.palette.common.grey[200],
    color: theme.palette.text.secondary,
    height: '32px',
    width: '32px',
    position: 'absolute',
    bottom: '-17px',
    right: '11px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: theme.typography.fontWeightSemiBold,
    paddingTop: '1px',
    overflow: 'hidden',
    fontSize: theme.typography.pxToRem(16),
  },

  ListingMainContainer: {
    padding: '16px',
    flexGrow: '0',
    maxWidth: '100%',
    flexBasis: '100%',
    margin: 0,
    boxSizing: 'border-box',
  },

  LessonListHeadingMainDiv: {
    flexGrow: '0',
    maxWidth: '100%',
    flexBasis: '100%',
    padding: '16px',
    margin: '0',
    boxSizing: 'border-box',
  },

  LessonListHeading: {
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    margin: '0px 0px - 8px',
    padding: '16px 48px',
    borderRadius: '24px',
    overflow: 'hidden',
    color: '#fff',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '@media (max-width: 638.88px)': {
      padding: '8px 24px',
      fontSize: '1.2rem!important',
      lineHeight: '1.2rem!important',
    },
  },

  LessonListHeadingFont: {
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
    margin: '0px',
    padding: '0px',
    fontFamily:
      'Fredoka,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    fontWeight: '500',
    fontSize: '1.2996rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4138rem',
    },
  },

  LessonListingMainHeading: {
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
    margin: '32px 32px 24px',
    padding: '0px',
    transform: ' translate3d(0,0,0)',
    fontSize: '1.928rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.628rem',
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '1.8422rem',
    },
  },
  container_each_lesson: {
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.075)!important',
      // border: '1px solid #BBBBBB',
    },
  },
  listItemNew: {
    padding: '5px',
  },
}));

export default useStyles;
