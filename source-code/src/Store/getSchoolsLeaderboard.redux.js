import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetSchoolsLeaderboard = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetSchoolsLeaderboard.SUCCESS:
      return action.payload;
    case API_CALLS.GetSchoolsLeaderboard.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetSchoolsLeaderboard.CLEAR:
      return null;
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetSchoolsLeaderboard;
