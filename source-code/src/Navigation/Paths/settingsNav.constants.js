import DefaultNav from './defaultNav.constants';

class SettingsNav {
  CHANGE_PASSWORD = {
    link: `${DefaultNav.SETTINGS.link}/change-password`,
    backLink: 'goBack',
  };

  JOIN_COMPETITION = {
    link: `${DefaultNav.SETTINGS.link}/join-competition`,
    backLink: 'goBack',
    name: 'JOIN COMPETITION',
  };

  SELECT_SCHOOL = {
    link: `${DefaultNav.SETTINGS.link}/select-school`,
    backLink: 'goBack',
    name: 'SELECT SCHOOL',
  };

  CHANGE_GRADE = {
    link: `${DefaultNav.SETTINGS.link}/change-grade`,
    backLink: '/',
    param: 'CompetitionName',
    name: 'CHANGE GRADE',
  };

  ACCOUNT_MIGRATED = {
    link: `${DefaultNav.SETTINGS.link}/account-migrated`,
    backLink: '/',
    param: 'CompetitionName',
    name: 'ACCOUNT MIGRATED',
  };
}

export default new SettingsNav();
