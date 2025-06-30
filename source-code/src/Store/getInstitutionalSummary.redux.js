import { API_CALLS } from 'Constants';

const GetInstitutionalSummary = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.InstitutionalSummary.SUCCESS:
      return action.payload;
    case API_CALLS.InstitutionalSummary.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.InstitutionalSummary.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetInstitutionalSummary;
