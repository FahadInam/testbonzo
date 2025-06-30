import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'auto',
  },
  // image: {
  //   width: 150,
  //   textAlign: 'center',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   '& i': {
  //     fontSize: '120px',
  //   },
  // },
  mainH: {
    color: theme.palette.text.primary,
    fontSize: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  subH: {
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  confirmation_box: {
    padding: '0 !important',
  },
  sign_out_buttons_container: {
      display: 'flex',
      width: '100%',
      maxWidth: '440px',
      // gap: '20px',
      '& .MuiBox-root  ': {
        margin: '0px 20px',
      },
      // paddingTop: "16px",
      paddingBottom: "32px",
      // marginBottom: '24px',
      '@media (max-width: 638.88px)': {
        // gap: '10px',
        '& .MuiBox-root ': {
          margin: '0px 10px',
        },
        maxWidth: '84%',
        paddingBottom: "24px",
    },  
  },
  page_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    width: '100%',
    background: "#0000004d",
    borderRadius: "12px",
    padding: "40px 12px",
    zIndex: "1",
  },
  image: {
    // width: 150,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.common.red,
    alignItems: 'center',
    marginBottom: "12px",
  },
  view: {
    width: '100%',
    maxWidth: "1000px",
    padding: '16px'
  },
}));

export default useStyle;
