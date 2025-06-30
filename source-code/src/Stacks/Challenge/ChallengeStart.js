import React, { useRef, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Box, makeStyles, useTheme, Grid } from '@material-ui/core';

import User from 'Actions/user.action';
import { Button, H4 } from 'Components';
// import { ChallengeNav } from 'Navigation/Paths';
// import { PageSwitch } from 'Navigation';

import { IsSinglePlayerMatch, SelectedCompetition, StartChallenge as StartNewChallenge } from 'Actions';

import vsImage from 'Assets/images/vs.svg';
import polkaDots from 'Assets/images/polkadots.svg';
import spikes from 'Assets/images/spikes.svg';
import singlePlayerBanner from 'Assets/images/single_banner.svg';
import multiPlayerBanner from 'Assets/images/multiplayer_banner.svg';

import { OptAnimate } from 'Utils';
import { UserBox } from 'Components/Stats';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import MobileAppPopup from 'Components/MobileAppPopup';
import PageStructure from './shared/PageStructure';

const useStyles = makeStyles((theme) => ({
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
    background: 'radial-gradient(at center top, rgba(255,152,30,1) 0%, rgba(203,30,71,1) 100%)',
    '@media (max-width: 638.88px)': {
      border: '6px solid black',
    },
    // background: theme.palette.common.white,
  },
  blackBg: {
    background: 'radial-gradient(circle, rgba(28, 156, 249, 1) 0%, rgba(9, 86, 172, 1) 100%)',
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
    width: '150px',
    height: '150px',
    '@media (max-width: 638.88px)': {
      width: '70px',
      height: '70px',
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
    [theme.breakpoints.up('md')]: {
      height: '150px',
      width: '150px',
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
    animation: `$polkaDotsSlide 8s infinite alternate`,
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
    animation: `$spikesAnim 12s infinite alternate`,
    transformOrigin: '50% 50%',
  },
  '@keyframes spikesAnim': {
    '0%': {
      transform: 'scale(20) translate(0, 0)',
    },
    '5%': {
      transform: 'scale(1)',
    },
    '25%': {
      transform: 'translate(-5px, 5px)',
    },
    '50%': {
      transform: 'translate(5px, -5px) rotate(5deg) scale(1.2)',
    },
    '75%': {
      transform: 'translate(-5px, -5px)',
    },
    '100%': {
      transform: 'translate(5px, 5px)  rotate(0deg) scale(1)',
    },
  },
  modeText: {
    fontFamily: 'Fredoka',
    fontWeight: 700,
    fontSize: '20px',
    position: 'relative',
    margin: 'auto',
    zIndex: '1',
    '@media (max-width: 638.88px)': {
      transform: 'scale(0.8)',
      fontSize: '24px',
      position: 'absolute',
      top: '45%',
      bottom: '52%',
    },
    '@media (max-height: 630.88px) and (max-width: 370.88px)': {
      position: 'fixed',
      top: '40px',
    },
    '@media (max-height: 442px)': {
      position: 'fixed!important',
      top: '40px!important',
      transform: 'scale(0.8)!important',
    },
  },
  modeTextSP: {
    fontFamily: 'Fredoka',
    fontWeight: 700,
    fontSize: '20px',
    position: 'absolute',
    margin: 'auto',
    top: 'calc( 50% - 122px )',
    zIndex: '1',
    '@media (max-width: 638.88px)': {
      transform: 'scale(0.6)',
      fontSize: '22px',
      position: 'absolute',
    },
    '@media (max-height: 630.88px) and (max-width: 370.88px)': {
      position: 'fixed',
      top: '40px',
    },
    '@media (max-height: 442px)': {
      position: 'fixed!important',
      top: '40px!important',
      transform: 'scale(0.8)!important',
    },
  },

  modeTextLabelMP: {
    position: 'absolute',
    left: 120,
    top: 35,
    margin: 'auto',
  },
  modeTextLabelSP: {
    position: 'absolute',
    left: 84,
    top: 30,
    margin: 'auto',
  },
}));

window.GlobalStartAnimation1 = null;
window.GlobalStartAnimation2 = null;
window.GlobalStartAnimation3 = null;
// window.GlobalStartAnimation5 = null;
window.GlobalStartAnimation4 = null;

const StartChallenge = ({ competition, challenge }) => {
  const refMe = useRef();
  const refVs = useRef();
  const refOpp = useRef();
  // const btnRef = useRef();
  const subject = challenge.subject || {};
  const opponent = challenge.opponent || {};
  const user = User.Info();
  const styled = useStyles();
  const dispatch = useDispatch();
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const { palette, texts } = useTheme();
  const shouldGoToPlayer = !!subject.isStart;
  const isSinglePlayerMatch = IsSinglePlayerMatch(opponent);
  const calcOpponent = User.CombinedOpponent(opponent);
  useEffect(() => {
    let timerX;
    const me = refMe.current;
    const opp = refOpp.current;
    const vs = refVs.current;
    // const btn = btnRef.current;

    window.GlobalStartAnimation1 = new OptAnimate().AnimateWithDelay(me, 'slideInLeft', 350, null, false, 500);

    if (opp) {
      window.GlobalStartAnimation2 = new OptAnimate().AnimateWithDelay(opp, 'slideInRight', 350, null, false, 500);
      window.GlobalStartAnimation3 = new OptAnimate().AnimateWithDelay(vs, 'fadeIn', 750, null, false, 950);
      window.GlobalStartAnimation4 = new OptAnimate().AnimateWithDelay(vs, 'jello', 750, null, false, 1200);
    }

    // window.GlobalStartAnimation5 = new OptAnimate().AnimateWithDelay(btn, 'fadeIn', 750, null, false, 1200);

    timerX = setTimeout(() => {
      if (shouldGoToPlayer) {
        dispatch(StartNewChallenge(competition, opponent, subject));
        // PageSwitch(ChallengeNav.CHALLENGE_PLAYER);
      }
    }, 4000);

    return () => {
      if (timerX) {
        clearTimeout(timerX);
        timerX = null;
      }
      window.GlobalStartAnimation1 = null;
      window.GlobalStartAnimation2 = null;
      window.GlobalStartAnimation3 = null;
      window.GlobalStartAnimation4 = null;
      // window.GlobalStartAnimation5 = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const videosObj = TutorialToPlay(subject, games);

  /*
  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'continue':
        if (shouldGoToPlayer) {
          // if (videosObj) {
          //   if (!TutorialCheck(subject)) {
          //     dispatch(StartNewChallenge(competition, opponent, subject));
          //   } else {
          //     PageSwitch(ChallengeNav.TUTORIAL_PLAYER);
          //   }
          // } else {
          // console.log('StartNewChallenge', competition, opponent, subject, games);
          // PageSwitch(ChallengeNav.CHALLENGE_PLAYER);
          dispatch(StartNewChallenge(competition, opponent, subject));
          // }
        } else {
          // if (videosObj) {
          //   if (!TutorialCheck(subject)) {
          //     dispatch(PlayChallenge(competition, challenge.subject));
          //   } else {
          //     PageSwitch(ChallengeNav.TUTORIAL_PLAYER);
          //   }
          // } else {
          // console.log('PlayChallenge', competition, challenge.subject, subject, games);
          //  }
        }
        break;
      // case 'tutorial':
      //   PageSwitch(ChallengeNav.TUTORIAL_PLAYER);
      //   TutorialCheck(subject);
      //   break;
      default:
        break;
    }
  };*/

  const headerSet = {
    showLeft: true,
    showRight: false,
  };
  return (
    <PageStructure noRes hideHeader headerSet={headerSet} boxClassName={styled.boxClassName}>
      {!IsMcdUser && <MobileAppPopup mcd={IsMcdUser} />}
      <Box className={styled.topBar}>
        <Box className={styled.menuButton}>
          <Button
            mt={3}
            tag="back"
            type="submit"
            className="bonzoui__nowrap"
            onClick={() => {
              SelectedCompetition.GotoCompetition();
            }}
            startIcon={<i className="i i-left" />}
          >
            {texts.HOME}
          </Button>
        </Box>
        {/* <IconButton
          className={styled.backBtn}
          data-tag="back"
          onClick={() => {
            SelectedCompetition.GotoCompetition();
          }}
        >
          <i className="i i-left" />
        </IconButton>
        {texts.HOME}  */}
      </Box>
      <Box className={`${styled.boxClassName} ${styled.coreChallengeBgBox}`} style={{ height: '100%' }}>
        <Box className={`${styled.containerClass} ${isSinglePlayerMatch ? styled.twistedUIS : styled.twistedUI}`}>
          <Box className={` ${isSinglePlayerMatch ? styled.halfFull : styled.half} ${styled.blackBg} `} />
          {!isSinglePlayerMatch && <Box className={` ${styled.half} ${styled.whiteBg} `} />}
        </Box>
        <div className={styled.coreChallengeBoxBgAnims}>
          <div className={styled.coreChallengeBoxBgAnimsInner}>
            <div src={polkaDots} className={styled.polkaDots} />
            <div src={spikes} className={styled.spikes} />
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
            <Box mt={4} mb={4} width="100%" maxWidth="800px" className={styled.playersCirclesContainer}>
              <Grid
                container
                alignItems="center"
                className={isSinglePlayerMatch ? styled.innerPlayerCirclesSP : styled.innerPlayerCircles}
              >
                <div className={isSinglePlayerMatch ? styled.modeTextSP : styled.modeText}>
                  <span className={isSinglePlayerMatch ? styled.modeTextLabelSP : styled.modeTextLabelMP}>
                    {isSinglePlayerMatch ? texts.SINGLE_PLAYER_MODE : texts.MULTIPLAYER_CHALLENGE}
                  </span>
                  <img
                    src={isSinglePlayerMatch ? singlePlayerBanner : multiPlayerBanner}
                    alt={isSinglePlayerMatch ? texts.SINGLE_PLAYER : texts.MULTIPLAYER_CHALLENGE}
                    height="100"
                    style={{ margin: 'auto' }}
                  />
                </div>
                <UserBox ref={refMe} u={user} isLeft isSinglePlayerMatch={isSinglePlayerMatch} animated />
                {!isSinglePlayerMatch && (
                  <Grid item xs={2}>
                    <Box className={styled.vs} ref={refVs} style={{ display: 'none' }}>
                      {/* <i className="i i-vs" /> */}
                      <img src={vsImage} alt="VS" className={styled.vsImg} />
                    </Box>
                  </Grid>
                )}
                {!isSinglePlayerMatch && <UserBox ref={refOpp} u={calcOpponent} isSinglePlayerMatch={isSinglePlayerMatch} animated />}
              </Grid>
            </Box>

            {/* <Box mb={4} ref={btnRef}>
              <Button onClick={callback} tag="continue" className={styled.playBtn} mb={0}>
                {texts.LETS_PLAY}
              </Button>
            </Box> */}
          </ResContainer>
        </Box>
      </Box>
    </PageStructure>
  );
};

export default StartChallenge;
