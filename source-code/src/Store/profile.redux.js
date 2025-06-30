import { API_CALLS, USER } from 'Constants';

const Profile = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetProfile.SUCCESS:
    case API_CALLS.GetProfileForClaim.SUCCESS:
      return { ...action.payload };
    case API_CALLS.GetProfile.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetProfile.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default Profile;
