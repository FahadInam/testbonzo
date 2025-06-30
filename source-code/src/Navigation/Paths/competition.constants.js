import DefaultNav from './defaultNav.constants';

class CompetitionNav {
  COMPETITION_HOME = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName`,
    backLink: DefaultNav.COMPETITIONS,
    param: 'CompetitionName',
    name: 'HOME',
    showNavBar: true,
    directory: 0,
    icon: 'home',
    isInstBased: false,
  };

  // GAMES = {
  //   link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/games`,
  //   backLink: DefaultNav.COMPETITIONS,
  //   param: 'CompetitionName',
  //   name: 'GAMES',
  //   showNavBar: true,
  //   directory: 1,
  //   icon: 'games',
  //   isInstBased: false,
  // };

  LESSON = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/lesson`,
    backLink: DefaultNav.COMPETITIONS,
    param: 'CompetitionName',
    name: 'LESSON',
    showNavBar: true,
    directory: 2,
    icon: 'lesson',
    isInstBased: false,
  };

  LESSON_LISTING = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/lesson_listing`,
    backLink: this.LESSON,
    param: 'CompetitionName',
    name: 'LESSON',
    showNavBar: true,
    directory: 2,
    icon: 'lesson',
    isInstBased: false,
  };

  GAMES = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/my_games`,
    backLink: DefaultNav.COMPETITIONS,
    param: 'CompetitionName',
    name: 'MY_GAMES',
    showNavBar: true,
    directory: 1,
    icon: 'mygames',
    isInstBased: false,
  };

  FRIENDS = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/friends`,
    backLink: DefaultNav.COMPETITIONS,
    param: 'CompetitionName',
    name: 'FRIENDS',
    showNavBar: true,
    directory: 3,
    icon: 'friends',
    isInstBased: false,
  };

  LEADER_BOARD = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/leaderboard`,
    backLink: DefaultNav.COMPETITIONS,
    param: 'CompetitionName',
    name: 'LEADERBOARD',
    showNavBar: true,
    directory: 4,
    icon: 'leaderboard',
    isInstBased: false,
  };

  REWARDS = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/rewards`,
    backLink: DefaultNav.COMPETITIONS,
    param: 'CompetitionName',
    name: 'REWARDS',
    showNavBar: true,
    directory: 5,
    icon: 'rewards',
    isInstBased: false,
  };

  SUPPORT = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/support`,
    backLink: DefaultNav.COMPETITIONS,
    param: 'CompetitionName',
    name: 'SUPPORT',
    showNavBar: true,
    directory: 6,
    icon: 'i i-support_chat',
    isInstBased: false,
  };

  STATS = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/stats`,
    backLink: this.COMPETITION_HOME,
    param: 'CompetitionName',
    name: 'STATS',
    showNavBar: true,
    directory: 0,
    isInstBased: false,
  };

  MY_PURCHASES = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/my_purchases`,
    backLink: this.COMPETITION_HOME,
    param: 'CompetitionName',
    name: 'MY_PURCHASES',
    showNavBar: true,
    directory: 6,
    isInstBased: false,
  };

  CHAT = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/chat`,
    backLink: 'goBack',
    param: 'CompetitionName',
    name: 'CHAT',
    showNavBar: true,
    directory: 6,
    isInstBased: false,
  };

  REWARD_HISTORY = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/reward-history`,
    backLink: this.REWARDS,
    param: 'CompetitionName',
    name: 'REWARD_HISTORY',
    showNavBar: true,
    directory: 5,
    isInstBased: false,
  };

  PAYMENT = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/payment`,
    backLink: this.REWARDS,
    param: 'CompetitionName',
    name: 'PAYMENT',
    showNavBar: true,
    directory: 5,
    isInstBased: false,
  };

  PAYMENT_RESULT = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/payment_result`,
    backLink: this.COMPETITION_HOME,
    param: 'CompetitionName',
    name: 'PAYMENT_RESULT',
    showNavBar: true,
    directory: 5,
    isInstBased: false,
  };

  EASYPAISA_PAYMENT = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/easypaisa_payment`,
    backLink: this.COMPETITION_HOME,
    param: 'CompetitionName',
    name: 'EASYPAISA_PAYMENT',
    showNavBar: true,
    directory: 5,
    isInstBased: false,
  };

  SUPPORT_CENTER = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/support_center`,
    backLink: this.COMPETITION_HOME,
    param: 'CompetitionName',
    name: 'SUPPORT_CENTER',
    showNavBar: true,
    directory: 0,
    isInstBased: false,
  };

  CHANGE_GRADE = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/change-grade`,
    backLink: this.COMPETITION_HOME,
    param: 'CompetitionName',
    name: 'CHANGE_GRADE',
    showNavBar: true,
    directory: 0,
    isInstBased: false,
  };

  RULES = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/rules`,
    backLink: DefaultNav.COMPETITIONS,
    param: 'CompetitionName',
    name: 'RULES',
    showNavBar: false,
    directory: 0,
    isInstBased: false,
  };

  VIDEO = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/video-player`,
    backLink: DefaultNav.COMPETITIONS,
    param: 'CompetitionName',
    name: 'VIDEO',
    showNavBar: false,
    directory: 0,
    isInstBased: false,
  };

  SIGN_UP = {
    link: `${DefaultNav.COMPETITIONS.link}/sign-up`,
    backLink: DefaultNav.COMPETITIONS,
    name: 'SIGN_UP',
    isInstBased: false,
  };

  LOGIN = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/login`,
    backLink: this.SIGN_UP,
    name: 'LOGIN',
    isInstBased: false,
  };

  FORGOT_PASSWORD = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/forgot-password`,
    backLink: this.LOGIN,
    name: '',
  };

  FORGOT_PASSWORD_SUCCESS = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/forgot-password-success`,
    backLink: this.LOGIN,
  };

  FREQUENTLY_ASK_QUESTIONS = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/faqs`,
    param: 'CompetitionName',
    backLink: 'goBack',
    showNavBar: false,
    isInstBased: false,
  };

  OVERVIEW = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/overview`,
    param: 'CompetitionName',
    backLink: DefaultNav.COMPETITIONS,
    name: 'OVERVIEW',
    showNavBar: true,
    directory: 7,
    icon: 'overview',
    isInstBased: true,
  };

  PLAYERS = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/players`,
    param: 'CompetitionName',
    backLink: DefaultNav.COMPETITIONS,
    name: 'PLAYERS',
    showNavBar: true,
    directory: 8,
    icon: 'players',
    isInstBased: true,
  };
  PAY = {
    link: `${DefaultNav.COMPETITIONS.link}/pay`,
    // backLink: this.REWARDS,
    // param: 'CompetitionName',
    // name: 'PAYMENT',
    // showNavBar: true,
    // directory: 5,
  };
  MY_SUBSCRIPTION = {
    link: `${DefaultNav.COMPETITIONS.link}/:CompetitionName/my-subscription`,
    backLink: this.COMPETITION_HOME,
    param: 'CompetitionName',
    name: 'MY_SUBSCRIPTION',
    showNavBar: true,
    directory: 0,
    isInstBased: false,
  };
}

export default new CompetitionNav();
