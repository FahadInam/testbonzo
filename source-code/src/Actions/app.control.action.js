import { gameDispatch } from 'Utils/ActionCreators';
import { SUPPORTED_LANGUAGES, LANGUAGE, CONFIG } from 'Constants/texts.constants';
import { SUPPORTED_THEMES, GetThemeIndexByColor, THEME } from 'Theme';
import {
  TOAST,
  SPINNER,
  DOTTED,
  CONGRATS,
  PARAMS,
  NOTIFICATION,
  ACCOUNT_POPUP,
  COMING_FROM,
  LOGIN_TYPE,
  GAME_DATA,
  COMING_FROM_PUBLIC,
  CUSTOM_TOAST,
} from 'Constants';
import { store } from 'Store';

const SetTheme = (t = SUPPORTED_THEMES.LIGHT) => {
  let themeIndex = t;
  if (typeof t === 'string') {
    themeIndex = GetThemeIndexByColor(t);
  }
  const { AppControl } = store.getState();
  if (AppControl.theme !== themeIndex) gameDispatch(THEME.SET, themeIndex);
};

const SetLanguage = (l = SUPPORTED_LANGUAGES.ENGLISH) => {
  gameDispatch(LANGUAGE.SET, l);
};

const Toast = {
  Show(toastMessage, type, isDelayed) {
    setTimeout(
      () => {
        gameDispatch(TOAST.SHOW, { toastMessage, type });
      },
      isDelayed ? 350 : 0
    );
  },
  Hide() {
    gameDispatch(TOAST.HIDE);
  },
};

const CustomToast = {
  Open(toastMessage, type, isDelayed) {
    setTimeout(
      () => {
        gameDispatch(CUSTOM_TOAST.OPEN, { toastMessage, type });
      },
      isDelayed ? 350 : 0
    );
  },
  Close() {
    gameDispatch(CUSTOM_TOAST.CLOSE);
  },
};

const Congrats = {
  Show() {
    gameDispatch(CONGRATS.SHOW);
  },
  Hide() {
    gameDispatch(CONGRATS.HIDE);
  },
};

const AccountPopUp = {
  Show(data) {
    gameDispatch(ACCOUNT_POPUP.SHOW, data);
  },
  Hide(data) {
    gameDispatch(ACCOUNT_POPUP.HIDE, data);
  },
};

const Spinner = {
  Show() {
    gameDispatch(SPINNER.SHOW);
  },
  ShowRetry(canCancel) {
    gameDispatch(SPINNER.SHOW_RETRY, canCancel);
  },
  Hide() {
    gameDispatch(SPINNER.HIDE);
  },
};

const Dotted = {
  Show() {
    gameDispatch(DOTTED.SHOW);
  },
  Hide() {
    gameDispatch(DOTTED.HIDE);
  },
};

const Params = (param) => {
  // console.log(param);
  gameDispatch(PARAMS.URL, param);
};

const SetCoinImage = (coinImageUrl) => {
  gameDispatch(PARAMS.ICON_IMAGE_URL, coinImageUrl);
};

const SetComingFrom = (url) => {
  gameDispatch(COMING_FROM.CF_URL, url);
};

const SetLoginType = (data) => {
  gameDispatch(LOGIN_TYPE.IS_INST_BASED, data);
};

const SetGameData = (data) => {
  gameDispatch(GAME_DATA.SET_GAME_DATA, data);
};

const SetLoginComingFrom = (data) => {
  gameDispatch(LOGIN_TYPE.COMING_FROM, data);
};

const SetSignUpComingFrom = (data) => {
  gameDispatch(LOGIN_TYPE.COMING_FROM_LANDING, data);
};

const SetComingFromPublic = (data) => {
  gameDispatch(COMING_FROM_PUBLIC.COMING_FROM_SITAREY, data);
};

const FromNotification = {
  NotifyTrue() {
    gameDispatch(NOTIFICATION.FROM_NOTIFICATION_TRUE);
  },
  NotifyFalse() {
    gameDispatch(NOTIFICATION.FROM_NOTIFICATION_FALSE);
  },
  NotifyTo(to) {
    gameDispatch(NOTIFICATION.NOTIFY_TO, to);
  },
};

const SetInstituteConfig = (config) => {
  gameDispatch(CONFIG.SET, config);
};

const AppControl = {
  SetTheme,
  SetLanguage,
  Params,
  SetCoinImage,
  SetComingFrom,
  SetLoginType,
  SetLoginComingFrom,
  SetSignUpComingFrom,
  SetComingFromPublic,
  SetGameData,
  SetInstituteConfig,
};

export { AppControl, Toast, CustomToast, Spinner, Dotted, Congrats, FromNotification, AccountPopUp };
