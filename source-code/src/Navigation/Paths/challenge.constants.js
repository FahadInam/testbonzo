import DefaultNav from './defaultNav.constants';
import CompetitionNav from './competition.constants';

class ChallengeNav {
  CHALLENGE_SELECTION = {
    link: `${DefaultNav.CHALLENGE.link}/selection`,
    backLink: 'goBack',
    name: 'BACK',
  };

  CHALLENGE_START = {
    link: `${DefaultNav.CHALLENGE.link}/start`,
    shouldReplace: true,
    backLink: CompetitionNav.COMPETITION_HOME,
  };

  CHALLENGE_PLAYER = {
    link: `${DefaultNav.CHALLENGE.link}/player`,
    backLink: CompetitionNav.COMPETITION_HOME,
    shouldReplace: true,
  };

  CHALLENGE_RESULT = {
    link: `${DefaultNav.CHALLENGE.link}/result`,
    backLink: CompetitionNav.COMPETITION_HOME,
  };

  TUTORIAL_PLAYER = {
    link: `${DefaultNav.CHALLENGE.link}/tutorial`,
    backLink: CompetitionNav.COMPETITION_HOME,
    shouldReplace: true,
  };
}

export default new ChallengeNav();
