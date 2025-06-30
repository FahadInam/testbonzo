import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetCompetitionsRewards = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetCompetitionsRewards.SUCCESS:
      return action.payload;
    case API_CALLS.GetCompetitionsRewards.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetCompetitionsRewards.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetCompetitionsRewards;
