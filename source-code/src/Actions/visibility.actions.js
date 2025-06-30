import { Cordova } from 'Utils';

window.MyWinFocused = true;

const OnPause = () => {
  window.MyWinFocused = false;
};

const OnResume = () => {
  window.MyWinFocused = true;
};

const Init = () => {
  if (Cordova.IsCordova) {
    document.addEventListener(
      'pause',
      () => {
        OnPause();
      },
      false
    );
    document.addEventListener(
      'resume',
      () => {
        OnResume();
      },
      false
    );
  } else {
    document.addEventListener('visibilitychange', () => {
      window.MyWinFocused = !window.MyWinFocused;
      if (!window.MyWinFocused) {
        OnPause();
      } else {
        OnResume();
      }
    });
  }
};

const Visibility = {
  Init,
  OnPause,
  OnResume,
};

export default Visibility;
