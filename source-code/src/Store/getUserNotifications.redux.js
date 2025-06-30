/* eslint-disable react/destructuring-assignment */
import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetUserNotifications = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetUserNotifications.SUCCESS:
      // console.log('action.payload', action.payload);
      return action.payload;
    case API_CALLS.GetUserNotifications.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetUserNotifications.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetUserNotifications;
