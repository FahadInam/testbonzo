import DefaultNav from './defaultNav.constants';

class AccountNav {
  SIGN_UP = {
    link: `${DefaultNav.ACCOUNT.link}/sign-up`,
    backLink: DefaultNav.ACCOUNT,
    name: 'SIGN_UP',
  };

  VERIFY = {
    link: `${DefaultNav.ACCOUNT.link}/verify`,
    backLink: this.SIGN_UP,
    name: 'VERIFY',
  };

  INSTITUTE_DETAIL = {
    link: `${DefaultNav.ACCOUNT.link}/institute-detail`,
    backLink: this.SIGN_UP,
    name: 'SIGN_UP',
  };

  LOGIN = {
    link: `${DefaultNav.ACCOUNT.link}/login`,
    backLink: this.SIGN_UP,
    name: 'LOGIN',
  };

  FORGOT_PASSWORD = {
    link: `${DefaultNav.ACCOUNT.link}/forgot-password`,
    backLink: this.LOGIN,
    name: '',
  };

  FORGOT_PASSWORD_SUCCESS = {
    link: `${DefaultNav.ACCOUNT.link}/forgot-password-success`,
    backLink: this.LOGIN,
  };
}

export default new AccountNav();
