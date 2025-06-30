import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    // overflow: 'hidden',
    // overflowY: 'auto',
    // background: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
  },
  page_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    width: '100%',
    background: "#fff",
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
    marginBottom: "32px"
  },
  view: {
    width: '100%',
    maxWidth: "1000px",
    padding: '16px'
  },
}));

export default useStyle;
