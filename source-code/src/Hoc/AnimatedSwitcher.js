import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AnimatedSwitch } from 'react-router-transition';

import { PageAnimate } from 'Utils';
import { PAGE_MOVE_DIRECTION } from 'Navigation';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    flex: '1 1',
    flexGrow: 1,
    flexShrink: 1,
    background: theme.palette.background.default,
    '& > div': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      willChange: ' opacity, transform',
      overflow: 'hidden',
    },
  },
}));

const AnimatedSwitcher = (props) => {
  const style = useStyles();
  const { children } = props;
  const { state, Animate } = props;
  const location = useLocation();

  // console.log(state, Animate, props);

  const animation = (state && state.direction) || PAGE_MOVE_DIRECTION.LTR;

  let EnteringAnimation = animation === PAGE_MOVE_DIRECTION.LTR ? PageAnimate.rtl.atEnter : PageAnimate.ltr.atEnter;
  let ExitingAnimation = animation === PAGE_MOVE_DIRECTION.RTL ? PageAnimate.rtl.atLeave : PageAnimate.ltr.atLeave;

  if (animation === PAGE_MOVE_DIRECTION.LTR) {
    EnteringAnimation = PageAnimate.rtl.atEnter;
    ExitingAnimation = PageAnimate.ltr.atLeave;
  } else if (animation === PAGE_MOVE_DIRECTION.RTL) {
    EnteringAnimation = PageAnimate.ltr.atEnter;
    ExitingAnimation = PageAnimate.rtl.atLeave;
  } else {
    EnteringAnimation = PageAnimate.ttd.atEnter;
    ExitingAnimation = PageAnimate.ttd.atLeave;
  }

  return (
    <AnimatedSwitch
      runOnMount={false}
      location={location}
      atEnter={EnteringAnimation}
      atLeave={ExitingAnimation}
      atActive={PageAnimate.Active}
      mapStyles={Animate ? PageAnimate.MapNoStyles : PageAnimate.MapStyles}
      className={style.root}
    >
      {children}
    </AnimatedSwitch>
  );
};

export default AnimatedSwitcher;
