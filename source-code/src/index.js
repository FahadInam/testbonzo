import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store';
import 'Assets/css/style.css';

import Cordova from 'Utils/Cordova';
import OsProperties from 'Utils/OsProperties';
import Visibility from 'Actions/visibility.actions';
import { gameDispatch } from 'Utils/ActionCreators';
import { MCD } from 'Constants';
// import { McdUser } from 'Utils';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';
import App from './App';
import configurations from 'Constants/instance.config';
import { getSiteConfig } from 'Utils';

const siteKey = getSiteConfig();
window.instanceConfig = configurations[siteKey];

const startApp = () => {
  OsProperties.Init();
  Visibility.Init();
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );
};

document.addEventListener('mcdBridgeReady', () => {
  console.log('mcdBridgeReady');
  // McdUser.Login();
  gameDispatch(MCD.MCD_USER, true);
  PageSwitch(DefaultNav.MCD);
  window.IS_MCD_APP = 1;
  window.MCD_MOVE_BACK = 1;
  window.IS_CURRENT_ROOT = 1;

  try {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (!/android/i.test(userAgent)) {
      const system = window.mcd.bridge.message('system');
      system.send({ hideTabbar: true });
    }
  } catch (e) {}

  window.onpopstate = () => {
    if (window.ignoreBack === 1) {
      window.ignoreBack = 0;
      return;
    }

    if (window.IS_CURRENT_ROOT === 1) {
      if (window.MCD_MOVE_BACK === 1) {
        window.location.href = `gmalite://gmalite-home`;
      } else {
        window.MCD_MOVE_BACK = 1;
      }
    }
  };
});

if (!window.cordova) {
  startApp();
  // McdUser.Login();
  // gameDispatch(MCD.MCD_USER, true);
  // PageSwitch(DefaultNav.MCDError);
  // gameDispatch(MCD.MCD_FULLSCREEN, false);
  // PageSwitch(DefaultNav.MCD);
} else {
  document.addEventListener('deviceready', () => {
    Cordova.IsCordova = true;
    Cordova.Init();
    window.open = window.cordova.InAppBrowser.open;
    // Cordova.CodePush();
    startApp();
  });
}
