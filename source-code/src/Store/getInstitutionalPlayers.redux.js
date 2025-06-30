import { API_CALLS } from 'Constants';

const GetInstitutionalPlayers = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.InstitutionalPlayers.SUCCESS:
      return action.payload;
    case API_CALLS.InstitutionalPlayers.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.InstitutionalPlayers.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetInstitutionalPlayers;
