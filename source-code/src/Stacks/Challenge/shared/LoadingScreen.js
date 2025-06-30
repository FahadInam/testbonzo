import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, Box, useTheme, Grid } from '@material-ui/core';
import { H4, H1, Body1 } from 'Components';
import User from 'Actions/user.action';

import { IsSinglePlayerMatch } from 'Actions';
// import useWindowDimensions from 'Utils/Dimenssion';
// import { Cordova } from 'Utils';
import Timer from './timer';

// import { StartNewChallenge } from 'Actions';
import { useHistory } from 'react-router-dom';

import { OptAnimate } from 'Utils';
import { UserBox } from 'Components/Stats';
import ResContainer from 'Components/Layouts/ResponsiveGrid';

// import SoundsVs from './SoundsVs';
import S1 from 'Assets/sounds/start_challenge.mp3';
import S2 from 'Assets/sounds/drumroll.mp3';
import S3 from 'Assets/sounds/countdown.mp3';

import vsImage from 'Assets/images/vs.svg';
import polkaDots from 'Assets/images/polkadots.svg';
import spikes from 'Assets/images/spikes.svg';
import singlePlayerBanner from 'Assets/images/play_mode_banner.svg';
import multiPlayerBanner from 'Assets/images/play_mode_banner.svg';

import sword1 from 'Assets/images/sword1.png';
import sword2 from 'Assets/images/sword2.png';
// import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
  preloader: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    position: 'absolute',
    zIndex: 5,
    transition: 'width 0.3s',
  },
  gameBox: {
    height: '120px',
    width: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    background: theme.palette.grey['200'],
    position: 'relative',
    padding: theme.spacing(0.5),
    '& img': {
      height: 'calc(100% - 0px)',
      width: 'calc(100% - 0px)',
      borderRadius: '50%',
      zIndex: 5,
      position: 'relative',
      top: 0,
      bottom: 0,
    },
    [theme.breakpoints.up('md')]: {
      height: '144px',
      width: '144px',
    },
  },
  loader: {
    position: 'absolute',
    zIndex: 2,
    top: '-5px',
    left: '-5px',
    // bottom: 0,
    height: '105%',
    background: theme.palette.secondary.light,
  },
  // timerContainer: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '120px',
  //   width: '120px',
  //   borderRadius: '100%',
  //   zIndex: 6,
  //   position: 'absolute',
  //   top: 'calc(50% - 60px)',
  //   bottom: 'calc(50% - 60px)',
  //   left: 'calc(50% - 60px)',
  //   right: 'calc(50% - 60px)',
  //   color: theme.palette.secondary.secondary,
  //   background: theme.palette.secondary.main,
  //   [theme.breakpoints.up('md')]: {
  //     height: '144px',
  //     width: '144px',
  //     top: 'calc(50% - 72px)',
  //     bottom: 'calc(50% - 72px)',
  //     left: 'calc(50% - 72px)',
  //     right: 'calc(50% - 72px)',
  //   },
  // },
  bottomBlueHalf: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '50vh',
    bottom: '0px',
    background: theme.palette.background.default,
    width: '100%',
    zIndex: '-1',
  },
  topWhiteHalf: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '50vh',
    top: '0px',
    backgroundColor: theme.palette.common.white,
    width: '100%',
    zIndex: '-1',
  },
  bottomText: {
    position: 'absolute',
    bottom: '10px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  topLandscapeText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: '80px',
    margin: '0',
    width: '100%',
    height: '100%',
    zIndex: 999,
    // marginTop: '0px',
    backgroundColor: 'white',
  },
  boxClassName: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  coreChallengeBgBox: {
    maxHeight: '100vh',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    background: 'black',
  },
  coreChallengeBoxBgAnims: {
    maxHeight: '100vh',
    maxWidth: '100%',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    // '@media(max-aspect-ratio: 3/2)': {
    // transform: 'scale(1.4)',
    // transform: 'scale(2) rotate(90deg)'
    // }
  },
  coreChallengeBoxBgAnimsInner: {
    // transform: 'scale(2)',
  },
  containerClass: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    margin: 0,
    display: 'flex',
  },
  twistedUI: {
    transform: 'rotate(-76deg) scale(2.5)',

    '@media (max-width: 638.88px)': {
      transform: 'rotate(-8deg) scale(2.5)',
    },
  },
  twistedUIS: {
    transform: 'scale(2.5)',
  },
  half: {
    flex: '1 1 1',
    background: 'transparent',
    height: '50%',
    width: '100%',
  },
  halfFull: {
    flex: '1 1 1',
    background: 'transparent',
    height: '100%',
    width: '100%',
  },
  whiteBg: {
    // background: 'rgb(255,152,30)',
    border: '12px solid black',
    background: 'radial-gradient(at top, #FF981E 0%, #CB1E47 60%)',
    '@media (max-width: 638.88px)': {
      border: '6px solid black',
    },
    // background: theme.palette.common.white,
  },
  blackBg: {
    // background: 'radial-gradient(circle at center, #FF981E 0%, #CB1E47 100%)',
    background: 'radial-gradient(at bottom, #00F0FF 0%, #1C62CB 60%)',
  },
  upperLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'hidden',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'hidden',
    // [theme.breakpoints.down('md')]: {
    //   margin: '0 auto',
    // },
    '@media(max-height:400px)': {
      margin: '0 auto',
    },
  },
  innerBox: {
    justifyContent: 'space-between',
    // [theme.breakpoints.down('md')]: {
    //   margin: '0 auto',
    //   transform: 'scale(0.8)',
    // },
    '@media(max-height:400px)': {
      margin: '0 auto',
      transform: 'scale(0.8)',
    },
  },
  vsImg: {
    width: '165px',
    height: '165px',
    marginLeft: '15px',
    zIndex: '120',
    '@media (max-width: 638.88px)': {
      width: '70px',
      height: '70px',
      marginLeft: '0px',
    },
    '@media (max-width: 1023.88px)': {
      width: '100%',
      height: '100%',
      marginLeft: '0px',
    },
  },
  vs: {
    height: '120px',
    width: '100%',
    left: '0',
    right: '0',
    // borderRadius: '50%',
    // background: theme.palette.secondary.main,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: 'auto',
    fontSize: '24px',
    animation: '$zoomOut 0.2s ease-out',
    zIndex: '120',
    [theme.breakpoints.up('md')]: {
      height: '100%',
      width: '100%',
      // fontSize: '36px',
    },

    '@media (max-width: 638.88px)': {
      position: 'fixed',
      top: '135px',
      bottom: 0,
      width: '70px',
      height: '70px',
    },
  },

  '@keyframes zoomOut': {
    from: {
      transform: 'scale(20)',
    },
    to: {
      transform: 'scale(1)',
    },
  },
  topBar: {
    position: 'absolute',
    top: '10px',
    left: '16px',
    zIndex: 1001,
  },
  backBtn: {
    color: theme.palette.common.white,
  },
  playBtn: {
    '@media(max-height:400px)': {
      marginTop: '20px!important',
    },
  },
  playersCirclesContainer: {
    // [theme.breakpoints.down('md')]: {
    //   margin: '-12px',
    // },
    '@media(max-height:400px)': {
      margin: '-12px',
    },
  },
  innerPlayerCircles: {
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 638.88px)': {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
  },
  innerPlayerCirclesSP: {
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 638.88px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    '& .MuiButton-root': {
      color: theme.palette.text.icon,
      background: 'unset',
      width: '100px',
      margin: 0,
      padding: '0px',
      display: 'flex',
      justifyContent: 'start',
      opacity: '1',
      '&:hover': {
        boxShadow: 'unset',
        background: 'unset',
      },
      '&:active': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '&:focus': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '& .MuiButton-iconSizeMedium > *:first-child': {
        fontSize: '1.5rem',
      },
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
  },
  polkaDots: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundImage: `url(${polkaDots})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media(max-width: 638.88px)': {
      backgroundPosition: 'right',
    },
    // marginTop: '-24px',
    // animation: `$polkaDotsSlide 8s infinite alternate`,
  },
  '@keyframes polkaDotsSlide': {
    '0%': {
      transform: 'translate(0, 0)',
    },
    '25%': {
      transform: 'translate(-5px, 5px)',
    },
    '50%': {
      transform: 'translate(5px, -5px)',
    },
    '75%': {
      transform: 'translate(-5px, -5px)',
    },
    '100%': {
      transform: 'translate(5px, 5px)',
    },
  },
  spikes: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundImage: `url(${spikes})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // marginTop: '-24px',
    transition: 'transform 0s',
    // animation: `$spikesAnim 0s all`,
    transformOrigin: '50% 50%',
  },
  // '@keyframes spikesAnim': {
  //   '0%': {
  //      transform: 'scale(1)',
  //   },
  //   '25%': {
  //      transform: 'scale(1.4)',
  //   },
  //   '50%': {
  //      transform: 'scale(1.8)',
  //   },
  //   '75%': {
  //      transform: 'scale(1.1)',
  //   },
  //   '100%': {
  //      transform: 'scale(1.4)',
  //   },
  // },
  // '@keyframes spikesAnim': {
  //   '0%': {
  //     transform: 'scale(20) rotate(0deg) translate(0, 0)',
  //   },
  //   '4%': {
  //     transform: 'rotate(0deg)',
  //   },
  //   '5%': {
  //     transform: 'scale(1) rotate(15deg)',
  //   },
  //   '24%': {
  //     transform: 'rotate(15deg)',
  //   },
  //   '25%': {
  //     transform: 'translate(-5px, 5px) rotate(12deg)',
  //   },
  //   '49%': {
  //     transform: 'rotate(12deg)',
  //   },
  //   '50%': {
  //     transform: 'translate(5px, -5px) rotate(20deg) scale(1.2)',
  //   },
  //   '74%': {
  //     transform: 'rotate(20deg)',
  //   },
  //   '75%': {
  //     transform: 'translate(-5px, -5px) rotate(10deg)',
  //   },
  //   '99%': {
  //     transform: 'rotate(10deg)',
  //   },
  //   '100%': {
  //     transform: 'translate(5px, 5px)  rotate(0deg) scale(1)',
  //   },
  // },
  modeText: {
    fontFamily: 'Fredoka',
    fontWeight: 700,
    fontSize: '16px',
    position: 'absolute',
    margin: 'auto',
    zIndex: '1',
    color: '#ffffff',
    top: '30%',
    '@media (max-width: 638.88px)': {
      transform: 'scale(0.6)',
      fontSize: '28px',
      position: 'absolute',
      top: '48%',
      bottom: '52%',
    },
    '@media (max-height: 630.88px) and (max-width: 370.88px)': {
      position: 'fixed',
      top: '40px',
    },
    '@media (max-height: 542px)': {
      position: 'fixed!important',
      top: '40px!important',
      transform: 'scale(0.8)!important',
    },
  },
  modeTextSP: {
    fontFamily: 'Fredoka',
    fontWeight: 700,
    fontSize: '16px',
    position: 'absolute',
    margin: 'auto',
    top: 'calc( 50% - 140px)',
    zIndex: '1',
    color: '#ffffff',
    '@media (max-width: 638.88px)': {
      transform: 'scale(0.6)',
      fontSize: '22px',
      position: 'absolute',
    },
    '@media (max-height: 630.88px) and (max-width: 370.88px)': {
      position: 'fixed',
      top: '40px',
    },
    '@media (max-height: 542px)': {
      position: 'fixed!important',
      top: '40px!important',
      transform: 'scale(0.8)!important',
    },
  },
  modeTextLabelMP: {
    position: 'absolute',
    left: 110,
    top: 31,
    margin: 'auto',
    '@media (max-width: 638.88px)': {
      top: '25px',
      left: '87px',
    },
  },
  modeTextLabelSP: {
    position: 'absolute',
    left: 84,
    top: 30,
    margin: 'auto',
  },
  timerContainer: {
    fontFamily: 'Fredoka',
    fontWeight: 700,
    fontSize: '56px',
    textAlign: 'left',
    position: 'absolute',
    top: '-74px',
    right: '-80px',
  },
  timerContainer1: {
    transformOrigin: '20px 40px',
    zIndex: 1,
    textShadow:
      '-2px 0px 1px rgba(0, 0, 0, 1), 2px 0px 1px rgba(0, 0, 0, 1), 2px -2px 1px rgba(0, 0, 0, 1), -2px -2px 1px rgba(0, 0, 0, 1), -2px 4px 1px rgba(0, 0, 0, 1), 2px 4px 1px rgba(0, 0, 0, 1)',
  },
  timerAnim: {
    transformOrigin: 'calc(50% - 4px) calc(50% + 4px)',
    animation: '$zoomInCountdown 1s ease-in-out 4',
  },
  percentTimerContainer: {
    zIndex: 1,
    position: 'absolute',
    top: '-36px',
    right: '-122px',
    textAlign: 'left',
  },
  timerContainer2: {
    fontFamily: 'Fredoka',
    fontWeight: 700,
    fontSize: '90px',
    position: 'absolute',
  },
  countdown_digits: {
    position: 'absolute',
    width: '70px',
    height: '70px',
    maxHeight: '70px',
    left: '-90px',
  },
  '@keyframes zoomInCountdown': {
    '0%': {
      transform: 'scale(1)',
      // opacity: 1,
    },
    '30%': {
      // textShadow: 'none'
      transform: 'scale(0.9)',
    },
    '50%': {
      transform: 'scale(3)',
    },
    '70%': {
      // textShadow: 'none'
      transform: 'scale(0.9)',
    },
    '100%': {
      transform: 'scale(1)',
      // textShadow: 'none',
    },
  },
  animatedRight: {
    transform: 'translateY(2099px)',
    animation: `$comeFromRight 2s cubic-bezier(0.25, 0.25, 0.25, 1) forwards`, // Custom easing function
  },
  // animateRight: {
  //   transform: 'translateY(0)',
  // },
  '@keyframes comeFromRight': {
    '0%': {
      transform: 'translateY(2099px)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
  animatedLeft: {
    transform: 'translateY(-2099px)',
    animation: `$comeFromLeft 2s cubic-bezier(0.25, 0.25, 0.25, 1) forwards`, // Custom easing function
  },
  // animateRight: {
  //   transform: 'translateY(0)',
  // },
  '@keyframes comeFromLeft': {
    '0%': {
      transform: 'translateY(-2099px)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
  /** refresh banner styling */
  tryAgainBanner: {
    position: 'absolute',
    bottom: '20px',
    borderRadius: '8px',
    background: '#fff',
    padding: '10px 20px',
    [theme.breakpoints.down('md')]: {
      width: '95%',
      marginBottom: '10px',
    },
  },
  tryAgainText: {
    fontSize: '16px',
    color: 'red',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
    },
  },
  tryAgainBtnText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
}));

