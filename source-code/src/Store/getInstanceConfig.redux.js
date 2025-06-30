import { API_CALLS } from 'Constants';

const GetInstanceConfig = (state = null, action) => {
  switch (action.type) {
    case API_CALLS.GetInstanceConfig.SUCCESS:
      return { ...action.payload };
    case API_CALLS.GetInstanceConfig.ERROR:
      return { errorCode: action.payload, shouldRetry: true };
    case API_CALLS.GetInstanceConfig.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetInstanceConfig;
