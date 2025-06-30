import DefaultNav from 'Navigation/Paths/defaultNav.constants';
import { LocalStorage, UsernameResolver } from 'Utils';

import { STORAGE_KEYS, defaultUser, LOGIN_TYPES, ALERT, USER, APP_INTERNAL_MESSAGES } from 'Constants';
import { gameDispatch } from 'Utils/ActionCreators';
import { PageSwitch } from 'Navigation';
import { Dotted } from 'Actions';
import { Toast } from './app.control.action';

const Set = (data = defaultUser) => {
  // console.log(data);
  LocalStorage.Set(STORAGE_KEYS.USER, data);
};

const Info = () => {
  const user = LocalStorage.Get(STORAGE_KEYS.USER, defaultUser, true);
  if (typeof user === 'string') return JSON.parse(user);
  return user;
};

const UpdateUser = (key, value) => {
  // Get the current user data
  const currentUser = LocalStorage.Get(STORAGE_KEYS.USER, defaultUser, true);

  // Parse the user data if it's a string
  const user = typeof currentUser === 'string' ? JSON.parse(currentUser) : currentUser;

  // Update the specific key with the new value
  if (user && typeof user === 'object') {
    user[key] = value;
  }

  // Save the updated user back to local storage
  LocalStorage.Set(STORAGE_KEYS.USER, user);
};

const UnAuthUser = () => {
  const user = Info();
  if (user.type === LOGIN_TYPES.FACEBOOK || user.type === LOGIN_TYPES.GOOGLE) user.accessToken = '';
  user.session_id = '';
  user.user_id = 0;
  user.autoLogin = false;
  user.type = LOGIN_TYPES.GUEST;
  return user;
};

const Clear = (isUnauthorized, redirectUrl = DefaultNav.MAIN, doNotRedirect = false) => {
  gameDispatch(USER.CLEAR);
  const user = UnAuthUser();
  window.userLogOut = true;
  Set(user);

  if (!doNotRedirect) PageSwitch(redirectUrl);

  setTimeout(() => {
    window.userLogOut = false;
  }, 500);
  if (isUnauthorized) {
    Toast.Show(APP_INTERNAL_MESSAGES.UNAUTHORIZED_USER_ACCESS, ALERT.INFO, true);
  }
};

const McdClear = (isUnauthorized) => {
  gameDispatch(USER.CLEAR);
  const user = UnAuthUser();
  window.userLogOut = true;
  Set(user);

  Dotted.Show();

  // if (!doNotRedirect) PageSwitch(redirectUrl);

  setTimeout(() => {
    window.userLogOut = false;
  }, 500);
  if (isUnauthorized) {
    Toast.Show(APP_INTERNAL_MESSAGES.UNAUTHORIZED_USER_ACCESS, ALERT.INFO, true);
  }
};

const IsLoggedInUser = (user = Info()) => {
  if (!user) return false;
  if (typeof user.user_id === 'undefined' || user.user_id === null || user.user_id < 1) return false;
  if (typeof user.auth_token === 'undefined' || user.auth_token === null || user.auth_token === '') return false;

  return user;
};

const IsGuest = (user = Info()) => {
  return user.type === LOGIN_TYPES.GUEST;
};

const IsNormal = (user = Info()) => {
  return user.type === LOGIN_TYPES.NORMAL;
};

const IsFacebook = (user = Info()) => {
  return user.type === LOGIN_TYPES.FACEBOOK;
};

const IsGoogle = (user = Info()) => {
  return user.type === LOGIN_TYPES.GOOGLE;
};

const NameResolver = (user = Info()) => {
  if (!user) return '';
  return UsernameResolver(user.name, user.username);
};

let GuestData = {
  points: 0,
  grade: -1,
  competition_id: -1,
};

const GuestSavedData = (t = 'get', competition, points) => {
  if (t === 'get') return GuestData;
  if (t === 'update') {
    if (competition.competition_id === GuestData.competition_id && competition.current_grade === GuestData.grade) {
      GuestData.points += points;
    } else {
      GuestData = {
        points,
        grade: competition.current_grade,
        competition_id: competition.competition_id,
      };
    }
  } else {
    GuestData = {
      points: 0,
      grade: -1,
      competition_id: -1,
    };
  }
  return GuestData;
};

const CombinedOpponent = (opponent) => {
  return {
    name: opponent.name || opponent.opponent_name,
    user_name: opponent.user_name || opponent.opponent_username,
    profile_picture: opponent.profile_picture || opponent.opponent_profile_picture,
  };
};

const User = {
  Set,
  Clear,
  Info,
  UpdateUser,
  IsGuest,
  IsNormal,
  IsFacebook,
  IsGoogle,
  UnAuthUser,
  NameResolver,
  IsLoggedInUser,
  GuestSavedData,
  CombinedOpponent,
  McdClear,
};

export default User;
