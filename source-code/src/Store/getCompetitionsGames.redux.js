import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetCompetitionsGames = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetCompetitionsGames.SUCCESS:
      return action.payload;
    case API_CALLS.GetCompetitionsGames.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetCompetitionsGames.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetCompetitionsGames;
