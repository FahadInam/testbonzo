import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  },
}));

const SlidableView = React.forwardRef(({ children, showGradient = false, showLights = false, ...style }, ref) => {
  const styled = useStyles(style);
  return (
    <>
      {showGradient && (
        <div className="bonzo_star_bg_grad">
          <div className="bonzo_star_bg_img"></div>
        </div>
      )}
      {showLights && (
        <div className="bonzo_star_bg_grad">
          <div className="bonzo_select_opponent_bg_img"></div>
        </div>
      )}
      <Grid ref={ref} item className={styled.root}>
        {children}
      </Grid>
    </>
  );
});

export default SlidableView;
