import { API_CALLS } from 'Constants';

const GetInstitutionalPerformance = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.InstitutionalPerformers.SUCCESS:
      return action.payload;
    case API_CALLS.InstitutionalPerformers.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.InstitutionalPerformers.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetInstitutionalPerformance;
