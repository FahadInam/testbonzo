import { API_CALLS, USER } from 'Constants';

const GetCompetitionsActivities = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetCompetitionsActivities.SUCCESS:
    case API_CALLS.GetCompetitionsActivitiesLowPriority.SUCCESS:
    case API_CALLS.GetCompetitionsBlocking.SUCCESS:
      return action.payload;
    case API_CALLS.GetCompetitionsActivities.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetCompetitionsActivities.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetCompetitionsActivities;
