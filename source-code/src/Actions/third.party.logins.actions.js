import { config, LOGIN_TYPES } from 'Constants/config.constants';
import { ALERT } from 'Constants';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';
import Account from './account.action';
import { Spinner, Toast } from './app.control.action';

function LoginFacebook(texts, autoLogin) {
  return dispatch => {
    Spinner.Show();
    window.facebookConnectPlugin.login(
      ['public_profile', 'email'],
      res => {
        window.facebookConnectPlugin.api(
          '/me?fields=email,name,picture',
          ['public_profile', 'email'],
          userData => {
            if (!userData.email || (res && !res.authResponse) || (res && res.authResponse && !res.authResponse.accessToken)) {
              PageSwitch(DefaultNav.MAIN);
              Toast.Show(texts.FACEBOOK_INVALID, ALERT.ERROR, true);
              Spinner.Hide();
            } else {
              const dto = {
                userId: res.authResponse.userID,
                accessToken: res.authResponse.accessToken,
                email: userData.email,
                type: LOGIN_TYPES.FACEBOOK,
                expiresIn: res.authResponse.expiresIn,
                dataExpiryTime: -1,
                autoLogin: Boolean(autoLogin),
                name: userData.name,
              };

              dispatch(Account.SocialLogin({ ...dto }));
            }
          },
          e => {
            Spinner.Hide();
            if (e.errorCode === '4201') return;
            Toast.Show(texts.FACEBOOK_INVALID, ALERT.ERROR, true);
          }
        );
      },
      e => {
        Spinner.Hide();
        if (e.errorCode === '4201') return;
        Toast.Show(texts.FACEBOOK_INVALID, ALERT.ERROR, true);
      }
    );
  };
}

function LogoutFacebook(callback) {}

function LoginGoogle(texts, autoLogin) {
  return dispatch => {
    Spinner.Show();
    window.plugins.googleplus.login(
      config.googleWebClientIdMobileParam,
      res => {
        if (!res.accessToken || !res.email) {
          Spinner.Hide();
          if (process.env.NODE_ENV === 'production') {
            PageSwitch(DefaultNav.MAIN);
            Toast.Show(texts.GOOGLE_INVALID, ALERT.ERROR, true);
          }
          return;
        }

        const loginData = {
          email: res.email,
          accessToken: res.accessToken,
          type: LOGIN_TYPES.GOOGLE,
          expiresIn: res.expires,
          dataExpiryTime: -1,
          autoLogin: Boolean(autoLogin),
          userId: res.userId,
          name: res.displayName,
        };
        dispatch(Account.SocialLogin(loginData));
      },
      e => {
        Spinner.Hide();
        if (e === 12501) return;
        Toast.Show(texts.GOOGLE_INVALID, ALERT.ERROR, true);
      }
    );
  };
}

function LogoutGoogle(callback) {
  window.plugins.googleplus.logout(() => {
    if (typeof callback === 'function') callback();
  });
}

const ThirdPartyLogin = {
  LoginFacebook,
  LogoutFacebook,
  LoginGoogle,
  LogoutGoogle,
};

export default ThirdPartyLogin;
