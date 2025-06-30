import { LOGIN_TYPES } from './config.constants';

const defaultUser = {
  user_id: 0,
  session_id: '',
  type: LOGIN_TYPES.GUEST,
  conPassword: null,
  autoLogin: false,
  accessToken: '',
  dataExpiryTime: -1,
  expiresIn: -1,
  profile_picture: '1',
  username: 'Guest',
  name: 'Guest',
};

const USER = {
  SET: 'SET_USER',
  CLEAR: 'CLEAR_USER',
  SOCIAL_SIGNUP: 'SOCIAL_SIGNUP',
  CLEAR_SOCIAL_SIGNUP: 'CLEAR_SOCIAL_SIGNUP',
  MCD_USER: 'MCD_USER',
  IS_LOGGED_IN: 'IS_LOGGED_IN',
};

const MCD = {
  MCD_USER: 'MCD_USER',
  MCD_FULLSCREEN: 'MCD_FULLSCREEN',
};

const AD_LOGIN_USER = {
  AD_LOGIN_USER: 'AD_LOGIN_USER',
  AD_LOGIN_DATA: 'AD_LOGIN_DATA',
};

const DIRECT_LAUNCH_USER = {
  DIRECT_LAUNCH_USER: 'DIRECT_LAUNCH_USER',
};

const SIGN_UP_USER = {
  LEARNER: 'learner',
  PRINCIPAL: 'principal',
  GOOGLE_ACTION: 'login',
};
const DEMO_USER = {
  mode: 'demo',
  email: 'demouserguestmode@kp.com',
  password: '12345555',
};

export { USER, MCD, defaultUser, AD_LOGIN_USER, DIRECT_LAUNCH_USER, SIGN_UP_USER, DEMO_USER };
