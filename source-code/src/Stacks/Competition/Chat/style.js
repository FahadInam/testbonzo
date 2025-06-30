import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100%',
    flexDirection: 'column',
    display: 'flex',
    overflow: 'hidden',
  },
  messagesContainer: {
    border: 'inherit',
  },
  messagesContainerWithImageArea: {
    marginBottom: 'auto',
  },
  messageArea: {
    paddingBottom: '78px',
    display: 'flex',
    flexDirection: 'column',
  },
  messageNoticeTextArea: {
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  messageNoticeText: {
    color: '#fff',
    fontSize: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
  },
  messageNoticeText2: {
    color: '#fff',
    fontSize: '0.7rem',
    margin: '12px',
    display: 'flex',
    maxWidth: '800px',
    justifyContent: 'center',
    textAlign: 'center',
  },
  messageSupportTextBox: {
    // position: 'fixed',
    width: '100%',
    margin: 'auto',
    marginTop: '0px',
    textAlign: 'center',
    maxHeight: '60px',
    padding: '12px',
    // borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  messageSupportTextBoxPremium: {
    // position: 'fixed',
    width: '100%',
    margin: 'auto',
    marginTop: '0px',
    textAlign: 'center',
    maxHeight: '40px',
    // borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,153,0,1)',
  },
  iconBtn: {
    width: '40px',
    height: '40px',
    background: theme.palette.background.paper,
    color: theme.palette.grey['500'],
    '&:hover': {
      background: theme.palette.background.paper,
      color: theme.palette.grey['500'],
    },
  },
  textArea: {
    left: 0,
    height: '78px',
    paddingTop: theme.spacing(1),
    position: 'fixed',
    bottom: 0,
    background: theme.palette.background.default,
    width: '100%',
    '-webkit-transform': 'translate3d(0,0,0)',
    transform: 'translate3d(0, 0, 0)',
  },

  imageTextArea: {
    left: 0,
    height: '215px',
    paddingTop: theme.spacing(1),
    position: 'fixed',
    bottom: 0,
    background: theme.palette.background.default,
    width: '100%',
    '-webkit-transform': 'translate3d(0,0,0)',
    transform: 'translate3d(0, 0, 0)',
  },

  messagePaper: {
    userSelect: 'text',
    cursor: 'initial',
    padding: theme.spacing(1.5),
    background: (props) => (props.myMsg ? theme.palette.primary.light : null),
  },
  date: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(12),
    textAlign: 'right',
    color: (props) => (props.myMsg ? theme.palette.grey['50'] : null),
  },
  text: {
    color: (props) => (props.myMsg ? theme.palette.common.white : null),
    fontWeight: theme.typography.fontWeightRegular,
  },
  avatarWrapper: {
    height: '36px',
    width: '36px',
    padding: 0,
  },
  sendButtonWrapper: {
    height: '48px',
    width: '48px',
    // flex: '0 0 48px',
    display: 'flex',
    marginLeft: theme.spacing(2),
  },
  sendBtn: {
    height: '48px',
    width: '48px',
    margin: '4px',
    borderRadius: '50%',
    background: theme.palette.secondary.light,
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRipple: {
    padding: theme.spacing(0.25),
  },
  inputWrapper: {
    flex: '1 1 auto',
  },
  input: {
    border: 0,
    minHeight: '56px',
    maxHeight: '56px',
    overflowY: 'auto',
    '& .MuiInputBase-root': {
      color: theme.palette.grey['600'],
      height: '48px',
      padding: theme.spacing(0, 1),
      margin: theme.spacing(1, 0),
    },
    '& .MuiInput-underline:before': {
      border: 0,
      transition: 'none',
    },
    '& .MuiInput-underline:active': {
      border: 0,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      border: 0,
    },
  },
  skeleton: {
    borderRadius: '4px',
    background: (props) => (props.myMsg ? theme.palette.action.lightSkeleton : theme.palette.action.skeleton),
    margin: theme.spacing(0.25, 0),
  },
  skeletonCircle: {
    background: (props) => (props.myMsg ? theme.palette.action.lightSkeleton : theme.palette.action.skeleton),
  },
  dateSkeleton: {
    float: 'right',
  },
  flexClass: {
    // flexBasis: '100%',
    // overflow: 'hidden',
  },
  boxClassName: {
    alignItems: 'flex-end',
  },
  resGrid: {
    marginBottom: 0,
  },
  ImageContainer: {
    height: '140px',
    maxWidth: '100%',
    margin: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "15px",
  },

  deleteBtn: {
    height: "28px",
    width: "28px",
    borderRadius: "50%",
    color: 'black',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(20,20,20,0.15)",
    fontSize: "12px",
    position: 'absolute',
    top: '3px',
    right: '3px',
  },
  imageShared: {
    borderRadius: '12px',
  },
  hiddenInputField: {
    opacity: 0,
  },
  smallBtn: {
    height: '12px',
    width: '64px',
    margin: '3px 24px',
    padding: '0px',
    color: '#ffff00',
    fontSize: '12px',
    '&:hover': {
      color: '#ffcc00',
    },
  },
}));
export default useStyles;
