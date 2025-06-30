import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Grid, useTheme, makeStyles, Box } from '@material-ui/core';

import { User, WinCalculator, AccuracyCalc, PointsCalc, GetRecommendations, SelectedCompetition } from 'Actions';
import { TwoPlayersResult, SinglePlayResult } from 'Components/Stats';
import { getInstanceType, handleScreen, IsEmptyObject, Numbers /* , encodeDecode */ } from 'Utils';
import Cordova from 'Utils/Cordova';
import McdUser from 'Utils/McdUser';
import PageStructure from '../shared/PageStructure';
import { LevelUpAnimation, ChallengeCompleteAnimation } from '../shared/Animations';
import { INSTANCES_ID } from 'Constants/instance.config';
// import AnimatedCoins from './AnimatedCoins';
// import TitleBarPaper from 'Components/Core/TitleBarPaper';

const useStyles = makeStyles(() => ({
  coinBase: {
    position: 'absolute',
    backgroundImage: 'url("../images/result/coin.png")',
    backgroundSize: 'contain',
    zIndex: -1,
    // width: dSize.w,
    // height: dSize.h,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: 'auto',
    //   transition: 'transform 1.2s ease-out',
    transition: 'transform 1.2s',
    //   left: 0,
    //   right: 0,
    //   top: '70%',
  },
  coinBasePG: {
    backgroundImage: 'url("../images/result/coin-pg.png")',
  },
  baseDivCoins: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // animation: `$zoomRotate 4s ease-in-out forwards`
  },
  baseDiv: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    top: 0,
    left: 0,
    // animation: `$zoomRotate 4s ease-in-out forwards`
  },
  baseAnimDiv: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'radial-gradient(circle, rgba(2,2,2,0.3556814669227066) 0%, rgba(0,0,0,0.68901480025604) 100%)',
    animation: `$bgColor 4s linear forwards`,
    // animation: `$zoomRotate 12s ease-in-out forwards`
  },
  raysBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100vh',
    backgroundImage: 'url("../images/result/sunrays.png")',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    animation: `$zoomRotate 4s linear forwards`,
  },
  coinsFront: {
    width: '100%',
    height: '100vh',
    backgroundImage: 'url("../images/result/stack1.png")',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    maxWidth: '600px',
    animation: `$zoomSimple 8s linear forwards`,
    transform: 'scale(0) ',
  },
  coinsFrontPG: {
    backgroundImage: 'url("../images/result/stack1-pg.png")',
  },
  amtTextAnim: {
    fontSize: '72px!important',
    animation: `$textZoom 4s ease-in-out forwards`,
  },
  starSmall: {
    position: 'absolute',
    backgroundImage: 'url("../images/result/starsmall.png")',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    animation: `$zoomRotateQuick 1.4s ease-in-out forwards`,
  },
  starSmall1: {
    animationDelay: '0.5s',
  },
  starSmall2: {
    animationDelay: '1.2s',
  },
  starSmall3: {
    animationDelay: '1.8s',
  },
  starSmall4: {
    animationDelay: '2.4s',
  },
  starSmall5: {
    animationDelay: '3s',
  },
  starSmall6: {
    animationDelay: '3.3s',
  },
  starSmall7: {
    animationDelay: '4s',
  },
  starSmall8: {
    animationDelay: '4.6s',
  },
  '@keyframes bgColor': {
    '0%': {
      opacity: 0,
    },
    '5%': {
      opacity: 1,
    },
    '95%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },

  '@keyframes zoomRotateQuick': {
    '0%': {
      transform: 'scale(0) rotate(0deg)',
      opacity: 0,
    },
    '10%': {
      transform: 'scale(0.2) rotate(90deg)',
      opacity: 0,
    },
    '50%': {
      transform: 'scale(1) rotate(180deg)',
      opacity: 1,
    },
    '90%': {
      transform: 'scale(0.2) rotate(270deg)',
      opacity: 0,
    },
    '100%': {
      transform: 'scale(0) rotate(360deg)',
      opacity: 0,
      display: 'none', // This hides the element after the animation ends
    },
  },
  '@keyframes zoomRotate': {
    '0%': {
      transform: 'scale(0) rotate(0deg)',
      opacity: 0,
    },
    '10%': {
      // transform: 'scale(1) rotate(90deg)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.2) rotate(180deg)',
    },
    '90%': {
      // transform: 'scale(1) rotate(270deg)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(0) rotate(360deg)',
      opacity: 0,
      display: 'none', // This hides the element after the animation ends
    },
  },

  '@keyframes zoomSimple': {
    '0%': {
      transform: 'scale(0) ',
    },
    '10%': {
      transform: 'scale(0.5) ',
    },
    '50%': {
      transform: 'scale(0.55)',
    },
    '90%': {
      transform: 'scale(0.45)',
    },
    '100%': {
      transform: 'scale(0) ',
    },
  },
  '@keyframes zoomOnly': {
    '0%': {
      transform: 'scale(0) ',
      opacity: 1,
    },
    '10%': {
      transform: 'scale(1) ',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '90%': {
      transform: 'scale(0.5) ',
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(0)',
      opacity: 0,
      display: 'none', // This hides the element after the animation ends
    },
  },
  '@keyframes textZoom': {
    '0%': {
      transform: 'scale(0) ',
      opacity: 1,
    },
    '20%': {
      transform: 'scale(1) ',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '80%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(0)',
      opacity: 0,
      display: 'none', // This hides the element after the animation ends
    },
  },
}));

