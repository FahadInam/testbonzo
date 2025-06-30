import { API_CALLS, USER, COMPETITION } from 'Constants';

const SetUserTimeReward = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.SetUserTimeReward.SUCCESS:
      return action.payload;
    case API_CALLS.SetUserTimeReward.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.SetUserTimeReward.CLEAR:
      return null;
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default SetUserTimeReward;
