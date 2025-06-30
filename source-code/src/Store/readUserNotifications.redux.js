import { API_CALLS, USER, COMPETITION } from 'Constants';

const ReadUserNotifications = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.ReadUserNotifications.SUCCESS:
      return action.payload;
    case API_CALLS.ReadUserNotifications.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.ReadUserNotifications.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default ReadUserNotifications;
