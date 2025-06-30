/* eslint-disable camelcase */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ResignChallenge, SaveChallenge, Spinner, GetSubjectsFromGrade } from 'Actions';
import { checkFullscreen, handleScreen, IsEmptyObject, isWebAndroid, OptAnimate } from 'Utils';
import PageStructure from 'Stacks/Challenge/shared/PageStructure';
import { useTheme, Box } from '@material-ui/core';
import { config, IMAGES, MCD } from 'Constants';
import { CHALLENGE, CHALLENGE_GLOBAL, SET_GAME_PLAY } from 'Constants/challenge.constants';
import ConfirmationBox from 'Components/ConfirmationBox';
import { Button, McdFullScreenBar } from 'Components';
import { ChallengeNav } from 'Navigation/Paths';
import { PageSwitch } from 'Navigation';
import Cordova from 'Utils/Cordova';
import McdUser from 'Utils/McdUser';
import GamePlayDimensions from 'Utils/GamePlayDimensions';
import { gameDispatch } from 'Utils/ActionCreators';
import GamePlayer from '../shared/GamePlayer';
import McqTemplate from '../shared/McqTemplate';
import Timer from '../shared/timer';
import LoadingScreen from '../shared/LoadingScreen';
import Animations from '../shared/Animations';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
const ChallengePlayer = ({ competition, challenge, me }) => {
  const { is_resign_allowed } = competition;
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const IsMcdFullScreen = useSelector((state) => state.McdUser.mcd_fullscreen, shallowEqual);
  const gameData = useSelector((state) => state.GamePlay, shallowEqual);
  const CheckFullScreen = GamePlayDimensions();
  const CompetitionDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const paymentData = useSelector((state) => state.PremiumCompetition.data, shallowEqual);

  const gameMode = competition.is_no_repeat;
  const [isFullscreen, setIsFullscreen] = useState(checkFullscreen());

  const [stateRef, setStateRef] = useState({
    isLoaded: false,
    percent: 0,
    playTimer: false,
    allowPlaying: true,
    timeInSec: 0,
    resultSubmitted: false,
    timerUp: true,
    answer: [],
    totalAttempted: 0,
    totalQuestions: 0,
    totalCorrect: 0,
    totalContinuousCorrect: 0,
    totalContinuousWrong: 0,
    singleQuestionTime: new Date().getTime(),
    mistakes: 0,
    threeCounterTick: false,
    showTutorial: !!challenge.videoLink,
    timerPause: false,
  });
  const [resignRef, setResignRef] = useState(false);
  const styled = useStyles();
  const subject = challenge.subject || {};
  const data = challenge.data || {};
  const history = useHistory();
  const simulation_time_limit = history.location.state?.simulation_time_limit;
  //let selectedGame = GetObjFromObj(games, 'game_id', data.content_type);
  const gradeSubjects = GetSubjectsFromGrade(CompetitionDetails.grades, CompetitionDetails.current_grade);
  let isMcq = false;
  // if (selectedGame) isMcq = selectedGame.game_id.toLowerCase().trim() === 'mcq';
  const dispatch = useDispatch();
  const { texts } = useTheme();
  const btnRef = useRef();
  const gameStartTime = new Date().getTime();
  const gameDataRef = useRef(gameData);
  useEffect(() => {
    gameDataRef.current = gameData;
  }, [gameData]);

  const is_ai_bot = data?.content_type === 'ai_bot' || data?.content_type[0]?.content_type === 'ai_bot';
  useEffect(() => {
    // Check fullscreen status initially
    setIsFullscreen(checkFullscreen());

    // Set up a timer to check every second
    const intervalId = setInterval(() => {
      setIsFullscreen(checkFullscreen());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const btn = btnRef.current;
    window.GlobalStartAnimation5 = new OptAnimate().AnimateWithDelay(btn, 'fadeIn', 750, null, false, 1200);
    return () => {
      window.GlobalStartAnimation5 = null;
    };
  }, []);
  useEffect(() => {
    if (IsMcdUser) {
      gameDispatch(MCD.MCD_FULLSCREEN, CheckFullScreen);
    }
  }, [CheckFullScreen, IsMcdUser]);
  const GlobalCom = useCallback(() => {
    if (stateRef.isLoaded) {
      if (setResignRef) setResignRef(!resignRef);
    }
  }, [resignRef, stateRef.isLoaded]);
  useEffect(() => {
    if (Cordova.IsCordova) {
      window.MyBackButton = GlobalCom;
      window.myOnBeforeUnload = () => {
        window.MyBackButton = null;
      };
    }
  }, [GlobalCom]);
  let timeLimit = config.challengeTime;
  if (is_ai_bot && simulation_time_limit > 0) {
    timeLimit = simulation_time_limit;
  } else if (is_ai_bot && simulation_time_limit === 0) {
    timeLimit = null;
  } else if (!is_ai_bot && (gradeSubjects || (subject && subject?.subject))) {
    for (let i = 0; i < gradeSubjects.length; i++) {
      if ((subject?.subject?.toLowerCase() || gradeSubjects[0].name.toLowerCase()) === gradeSubjects[i].name.toLowerCase()) {
        timeLimit = gradeSubjects[i].time_limit;
        break;
      }
    }
  }
  const calculateResult = () => {
    return {
      score: gameDataRef.current.totalCorrect * 100,
      total_questions: gameDataRef.current.totalQuestions,
      total_correct: gameDataRef.current.totalCorrect,
      total_attempted: gameDataRef.current.totalAttempted,
      total_time_spent: gameDataRef.current.timeInSec + 1,
      question_data: [...gameDataRef.current.answer],
      mistakes: gameDataRef.current.mistakes,
    };
  };
  const saveAnswer = (item) => {
    // console.log('saveAnswer item ====>', item);
    const tempA = [...gameDataRef.current.answer];
    tempA.push({
      index: item.index,
      is_correct: item.correct,
      time_take: gameDataRef.current.singleQuestionTime
        ? (new Date().getTime() - gameDataRef.current.singleQuestionTime) / 1000
        : (new Date().getTime() - gameStartTime) / 1000,
    });
    let totalCorrect;
    if (is_ai_bot) {
      totalCorrect = item.totalCorrect;
    } else {
      totalCorrect = item.correct ? gameDataRef.current.totalCorrect + 1 : gameDataRef.current.totalCorrect;
    }

    const totalContinuousCorrect = item.correct ? gameDataRef.current.totalContinuousCorrect + 1 : 0;
    const totalContinuousWrong = item.correct ? 0 : gameDataRef.current.totalContinuousWrong + 1;
    const totalAttempted = item.attempted ? item.attempted : tempA.length;
    gameDispatch(SET_GAME_PLAY.GAME_DATA, {
      answer: [...tempA],
      totalCorrect,
      totalContinuousCorrect,
      totalContinuousWrong,
      totalAttempted,
      singleQuestionTime: new Date().getTime(),
      mistakes: typeof item.mistakes === 'undefined' ? 0 : item.mistakes,
      score: gameDataRef.current.totalCorrect * 100,
    });
  };
  const callback = (e, item) => {
    // console.log('ChallengePlayer callback', e, item);
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    let result = {};
    switch (t) {
      case 'timeToStart':
        setStateRef({
          ...stateRef,
          isLoaded: true,
          playTimer: true,
          showTutorial: false,
          singleQuestionTime: new Date().getTime(),
        });
        gameDispatch(SET_GAME_PLAY.SINGLE_QUESTION_TIME, new Date().getTime());
        break;
      case CHALLENGE_GLOBAL.START:
        Spinner.Hide();
        setStateRef({
          ...stateRef,
          totalQuestions: item,
        });
        gameDispatch(SET_GAME_PLAY.TOTAL_QUESTIONS, item);
        break;
      case CHALLENGE_GLOBAL.STOP_TIMER:
        setStateRef({
          ...stateRef,
          timerPause: true,
        });
        break;
      case CHALLENGE_GLOBAL.START_TIMER:
        setStateRef({
          ...stateRef,
          timerPause: false,
        });
        break;
      case CHALLENGE_GLOBAL.SUBMIT_QUESTION:
        saveAnswer(item);
        // handleAction(item);
        // if (challenge.data.content_type.toLowerCase().indexOf('alif') > -1 && stateRef.totalQuestions === item.index + 1) {
        //   callback(CHALLENGE_GLOBAL.STOP);
        // }
        break;
      case CHALLENGE_GLOBAL.LOADING:
        setStateRef({
          ...stateRef,
          percent: item,
        });
        break;
      case 'left-btn':
      case CHALLENGE_GLOBAL.RESIGN:
        setResignRef(true);
        break;
      case 'close':
      case 'resign-negative':
      case 'overlay':
        setResignRef(false);
        break;
      case 'tutorial':
        PageSwitch(ChallengeNav.TUTORIAL_PLAYER);
        break;
      case 'resign-positive':
        if (!stateRef.resultSubmitted) {
          if (is_resign_allowed) {
            result = { ...calculateResult() };
            dispatch(
              SaveChallenge(competition, { ...data }, result, subject, CompetitionDetails.current_grade, IsMcdUser, texts, paymentData)
            );
          } else {
            result = { ...calculateResult() };
            dispatch(
              ResignChallenge(
                competition,
                { ...data },
                result,
                subject,
                CompetitionDetails.current_grade,
                texts.RESIGNED_MATCH,
                IsMcdUser,
                paymentData
              )
            );
          }
          setStateRef({
            ...stateRef,
            allowPlaying: false,
            playTimer: false,
            resultSubmitted: true,
          });
          setResignRef(false);
        }
        break;
      case CHALLENGE_GLOBAL.STOP:
        result = { ...calculateResult() };
        if (!stateRef.resultSubmitted) {
          setStateRef({
            ...stateRef,
            allowPlaying: false,
            playTimer: false,
            resultSubmitted: true,
            isLoaded: true,
          });
          dispatch(
            SaveChallenge(competition, { ...data }, result, subject, CompetitionDetails.current_grade, null, texts, paymentData)
          );
        }
        break;
      default:
        break;
    }
  };
  const headerSet = {
    showLeft: true,
    showRight: false,
    leftTitle: texts.HOME,
    callback,
    overrideLeftButton: true,
  };

  const timerCallback = (t, item) => {
    if (t === 'stopped') {
      setStateRef({ ...stateRef, allowPlaying: false, timeInSec: item.ticks });
      gameDispatch(SET_GAME_PLAY.TIME_IN_SECS, item.ticks);
    } else if (t === 'completed') {
      setStateRef({ ...stateRef, allowPlaying: false, playTimer: false, timeInSec: item.ticks });
      gameDispatch(SET_GAME_PLAY.TIME_IN_SECS, item.ticks);
      if (timeLimit) {
        callback(CHALLENGE_GLOBAL.STOP);
      } else {
        const result = { ...calculateResult() };
        gameDispatch(CHALLENGE.SET_RESULT, {
          score: result.score,
          total_questions: result.total_questions,
          total_correct: result.total_correct,
          total_attempted: result.total_attempted,
          total_time_spent: result.total_time_spent,
        });
      }
    } else {
      setStateRef({ ...stateRef, timeInSec: item.ticks });
      gameDispatch(SET_GAME_PLAY.TIME_IN_SECS, item.ticks);
    }
  };

  useEffect(() => {
    if (!stateRef.threeCounterTick && stateRef.totalQuestions !== 0)
      setTimeout(() => {
        setStateRef({ ...stateRef, threeCounterTick: true });
      }, 1000);
  }, [stateRef]);

  useEffect(() => {
    if (!isMcq) {
      if (IsMcdUser) {
        McdUser.SetLandscape();
        McdUser.ToggleFullScreen(true);
      }
      Cordova.SetLandscape();
      Cordova.HideStatusbar();
    }
    clearInterval(window.GlobalActivityTimer);
  }, [isMcq, IsMcdUser]);

  // !important
  if (IsEmptyObject(data)) return null;
  let templateType = null;
  if (isMcq) {
    templateType = <McqTemplate data={data} callback={callback} allowPlaying={stateRef.allowPlaying} />;
  } else {
    templateType = (
      <>
        <GamePlayer
          subject={subject}
          selectedGame={subject}
          data={subject}
          callback={callback}
          allowPlaying={stateRef.allowPlaying}
          competition={competition}
          user={me}
          totalTime={timeLimit}
          gameMode={gameMode}
          completionPercentage={subject?.min_completion_percentage || 0}
        />
      </>
    );
  }
  let mcdStatus = false;
  if (IsMcdUser && !IsMcdFullScreen) {
    mcdStatus = true;
  }
  // console.log(stateRef.isLoaded, '!stateRef.isLoaded');
  return (
    <>
      <Animations number={stateRef.totalContinuousCorrect} />
      <Box display={stateRef.showTutorial ? 'flex' : 'none'} position="fixed" top="6px" right="10px" zIndex="1111" ref={btnRef}>
        <Button className={styled.tutorial} onClick={callback} tag="tutorial" mb={0}>
          {texts.TUTORIAL}
        </Button>
      </Box>
      {/* Loader */}
      {!stateRef.isLoaded && (
        <LoadingScreen
          percent={stateRef.percent}
          game={subject}
          opponent={challenge.opponent}
          timerTick={stateRef.threeCounterTick}
          callback={callback}
          isMcq={isMcq}
          customGameImage={competition.is_mcd ? challenge.subject?.image : false}
          challenge={challenge}
          isCompleted={stateRef.resultSubmitted}
        />
      )}
      {/* Resign */}
      <ConfirmationBox
        visible={resignRef}
        callback={callback}
        // icon="resign"
        addCodeIcon={IMAGES.WARNING}
        ADD_CODE
        hideCross
        allowClose
        className={styled.confirmation_box}
        buttonsContainer={styled.sign_out_buttons_container}
        title={texts.RESIGN_CONFIRMATION_TITLE}
        primary={is_resign_allowed ? texts.RESIGN_CONFIRMATION2 : texts.RESIGN_CONFIRMATION}
        // positive={is_resign_allowed ? texts.RESIGN2 : texts.RESIGN}
        positive={texts.RESIGN}
        negative={texts.CONTINUE_PLAYING}
        tag="resign"
      />
      {/* Timer */}
      <Box
        style={{
          visibility: timeLimit ? 'visible' : 'hidden',
        }}
        className={`${styled.timerBox} ${mcdStatus ? styled.mcdStyle : null} ${stateRef.timerUp && styled.timerBoxDown} ${
          !(stateRef.playTimer || !stateRef.allowPlaying) && styled.hide
        }`}
        onClick={() => {
          setStateRef({ ...stateRef, timerUp: !stateRef.timerUp });
        }}
      >
        {/* {challenge.data.content_type?.toLowerCase().indexOf('rum') > -1 && (
          <Button className={styled.resignCustomBtn} onClick={resignCallback} tag="resign">
            {texts.RESIGN}
          </Button>
        )} */}

        {!isFullscreen && isWebAndroid() && !IsMcdUser && (
          <Button
            type="submit"
            className={styled.fullscreenCustomBtn}
            onClick={() => {
              handleScreen(true, 'landscape', IsMcdUser);
            }}
            tag="Fullscreen"
          >
            <i className={`i i-fullscreen `} />
          </Button>
        )}

        <Box className="timer_color">
          <Timer
            min={0}
            sec={0}
            start={stateRef.playTimer}
            callback={timerCallback}
            totalTime={timeLimit}
            pause={stateRef.timerPause}
          />
        </Box>
      </Box>
      <McdFullScreenBar mcdStatus={mcdStatus} />
      <PageStructure
        noRes={!isMcq}
        hideHeader={!isMcq || !mcdStatus}
        containerClass={!mcdStatus ? styled.containerClass : null}
        boxClassName={!mcdStatus ? styled.boxClassName : null}
        headerSet={headerSet}
        IsMcdUser={IsMcdUser}
      >
        {templateType}
      </PageStructure>
    </>
  );
};
export default ChallengePlayer;
