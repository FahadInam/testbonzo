class DefaultNav {
  MAIN = {
    link: '/',
    backLink: '',
  };

  ACCOUNT = {
    link: '/account',
    backLink: this.MAIN,
  };

  COMPETITIONS = {
    link: `/competitions`,
    backLink: this.ACCOUNT,
    hideFooter: true,
    name: 'COMPETITIONS',
  };

  CHALLENGE = {
    link: `/challenge`,
    backLink: 'goBack', // main screen
    hideFooter: true,
  };

  SETTINGS = {
    link: `/settings`,
    backLink: 'goBack', // main screen
    hideFooter: true,
  };

  WELCOME = {
    link: `/welcome`,
    backLink: 'this.ACCOUNT', // main screen
    hideFooter: true,
  };

  PRIVACY_POLICY = {
    link: `/privacy-policy`,
    backLink: DefaultNav.MAIN,
    name: 'Privacy Policy',
  };

  ADMIN = {
    link: `/kpgdev`,
    backLink: this.COMPETITIONS,
    hideFooter: true,
    name: 'ADMIN',
  };

  SSO = {
    link: `/sso`,
    hideFooter: true,
    name: 'SSO',
  };

  MCD = {
    link: `/mcd`,
    hideFooter: true,
    name: 'MCD',
  };

  AD_LOGIN = {
    link: `/account/adlogin/`,
    hideFooter: true,
    name: 'ADD LOGIN',
  };

  MCDError = {
    link: `/mcd_error`,
    hideFooter: true,
    name: 'MCD Error',
  };

  MCDPaymentSuccess = {
    link: `/mcd_payment`,
    hideFooter: true,
    name: 'MCD Payment',
  };

  CODE_PUSH_LOADER = {
    link: `/codePushLoader`,
    hideFooter: true,
    name: 'CODE PUSH LOADER',
  };

  DIRECT_LAUNCH = {
    link: `/open`,
    hideFooter: true,
    name: 'DIRECT COMPETITION LAUNCH',
  };

  PAYMENT = {
    link: `/payment`,
    backLink: 'goBack',
    hideFooter: true,
    name: 'BACK',
  };

  PROGRAM_LAUNCH = {
    link: `/program/sitarey`,
    backLink: '/',
    param: 'Program Launch',
    name: 'PROGRAM LAUNCH',
  };

  CONTACT_US = {
    link: `/contact-us`,
    backLink: '/',
    param: 'Contact Us',
    name: 'CONTACT US',
  };

  PROGRAM_GLC = {
    link: `/program/glc`,
    backLink: '/',
    param: 'Program Glc',
    name: 'PROGRAM GLC',
  };

  GCLC_RESULT = {
    link: `/gclc-result`,
    backLink: '/',
    param: 'Gclc Result',
    name: 'GCLC RESULT',
  };

  GREEN_STAR_SCHOOL = {
    link: `/green-star-school`,
    backLink: '/',
    param: 'Green Star Schools',
    name: 'GREEN_STAR_SCHOOL',
  };
}

export default new DefaultNav();
