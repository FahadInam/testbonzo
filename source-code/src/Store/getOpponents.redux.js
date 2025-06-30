import { API_CALLS, USER } from 'Constants';
import { CHALLENGE } from 'Constants/challenge.constants';

const Opponents = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetOpponents.SUCCESS:
      return { ...action.payload };
    case API_CALLS.GetOpponents.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetOpponents.CLEAR:
    case CHALLENGE.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default Opponents;
