import { GoToLastPage } from 'Navigation';
import Notification from 'Actions/push.notification.action';
import { config } from 'Constants';
// import { DefaultNav } from 'Navigation/Paths';
import OsProperties from './OsProperties';
// import { gameDispatch } from './ActionCreators';

window.convertedPaths = {};
window.MyBackButton = null;

const SetPortrait = () => {
  if (window.cordova && window.screen && window.screen.orientation) {
    window.screen.orientation.lock('portrait');
  }
};

const SetLandscape = () => {
  if (window.cordova && window.screen && window.screen.orientation) {
    window.screen.orientation.lock('landscape');
  }
};

const ShowStatusbar = () => {
  if (window.StatusBar) {
    window.StatusBar.show();
  }
};

const ShowWhiteStatusbar = () => {
  if (window.StatusBar && OsProperties.IsIos()) {
    window.StatusBar.backgroundColorByHexString('#ffffff');
    window.StatusBar.styleDefault();
    window.StatusBar.show();
  }
};
// TODO need to make it according to theme
const ShowBlueStatusbar = () => {
  if (window.StatusBar && OsProperties.IsIos()) {
    // window.StatusBar.backgroundColorByHexString('#5899e4'); //  #5899e4 --> this is old PB blue color
    window.StatusBar.backgroundColorByHexString('#0B5EB5');
    window.StatusBar.styleLightContent();
    window.StatusBar.show();
  }
};

const HideStatusbar = () => {
  if (window.StatusBar) {
    window.StatusBar.hide();
  }
};

const Path = (src, fromServer = false) => {
  if (window.cordova) {
    if (fromServer) {
      const nSrc = src.substr(1).split('\\').join('/');

      if (window.convertedPaths[nSrc]) {
        return window.convertedPaths[nSrc];
      }

      window.convertedPaths[nSrc] = config.webUrl + nSrc;
      return window.convertedPaths[nSrc];
    }

    const nSrc = src.split('./').join('_').split('/').join('_').split('\\').join('_');

    if (window.convertedPaths[nSrc]) {
      return window.convertedPaths[nSrc];
    }

    if (src.indexOf('/') === 0 || src.indexOf('\\') === 0) {
      window.convertedPaths[nSrc] = OsProperties.IsIos() ? `app://localhost${src}` : `file:///android_asset/www${src}`;
      window.convertedPaths[nSrc] = window.convertedPaths[nSrc].split('\\').join('/');
      return window.convertedPaths[nSrc];
    }
    if (src.indexOf('./') === 0) {
      window.convertedPaths[nSrc] = OsProperties.IsIos()
        ? `app://localhost${src.substr(1)}`
        : `file:///android_asset/www${src.substr(1)}`;
      window.convertedPaths[nSrc] = window.convertedPaths[nSrc].split('\\').join('/');
      return window.convertedPaths[nSrc];
    }
  }
  return src;
};

function GetPicture(callback) {
  navigator.camera.getPicture(
    (imgURI) => {
      const dto = { imgByte: imgURI };
      if (callback) callback(dto);
    },
    null,
    {
      quality: 70,
      targetWidth: 180,
      targetHeight: 180,
      allowEdit: true,
      encodingType: window.Camera.EncodingType.JPEG,
      destinationType: window.Camera.DestinationType.DATA_URL,
      sourceType: window.Camera.PictureSourceType.SAVEDPHOTOALBUM,
    }
  );
}

function Share(message) {
  if (window.plugins && window.plugins.socialsharing) window.plugins.socialsharing.share(message);
}

function Init() {
  document.addEventListener(
    'backbutton',
    () => {
      if (window.MyBackButton) window.MyBackButton();
      else if (window.location.href !== 'file:///') GoToLastPage();
    },
    false
  );

  if (OsProperties.IsIos()) {
    ShowWhiteStatusbar();
  }
  Notification.BackgroundMsg();
  Notification.ForegroundMsg();
}

window.loadingStarted = false;

// function CodePush() {
//   // Cordova is now initialized. Have fun!
//   if (OsProperties.IsAndroid() || OsProperties.IsIos()) {
//     window.codePush.sync(
//       (status) => {
//         switch (status) {
//           case window.SyncStatus.UP_TO_DATE:
//           case window.SyncStatus.UPDATE_INSTALLED:
//           case window.SyncStatus.UPDATE_IGNORED:
//           case window.SyncStatus.ERROR:
//           case window.SyncStatus.IN_PROGRESS:
//           default:
//             break;
//         }
//       },
//       { updateDialog: true, installMode: window.InstallMode.IMMEDIATE },
//       (downloadProgress) => {
//         if (downloadProgress) {
//           if (!window.loadingStarted) {
//             PageSwitch(DefaultNav.CODE_PUSH_LOADER);
//             window.loadingStarted = true;
//           }

//           gameDispatch(COMPETITION.SET_CODE_PUSH_DOWNLOAD_DATA, {
//             BytesLeft: downloadProgress.receivedBytes,
//             TotalBytes: downloadProgress.totalBytes,
//           });

//           // console.log(`Downloading ${downloadProgress.receivedBytes} of ${downloadProgress.totalBytes}`);
//         }
//       }
//     );
//   }
// }

const Cordova = {
  IsCordova: false,
  ShowWhiteStatusbar,
  ShowBlueStatusbar,
  ShowStatusbar,
  HideStatusbar,
  Path,
  SetLandscape,
  SetPortrait,

  GetPicture,
  Share,
  // CodePush,
  Init,
};

export default Cordova;
