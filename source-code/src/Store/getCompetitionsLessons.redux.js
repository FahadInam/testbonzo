import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetCompetitionsLessons = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetCompetitionsLessons.SUCCESS:
      return action.payload;
    case API_CALLS.GetCompetitionsLessons.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetCompetitionsLessons.CLEAR:
      return null;
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetCompetitionsLessons;
