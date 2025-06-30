import { KP_SUPPORTED_OS } from 'Constants';

const platform = require('platform');

const OsProperties = {
  Init() {
    if (this.IsIos() && window.cordova) {
      this.MobileOsType = KP_SUPPORTED_OS.IOS;
    } else if (this.IsAndroid() && window.cordova) {
      this.MobileOsType = KP_SUPPORTED_OS.ANDROID;
    } else if (this.IsIos() || this.IsAndroid()) {
      this.MobileOsType = KP_SUPPORTED_OS.MOBILE_WEB;
    } else {
      this.MobileOsType = KP_SUPPORTED_OS.WEB;
    }
    this.version = platform.os.version;
  },

  // * OS is iOS returns true
  IsIos() {
    //if (window.cordova && config.IsIos) return true;
    return platform.os.family === 'iOS' || platform.manufacturer === 'Apple';
  },

  // * OS is Android returns true
  IsAndroid() {
    return platform.os.family === 'Android';
  },
};

export default OsProperties;
