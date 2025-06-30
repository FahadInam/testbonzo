import { API_CALLS, USER, COMPETITION } from 'Constants';

const ReadUserNotification = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.ReadUserNotification.SUCCESS:
      return action.payload;
    case API_CALLS.ReadUserNotification.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.ReadUserNotification.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default ReadUserNotification;
