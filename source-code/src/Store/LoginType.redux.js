import { LOGIN_TYPE } from 'Constants';

const defaultX = {
  is_inst_based: false,
  comingFrom: '',
  comingFromLanding: false,
  userDetails: {},
};

const LoginType = (state = { ...defaultX }, action) => {
  switch (action.type) {
    case LOGIN_TYPE.IS_INST_BASED:
      return {
        ...state,
        is_inst_based: action.payload,
      };
    case LOGIN_TYPE.COMING_FROM:
      return {
        ...state,
        comingFrom: action.payload,
      };
    case LOGIN_TYPE.COMING_FROM_LANDING:
      return {
        ...state,
        comingFromLanding: action.payload,
      };
    case LOGIN_TYPE.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};

export default LoginType;
