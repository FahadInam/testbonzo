import { API_CALLS, USER } from 'Constants';

const Chat = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetMessage.SUCCESS:
    case API_CALLS.GetMessageLowPriority.SUCCESS:
      return [...action.payload];
    case API_CALLS.GetMessage.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetMessage.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default Chat;
