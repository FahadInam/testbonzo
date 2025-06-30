import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  payment_selection: {
    background: '#02BBFE ',
    color: '#fff ',
    width: '32rem',
  },
  btn_small_width: {
    width: '16rem',
    marginBottom: '28px',
  },
  payment_title: {
    fontSize: '28px',
    color: '#313644',
  },
  payment_card: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  payment_card_text: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    color: '#1D2433',
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card_width: {
    width: '518px',
    boxShadow: 'none',
    border: '2px solid #dcdcdc',
    borderRadius: '18px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  bank_card_text: {
    marginTop: '0.8rem',
    marginBottom: '0.8rem',
    // color: "#000000"
  },
  text_color: {
    color: '#1D2433',
  },
  // label_color: {
  //   fontSize: '16px',
  //   fontWeight: '600',
  //   color: '#02BBFE !important',
  // },
  label_color: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#BDBDBD !important',
    '&.MuiStepLabel-active': {
      color: '#02BBFE !important',
      fontWeight: '600',
    },
    '&.Mui-completed': {
      color: '#02BBFE !important',
    },
  },
  payment_icon: {
    margin: 'auto',
    width: '48px',
  },
  backLinkColor: {
    // position: "absolute !important",
    // top: "30px  !important",
    // right: "408px  !important",
    background: 'white !important',
    color: '#02bbfe',
    width: '64px',
    margin: '0px',
    '&:hover': {
      background: 'none',
      boxShadow: 'none',
    },
    '&:active': {
      background: 'white !important',
      boxShadow: 'none !important',
      transform: 'none !important',
      transition: 'none !important',
    },
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    '& .MuiButton-root': {
      color: theme.palette.common.grey[500],
      background: 'unset',
      width: '100px',
      margin: 0,
      padding: '0px',
      display: 'flex',
      justifyContent: 'start',
      opacity: '1',
      '&:hover': {
        boxShadow: 'unset',
        background: 'unset',
      },
      '&:active': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '&:focus': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '& .MuiButton-iconSizeMedium > *:first-child': {
        fontSize: '1.5rem',
      },
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
  },
  payment_description: {
    color: '#838383',
    fontSize: '12px',
    marginTop: '22px',
    width: '100%',
  },
}));

export default useStyles;
