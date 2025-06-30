import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { TwoColumnSplit, TopLoginBar } from 'Components';
import { CompetitionNav, DefaultNav } from 'Navigation/Paths';
import { WithCompetition } from 'Hoc/withCompetition';
import { AccountPopUp, AppControl, SelectedCompetition, User } from 'Actions';
import BottomNavBar from './shared/BottomNavigation';
import {
  Competition,
  Friends,
  Leaderboard,
  Rewards,
  AllCompetitions,
  Stats,
  Chat,
  Lesson,
  LessonListing,
  GameList,
  FrequentlyAskQuestions,
  Players,
  Report,
} from '.';
import RewardHistory from './Rewards/RewardHistory';
import Payment from './Rewards/Payment';
import PaymentResult from './Rewards/PaymentResult';
import EasypaisaPayment from './Rewards/EasypaisaPayment';
import SupportCenter from './SupportCenter/SupportCenter';
import ChangeGrade from './ChangeGrade';
import Rules from './Rules/Rules';
import VideoPlayer from './VideoPlayer';
import MyPurchases from './MyPurchases/MyPurchases';
import CompAccountSwitchType from './CompAccountSwitchType';
import { gameDispatch } from 'Utils/ActionCreators';
import { CHALLENGE } from 'Constants/challenge.constants';
import { Cordova } from 'Utils';
import CustomSwitcher from 'Hoc/CustomSwitcher';
import MySubscription from './MySubscription';
import TopSubscribeBar from 'Components/TopSubscribeBar';

const CompetitionStack = () => {
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const ShowAccountPopUp = useSelector((state) => state.AppControl.accountPopup, shallowEqual);
  const competition = SelectedCompetition.StrToObj(competitionStr);
  const [isSemiPrivate, setIsSemiPrivate] = useState();
  const user = User.Info();
  useEffect(() => {
    gameDispatch(CHALLENGE.CLEAR);
    window.onbeforeunload = null;
    Cordova.ShowBlueStatusbar();
  }, []);

  // const { state } = useLocation();

  useEffect(() => {
    if (competition.item && competition.item.theme) {
      AppControl.SetTheme(competition.item.theme);
      setIsSemiPrivate(competition?.item?.is_semi_private === 1);
    }
  }, [competition]);

  const callback = () => {
    AccountPopUp.Hide({ isVisible: false });
  };

  return (
    <TwoColumnSplit>
      <>
        <TopSubscribeBar />
        {isSemiPrivate || <TopLoginBar />}
        <CompAccountSwitchType
          ShowAccountPopUp={ShowAccountPopUp}
          callback={callback}
          accountRef={Boolean(ShowAccountPopUp?.isVisible)}
        />
        <CustomSwitcher>
          <Switch>
            {/* <Route path={CompetitionNav.GAMES.link} render={() => <WithCompetition component={Games} />} /> */}
            <Route path={CompetitionNav.LESSON.link} render={() => <WithCompetition component={Lesson} />} />
            <Route path={CompetitionNav.GAMES.link} render={() => <WithCompetition component={GameList} />} />
            <Route exact path={CompetitionNav.VIDEO.link} component={VideoPlayer} />
            <Route path={CompetitionNav.FRIENDS.link} render={() => <WithCompetition component={Friends} />} />
            <Route path={CompetitionNav.REWARDS.link} render={() => <WithCompetition component={Rewards} />} />
            <Route path={CompetitionNav.OVERVIEW.link} render={() => <WithCompetition component={Report} />} />
            <Route path={CompetitionNav.PLAYERS.link} render={() => <WithCompetition component={Players} />} />
            <Route path={CompetitionNav.STATS.link} render={() => <WithCompetition component={Stats} />} />
            <Route path={CompetitionNav.MY_PURCHASES.link} render={() => <WithCompetition component={MyPurchases} />} />
            <Route path={CompetitionNav.CHAT.link} render={() => <WithCompetition component={Chat} />} />
            <Route path={CompetitionNav.REWARD_HISTORY.link} render={() => <WithCompetition component={RewardHistory} />} />
            <Route path={CompetitionNav.PAYMENT.link} render={() => <WithCompetition component={Payment} />} />
            <Route path={CompetitionNav.PAYMENT_RESULT.link} render={() => <WithCompetition component={PaymentResult} />} />
            <Route path={CompetitionNav.EASYPAISA_PAYMENT.link} render={() => <WithCompetition component={EasypaisaPayment} />} />
            <Route path={CompetitionNav.SUPPORT_CENTER.link} render={() => <WithCompetition component={SupportCenter} />} />
            <Route path={CompetitionNav.LESSON_LISTING.link} render={() => <WithCompetition component={LessonListing} />} />
            <Route path={CompetitionNav.LEADER_BOARD.link} render={() => <WithCompetition component={Leaderboard} />} />
            <Route exact path={CompetitionNav.CHANGE_GRADE.link} component={ChangeGrade} />
            <Route exact path={CompetitionNav.MY_SUBSCRIPTION.link} component={MySubscription} />
            <Route
              exact
              path={CompetitionNav.FREQUENTLY_ASK_QUESTIONS.link}
              render={() => <WithCompetition component={FrequentlyAskQuestions} />}
            />
            <Route exact path={CompetitionNav.RULES.link} component={Rules} />

            {/* <Route path={CompetitionNav.COMPETITION_HOME.link} render={() => <WithCompetition component={Competition} />} /> */}

            {user.active_role !== 'principal' ? (
              <Route path={CompetitionNav.COMPETITION_HOME.link} render={() => <WithCompetition component={Competition} />} />
            ) : null}

            <Route exact path={DefaultNav.COMPETITIONS.link} component={AllCompetitions} />

            <Route render={() => <Redirect to={DefaultNav.COMPETITIONS.link} />} />
          </Switch>
        </CustomSwitcher>
        <BottomNavBar />
      </>
    </TwoColumnSplit>
  );
};

export default CompetitionStack;
