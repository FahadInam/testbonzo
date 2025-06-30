import { API_CALLS } from 'Constants';

const GetInstitutionalReport = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.InstitutionalReport.SUCCESS:
      return action.payload;
    case API_CALLS.InstitutionalReport.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.InstitutionalReport.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetInstitutionalReport;
