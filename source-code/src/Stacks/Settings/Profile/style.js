import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '100%',
    minWidth: '284px',
    maxWidth: '100%',
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatarWrapper: {
    position: 'relative',
    paddingLeft: '20px',
  },
  avatar: {
    width: '85px',
    height: '85px',
  },
  btn: {
    position: 'absolute',
    bottom: '-10px',
    right: '-2px',
    height: '36px',
    width: '36px',
    borderRadius: '50%',
    display: 'flex',
    zIndex: '2',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '26px',
      height: '26px',
      transform: 'translateX(10px)',
    },
    '& i': {
      fontSize: '20px',
      border: '5px',
    },
    '&:hover': {
      color: theme.palette.common.white,
    },
    '&:active': {
      color: theme.palette.common.white,
    },
  },
  gender: {
    width: '47%',
    fontSize: '0.8rem !important',
    color: theme.palette.grey['400'],
    '& .MuiFormGroup-root': {
      flexDirection: 'row',
      fontSize: '0.8rem !important',
    },
    '& .MuiTypography-body1': {
      fontSize: '0.8rem!important',
    },
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  skeletonCircle: {
    background: theme.palette.action.skeleton,
  },
  skeletonButton: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.action.skeleton,
    marginBottom: theme.spacing(1),
  },
  skeletonIcon: {
    background: theme.palette.action.skeleton,
    width: '70px',
    height: '70px',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  grid: {
    marginBottom: theme.spacing(2),
  },
  circle: {
    margin: '-20px',
  },
  radioB: {
    color: `${theme.palette.grey['400']}!important`,
    borderColor: `${theme.palette.grey['400']}!important`,
    borderLeftColor: `${theme.palette.grey['400']}!important`,
    borderRightColor: `${theme.palette.grey['400']}!important`,
    borderTopColor: `${theme.palette.grey['400']}!important`,
    borderBottomColor: `${theme.palette.grey['400']}!important`,
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
  'MuiIconButton-root': {
    '&:hover': {
      backgroundColor: 'transparent!important',
    },
  },
  profile_container: {
    maxWidth: '920px',
    margin: 'auto',
    padding: 0,
    width: '100%',
  },
  skeleton_column: {
    width: '50%',
    '@media (max-width: 638.88px)': {
      width: '100%',
    },
  },
  modal_container: {
    padding: 0,
  },
  profile_input_container: {
    display: 'flex',
    '& > .MuiBox-root': {
      margin: '0px 10px',
    },
    padding: '24px',
    width: '100%',
    '@media (max-width: 638.88px)': {
      flexDirection: 'column',
      '& > .MuiBox-root': {
        margin: '4px 0px',
      },
    },
  },
  bg_gradient: {
    background: `linear-gradient(to top, #277DFF, #00FFE0)`,
    margin: '0px 14px',
    borderRadius: '0px 0px 14px 14px',
  },
  gradient_box: {
    padding: '24px 54px',
    '@media (max-width: 638.88px)': {
      padding: '24px 0px',
    },
  },
  avatar_box: {
    padding: '20px 54px 0px 54px',
    '@media (max-width: 638.88px)': {
      padding: '24px 0px',
    },
  },
  modal_avatar_container: {
    display: 'flex',
    '@media (max-width: 638.88px)': {
      padding: '0px',
    },
  },
  modal_avatar: {
    padding: 0,
    margin: '0px 10px 24px 10px',
    border: '7px solid',
    '@media (max-width: 638.88px)': {
      border: '5px solid',
      margin: '0px 8px 14px 8px',
    },
    '&:hover': {
      borderRadius: '100px !important',
    },
  },
  selected_modal_avatar: {
    border: '7px solid white',
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
    boxShadow: '0 0 10px rgba(0, 0, 255, 0.5)',
    transition: 'all 0.3s ease',
    position: 'relative', // Required for pseudo-element
    '@media (max-width: 638.88px)': {
      border: '5px solid white',
    },
    '&::after': {
      content: '"✔"',
      position: 'absolute',
      top: '11%', // Adjust for placement
      right: '-10%', // Adjust for placement
      transform: 'translate(-50%, -50%)',
      color: '#112d70',
      fontSize: '14px',
      fontWeight: 'bold',
      backgroundColor: 'white',
      borderRadius: '100%',
      width: '20px',
      height: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  profile_avatar: {
    padding: 0,
    margin: 0,
    background: 'transparent',
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&:hover': {
      borderRadius: '100px !important',
    },
  },
  profile_btn_container: {
    display: 'flex',
    width: '100%',
    maxWidth: '440px',
    '& .MuiBox-root  ': {
      margin: '0px 10px',
    },
    marginBottom: '24px',
    '@media (max-width: 638.88px)': {
      '& .MuiBox-root ': {
        margin: '0px 10px',
      },
      maxWidth: '84%',
    },
  },
  single_width: {
    maxWidth: '280px',
  },
  profile_pic: {
    display: 'flex',
    justifyContent: 'center',
    // marginBottom: '6px',
  },
  margin_bottom: {
    marginBottom: '12px',
  },
  contact_input: {
    // marginTop: '22px',
  },
  second_col: {
    marginTop: '12px !important',
    '@media (max-width: 638.88px)': {
      marginTop: '0px !important',
    },
  },
  contact_input_first: {
    marginTop: '0px',
  },
}));

export default useStyles;
