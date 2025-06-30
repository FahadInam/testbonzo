// let vendorID = null;
// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
//   vendorID = process.env.REACT_APP_VENDOR_UID;
// } else {
//   vendorID = '62376239-3163-3265-2d31-3432342d3131';
// }

import { isTwentyFirstCTDHost } from 'Utils';

// console.log(process.env.NODE_ENV, 'env check');

const config = {
  IsIos: process.env.REACT_APP_IS_IOS === '1',
  webUrlShupavu: process.env.REACT_APP_WEB_SHUPAVU_URL,
  webUrl: process.env.REACT_APP_WEB_URL,
  webGGUrl: process.env.REACT_APP_WEB_GG_URL,
  paymentUrl: process.env.REACT_APP_PAYMENT_URL,
  ApiUrl: isTwentyFirstCTDHost(window.location.hostname) ? [process.env.REACT_APP_PUBLIC_URL_1] : [process.env.REACT_APP_PUBLIC_URL_0],
  ApiDirectory: process.env.REACT_APP_API_BASE_DIRECTORY,
  ApiTimeout: 61000 * 0.00000002,
  localStorageKey: process.env.REACT_APP_LOCAL_STORAGE_KEY,
  googleWebClientId: process.env.REACT_APP_GOOGLE_LOGIN_WEB_CLIENT_ID,
  googleWebProfileURL: process.env.REACT_APP_GOOGLE_USER_INFO_PROFILE_URL,
  googleWebEmailURL: process.env.REACT_APP_GOOGLE_USER_INFO_EMAIL_URL,
  googleWeb0AuthURL: process.env.REACT_APP_GOOGLE_ACCOUNT_OAUTH_URL,
  googleWeb0AuthUser: process.env.REACT_APP_GOOGLE_ACCOUNT_OAUTH_URL_2,
  apiLMS: process.env.REACT_APP_LMS_API,
  googleWebClientIdMobileParam: { webClientId: process.env.REACT_APP_GOOGLE_LOGIN_WEB_CLIENT_ID },
  facebookLoginAppId: process.env.REACT_APP_FB_APP_ID,
  gaId_bonzo: process.env.REACT_APP_GA_ID_BONZO,
  gaId_Shupavu: process.env.REACT_APP_GA_ID_SHUPAVU,
  competitionUrl: `${process.env.REACT_APP_WEB_URL}competitions`,
  lmsLoginUrl: process.env.REACT_APP_LMS_URL,
  // vendorUID: vendorID,
  // this time is now being override by grade challenge time
  challengeTime: 90, // 120, in sec
  questionDelay: 900, // in milli sec
  GameLoadingTime: 150 * 1000, // in milli sec

  MessageLoadingTimer: 5 * 1000,
  NotificationsRefreshTimer: 1 * 60 * 1000, //1 min Delay
  ActivityLoadingTimer: 30 * 1000,

  greetingAnimateTime: 500,
  greetingAnimateHideTime: 800,
  friend_id: null,
  school_id: null,
  private_comp: null,
  cf_sitarey: 0,
  cf_gclc: 0,
  SitareyLaunchUrl: 'https://knowledgeplatform.com.pk/sitarey/?embedded',

  is_shupavu: process.env.SHUPAVU_INSTANCE_ID,
  gtm_id: process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID,
  google_ads_id: process.env.REACT_APP_GOOGLE_ADS_ID,
};

const CALL_PRIORITY = {
  HIGH: 1,
  LOW: 0,
};

const LOGIN_TYPES = {
  GUEST: 0,
  NORMAL: 1,
  FACEBOOK: 2,
  GOOGLE: 3,
  LMS: 7,
};

const LIMITS_CONFIG = {
  PASSWORD_MIN_LENGTH: 5,
  PASSWORD_MAX_LENGTH: 50,
  SEARCH_MIN_REQ: 3,
  SEARCH_BOUNCE_TIME: 300,
  CNIC_LENGTH: 14,
  PHONE_NO_LENGTH: 11,
  FULL_NAME_MIN: 3,
  REWARD_UPLOAD_IMAGE_SIZE: 500000,
  SECRET_CODE: 3,
};

const KP_SUPPORTED_OS = {
  ANDROID: 'android',
  IOS: 'ios',
  WEB: 'web',
  MOBILE_WEB: 'mobile_web',
};

export { config, LOGIN_TYPES, LIMITS_CONFIG, CALL_PRIORITY, KP_SUPPORTED_OS };
