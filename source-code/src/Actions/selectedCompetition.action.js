import { LocalStorage, IsEmptyObject } from 'Utils';
import { STORAGE_KEYS, defaultCompetition, COMPETITION, ALERT, APP_INTERNAL_MESSAGES } from 'Constants';
import { gameDispatch } from 'Utils/ActionCreators';
import { store } from 'Store';
import User from 'Actions/user.action';
import { PageSwitch } from 'Navigation';
import { CompetitionNav, DefaultNav } from 'Navigation/Paths';
import { Toast } from './app.control.action';

const Init = () => {
  const competition = LocalStorage.Get(STORAGE_KEYS.EVENT, defaultCompetition, false);
  const compCompetition = typeof competition === 'string' ? competition : LocalStorage.Compress(JSON.stringify(competition));
  gameDispatch(COMPETITION.SET, compCompetition);
};

const Set = (data = defaultCompetition) => {
  // console.log(data, 'data to check5');
  const user = User.Info();
  // console.log(data, user, "defaultCompetition")
  // const jsonData = JSON.stringify(data);
  // gameDispatch(COMPETITION.SET, jsonData)
  gameDispatch(COMPETITION.SET, LocalStorage.Set(STORAGE_KEYS.EVENT, { ...data, user_id: user.user_id }, user.user_id > 0));
};

const Clear = () => {
  LocalStorage.Delete(STORAGE_KEYS.EVENT);
  gameDispatch(COMPETITION.CLEAR_PAGES);
  gameDispatch(COMPETITION.CLEAR);
};

const StrToObj = (str) => {
  if (typeof str === 'string') {
    try {
      // JSON.parse(str);
      return JSON.parse(LocalStorage.DeCompress(str));
    } catch (e) {
      return LocalStorage.DeCompress(str);
    }
  } else {
    return {};
  }
};

const Info = () => {
  const user = User.Info();
  const { Competition } = store.getState();
  // console.log(Competition, "selected comp")
  let competition = {};
  if (typeof Competition === 'string') {
    // console.log(Competition, "after if condition")

    competition = StrToObj(Competition);
    // console.log(competition, "after condition")
  }
  if (typeof user.user_id !== 'undefined' && typeof competition.user_id !== 'undefined' && user.user_id !== competition.user_id) {
    Clear();
    User.Clear();
    Toast.Show(APP_INTERNAL_MESSAGES.DATA_ANOMALY_FOUND, ALERT.INFO, true);
    return false;
  }
  // console.log(competition, 'before return');

  return competition;
};

const IsSelected = () => {
  const competition = Info();
  if (competition && competition.item) return true;
  return false;
};

const Update = (data) => {
  let competition = Info();
  competition = { ...competition, ...data };
  Set(competition);
};

const GotoCompetition = (page = CompetitionNav.COMPETITION_HOME, state, noDataClear = true) => {
  const competition = Info();
  if (noDataClear) {
    // gameDispatch(COMPETITION.CLEAR_PAGES);
  }

  if (IsEmptyObject(competition)) {
    PageSwitch(DefaultNav.COMPETITIONS, state);
    return;
  }
  PageSwitch(page, state);
};

const CompetitionPrivacyCheck = () => {
  const { item } = Info();
  if (item?.is_semi_private === 1) {
    return true;
  }
  return false;
};

const SelectedCompetition = {
  Init,
  Set,
  Clear,
  Info,
  Update,
  StrToObj,
  IsSelected,
  GotoCompetition,
  CompetitionPrivacyCheck,
};

export default SelectedCompetition;
