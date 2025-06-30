import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetCompetitionsLeaderboard = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetCompetitionsLeaderboard.SUCCESS:
      return action.payload;
    case API_CALLS.GetCompetitionsLeaderboard.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetCompetitionsLeaderboard.CLEAR:
      return null;
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetCompetitionsLeaderboard;
