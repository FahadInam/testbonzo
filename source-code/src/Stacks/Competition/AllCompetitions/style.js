import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgb(238, 241, 243)',
    color: theme.palette.grey['500'],
    '&:hover': {
      background: 'rgb(238, 241, 243)',
      color: theme.palette.grey['500'],
    },
  },
  root: {
    height: 'auto',
    width: '100%',
    minWidth: '284px',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    // [theme.breakpoints.up('xs')]: {
    //   height: 'auto',
    // },
    // [theme.breakpoints.up('sm')]: {
    //   height: '292px',
    // },
    // [theme.breakpoints.up('md')]: {
    //   height: '208px',
    // },
    // [theme.breakpoints.up('lg')]: {
    //   height: '290px',
    // },
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    marginBottom: theme.spacing(1),
    borderRadius: '16px',
  },
  textTransform: {
    textTransform: 'uppercase',
  },

  imageLoader: {
    width: '100%',
    overflow: 'hidden',
    height: '300px',

    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    '& img': {
      [theme.breakpoints.up('xs')]: {
        width: '100%',
        maxWidth: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        maxWidth: '100%',
      },
      [theme.breakpoints.up('md')]: {
        width: '100%',
        maxWidth: '100%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '100%',
        maxWidth: '100%',
      },
    },
  },
  image: {
    width: '100%',
    overflow: 'hidden',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    // borderRadius: theme.shape.borderRadius,
    borderRadius: '15px',
    '& img': {
      [theme.breakpoints.up('xs')]: {
        width: '100%',
        maxWidth: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        maxWidth: '100%',
      },
      [theme.breakpoints.up('md')]: {
        width: '100%',
        maxWidth: '100%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '100%',
        maxWidth: '100%',
      },
    },
  },
  paperBody: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '8px',
    '@media (max-width: 638.88px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& div': {
        width: '100%',
      },
      '& h4': {
        fontSize: '16px',
      },
    },
  },
  flexGap: {
    gap: '12px',
    // border: "2px solid blue",
    // height: "74px",
    // '@media (max-width: 638.88px)': {
    //   height: "fit-content",
    // },
  },
  srcImg: {
    height: '100%',
  },
  buttons_container: {
    maxWidth: '540px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '12px auto',
    '@media (max-width: 638.88px)': {
      maxWidth: 'fit-content',
      borderRadius: '22px',
    },
  },
  active_btn: {
    backgroundColor: '#112D70',
    color: '#FFE500',
    '@media (max-width: 638.88px)': {
      width: '145px',
      fontSize: '14px',
    },
    '&:hover': {
      backgroundColor: '#112D70',
    },
  },
  btn: {
    backgroundColor: 'transparent',
    color: '#fff',
    '@media (max-width: 638.88px)': {
      width: '145px',
      fontSize: '14px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  competition_card_container: {
    boxShadow: '#000 0px 13px 1px -1px',
    borderRadius: '24px',
  },
  less_shadow: {
    boxShadow: '#000 0px 4.5px 1px -1px',
  },
  competition_card: {
    boxShadow: '#D5DBEA 0px 10px 0px -1px',
  },
  hide_shadow: {
    boxShadow: '#fff 0px 0px 0px 0px',
  },
  progress_container: {
    marginLeft: '6px',
    marginRight: '6px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  progress_bg: {
    position: 'relative',
    background: theme.palette.common.darkBlue,
    height: '10px',
    flex: 1,
    borderRadius: '12px',
  },
  progress_bar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    background: theme.palette.common.cyan,
    borderRadius: '12px',
    transition: 'all .3s ease',
  },
  progress_result: {
    textWrap: 'nowrap',
    '& span': {
      color: theme.palette.common.cyan,
    },
  },
  modal_container: {
    display: 'block',
    paddingTop: '0px',
    padding: '0px',
  },
  modal_input_box: {
    padding: '36px',
    '@media (max-width: 638.88px)': {
      padding: '22px',
    },
  },
  inviteCard: {
    padding: '22px 20px',
    '@media (max-width: 1023px)': {
      padding: '22px 16px',
    },
    '@media (max-width: 638.88px)': {
      padding: '22px 12px',
    },
  },
  invite_contentContainer: {
    display: 'flex',
    gap: '40px',
    '@media (max-width: 638.88px)': {
      flexWrap: 'wrap',
      gap: '20px',
    },
  },
  invite_contentBox: {
    width: '50%',
    '@media (max-width: 638.88px)': {
      width: '100%',
    },
  },
  inviteCard_title: {
    fontWeight: 700,
    fontSize: '24px',
    color: theme.palette.common.gray,
    marginBottom: '14px',
  },
  inviteCard_sub_title: {
    color: theme.palette.common.gray,
    fontWeight: 600,
    fontSize: '16px',
    display: 'block',
  },
  inviteCard_linkBox: {
    border: '1px solid #DCDCDC',
    padding: '8px 12px',
    marginTop: '10px',
    borderRadius: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    '@media (max-width: 1023px)': {
      padding: '8px 8px',
      height: '50px',
    },
    '& h4': {
      color: theme.palette.common.gray,
      padding: '0 10px',
      '@media (max-width: 1023px)': {
        padding: '0 4px',
        fontSize: '18px',
      },
    },
    '& h3': {
      color: theme.palette.common.gray,
      fontFamily: 'Poppins',
      fontWeight: 600,
      padding: '0 10px',
      letterSpacing: '1px',
      '@media (max-width: 1023px)': {
        padding: '0 4px',
        fontSize: '18px',
        letterSpacing: '0px',
      },
    },
  },
  voucher_code: {
    fontSize: '22px',
    '@media (max-width: 1023px)': {
      fontSize: '18px',
    },
  },
  notAllowed: {
    cursor: 'not-allowed',
  },
  join_btn: {
    background: '#02BBFE',
    width: 'fit-content',
    height: 'auto',
    borderRadius: '14px',
    padding: '6px 22px',
    fontWeight: 600,
    margin: '0px',
    '@media (max-width: 1023px)': {
      padding: '4px 18px',
    },
    '&:hover': {
      background: '#02BBFE',
    },
  },
  view_progress_btn: {
    width: '100%',
    maxWidth: '200px',
    '@media (max-width: 638.88px)': {
      // maxWidth: 'fit-content',
      maxWidth: '100%',
    },
    // border: "2px solid red",
    // paddingBottom: "10px",
    // '&:active': {
    //   border: "2px solid red",
    //   paddingBottom: "10px"
    // }
  },
  titleStyle: {
    paddingRight: '5px',
  },
  badges_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '4px',
    // marginTop: '-4px',
  },
  badges_dot: {
    width: '12px !important',
    height: '12px !important',
    borderRadius: '50%',
  },
  badge_text: {
    fontFamily: 'poppins',
    fontSize: '16px',
    fontWeight: '600',
    // height: '12px',
    // marginTop: '-8px',
  },
  landing_page_card: {
    height: '245px',
    '@media (max-width: 1023px)': {
      // maxWidth: 'fit-content',
      height: '190px',
    },
    '@media (max-width: 638px)': {
      height: '240px',
    },
  },
  gray_shade: {
    background: '#0c0c0ca4',
    top: '0',
    left: '0',
    borderRadius: '12px',
    width: '100%',
    height: '100%',
    zIndex: '10',
    position: 'absolute',
    // cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lock_img_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
  },
  lock_icon: {
    marginLeft: '28px',
    marginBottom: '10px',
    '@media (max-width: 1023px)': {
      marginLeft: '27px',
      height: '55px',
      width: '55px',
    },
  },
}));

export default useStyles;
