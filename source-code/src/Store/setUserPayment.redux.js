import { API_CALLS, USER, COMPETITION } from 'Constants';

const SetUserPayment = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.SetUserPayment.SUCCESS:
      return action.payload;
    case API_CALLS.SetUserPayment.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.SetUserPayment.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default SetUserPayment;
