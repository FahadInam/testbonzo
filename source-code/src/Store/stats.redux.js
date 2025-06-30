import { API_CALLS, USER } from 'Constants';

const Stats = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetStats.SUCCESS:
      return { ...action.payload };
    case API_CALLS.GetStats.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetStats.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default Stats;
