import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetCompetitionsRewardHistory = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetRewardsHistory.SUCCESS:
      return action.payload;
    case API_CALLS.GetRewardsHistory.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetRewardsHistory.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetCompetitionsRewardHistory;
