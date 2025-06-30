import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, useMediaQuery } from '@material-ui/core';
import Header from 'Components/Header/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    willChange: 'transform, opacity',
    width: '100%',
    flexDirection: 'column',
    overflowY: (props) => props.overflowY || 'hidden',
    overflowX: (props) => props.overflowX || 'hidden',
    paddingTop: (props) => (typeof props.pt !== 'undefined' ? theme.spacing(props.pt) : 0),
    paddingBottom: (props) => (typeof props.pb !== 'undefined' ? theme.spacing(props.pb) : 0),
    paddingRight: (props) => (typeof props.pr !== 'undefined' ? theme.spacing(props.pr) : 0),
    paddingLeft: (props) => (typeof props.pl !== 'undefined' ? theme.spacing(props.pl) : 0),
    // [theme.breakpoints.down('md')]: {
    //   width: '95%',
    // },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'start',
    },
  },
  header: {
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      position: 'absolute',
      zIndex: '10',
      top: 0,
    },
  },
}));

const StarView = React.forwardRef(
  (
    {
      children,
      showGradient = false,
      showHeader = false,
      showRight,
      showLeft,
      hideCoins,
      callback,
      leftTitle,
      isAccount = null,
      ...style
    },
    ref
  ) => {
    const styled = useStyles(style);
    const isMdOrLess = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const showLeftValue = typeof showLeft !== 'undefined' ? showLeft : !isMdOrLess;
    return (
      <>
        <Grid ref={ref} item className={styled.root}>
          {showHeader && (
            <Box className={styled.header}>
              <Header
                headerSet={{
                  isAccount: isAccount ?? true,
                  showRight: showRight || false,
                  //showLeft: false,
                  showLeft: showLeftValue, // Show left button only on large screens
                  overrideLeftButton: false,
                  notify: false,
                  hideCoins: hideCoins || false,
                  callback,
                  leftTitle,
                }}
              />
            </Box>
          )}
          {showGradient && (
            <div className="bonzo_star_bg_grad">
              <div className="bonzo_star_bg_img"></div>
            </div>
          )}
          {children}
        </Grid>
      </>
    );
  }
);

export default StarView;
