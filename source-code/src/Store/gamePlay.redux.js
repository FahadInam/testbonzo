import { SET_GAME_PLAY } from 'Constants/challenge.constants';

const defaultX = {
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
  singleQuestionTime: 0,
  mistakes: 0,
  threeCounterTick: false,
  timerPause: false,
};

const GamePlay = (state = { ...defaultX }, action) => {
  let nState = { ...state };
  switch (action.type) {
    case SET_GAME_PLAY.TOTAL_QUESTIONS:
      nState.totalQuestions = action.payload;
      return nState;
    case SET_GAME_PLAY.TIME_IN_SECS:
      nState.timeInSec = action.payload;
      return nState;
    case SET_GAME_PLAY.SINGLE_QUESTION_TIME:
      nState.singleQuestionTime = action.payload;
      return nState;
    case SET_GAME_PLAY.GAME_DATA:
      nState = { ...nState, ...action.payload };
      return nState;
    case SET_GAME_PLAY.GET_GAME_DATA:
      return nState;
    case SET_GAME_PLAY.GAME_STOP:
      nState = { ...nState, ...action.payload };
      return nState;
    case SET_GAME_PLAY.CLEAR:
      return {
        ...defaultX,
      };
    default:
      return nState;
  }
};

export default GamePlay;
