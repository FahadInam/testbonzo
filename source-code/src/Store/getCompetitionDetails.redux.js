import { API_CALLS, USER, COMPETITION } from 'Constants';

const GetCompetitionDetails = (state = null, action) => {
  const nState = { ...state };
  switch (action.type) {
    case API_CALLS.GetCompetitionDetails.SUCCESS:
      return action.payload;
    case API_CALLS.GetCompetitionDetails.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetCompetitionDetails.CLEAR:
    case USER.CLEAR:
    case COMPETITION.CLEAR_PAGES:
      return null;
    case COMPETITION.SET_CURRENT_GRADE:
      nState.current_grade = action.payload;
      return nState;
    default:
      return state;
  }
};

export default GetCompetitionDetails;
