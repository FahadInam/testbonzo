import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetUserPremiumStatus = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetUserPremiumStatus.SUCCESS:
      return action.payload;
    case API_CALLS.GetUserPremiumStatus.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetUserPremiumStatus.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetUserPremiumStatus;
