import { API_CALLS, USER } from 'Constants';

const AddSecretCode = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.AddSecretCode.SUCCESS:
      return { ...action.payload };
    case API_CALLS.AddSecretCode.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.AddSecretCode.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default AddSecretCode;
