import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  containerCard: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  modal_container: {
    display: 'flex',
    paddingTop: '0px',
    padding: '0px',
    flexDirection: 'column',
    marginTop: '-44px',
  },
  iconBtn: {
    width: '40px',
    height: '40px',
    background: 'rgba(0,0,0,0.5)',
    color: '#ffffff',
    margin: 'auto 12px',
    '&:hover': {
      background: 'rgba(0,0,0,0.3)',
      color: '#ffffff',
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
  skeleton: {
    background: theme.palette.action.skeleton,
    borderRadius: theme.shape.borderRadius,
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
  filterPaper: {
    width: '150px',
    maxWidth: 'unset',
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
  textcolor: {
    color: theme.palette.grey['600'],
  },
  CardMainContainer: {
    alignItems: 'flex-start',
    justify: 'flex-end',
    height: '100%',
  },
  certBannerBG: {
    color: '#000000',
    // background: 'linear-gradient(0deg, rgba(227,125,21,1) 0%, rgba(248,214,44,1) 100%)',
    borderRadius: '1rem',
    margin: '0px',
    padding: '0px',
    paddingBottom: '12px',
    paddingTop: '12px',
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
  cardBase: {
    cursor: 'pointer',
    height: '100%',
    width: '100%',
    // minWidth: '284px',
    // height: '264px',
    // maxWidth: '284px',
    overflow: 'hidden',
    position: 'relative',
    // margin: 0,
    background: 'rgb(255, 255, 255)',
    // display: 'flex',
    // flexDirection: 'column',
    margin: 'auto',
    // boxShadow: 'rgb(0 0 0 / 5 %) 0px 1px 2px 0px, rgb(0 0 0 / 5 %) 0px 1px 4px 0px, rgb(0 0 0 / 5 %) 0px 2px 8px 0px',
    borderRadius: '15px',
    backgroundColor: '#D5DBEA',
    boxShadow: '0px 8px 0px 0px rgba(0,0,0,0.3), 0px 3px 0px 0px rgba(0,0,0,0.8)',
  },
  certImageIcon: {
    objectFit: 'contain',
    margin: 'auto 12px',
    // [theme.breakpoints.up('xs')]: {
    //   marginLeft: '0px',
    // },
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: '0px',
    // },
    // [theme.breakpoints.up('md')]: {
    //   marginLeft: '0px',
    // },
    // [theme.breakpoints.up('lg')]: {
    //   marginLeft: '0px',
    //   // marginLeft: '-80px',
    // },
  },
  claimButtonEnabled: {
    // backgroundColor: '#FFFFFF',
    // color: theme.palette.grey['600'],
    // '&:hover': {
    //   background: 'rgb(255,255,255,0.85)',
    // },
    // '&:active': {
    //   background: 'rgb(255,255,255,0.85)',
    // },
  },
  certTextContent: {
    // maxWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
    },
  },
  certTextContent2: {
    // maxWidth: '70px',
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: '2px',
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
  iconBlue: {
    background: theme.palette.common.blue,
  },
  iconOrange: {
    background: theme.palette.common.orange,
  },
  iconPurple: {
    background: theme.palette.common.purple,
  },
  iconGreen: {
    background: theme.palette.common.green,
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
    // maxWidth: '540px',
    margin: 'auto',
    width: '100%',
  },
  takeOverWhenSmall: {
    userSelect: 'text',
    cursor: 'initial',
    // maxWidth: '90%',
    margin: 'auto',
    // maxWidth: '680px',
  },
  fab2: {
    margin: '0px',
    top: 'auto',
    right: '28px',
    bottom: '12px',
    left: 'auto',
    position: 'fixed',
    zIndex: 3,
    '@media (min-width: 980px)': {
      position: 'relative',
      right: 'auto',
      bottom: '24px',
      marginTop: '24px',
    },
    // [theme.breakpoints.up('md')]: {
    //    display: 'none',
    // },
    // [theme.breakpoints.up('lg')]: {
    //    display: 'none',
    // },
    // [theme.breakpoints.up('xl')]: {
    //    display: 'none',
    // },
  },
  error_text_paper: {
    fontSize: '1rem!important',
  },
  ep_text: {
    fontSize: '1.2rem!important',
    width: '100%',
  },
  m_auto: {
    margin: 'auto',
  },
  tableRowOdd: {
    color: theme.palette.common.dark,
    backgroundColor: theme.palette.grey['200'],
    borderRadius: '12px',
    width: '100%',
    padding: '8px 12px',
  },
  tableRow: {
    color: theme.palette.common.dark,
    width: '100%',
    padding: '8px 12px',
    borderRadius: '12px',
    flexDirection: 'row',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey['100'],
    },
    '@media (max-width: 638.88px)': {
      flexDirection: 'column',
    },
  },
  table_col_left: {
    width: '50%',
    color: theme.palette.grey['400'],
    textAlign: 'right',
    padding: '0px 12px',
    '@media (max-width: 638.88px)': {
      width: '100%',
      textAlign: 'center',
    },
  },
  table_col_right: {
    width: '50%',
    textAlign: 'left',
    padding: '0px 12px',
    '@media (max-width: 638.88px)': {
      width: '100%',
      textAlign: 'center',
    },
  },
  printBtn: {
    position: 'absolute',
    // color: 'blue',
    right: '-8px',
    top: '20px',
    display: 'flex',
    flexDirection: 'column',
    padding: 'auto 0px',
    margin: '0px',
  },
  print_icon_btn: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px',
    '& MuiIconButton-label': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  print_ico_label: {
    color: theme.palette.secondary.main,
    height: '40px',
    width: '80px',
    overflow: 'hidden',
    display: 'inline-block',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    lineHeight: '1rem',
  },
  noPrint: {
    marginTop: '0px',
    '@media print': {
      visibility: 'hidden',
    },
  },
  font_color: {
    color: '#415861',
    fontSize: '1rem',
    fontWeight: '500',
    fontFamily: 'Poppins',
    margin: '24px 12px',
  },
  premium_tag: {
    backgroundColor: theme.palette.common.orange,
    // color: '#fff',
    color: 'white',
    borderRadius: '24px',
    // borderRadius: '24px 0px 0px 24px',
    // backgroundColor: 'rgba(255,255,255,0.3)',
    // padding: '9px 12px 9px 12px',
    // padding: '0px 12px',
    fontSize: '0.7rem',
    display: 'flex',
    height: '40px',
    padding: '0px 4px',
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: '16px',
    // marginTop: '0px',
    fontWeight: '800',
    position: 'absolute',
    left: '0',
    zIndex: '1',
    // '@media (max-width: 610px)': {
    //   padding: '0px 8px',
    // },
  },
  PremiumIcon: {
    width: '32px',
    height: '32px',
    marginRight: '0px',
    // marginRight: '6px',
    // '@media (max-width: 610px)': {
    //   width: '24px',
    //   height: '24px',
    // //   marginRight: '0px',
    // },
  },
  PremiumText: {
    display: 'none',
    // display: 'flex',
    // '@media (max-width: 610px)': {
    //   display: 'none',
    // },
  },
  textArea: {
    width: '100%',
    '&:hover': {
      borderColor: 'red',
    },
  },
  confirmation_box: {
    padding: '0 !important',
  },
  buttons_container: {
    display: 'flex',
    width: '100%',
    maxWidth: '440px',
    '& .MuiBox-root  ': {
      margin: '0px 10px 24px 10px',
    },
    // gap: '20px',
    // marginBottom: '24px',
    '@media (max-width: 638.88px)': {
      '& .MuiBox-root ': {
        margin: '0px 10px 24px 10px',
      },
      // gap: '10px',
      maxWidth: '84%',
    },
  },
  sign_out_buttons_container: {
    display: 'flex',
    width: '100%',
    maxWidth: '480px',
    // gap: '20px',
    '& .MuiBox-root  ': {
      margin: '0px 20px',
    },
    // paddingTop: "16px",
    paddingBottom: '32px',
    // marginBottom: '24px',
    '@media (max-width: 638.88px)': {
      // gap: '10px',
      maxWidth: '90%',
      paddingBottom: '24px',
      '& .MuiBox-root ': {
        margin: '0px 10px',
      },
    },
    '@media (max-width: 407px)': {
      flexWrap: 'wrap',
      '& .MuiBox-root ': {
        margin: '0px 12px',
      },
      // gap: '12px',
    },
  },
  claim_cert_card: {
    '@media (max-width: 638.88px)': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  cert_card: {
    backgroundColor: '#fff',
    // borderRadius: '15px',
    // height: '100%',
    // padding: '16px 16px 16px 16px',
    padding: '5px',
    // margin: '40px auto',
    // height: '100%',
    // width: '100%',
    // minWidth: '450px',
    // maxWidth: '450px',
    overflow: 'hidden',
    // position: 'relative',
    margin: 'auto',
    // cursor: 'pointer',
    borderRadius: '20px',
    boxShadow: ['0px 10px 0px -1px #D5DBEA', '0px 13px 0px -1px #000000'].join(','),
    marginBottom: '10px',
  },
  img_box: {
    border: '1px solid #d8d8d8',
    borderRadius: '16px',
    // padding: '12px',
    // margin: '5px',
    // width: '250px',
    height: '163px',
    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '10px',
    },
  },
  img_text: {
    fontFamily: 'poppins',
    fontWeight: '600',
    borderRadius: '0px 0px 12.996px 12.996px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backdropFilter: 'blur(0.01px)',
    backdropFilter: 'blur(3.5px)',
    marginTop: '-40px',
    height: '50px',
    padding: '7px 8px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    
  },
  img_text_p: {
    // padding: '6.5px 16px',
    display: '-webkit-box',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // Limit to 2 lines
    fontSize: '13px',
    lineHeight: '18px',
    margin: '0px',
  },
  cert_desc: {
    fontSize: '13px',
    lineHeight: '20px',
    // border: '1px solid red',
    height: '55px',
    marginTop: '30px !important',
    marginBottom: '17px !important',
    fontFamily: 'poppins',
    color: '#040404',
    fontWeight: '600',
  },
  disable_cert: {
    pointerEvents: 'none',
    cursor: 'default',
  },
  faq_question: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    maxWidth: '84%',
    margin: '10px 0px 10px 0px',
  },
  input_box: {
    position: 'relative',
  },
  detailBtn: {
    fontSize: '16px',
    fontWeight: '600',
    marginLeft: '10px',
    color: '#02BBFE',
    padding: '0px',
    position: 'absolute',
    right: 0,
    top: '32px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  profile_btn_container: {
    marginTop: '8px',
    paddingBottom: '4px',
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
}));

export default useStyles;
