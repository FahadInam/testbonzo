import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetRecommendations = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetRecommendations.SUCCESS:
    case API_CALLS.GetRecommendationsBlocking.SUCCESS:
      return action.payload;
    case API_CALLS.GetRecommendations.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetRecommendations.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetRecommendations;
