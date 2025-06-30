import { API_CALLS, USER } from 'Constants';
import { CHALLENGE } from 'Constants/challenge.constants';

const GetCompetitionsFriendsBlocking = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetCompetitionsFriendsBlocking.SUCCESS:
      return { ...action.payload };
    case API_CALLS.GetCompetitionsFriendsBlocking.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetCompetitionsFriendsBlocking.CLEAR:
    case CHALLENGE.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetCompetitionsFriendsBlocking;
