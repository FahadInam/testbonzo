import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetCompetitionsFriends = (state = null, action) => {
  const nState = { ...state };
  switch (action.type) {
    case API_CALLS.GetCompetitionsFriends.SUCCESS:
      return action.payload;
    case API_CALLS.GetCompetitionsFriends.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetCompetitionsFriends.CLEAR:
      return null;

    case API_CALLS.SearchUser.SUCCESS:
      nState.search = action.payload;
      return nState;
    case API_CALLS.SearchUser.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.SearchUser.CLEAR:
      delete nState.search;
      return nState;

    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    default:
      return state;
  }
};

export default GetCompetitionsFriends;