window.GlobalStartAnimation1 = null;
window.GlobalStartAnimation2 = null;
window.GlobalStartAnimation3 = null;
// window.GlobalStartAnimation5 = null;
window.GlobalStartAnimation4 = null;

const LoadingScreen = ({ game, percent, timerTick, callback, opponent, challenge, isMcq, customGameImage, isCompleted }) => {
  // const isGame = !isMcq;
  //console.log('percent-->', percent);
  //console.log('timerTick-->', timerTick);
  const styled = useStyles();

  const audioRefs = {
    track1: useRef(null),
    track2: useRef(null),
    track3: useRef(null),
  };

  const playAudio = (track) => {
    if(audioRefs && audioRefs[track])
    audioRefs[track].current.play();
  };

  const pauseAudio = (track) => {
    if(audioRefs && audioRefs[track])
    audioRefs[track].current.pause();
  };

  const subject = challenge?.subject || {};

  const { texts, palette, typography } = useTheme();
  const [ref, setRef] = useState(false);
  const [sound1, setSound1] = useState(false);
  const [sound2, setSound2] = useState(false);
  const [sound3, setSound3] = useState(false);
  // const [timerForRibbon, setTimerForRibbon] = useState(false);
  const [isHunderdReached, setIsHunderdReached] = useState(false);
  // const [sound4, setSound4] = useState(false);
  const [time, setTime] = useState(4);
  const [scale, setScale] = useState(1);
  const [stripsLoadingState, setStripsLoadingState] = useState(false);
  const [sw1LoadingState, setSw1LoadingState] = useState(false);
  const [sw2LoadingState, setSw2LoadingState] = useState(false);

  const refMe = useRef();
  const refVs = useRef();
  const refOpp = useRef();

  const refBStrip = useRef();
  const refSw1 = useRef();
  const refSw2 = useRef();

  const user = User.Info();
  const isGuest = User.IsGuest();
  const shouldGoToPlayer = !!subject.isStart;
  const isSinglePlayerMatch = IsSinglePlayerMatch(opponent);
  const calcOpponent = User.CombinedOpponent(opponent);

  const history = useHistory();
  const getRandomScale = () => {
    return 1 + (Math.random() * 9 + 1) / 10; // Generates a random scale between 1 and 4
  };

  const handelStripLoad = () => {
    setStripsLoadingState(true);
  };

  const handelSw1Load = () => {
    setSw1LoadingState(true);
  };

  const handelSw2Load = () => {
    setSw2LoadingState(true);
  };

  useEffect(() => {
    if (percent >= 100 && !isHunderdReached) setIsHunderdReached(true);
  }, [percent, isHunderdReached]);

  useEffect(() => {
    // let timerR = null;
    //   if(!timerR)
    //     timerR = setTimeout(() => { setTimerForRibbon(true)}, 2000);

    return () => {
      pauseAudio('track1');
      pauseAudio('track2');
      pauseAudio('track3');
      unlisten();
      // SoundsVs.Countdown.currentTime = 0;
      // SoundsVs.DrumRoll.currentTime = 0;
      // SoundsVs.StartChallengeSound.currentTime = 0;
      // SoundsVs.Countdown.pause();
      // SoundsVs.DrumRoll.pause();
      // SoundsVs.StartChallengeSound.pause();
      // setTimerForRibbon(false);
      // clearTimeout(timerR);
      // timerR = null;

      setSound1(true);
      setSound2(true);
      setSound3(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (timerTick && time < 4 && !sound1 && !isCompleted) {
      if (!sound2) {
        pauseAudio('track2');
        // SoundsVs.DrumRoll.pause();
        setSound2(true);
      }
      if (!sound3) {
        pauseAudio('track1');
        // SoundsVs.StartChallengeSound.pause();
        setSound3(true);
      }
      playAudio('track3');
      // SoundsVs.Countdown.currentTime = 0;
      // SoundsVs.Countdown.play();
      setSound1(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerTick, time, sound1, sound2, sound3, isCompleted]);

  useEffect(() => {
    if (!sound3 && !isCompleted) {
      setTimeout(() => {
        playAudio('track2');
        // SoundsVs.DrumRoll.currentTime = 0;
        // SoundsVs.DrumRoll.play();
      }, 2500);
      setSound3(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerTick, time, sound3, isCompleted]);

  useEffect(() => {
    if (!isSinglePlayerMatch && !sound2 && !isCompleted) {
      playAudio('track1');
      // SoundsVs.StartChallengeSound.currentTime = 0;
      // SoundsVs.StartChallengeSound.play();
      setSound2(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSinglePlayerMatch, sound2, isCompleted]);

  useEffect(() => {
    const interval2 = setInterval(() => {
      setScale(getRandomScale());
    }, 400);
    let timerX;
    const me = refMe.current;
    const opp = refOpp.current;
    const vs = refVs.current;

    const bStrip = refBStrip.current;
    const sw1 = refSw1.current;
    const sw2 = refSw2.current;
    if (bStrip) {
      bStrip.addEventListener('load', handelStripLoad);
    }
    if (sw1) {
      sw1.addEventListener('load', handelSw1Load);
    }
    if (sw2) {
      sw2.addEventListener('load', handelSw2Load);
    }
    // const cd = refCd.current;
    // const btn = btnRef.current;

    window.GlobalStartAnimation1 = new OptAnimate().AnimateWithDelay(me, 'slideInLeft', 350, null, false, 500);

    if (opp) {
      window.GlobalStartAnimation2 = new OptAnimate().AnimateWithDelay(opp, 'slideInRight', 350, null, false, 500);
      window.GlobalStartAnimation3 = new OptAnimate().AnimateWithDelay(vs, 'fadeIn', 750, null, false, 950);
      window.GlobalStartAnimation4 = new OptAnimate().AnimateWithDelay(vs, 'jello', 750, null, false, 1200);
      // window.GlobalStartAnimation5 = new OptAnimate().AnimateWithDelay(cd, 'zoomOut', 750, null, false, 1200);
    }

    // window.GlobalStartAnimation5 = new OptAnimate().AnimateWithDelay(btn, 'fadeIn', 750, null, false, 1200);

    timerX = setTimeout(() => {
      if (shouldGoToPlayer) {
        // dispatch(StartNewChallenge(competition, opponent, subject));
        // PageSwitch(ChallengeNav.CHALLENGE_PLAYER);
      }
    }, 4000);
    return () => {
      if (bStrip) {
        bStrip.removeEventListener('load', handelStripLoad);
      }
      if (sw1) {
        sw1.removeEventListener('load', handelSw1Load);
      }
      if (sw2) {
        sw2.removeEventListener('load', handelSw2Load);
      }
      if (interval2) clearInterval(interval2);
      if (timerX) {
        clearTimeout(timerX);
        timerX = null;
      }
      window.GlobalStartAnimation1 = null;
      window.GlobalStartAnimation2 = null;
      window.GlobalStartAnimation3 = null;
      window.GlobalStartAnimation4 = null;
      // window.GlobalStartAnimation5 = null;
      // window.GlobalStartAnimation5 = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const localCallback = (e, item) => {
    if (e !== 'completed') {
      setTime(3 - item.sec);
    } else if (callback) {
      callback('timeToStart');
    }
  };

  // const { height, width } = useWindowDimensions();

  // const handleTryAgain = () => {
  //   console.log('Refresh the page');
  // };

  useEffect(() => {
    setRef(true);
  }, [ref]);
  // Stop the sound when the route changes
  const unlisten = history.listen(() => {
    // pauseAudio('track1');
    // pauseAudio('track2');
    // pauseAudio('track3');
    // SoundsVs.Countdown.pause();
    // SoundsVs.DrumRoll.pause();
    // SoundsVs.StartChallengeSound.pause();
  });
  // console.log('game: ', game);
  // const path = customGameImage || game.game_image_url;
  // const pathCordova = customGameImage;
  // console.log('path: ', path);
  // const lI = path?.lastIndexOf('.');
  // const ext = path?.substr(lI, 15);
  // const img = Cordova.Path(`${path?.substr(0, lI)}-288${ext}`);

  // if(!isSinglePlayerMatch) {
  // SoundsVs.Challenge.currentTime = 0;
  // SoundsVs.Challenge.play();
  // }

  return (
    <Box className={styled.preloader}>
    <audio ref={audioRefs.track1} preload="auto">
      <source src={S1} type="audio/mp3" />
    </audio>
      <audio ref={audioRefs.track2} preload="auto">
        <source src={S2} type="audio/mp3" />
      </audio>
      <audio ref={audioRefs.track3} preload="auto">
        <source src={S3} type="audio/mp3" />
      </audio>
      {/* <Box className={styled.topBar}>
        <Box className={styled.menuButton}>
          <Button
            className="bonzoui__nowrap backHomeLink"
            mt={4}
            tag="back"
            type="submit"
            onClick={() => {
              SelectedCompetition.GotoCompetition();
            }}
            startIcon={<i className="i i-left" style={{ fontSize: '18px' }} />}
          >
            <Body1 color="#ffffff" fontWeight="600" fontSize="20px">
              {texts.HOME}
            </Body1>
          </Button>
        </Box>
      </Box> */}
      <Box className={`${styled.boxClassName} ${styled.coreChallengeBgBox}`} style={{ height: '100%' }}>
        <Box className={`${styled.containerClass} ${isSinglePlayerMatch ? styled.twistedUIS : styled.twistedUI}`}>
          <Box
            className={` ${isSinglePlayerMatch ? styled.halfFull : styled.half} ${styled.blackBg} ${
              isSinglePlayerMatch ? '' : styled.animatedLeft
            } `}
          />
          {!isSinglePlayerMatch && (
            <Box className={` ${styled.half} ${styled.whiteBg} ${isSinglePlayerMatch ? '' : styled.animatedRight} `} />
          )}
        </Box>
        <div className={styled.coreChallengeBoxBgAnims}>
          <div className={styled.coreChallengeBoxBgAnimsInner}>
            <div src={polkaDots} className={styled.polkaDots} />
            <div src={spikes} className={styled.spikes} style={{ transform: `scale(${scale})` }} />
            {/* <img src={polkaDots} className={styled.polkaDots} alt="VS" width="100%" height="100%"/>
    <img src={spikes} className={styled.spikes} alt="VS" width="100%" height="100%"/> */}
          </div>
        </div>
        <Box className={`${styled.containerClass} ${styled.upperLayer}`}>
          <ResContainer fullWidth className={`${styled.containerClass} ${styled.innerBox}`}>
            <Box mt={4} height="52px" display="none" alignItems="flex-end">
              <H4 textAlign="center" color={palette.common.white}>
                {subject.subject}
              </H4>
            </Box>
            <Box mt={6} mb={6} width="100%" maxWidth="960px" className={styled.playersCirclesContainer}>
              <Grid
                container
                alignItems="center"
                className={isSinglePlayerMatch ? styled.innerPlayerCirclesSP : styled.innerPlayerCircles}
              >
                <div
                  className={`${isSinglePlayerMatch ? styled.modeTextSP : styled.modeText} ${
                    !stripsLoadingState ? 'invisible' : 'bonzoui__strips__bg'
                  }`}
                >
                  <span className={isSinglePlayerMatch ? styled.modeTextLabelSP : styled.modeTextLabelMP}>
                    {percent >= 0 && !isHunderdReached ? (
                      <span style={{ fontSize: '18px', marginLeft: '10px' }}>Loading...</span>
                    ) : (
                      <>{isSinglePlayerMatch ? texts.SINGLE_PLAYER_MODE_IN : texts.MULTIPLAYER_CHALLENGE_IN}</>
                    )}

                    {/* loading percentage showing over here */}
                    {percent >= 0 && !isHunderdReached && !(time < 4) ? (
                      <Body1 fontSize="60px" color="#fff" fontWeight="700" className={styled.percentTimerContainer}>
                        {percent}
                        <span style={{ fontSize: '20px', marginLeft: '5px' }}>%</span>
                      </Body1>
                    ) : null}

                    <Box
                      className={styled.timerContainer}
                      style={{
                        visibility: !(timerTick && time < 4) ? 'hidden' : null,
                      }}
                    >
                      {/* <Zoom
                      in={timerTick && time < 4}
                      style={{ transitionDelay: ref ? '500ms' : '0ms' }}
                      {...(ref ? {
                         timeout: 350 } : {})}
                    > */}

                      <span className={styled.countdown_digits}>
                        <H1
                          className={`${styled.timerContainer1} ${timerTick && time < 4 ? styled.timerAnim : ''}`}
                          color={palette.common.white}
                          fontWeight={typography.fontWeightBold}
                          fontSize={72}
                        >
                          {time === 0 ? '0' : time}
                        </H1>
                        {/* <H1
                          className={styled.timerContainer2}
                          color={palette.common.black}
                          fontWeight={typography.fontWeightBold}
                          fontSize={82}
                        >
                          {time === 0 ? '0' : time}
                        </H1> */}
                      </span>
                      {/* </Zoom> */}
                    </Box>
                  </span>
                  <img
                    ref={refBStrip}
                    src={isSinglePlayerMatch ? singlePlayerBanner : multiPlayerBanner}
                    alt={isSinglePlayerMatch ? texts.SINGLE_PLAYER : texts.MULTIPLAYER_CHALLENGE}
                    height={isSinglePlayerMatch ? 85 : 85}
                    style={{ margin: 'auto' }}
                  />
                  <div className={`bonzoui__swords__container ${!sw1LoadingState || !sw2LoadingState ? 'invisible' : ''}`}>
                    <img
                      src={sword1}
                      ref={refSw1}
                      alt=""
                      className={`bonzoui__sword1__overlay ${!sw1LoadingState ? 'invisible' : ''}`}
                      height="70"
                    />
                    {!isSinglePlayerMatch && (
                      <img
                        ref={refSw2}
                        src={sword2}
                        alt="Multiplayer Mode"
                        className={`bonzoui__sword2__overlay ${!sw2LoadingState ? 'invisible' : ''}`}
                        height="70"
                      />
                    )}
                  </div>
                </div>

                <Box display="none">
                  <Timer min={0} sec={0} start={timerTick} callback={localCallback} totalTime={4} />
                </Box>
                <UserBox ref={refMe} u={user} isLeft isSinglePlayerMatch={isSinglePlayerMatch} animated isGuest={isGuest} />
                {!isSinglePlayerMatch && (
                  <Grid item xs={2} style={{ zIndex: '123' }}>
                    <Box className={styled.vs} ref={refVs} style={{ display: 'none' }}>
                      {/* <i className="i i-vs" /> */}
                      <img src={vsImage} alt="VS" className={styled.vsImg} />
                    </Box>
                  </Grid>
                )}
                {!isSinglePlayerMatch && <UserBox ref={refOpp} u={calcOpponent} isSinglePlayerMatch={isSinglePlayerMatch} animated />}
              </Grid>
            </Box>

            {/* try again banner */}
            {/* <Box mt={6} mb={6} width="100%" maxWidth="900px" className={styled.tryAgainBanner}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Body1 className={`${styled.tryAgainText} poppins-font-500`}>{texts.TRY_AGAIN_TEXT}</Body1>
                </Grid>
                <Grid item>
                  <Button tag="forLearners" borderRadius={15} width="130px" background="#00BBFF" onClick={handleTryAgain} m={0}>
                    <ButtonText className={styled.tryAgainBtnText} color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      {texts.TRY_AGAIN}
                    </ButtonText>
                  </Button>
                </Grid>
              </Grid>
            </Box> */}
            {/* try again banner */}

            {/* <div className="bg__meter">
              <div
                className="bg__filler"
                style={{
                  width: `${(percent / 100) * 100}%`,
                }}
              ></div>
            </div> */}

            {/* <div
              style={{
                eidth: '56px',
                height: '56px',
                position: 'fixed',
                margin: 'auto',
                bottom: '30px',
                visibility: timerTick && time < 4 ? 'hidden' : null,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={56}
                height={56}
                preserveAspectRatio="xMidYMid"
                style={{
                  shapeRendering: 'auto',
                  display: 'block',
                }}
                viewBox="0 0 100 100"
              >
                <circle cx={30} cy={50} r={10} fill="#71fefd">
                  <animate attributeName="cx" begin="-0.5s" dur="1s" keyTimes="0;0.5;1" repeatCount="indefinite" values="30;70;30" />
                </circle>
                <circle cx={70} cy={50} r={10} fill="#ffd533">
                  <animate attributeName="cx" begin="0s" dur="1s" keyTimes="0;0.5;1" repeatCount="indefinite" values="30;70;30" />
                </circle>
                <circle cx={30} cy={50} r={10} fill="#71fefd">
                  <animate attributeName="cx" begin="-0.5s" dur="1s" keyTimes="0;0.5;1" repeatCount="indefinite" values="30;70;30" />
                  <animate
                    attributeName="fill-opacity"
                    calcMode="discrete"
                    dur="1s"
                    keyTimes="0;0.499;0.5;1"
                    repeatCount="indefinite"
                    values="0;0;1;1"
                  />
                </circle>
              </svg>
            </div> */}

            {/* <Box mb={4} ref={btnRef}>
        <Button onClick={callback} tag="continue" className={styled.playBtn} mb={0}>
          {texts.LETS_PLAY}
        </Button>
      </Box> */}
          </ResContainer>
        </Box>
      </Box>
    </Box>
  );

  /*
  return (
    <Box className={styled.preloader}>
      {height > width && isGame && !Cordova.IsCordova && (
        <Box display="flex" justifyContent="center" alignItems="center" pl={2} pr={2} className={styled.topLandscapeText}>
          <Box
            style={{
              fontSize: '34px',
              marginRight: '16px',
              color: palette.grey['300'],
            }}
          >
            <i className="i i-landscape" />
          </Box>
          <Body2 color={palette.grey['300']} component="p">
            {texts.ROTATE_MESSAGE}
          </Body2>
        </Box>
      )}
      <Box className={styled.topWhiteHalf}>&nbsp;</Box>
      <Box className={styled.bottomBlueHalf}>
        <Box display="flex" justifyContent="center" width="100%" pl={4} pr={4} className={styled.bottomText}>
          <Body2 color={palette.common.white} style={{ textAlign: 'center' }} component="p">
            {texts.LEAVING_CHALLENGE_MSG}
          </Body2>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="row" style={{ position: 'fixed' }}>
        <div style={{ margin: '0 0 200px 0' }}>
          <H4 mb={isSinglePlayerMatch ? 2 : 5} color={palette.grey['600']} textAlign="center">
            {isGame ? game.alias : texts.QUIZ_CHALLENGE}
          </H4>
        </div>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Box className={styled.gameBox}>
          <Box className={styled.loader} style={{ width: `${(isGame ? percent : 99) + 5}%` }} />
          <img src={img} alt={isGame ? game.game_id : 'quiz-challenge'} />
        </Box>
        <Box />
      </Box>
      <Slide in={timerTick && time < 4} style={{ transitionDelay: ref ? '500ms' : '0ms' }} {...(ref ? { timeout: 350 } : {})}>
        <Box
          className={styled.timerContainer}
          style={{
            visibility: !(timerTick && time < 4) ? 'hidden' : null,
          }}
        >
          <H1 color={palette.common.white} fontWeight={typography.fontWeightBold} fontSize={42}>
            {time === 0 ? texts.GO : time}
          </H1>
        </Box>
      </Slide>

      <Box display="none">
        <Timer min={0} sec={0} start={timerTick} callback={localCallback} totalTime={4} />
      </Box>
    </Box>
  );*/
};

export default LoadingScreen;
