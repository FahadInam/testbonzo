import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetUserTransactions = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetUserTransactions.SUCCESS:
      return action.payload;
    case API_CALLS.GetUserTransactions.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetUserTransactions.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetUserTransactions;
