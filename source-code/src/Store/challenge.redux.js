import { CHALLENGE } from 'Constants/challenge.constants';
import { USER, API_CALLS } from 'Constants';

const unifyOpponent = (o) => {
  return {
    ...o,
    opponent_id: o.opponent_id || o.user_id,
    opponent_name: o.opponent_name || o.name,
    opponent_username: o.opponent_username || o.username,
    opponent_profile_picture: o.opponent_profile_picture || o.profile_picture,
    primary: "",
  };
};

const Challenge = (state = null, action) => {
  const nState = { ...state };
  switch (action.type) {
    case CHALLENGE.SET_NEW:
      return {};
    case CHALLENGE.SET_SUBJECT:
      nState.subject = action.payload;
      return nState;
    case CHALLENGE.PLAY_STATE:
      nState.play_state = action.payload;
      return nState;
    case CHALLENGE.SET_VIDEO_LINK:
      nState.videoLink = action.payload;
      return nState;
    case CHALLENGE.SET_URL_GAME_ID:
      nState.urlGameId = action.payload;
      return nState;
    case CHALLENGE.SET_OPPONENT:
      nState.opponent = unifyOpponent(action.payload);
      return nState;
    case CHALLENGE.SET_DATA:
      nState.data = action.payload;
      return nState;
    case CHALLENGE.SET_GAME_DATA:
      nState.gameData = action.payload;
      return nState;
    case CHALLENGE.GET_GAME_DATA:
      //  console.log('nstate', nState);
      return nState;
    case CHALLENGE.SET_RESULT:
      nState.result = action.payload;
      return nState;
    case API_CALLS.SaveChallenge.SUCCESS:
      nState.serverResult = action.payload;
      return nState;
    case CHALLENGE.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default Challenge;
