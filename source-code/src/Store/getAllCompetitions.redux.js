import { API_CALLS, USER } from 'Constants';

const GetAllCompetitions = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetAllCompetitions.SUCCESS:
    case API_CALLS.GetFtpCompetitions.SUCCESS:
    case API_CALLS.GetAllInstCompetitions.SUCCESS:
    case API_CALLS.GetDemoCompetitions.SUCCESS:
      return { ...action.payload };
    case API_CALLS.GetAllCompetitions.ERROR:
    case API_CALLS.GetAllInstCompetitions.ERROR:
    case API_CALLS.GetDemoCompetitions.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetAllCompetitions.CLEAR:
    case API_CALLS.GetAllInstCompetitions.CLEAR:
    case API_CALLS.GetDemoCompetitions.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetAllCompetitions;
