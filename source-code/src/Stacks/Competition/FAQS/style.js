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
  grid: {
    // marginTop: '28px',
    // marginBottom: '40px',
  },
  chatContainer: {
    width: '80%',
    display: 'flex',
    padding: '15px 40px',
    maxWidth: '1400px',
    background: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '72px',
    margin: 'auto',
  },
  chatButton: {
    width: '170px',
  },
  chatText: {
    color: '#ffffff',
    margin: '0px 20px 0px 5px',
  },

  accordin: {
    // width: '80%',
    margin: '0 auto 10px auto !important',
    // maxWidth: '1400px',
  },

  summary: {
    padding: '0px 40px 10px 0px',
    background: '#f6f6f6',
  },
  summaryWithTopRadius: {
    padding: '5px 40px 5px 40px',
    background: '#f6f6f6',
    borderTopLeftRadius: '25px',
    borderTopRightRadius: '25px',
  },
  summaryWithBottomRadius: {
    padding: '5px 40px 5px 40px',
    background: '#f6f6f6',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px',
  },

  summaryOpen: {
    padding: '5px 40px 5px 40px',
    background: '#f6f6f6',
  },

  iconBtn: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    color: '#415861',
    outline: 'none',
    background: 'transparent',
    border: 'none',
    justifyContent: 'center',
    cursor: 'pointer',
  },

  question: {
    color: '#415861',
    // fontSize: '1.1rem',
    fontWeight: '500',
    paddingLeft: '8px',
  },
  answer: {
    color: 'rgb(23, 28, 30)',
    padding: '10px 0px 10px 8px',
    fontWeight: '300',
    margin: '0px',
    fontSize: '1rem',
  },
  answerOpen: {
    padding: '10px 40px 10px 40px',
  },
}));

export default useStyles;
