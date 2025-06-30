import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  containerCard: {
    position: 'relative',
    width: '100%',
    height: '100%',
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
  imageCard: {
    opacity: '1',
    display: 'block',
    height: 'auto',
    transition: '.5s ease',
    backfaceVisibility: 'hidden',
  },
  middleTxt: {
    transition: '.5s ease',
    position: 'absolute',
    top: '1%',
    right: '28%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    opacity: '1',
  },
  textW: {
    // backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    // display: 'none',
    // padding: '16px 32px',
  },
  skeletonBox: {

    width: '100%',
    margin: '8px auto',
    display: 'flex',
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    margin: 'auto',
  },
  secondary: {
    width: '218px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2, 0),
  },
  root: {
    flexShrink: 0,
    width: '288px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: 'calc(100% - 0px)',
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(2),
    },
    '& .MuiOutlinedInput-input.Mui-focused': {
      border: `1.5px solid ${theme.palette.grey['600']}`,
    },
    '& .MuiInputLabel-outlined': {
      top: '-3px',
      left: '8px',
      '&.MuiInputLabel-shrink': {
        top: '0',
        left: '0',
        // transform: 'translate(8px, -3px) scale(0.75)',
      },
    },
    '& .MuiFormLabel-root': {
      fontWeight: theme.typography.fontWeightLight,
    },
    '& .MuiInputBase-root': {
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.grey['600'],
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey['600'],
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${theme.palette.grey['600']}`,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${theme.palette.grey['600']}`,
    },
    ' label': {
      color: theme.palette.grey['500'],
    },
    '& label.Mui-focused': {
      color: theme.palette.grey['500'],
    },
    '& .MuiInputBase-inputMultiline': {
      padding: 'unset',
    },
  },
  uploadLoadBtn: {
    '& input[type="file"]': {
      display: 'none',
    },
  },
  exchangeCenter: {
    height: '36px',
    paddingTop: theme.spacing(0.5),
    background: 'rgb(255,255,255,0.25)',
    '&:hover': {
      background: 'rgb(255,255,255,0.25)',
    },
    '&:active': {
      background: 'rgb(255,255,255,0.25)',
    },
  },
  boxAlignment: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  textcolor: {
    color: theme.palette.grey['600'],
  },
  CardMainContainer: {
    alignItems: 'flex-start',
    justify: 'flex-end',
    height: '100%',
  },
  certBannerBG: {
    background: 'linear-gradient(0deg, rgba(227,125,21,1) 0%, rgba(248,214,44,1) 100%)',
    borderRadius: '1rem',
    margin: '0px',
    padding: '0px',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  certImageIcon: {
    objectFit: 'cover',
    [theme.breakpoints.up('xs')]: {
      marginLeft: '0px',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '0px',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '0px',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '-80px',
    },
  },
  claimButtonEnabled: {
    backgroundColor: '#FFFFFF',
    color: theme.palette.grey['600'],
    '&:hover': {
      background: 'rgb(255,255,255,0.85)',
    },
    '&:active': {
      background: 'rgb(255,255,255,0.85)',
    },
  },
  certTextContent: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
    },
  },
  purchaseHeading: {
    color: theme.palette.common.red,
    fontSize: '1.4rem',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  purchaseTitle: {
    color: theme.palette.grey['600'],
    textAlign: 'center',
    width: '100%',
  },
  amountShown: {
    backgroundColor: theme.palette.grey['400'],
    color: '#ffffff',
    borderRadius: '12px',
    padding: '2px 6px',
  },
  paymentDueLine: {
    color: theme.palette.grey['600'],
    fontSize: '0.9rem',
    margin: '12px',
  },
  paymentModeTitle: {
    color: theme.palette.grey['600'],
    fontSize: '1.2rem',
    textAlign: 'center',
    width: '100%',
  },
  animation: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.25),
    '& .MuiIconButton-label': {
      height: '100%',
    },
  },
  gridItem: {
    height: '100%',
    width: '120px',
    maxHeight: '147px',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: '1.5px solid transparent',
    overflow: 'hidden',
    position: 'relative',
    margin: '0 auto',
    textAlign: 'center',
    '&.selected': {
      border: `1.5px dashed ${theme.palette.secondary.main}`,
      background: theme.palette.grey['100'],
    },
  },
  selectedIcon: {
    background: theme.palette.secondary.main,
  },
  singleIcon: {
    margin: '0 auto',
    height: '80px',
    width: '80px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.grey['600'],
    color: theme.palette.common.white,
    '& i': {
      fontSize: '24px',
    },
    '&.selected': {
      background: theme.palette.secondary.main,
    },
  },
  playerName: {
    height: '40px',
    overflow: 'hidden',
    display: 'inline-block',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
  },
  fab: {
    margin: '48px 12px 24px 12px',
  },
  sub_heading_icon_paper: {
    fontSize: '1.2rem!important',
    marginBottom: '1rem',
  },
  error_text_content: {
    // maxWidth: '840px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 'auto 0px',
  },
  error_text_paper: {
    fontSize: '1rem!important',
  },
  tableRowOdd: {
    color: theme.palette.common.dark,
    backgroundColor: theme.palette.grey['200'],
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '8px 12px',
  },
  takeOverWhenSmall: {
    width: '90%',
    margin: 'auto',
    userSelect: 'text',
    cursor: 'initial',
    // maxWidth: '680px',
  },
  tableRow: {
    color: theme.palette.common.dark,
    width: '100%',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    margin: '12px auto',
    borderRadius: '12px',
    flexDirection: 'column',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey['100'],
    },
    // '@media (max-width: 1024px)': {
    //   flexDirection: 'column',
    // },
  },
  table_col_left: {
    width: '25%',
    color: theme.palette.grey['400'],
    textAlign: 'left',
    padding: '0px 12px',
    '@media (max-width: 1024px)': {
      width: '100%',
      textAlign: 'center',
    },
  },
  table_col_left_history: {
    // width: '25%',
    color: theme.palette.grey['400'],
    textAlign: 'right',
    width: '100%',
    padding: '0px',
    // paddingTop: '12px',
    display: 'flex',
    // justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // '@media (max-width: 1024px)': {
    //   width: '100%',
    //   textAlign: 'right',
    // },
  },
  table_col_mid: {
    width: '100%',
    color: theme.palette.grey['400'],
    textAlign: 'left',
    padding: '8px 12px',
    '@media (max-width: 1024px)': {
      width: '100%',
      textAlign: 'left',
    },
  },
  table_col_right: {
    width: '25%',
    textAlign: 'right',
    padding: '0px 12px',
    '@media (max-width: 1024px)': {
      width: '100%',
      textAlign: 'center',
    },
    // color: '#fff',
  },
  printBtn: {
    position: 'absolute',
    color: 'blue',
    right: '0px',
    top: '36px',
    display: 'flex',
    flexDirection: 'column',
  },
  print_icon_btn: {
    display: 'flex',
    flexDirection: 'column',
    '& MuiIconButton-label': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  print_ico_label: {
    color: theme.palette.secondary.main,
    height: '40px',
    width: '100%',
    overflow: 'hidden',
    display: 'inline-block',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    lineHeight: '1rem',
  },
  rewards_banner_right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  rewards_banner_1on1_text_base: {
    fontWeight: '500',
    fontSize: '1.3rem',
    padding: 'auto 24px',
    maxWidth: '350px',
    textAlign: 'center',
    '@media (max-width: 1024px)': {
      fontSize: '1rem',
    },
  },
  rewards_banner_1on1_text: {
    fontWeight: '800',
    color: theme.palette.secondary.main,
  },
  rewards_banner_price_line: {
    fontWeight: '800',
    fontSize: '0.8rem',
  },
  table_inside_title: {
    color: theme.palette.grey['800'],
    margin: '6px auto',
  },
  purchase_status_chip: {
    color: theme.palette.common.green,
    borderColor: theme.palette.common.green,
    minWidth: '90px',
    borderRadius: '4px',
  },
  refund_button: {
    height: '38px!important',
  },
  none: {
    color: '#fff',
    backgroundColor: theme.palette.common.red,
    borderColor: theme.palette.common.red,
  },
  pending: {
    color: '#fff',
    backgroundColor: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
  },
  approved: {
    color: '#fff',
    backgroundColor: theme.palette.common.green,
    borderColor: theme.palette.common.green,
  },
  failed: {
    color: '#fff',
    backgroundColor: theme.palette.common.red,
    borderColor: theme.palette.common.red,
  },
  waitingForPayment: {
    color: '#fff',
    backgroundColor: theme.palette.common.orange,
    borderColor: theme.palette.common.orange,
  },
  paid: {
    color: '#fff',
    backgroundColor: theme.palette.common.darkGreen,
    borderColor: theme.palette.common.darkGreen,
  },
  fw_b: {
    fontWeight: '800',
  },
}));

export default useStyles;
