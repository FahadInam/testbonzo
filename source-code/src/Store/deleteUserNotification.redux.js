import { API_CALLS, USER, COMPETITION } from 'Constants';

const DeleteUserNotification = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.DeleteUserNotification.SUCCESS:
      return action.payload;
    case API_CALLS.DeleteUserNotification.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.DeleteUserNotification.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default DeleteUserNotification;
