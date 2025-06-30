import { SUPPORTED_THEMES, THEME } from 'Theme';
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE,
  TOAST,
  SPINNER,
  DOTTED,
  USER,
  CONGRATS,
  PARAMS,
  NOTIFICATION,
  ACCOUNT_POPUP,
  COMING_FROM,
  GAME_DATA,
  CUSTOM_TOAST,
} from 'Constants';

const defaultX = {
  theme: SUPPORTED_THEMES.LIGHT,
  language: SUPPORTED_LANGUAGES.ENGLISH,
  toast: {},
  custom_toast: {},
  spinner: null,
  dotted: null,
  congrats: null,
  accountPopup: { isVisible: false },
  fromNotification: false,
  callRefresh: false,
  gameData: {},
};

const AppControl = (state = { ...defaultX }, action) => {
  const nState = { ...state };
  switch (action.type) {
    case THEME.SET:
      nState.theme = action.payload;
      return nState;
    case LANGUAGE.SET:
      nState.language = action.payload;
      return nState;

    case PARAMS.URL:
      nState.url = action.payload;
      return nState;
    case PARAMS.ICON_IMAGE_URL:
      nState.coinImage = action.payload;
      return nState;
    case NOTIFICATION.FROM_NOTIFICATION_TRUE:
      nState.fromNotification = true;
      return nState;
    case NOTIFICATION.FROM_NOTIFICATION_FALSE:
      nState.fromNotification = false;
      return nState;
    case NOTIFICATION.NOTIFY_TO:
      nState.notifyTo = action.payload;
      return nState;
    case TOAST.SHOW:
      nState.toast = action.payload;
      return nState;
    case TOAST.HIDE:
      nState.toast = {};
      return nState;
    case CUSTOM_TOAST.OPEN:
      nState.custom_toast = action.payload;
      return nState;
    case CUSTOM_TOAST.CLOSE:
      nState.custom_toast = {};
      return nState;
    case SPINNER.SHOW:
      nState.spinner = { type: SPINNER.SHOW };
      return nState;
    case SPINNER.SHOW_RETRY:
      nState.spinner = {
        type: SPINNER.SHOW_RETRY,
        canCancel: action.payload,
      };
      return nState;
    case DOTTED.SHOW:
      nState.dotted = { type: DOTTED.SHOW };
      return nState;
    case DOTTED.HIDE:
      nState.dotted = { type: DOTTED.HIDE };
      return nState;
    case SPINNER.HIDE:
      delete nState.spinner;
      return nState;
    case CONGRATS.SHOW:
      nState.congrats = true;
      return nState;
    case CONGRATS.HIDE:
      delete nState.congrats;
      return nState;
    case ACCOUNT_POPUP.SHOW:
      nState.accountPopup = action.payload;
      return nState;
    case ACCOUNT_POPUP.HIDE:
      nState.accountPopup = { isVisible: false };
      return nState;
    case USER.SOCIAL_SIGNUP:
      nState.socialSignup = action.payload;
      return nState;
    case USER.CLEAR_SOCIAL_SIGNUP:
      delete nState.socialSignup;
      return nState;
    case USER.IS_LOGGED_IN:
      nState.callRefresh = action.payload;
      return nState;
    case COMING_FROM.CF_URL:
      nState.comingFrom = action.payload;
      return nState;
    case COMING_FROM.CLEAR:
      nState.comingFrom = null;
      return nState;
    case GAME_DATA.SET_GAME_DATA:
      nState.gameData = action.payload;
      return nState;
    case USER.CLEAR:
      return {
        ...defaultX,
      };
    default:
      return nState;
  }
};

export default AppControl;
