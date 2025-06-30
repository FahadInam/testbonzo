import { API_CALLS } from 'Constants';

const GetInstitutionalGamesReport = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.InstitutionalGamesReport.SUCCESS:
      return action.payload;
    case API_CALLS.InstitutionalGamesReport.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.InstitutionalGamesReport.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetInstitutionalGamesReport;
