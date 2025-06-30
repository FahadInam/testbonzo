import { AD_LOGIN_USER } from 'Constants';

const defaultX = {
  adLogin_user: false,
  adLogin_data: '',
};

const AdLoginUser = (state = { ...defaultX }, action) => {
  const nState = { ...state };
  switch (action.type) {
    case AD_LOGIN_USER.AD_LOGIN_USER:
      nState.adLogin_user = action.payload;
      return nState;
    case AD_LOGIN_USER.AD_LOGIN_DATA:
      nState.adLogin_data = action.payload;
      return nState;
    default:
      return nState;
  }
};

export default AdLoginUser;
