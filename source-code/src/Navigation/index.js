import { createBrowserHistory } from 'history';
import { GetObjFromObj } from 'Utils';
import { DefaultNav, CompetitionNav, AccountNav, ChallengeNav, SettingsNav } from 'Navigation/Paths';
import SelectedCompetition from 'Actions/selectedCompetition.action';

const history = createBrowserHistory();

const PAGE_MOVE_DIRECTION = {
  LTR: 'ltr',
  RTL: 'rtl',
  TTD: 'ttd',
};

const CompetitionFooterLinks = [
  {
    ...CompetitionNav.COMPETITION_HOME,
  },
  {
    ...CompetitionNav.GAMES,
  },
  {
    ...CompetitionNav.LESSON,
  },
  {
    ...CompetitionNav.FRIENDS,
  },
  {
    ...CompetitionNav.LEADER_BOARD,
  },
  {
    ...CompetitionNav.REWARDS,
  },
  {
    ...CompetitionNav.SUPPORT,
  },
  {
    ...CompetitionNav.OVERVIEW,
  },
  {
    ...CompetitionNav.PLAYERS,
  },
];

const CompetitionPathResolver = (path, competition) => {
  if (path.param === 'CompetitionName' && path.link.indexOf(':CompetitionName') > -1) {
    if (competition.item && competition.item.url) return path.link.replace(`:${path.param}`, competition.item.url);
  }
  return false;
};

const PageSwitch = (path, state, shouldReplace = false) => {
  let moveTo = path.link;
  const eventPath = CompetitionPathResolver(path, SelectedCompetition.Info());
  if (eventPath) moveTo = eventPath;

  if (window.myOnBeforeUnload) {
    window.myOnBeforeUnload();
    window.myOnBeforeUnload = null;
  }
  // console.log('state ............', state)
  if (path.shouldReplace || shouldReplace) {
    history.replace(moveTo, { ...state, pathRef: path });
  } else {
    history.push(moveTo, { ...state, pathRef: path });
  }
};

const LinkToPath = (p) => {
  const all = [DefaultNav, AccountNav, CompetitionNav, SettingsNav, ChallengeNav];
  let res = false;
  for (let i = 0; i < all.length; i++) {
    res = GetObjFromObj(all[i], 'link', p);
    if (res) {
      return res;
    }
  }
  return res;
};

const GoToLastPage = () => {
  if (window.myOnBeforeUnload) {
    window.myOnBeforeUnload();
    window.myOnBeforeUnload = null;
  }
  window.ignoreBack = 1;
  history.goBack();
};

const GetPathObjByPathName = (pathname) => {
  const pathToArray = pathname.replace(/\/\s*$/, '').split('/');
  if (pathToArray.length === 4) {
    pathToArray[2] = ':CompetitionName';
  } else if (pathToArray.length === 3) {
    if (pathToArray[1] === 'competitions') {
      pathToArray[2] = ':CompetitionName';
    }
  }
  const path = pathToArray.join('/');
  return LinkToPath(path);
};

export {
  CompetitionFooterLinks,
  PAGE_MOVE_DIRECTION,
  PageSwitch,
  GoToLastPage,
  LinkToPath,
  history,
  CompetitionPathResolver,
  GetPathObjByPathName,
};