const ChallengeResult = ({ competition, challenge, games }) => {
  const { palette, texts } = useTheme();
  const styled = useStyles();
  const user = User.Info();
  const dispatch = useDispatch();
  const recommendations = useSelector((state) => state.GetRecommendations, shallowEqual);
  const compDetail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);

  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const subject = challenge.subject || {};
  const data = challenge.data || {};
  const opponent = challenge.opponent || {};
  const myCalc = challenge.result || {};
  const isFromLocalResultLists = myCalc.tag === 'result'; // if user coming from result listing
  const serverResult = challenge.serverResult || challenge.result || {};
  let textToShare = `competitions/${competition.url}/?competition=`;
  const [stateRef, setStateRef] = useState({
    launched: false,
    levelUp: false,
    challengeComplete: false,
  });
  const arraySize = [65, 50, 60, 35, 40, 55, 30, 45];

  const currentComp = SelectedCompetition.Info();

  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  // const [targetPos, setTargetPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 1.4 });
  const [animationStyles, setAnimationStyles] = useState([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [hideAnimation, setHideAnimation] = useState(isFromLocalResultLists);
  const [scoreToShow, setScoreToShow] = useState('');
  // const [preCoins, setPreCoins] = useState('');
  // const [arePointsVisible, setArePointsVisible] = useState(isFromLocalResultLists || preCoins ? true : false);
  const paymentData = useSelector((state) => state.PremiumCompetition.data, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);
  const isFreeUser = isShupavu && paymentData?.is_subscribed === 0 && paymentData?.is_expired_subscription === 0;

  // const [coins, setCoins] = useState(0);
  // console.log('currentComp: ', currentComp);
  let oldPoints;
  // console.log('oldPoints: ', oldPoints);
  // console.log('User.GuestSavedData(): ', User.GuestSavedData());
  // if ((competition && competition.user_data) || User.IsGuest()) {
  //   setCoins(competition?.user_data?.points || 0);
  if (User.IsGuest()) {
    oldPoints = User.GuestSavedData().points;
  } else {
    oldPoints = currentComp?.user_data?.points;
  }
  // console.log(oldPoints, 'oldPoints');
  // }
  // const targetRef = useRef(null);

  const checkForScore = () => {
    const scoreElPre = document.querySelector('.bonzoui__coins__amount');

    // const scoreElPre = document.getElementsByClassName('bonzoui__coins__amount_cell')[0]?.hasClass('invisible');
    // console.log('scoreElPre: ', scoreElPre);
    if (scoreElPre?.firstElementChild?.classList.contains('invisible')) return false;

    const scoreEl = !isMultiPlayer
      ? document.getElementsByClassName('bonzoui__coins__amount_text__sp')
      : document.getElementsByClassName('bonzoui__coins__amount_text');

    const scoreNum = scoreEl?.length > 0 ? scoreEl[isMultiPlayer ? 1 : 0]?.innerText || scoreEl[isMultiPlayer ? 1 : 0]?.innerHTML : '';

    const scr = parseInt(scoreNum?.replace(/\s+/g, ''), 10);
    // console.log('scoreNum: ', scoreNum);
    if (scr > 0) return true;
    else return false;
  };

  useEffect(() => {
    setTimeout(() => {
      // Create a new audio object
      const audio = new Audio('/sound/result_audio.mp3');

      // Preload the audio
      audio.load();

      // Event listener to play audio when it's fully loaded
      const handleCanPlayThrough = () => {
        // console.log('Audio is fully loaded and will start playing now.');
        if (!hideAnimation && !isAnimationComplete) {
          if (checkForScore() && !isSoundPlaying) {
            audio.play(); // Play the audio
            setIsSoundPlaying(true);
          }
        }
        setIsSoundLoaded(true);
      };

      // Add event listener
      audio.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });

      // Cleanup
      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (preCoins) setArePointsVisible(true);
  //   // setTimeout(() => {}, 2000);
  //   // Set initial target position when the component mounts
  //   // const rect = document.getElementsByClassName('coins__container')[0].getBoundingClientRect();
  //   // setTargetPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

  //   // setTimeout(() => {
  //   //   const rect = document.getElementsByClassName('coins__container')[0].getBoundingClientRect();
  //   //   console.log('rect.left + rect.width / 2: ', rect.left + rect.width / 2);
  //   //   console.log('rect.top + rect.height / 2: ', rect.top + rect.height / 2);
  //   //   setTargetPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  //   //   // setTargetPos({ x: '85vw', y: '-44px' });
  //   // }, 3000);
  //   // // Move the target to a random position every 2 seconds
  //   // const interval = setInterval(() => {
  //   //   const randomX = Math.random() * window.innerWidth;
  //   //   const randomY = Math.random() * window.innerHeight;
  //   //   setTargetPos({ x: randomX, y: randomY });
  //   // }, 3000); // Change position every 3 seconds

  //   // return () => clearInterval(interval); // Clean up interval on unmount
  // }, [preCoins]);

  useEffect(() => {
    if (!isAnimationComplete) {
      if (hideAnimation || !isSoundLoaded) return;

      const scoreEl = !isMultiPlayer
        ? document.getElementsByClassName('bonzoui__coins__amount_text__sp')
        : document.getElementsByClassName('bonzoui__coins__amount_text');
      const scoreNum =
        scoreEl?.length > 0 ? scoreEl[isMultiPlayer ? 1 : 0]?.innerText || scoreEl[isMultiPlayer ? 1 : 0]?.innerHTML : '';
      // console.log('scoreEl: ', scoreEl);
      //  console.log('scoreNum: ', scoreNum);
      // console.log('oldPoints: ', oldPoints);
      // console.log('scoreNum: ', parseInt(scoreNum?.replace(/\s+/g, ''), 10));
      // console.log('scoreNum?.length: ', scoreNum?.length);

      const scoreElPre = document.querySelector('.bonzoui__coins__amount');
      const cX = scoreElPre?.firstElementChild?.classList.contains('invisible');
      //  console.log('scoreElPre: ', scoreElPre);
      // if() return false;

      // const scoreElPre = document.getElementsByClassName('bonzoui__coins__amount_cell')[0]?.hasClass('invisible');
      // console.log('scoreElPre: ', scoreElPre);
      //  console.log('cX: ', cX);
      if (scoreNum?.length > 0 && !cX) {
        setScoreToShow(scoreNum);
        const elCoins = document.getElementsByClassName('coins__container')[0]?.getElementsByTagName('h3')[0];
        // setPreCoins(elCoins?.innerText || '0');
        // console.log('scoreNum: ', scoreNum);
        // console.log('oldPoints reduced: ', oldPoints - parseInt(scoreNum?.replace(/\s+/g, '')));
        const calculatedOldPoints = Numbers.AbbreviatedNumber(oldPoints - parseInt(scoreNum?.replace(/\s+/g, ''), 10) || '0', 2);
        // console.log('calculatedOldPoints: ', calculatedOldPoints);
        // const guestValue = User.IsGuest() ? parseInt(scoreNum?.replace(/\s+/g, ''), 10) : ''
        if (!isAnimationComplete) elCoins.innerText = calculatedOldPoints;

        setTimeout(() => {
          // const calculatedNewPoints = Numbers.AbbreviatedNumber((calculatedOldPoints + parseInt(scoreNum?.replace(/\s+/g, ''), 10) || '0'), 2);
          // console.log('calculatedNewPoints: ', calculatedNewPoints);
          elCoins.innerText = oldPoints;
        }, 5000);
        // if(!preCoins) elCoins.innerText = '-'
        // let subScore;
        // console.log('elCoins: ', elCoins);
        // if(elCoins?.innerText?.length > 0)
        //   {
        //     console.log('coins: ', coins);
        //     subScore = coins - parseInt(scoreNum);
        //     console.log('subScore: ', subScore);
        //     elCoins.innerText = Numbers.AbbreviatedNumber(subScore, 2);
        //     setTimeout(() => { elCoins.innerText = Numbers.AbbreviatedNumber(coins, 2); }, 6000);
        //   }

        // const nD = document.getElementsByClassName('b__ext__amt');
        // console.log('nD: ', nD);
        // if(nD?.length > 0) {
        //   nD.appendChild(scoreNum);
        // }
      } else {
        setIsAnimationComplete(true);
        setHideAnimation(true);
        return;
      }
      setTimeout(() => {
        // console.log('scoreNum: ', scoreNum);
        const el = document.getElementsByClassName('coins__container')[0];
        const rect = el?.getBoundingClientRect();
        if (!el) return;
        // console.log('rect.left + rect.width / 2: ', rect.left + rect.width / 2);
        //  console.log('rect.top + rect.height / 2: ', rect.top + rect.height / 2);
        setTargetPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        //  console.log('targetPos.x: ', targetPos.x);
        if (targetPos.x === 0) return;
        // ------------------- COINS ANIM START
        const elements = Array.from({ length: 8 }).map(() => {
          const startX = window.innerWidth / (1.1 + (Math.floor(Math.random() * (1 + 100 - 1)) + 1) / 100);
          const startY = window.innerHeight / (1.1 + (Math.floor(Math.random() * (1 + 100 - 1)) + 1) / 100);

          const dx = targetPos.x - startX;
          const dy = targetPos.y - startY;

          // Calculate control points for the Bezier curve
          const controlPointX = startX + dx * 0.5 - dy * 0.3;
          const controlPointY = startY + dy * 0.5 + dx * 0.3;

          // Create a unique animation name
          const animationName = `moveToTarget-${Math.random().toString(36).substr(2, 9)}`;

          // Create keyframes dynamically.
          const styleSheet = document.styleSheets[0];
          const keyframes = `
      @keyframes ${animationName} {
        0% {
          opacity: 0;
          z-index: -1;
          visibility: visible;
        }
        10% {
          opacity: 1;
          transform: translate(${startX}px, ${startY}px);
          z-index: -1;
        }
        80% {
          opacity: 1;
          transform: translate(${targetPos.x - 15}px, ${targetPos.y - 15}px);
          z-index: -1;
        }
        100% {
          opacity: 0;
          transform: translate(${targetPos.x - 15}px, ${targetPos.y - 15}px);
          z-index: -1;
        }
      }
    `;

          // Inject keyframes into the stylesheet
          styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

          return {
            animationName,
            startX,
            startY,
            controlPointX,
            controlPointY,
          };
        });

        setAnimationStyles(elements);
        //-------------------- COINS ANIM END
      }, 2000);

      if (targetPos.x !== 0) setIsAnimationComplete(true);
    }

    if (isAnimationComplete && !hideAnimation) {
      setTimeout(() => {
        setHideAnimation(true);
      }, 4000);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPos, isAnimationComplete, hideAnimation, isSoundLoaded]);

  // console.log('subject: ', subject);
  // console.log('challenge ', challenge);
  // console.log('challenge?.result?.opponent_id ', challenge?.result?.opponent_id);
  // console.log('challenge?.serverResult?.opponent_id ', challenge?.serverResult?.opponent_id);
  // console.log('challenge?.opponent?.opponent_id ', challenge?.opponent?.opponent_id);
  //  console.log('user?.user_id ', user?.user_id);
  //  console.log('user', user);
  const winP = subject?.min_completion_percentage;
  // console.log('subject: ', subject);
  // console.log('winP: ', winP);
  let isMultiPlayer = false;
  if (challenge?.opponent?.id) {
    isMultiPlayer = user?.user_id !== challenge?.opponent?.id;
  } else if (challenge?.serverResult?.opponent_id) {
    isMultiPlayer = user?.user_id !== challenge?.serverResult?.opponent_id;
  } else if (challenge?.result?.opponent_id) {
    isMultiPlayer = user?.user_id !== challenge?.result?.opponent_id;
  }
  // = ( challenge?.opponent?.id && (user?.user_id !== challenge?.opponent?.id)) || ( challenge?.serverResult?.opponent_id && (user?.user_id !== challenge?.serverResult?.opponent_id));
  //console.log('isMultiPlayer: ', isMultiPlayer);
  serverResult.is_multiplayer = isMultiPlayer;
  let winnerCalc = {};
  const isFinalResult = typeof serverResult.opponent_score !== 'undefined';
  // console.log('serverResult ', serverResult);
  // console.log('isFinalResult ', isFinalResult);
  // console.log('typeof serverResult.opponent_score ', typeof serverResult.opponent_score);
  // console.log('myCalc', myCalc);

  if (isFromLocalResultLists) {
    winnerCalc = WinCalculator(
      {
        ...myCalc,
        my_accuracy: AccuracyCalc(myCalc.my_total_correct, myCalc.my_total_questions, myCalc.my_total_questions),
        min_completion_percentage: winP || myCalc.min_completion_percentage,
      },
      user,
      texts
    );
  }
  let UI = null;

  useEffect(() => {
    if (!recommendations) {
      dispatch(GetRecommendations(competition, true));
    }
  }, [challenge, opponent, subject, competition, recommendations, dispatch]);

  if (User.IsGuest() || isFreeUser) {
    // const points = PointsCalc(myCalc.total_correct, myCalc.total_attempted, myCalc.total_questions, data.base_points);
    const points = isFreeUser ? 0 : PointsCalc(myCalc.total_correct, myCalc.total_attempted, myCalc.total_questions, data.base_points);

    const guestPoints = isNaN(points) ? 0 : points;
    const res = {
      opponent_resigned: false,
      you_resigned: false,
      my_score: myCalc.score,
      opponent_score: 0,
      opponent_id: 0,
      opponent_name: '',
      opponent_username: '',
      subject: subject.subject,
      my_accuracy: AccuracyCalc(myCalc.total_correct, myCalc.total_attempted, myCalc.total_questions),
      min_completion_percentage: myCalc?.min_completion_percentage || winP,
    };
    //
    winnerCalc = WinCalculator(res, user, texts);
    const finalResult = {
      ...myCalc,
      subject: subject.subject,
      my_accuracy: AccuracyCalc(myCalc.total_correct, myCalc.total_attempted, myCalc.total_questions),
      my_time_spent: myCalc.total_time_spent,
      skill: data.skill,
      virtual_skill: data.virtual_skill,
      points,
      min_completion_percentage: myCalc.min_completion_percentage,
    };
    const guestCompetition = {
      competition_id: competition.competition_id,
      current_grade: compDetail?.current_grade,
    };
    if (!stateRef.launched && !isNaN(guestPoints)) User.GuestSavedData('update', guestCompetition, Math.ceil(guestPoints));
    UI = (
      <SinglePlayResult
        winnerCalc={winnerCalc}
        grade={competition.current_grade}
        grades={competition.grades}
        noRepeat={competition?.is_no_repeat}
        finalResult={finalResult}
        isGuest={User.IsGuest()}
        replayData={{ competition, opponent, subject }}
        winPercentage={winP}
      />
    );
  } else if (
    (!IsEmptyObject(serverResult) && !serverResult.is_multiplayer) ||
    (isFromLocalResultLists && winnerCalc.matchType === 1)
  ) {
    let finalResult = {};
    if (isFromLocalResultLists) {
      // console.log('isFromLocalResultLists');
      finalResult = { ...challenge.result };
      finalResult.my_accuracy = finalResult.my_total_correct / finalResult.my_total_questions;
    } else {
      const res = {
        opponent_resigned: false,
        you_resigned: false,
        my_score: serverResult.my_score,
        opponent_score: 0,
        opponent_id: 0,
        opponent_name: '',
        opponent_username: '',
        subject: subject.subject,
        my_accuracy: AccuracyCalc(myCalc.total_correct, myCalc.total_attempted, myCalc.total_questions),
        min_completion_percentage: winP,
      };
      //
      winnerCalc = WinCalculator(res, user, texts);

      finalResult = {
        ...myCalc,
        subject: subject.subject,
        my_accuracy: serverResult.my_total_correct / serverResult.my_total_questions,
        my_time_spent: myCalc.total_time_spent,
        skill: data.skill,
        virtual_skill: data.virtual_skill,
        points: serverResult.points_earned,
      };
    }
    // const dto = `${competition.competition_id}|${competition.current_grade}|${competition.textbook_id}|${subject.subject}|${subject.content_id}|${subject.skill_id}|${subject.is_game}`;

    textToShare += ''; // encodeDecode('enc', JSON.stringify(dto));

    UI = (
      <SinglePlayResult
        grades={competition.grades}
        winnerCalc={winnerCalc}
        grade={competition.current_grade}
        finalResult={finalResult}
        replayData={!isFromLocalResultLists && { competition, opponent, subject }}
        ShareLinkUrl={textToShare}
        isFromLocalResultLists
        competition={competition}
        opponent={opponent}
        subject={subject}
        games={games}
        noRepeat={competition?.is_no_repeat}
        winPercentage={winP}
      />
    );
  } else if (myCalc.tag === 'their_turn' || (!IsEmptyObject(serverResult) && serverResult.is_multiplayer && !isFinalResult)) {
    winnerCalc = {
      icon: (
        <Box color={palette.common.orange} display="flex" justifyContent="center" alignItems="center">
          <i className="i i-waiting" />
        </Box>
      ),
      final: 'Waiting',
      winner: -1,
    };

    let subjectData = {
      subject: myCalc.subject,
      skill: myCalc.skill,
      virtual_skill: myCalc.virtual_skill,
    };

    let matchOpponent = {
      opponent_id: myCalc.opponent_id,
      name: myCalc?.opponent_name,
      username: myCalc?.opponent_username,
      avatar: myCalc?.opponent_profile_picture,
      score: myCalc?.opponent_score || '-',
      opponent_time_spent: myCalc.opponent_time_spent,
      opponent_total_correct: myCalc.opponent_total_correct,
      opponent_total_questions: myCalc.opponent_total_questions,
      opponent_hattricks: myCalc.opponent_hattricks,
      points: myCalc.opponent_points,
    };

    let me = {
      name: user.name,
      username: user.user_name || user.username,
      avatar: user.profile_picture,
      score: myCalc.my_score,
    };

    if (!IsEmptyObject(serverResult) && serverResult.is_multiplayer) {
      subjectData = {
        subject: subject.subject,
        skill: data.skill,
        virtual_skill: data.virtual_skill,
      };

      // matchOpponent = {
      //   opponent_id: opponent.opponent_id,
      //   name: opponent.opponent_name,
      //   username: opponent.opponent_username,
      //   avatar: opponent.opponent_profile_picture,
      //   score: '-',
      // };

      me = {
        name: user.name,
        username: user.user_name || user.username,
        avatar: user.profile_picture,
        score: serverResult.my_score,

        my_hattricks: myCalc?.my_hattricks,
        my_score: myCalc?.my_score || serverResult.my_score,
        my_time_spent: myCalc?.my_time_spent,
        my_total_correct: myCalc?.my_total_correct,
        my_total_questions: myCalc?.my_total_questions,
        points: myCalc?.my_points,
        min_completion_percentage: myCalc?.min_completion_percentage,
      };
    }

    // const dto = {
    //   event: {
    //     competition_id: competition.competition_id,
    //     grade: competition.current_grade,
    //     textbook_id: competition.textbook_id,
    //   },
    //   opponent: {
    //     name: user.username,
    //     user_id: user.user_id,
    //     rank: 1,
    //     tag: 'SET_OPPONENT',
    //     profile_picture: user.profile_picture,
    //     username: user.username,
    //   },
    //   subjectObj: {
    //     subject: subject.subject,
    //     content_id: subject.content_id,
    //     skill_id: subject.skill_id,
    //     is_game: subject.is_game,
    //   },
    //   recommendations,
    // };

    textToShare += ''; // encodeDecode('enc', JSON.stringify(dto));
    //console.log('matchOpponent: ', matchOpponent);
    UI = (
      <TwoPlayersResult
        winnerCalc={winnerCalc}
        subjectData={subjectData}
        grade={competition.current_grade}
        opponent={matchOpponent}
        me={me}
        ShareLinkUrl={textToShare}
        grades={competition.grades}
        isGuest={User.IsGuest()}
        winPercentage={winP}
      />
    );
  } else {
    let subjectData = {};
    let matchOpponent = {};
    let me = {};
    // Double player complete result from listing
    if (isFromLocalResultLists) {
      subjectData = {
        subject: myCalc.subject,
        skill: myCalc.skill,
        virtual_skill: myCalc.virtual_skill,
      };

      matchOpponent = {
        opponent_id: myCalc.opponent_id,
        name: myCalc.opponent_name,
        username: myCalc.opponent_username,
        avatar: myCalc.opponent_profile_picture,
        score: myCalc.opponent_score,

        opponent_time_spent: myCalc.opponent_time_spent,
        opponent_total_correct: myCalc.opponent_total_correct,
        opponent_total_questions: myCalc.opponent_total_questions,
        opponent_hattricks: myCalc.opponent_hattricks,
      };
      //console.log('matchOpponentA: ', matchOpponent);

      me = {
        name: user.name,
        username: user.user_name || user.username,
        avatar: user.profile_picture,
        score: myCalc.my_score,
        my_time_spent: myCalc.my_time_spent,
        my_total_correct: myCalc.my_total_correct,
        my_total_questions: myCalc.my_total_questions,
        my_hattricks: myCalc.my_hattricks,
        min_completion_percentage: myCalc.min_completion_percentage,
      };
    } else {
      // Double player complete result from server
      winnerCalc = WinCalculator(
        {
          opponent_resigned: false,
          you_resigned: false,
          my_score: serverResult.my_score,
          opponent_score: serverResult.opponent_score,
          opponent_id: opponent.opponent_id,
          opponent_name: opponent.opponent_name,
          opponent_username: opponent.opponent_username,
          subject,
          min_completion_percentage: myCalc.min_completion_percentage,
        },
        user,
        texts
      );

      subjectData = {
        subject: subject.subject,
        skill: subject.skill,
        virtual_skill: subject.virtual_skill,
      };

      matchOpponent = {
        opponent_id: opponent.opponent_id,
        name: opponent.opponent_name,
        username: opponent.opponent_username,
        avatar: opponent.opponent_profile_picture,
        score: serverResult.opponent_score,

        opponent_time_spent: serverResult.opponent_time_spent,
        opponent_total_correct: serverResult.opponent_total_correct,
        opponent_total_questions: serverResult.opponent_total_questions,
        opponent_hattricks: serverResult.opponent_hattricks,
        points: serverResult.opponent_points,
      };
      //  console.log('serverResult: ', serverResult);

      me = {
        name: user.name,
        username: user.user_name || user.username,
        avatar: user.profile_picture,
        score: serverResult?.my_score || myCalc.my_score,
        my_score: serverResult?.my_score || myCalc.my_score,
        points: serverResult?.points_earned || myCalc.points_earned,
        min_completion_percentage: serverResult?.min_completion_percentage,
        my_time_spent: serverResult?.my_time_spent || myCalc.my_time_spent,
        my_total_correct: serverResult?.my_total_correct || myCalc.my_total_correct,
        my_total_questions: serverResult?.my_total_questions || myCalc.my_total_questions,
        my_hattricks: serverResult?.my_hattricks || myCalc.my_hattricks,
      };
    }
    UI = (
      <TwoPlayersResult
        winnerCalc={winnerCalc}
        subjectData={subjectData}
        grade={competition.current_grade}
        opponent={matchOpponent}
        me={me}
        replayData={!isFromLocalResultLists && { competition, opponent, subject }}
        grades={competition.grades}
        isGuest={User.IsGuest()}
        isFromLocalResultLists
      />
    );
  }

  useEffect(() => {
    if (!stateRef.launched) {
      if (serverResult.got_proficient === 1)
        setTimeout(() => {
          setStateRef({ launched: true, levelUp: true, challengeComplete: false });
        }, 2000);
      else if (serverResult.challenge_completed && serverResult.got_proficient === 0) {
        setTimeout(() => {
          setStateRef({ launched: true, levelUp: false, challengeComplete: true });
        }, 2000);
      } else {
        setStateRef({ launched: true });
      }
    }
  }, [stateRef, serverResult.got_proficient, serverResult.challenge_completed]);

  useEffect(() => {
    if (IsMcdUser) {
      McdUser.SetPortrait();
      McdUser.ToggleFullScreen(false);
    }
    Cordova.SetPortrait();
    Cordova.ShowStatusbar();
  }, [IsMcdUser]);

  useEffect(() => {
    handleScreen(false, 'portrait', IsMcdUser);
  }, [IsMcdUser]);

  return (
    <PageStructure
    // invisibleScore={!arePointsVisible}
    >
      {stateRef.levelUp && <LevelUpAnimation checked={stateRef.levelUp} />}
      {stateRef.challengeComplete && <ChallengeCompleteAnimation checked={stateRef.challengeComplete} />}
      {checkForScore() && !hideAnimation && (
        <div className={styled.baseDiv}>
          <div className={styled.baseAnimDiv}>
            <div className={styled.raysBackground}></div>
            <div className={`${styled.coinsFront} ${isPocketGames ? styled.coinsFrontPG : ''}`}></div>
            <div
              className={` ${styled.starSmall} ${styled.starSmall1} `}
              style={{ left: 'calc( 50vw - 4% )', top: 'calc( 50vh - 8% )', width: '40px', height: '30px' }}
            ></div>
            <div
              className={` ${styled.starSmall} ${styled.starSmall2} `}
              style={{ left: 'calc( 50vw + 15% )', top: 'calc( 50vh + 12% )', width: '30px', height: '30px' }}
            ></div>
            <div
              className={` ${styled.starSmall} ${styled.starSmall3} `}
              style={{ left: 'calc( 50vw - 23% )', top: 'calc( 50vh + 8% )', width: '40px', height: '40px' }}
            ></div>
            <div
              className={` ${styled.starSmall} ${styled.starSmall4} `}
              style={{ left: 'calc( 50vw - 8% )', top: 'calc( 50vh - 17% )', width: '30px', height: '30px' }}
            ></div>
            <div
              className={` ${styled.starSmall} ${styled.starSmall5} `}
              style={{ left: 'calc( 50vw + 4% )', top: 'calc( 50vh + 8% )', width: '40px', height: '40px' }}
            ></div>
            <div
              className={` ${styled.starSmall} ${styled.starSmall6} `}
              style={{ left: 'calc( 50vw - 16% )', top: 'calc( 50vh - 22% )', width: '30px', height: '30px' }}
            ></div>
            <div
              className={` ${styled.starSmall} ${styled.starSmall7} `}
              style={{ left: 'calc( 50vw + 12% )', top: 'calc( 50vh - 25% )', width: '40px', height: '40px' }}
            ></div>
            <div
              className={` ${styled.starSmall} ${styled.starSmall8} `}
              style={{ left: 'calc( 50vw + 16% )', top: 'calc( 50vh - 12% )', width: '30px', height: '30px' }}
            ></div>
            <div
              className={`bonzoui__coins__amount_text b__ext__amt b__text__stroke ${styled.amtTextAnim}`}
              style={{ WebkitTextStrokeWidth: '3px solid blackp' }}
            >
              {scoreToShow || ''}
            </div>
          </div>
        </div>
      )}
      <Grid xs={12} item>
        {UI}
      </Grid>
      {!hideAnimation && (
        <div className={styled.baseDivCoins}>
          {animationStyles.map((style, index) => (
            <div
              key={index}
              //className={styled.coinBase}
              className={`${styled.coinBase} ${isPocketGames ? styled.coinBasePG : ''}`}
              style={{
                position: 'absolute',
                width: `${arraySize[index % arraySize.length]}px`,
                height: `${arraySize[index % arraySize.length]}px`,
                borderRadius: '50%',
                // visibility: isAnimationComplete? 'hidden': 'visible',
                transform: isAnimationComplete ? '' : `translate(${style.startX}px, ${style.startY}px)`,
                animation: `${style.animationName} 1s ease-out forwards`,
                visibility: 'hidden',
                animationDelay: `${Math.random() * (1000 - 1) + 1}ms`,
              }}
            />
          ))}
        </div>
      )}
    </PageStructure>
  );
};

export default ChallengeResult;
