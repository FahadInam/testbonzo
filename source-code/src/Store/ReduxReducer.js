import { combineReducers } from 'redux';

import AppControl from './app.control.redux';
import User from './user.redux';
import AllCompetitions from './getAllCompetitions.redux';
import GetCompetitionsActivities from './getCompetitionsActivities.redux';
import GetCompetitionsGames from './getCompetitionsGames.redux';
import GetCompetitionsFriends from './getCompetitionsFriends.redux';
import GetCompetitionsLeaderboard from './getCompetitionsLeaderboard.redux';
import GetCompetitionsLessons from './getCompetitionsLessons.redux';
import GetCompetitionsRewards from './getCompetitionsRewards.redux';
import GetUserTransactions from './GetUserTransactions.redux';
import GetUserNotifications from './getUserNotifications.redux';
import GetUserPremiumStatus from './GetUserPremiumStatus.redux';
import SetUserPayment from './setUserPayment.redux';
import ReadUserNotifications from './readUserNotifications.redux';
import ReadUserNotification from './readUserNotification.redux';
import DeleteUserNotification from './deleteUserNotification.redux';
import Competition from './competition.redux';
import GetCompetitionVideoLink from './getCompetitionVideoLink.redux';
import Challenge from './challenge.redux';
import Opponents from './getOpponents.redux';
import Stats from './stats.redux';
import Profile from './profile.redux';
import Chat from './chat.redux';
import GetCompetitionsRewardHistory from './getCompetitionsRewardHistory.redux';
import GetRecommendations from './getRecommendations.redux';
import GetCompetitionsFriendsBlocking from './GetCompetitionsFriendsBlocking.redux';
import AddSecretCode from './AddSecretCode.redux';
import GetSchoolsLeaderboard from './getSchoolsLeaderboard.redux';
import GetCompetitionDetails from './getCompetitionDetails.redux';
import GetCodePushData from './getCodePushData.redux';
import McdUser from './McdUser.redux';
import AdLoginUser from './adlogin.redux';
import SetUserTimeReward from './SetUserTimeReward.redux';
import DirectLaunch from './directlaunch.redux';
import LoginType from './LoginType.redux';
import PremiumCompetition from './setPremiumCompetition.redux';
import InstitutionalSummary from './getInstitutionalSummary.redux';
import GetInstitutionalPerformance from './getInstitutionalPerformance.redux';
import GetInstitutionalPlayers from './getInstitutionalPlayers.redux';
import GetInstitutionalReport from './getInstitutionalReport.redux';
import GetInstitutionalGamesReport from './getInstitutionalGamesReport.redux';
import UserSubscription from './userSubscriptionData';
import GamePlay from './gamePlay.redux';
import RefreshStatus from './SetRefreshStatus.redux';
import ComingFromPublic from './cfPublic.redux';
import GetInstConfig from './GetInstConfig.redux';
import GetInstanceConfig from './getInstanceConfig.redux';

const rootReducer = combineReducers({
  AppControl,
  AllCompetitions,
  GetCompetitionsActivities,
  GetCompetitionsFriends,
  GetCompetitionsLeaderboard,
  GetCompetitionsLessons,
  GetCompetitionsGames,
  GetCompetitionsRewards,
  GetUserPremiumStatus,
  GetUserNotifications,
  ReadUserNotifications,
  SetUserPayment,
  ReadUserNotification,
  DeleteUserNotification,
  Challenge,
  Opponents,
  Stats,
  Profile,
  Chat,
  Competition,
  GetCompetitionsRewardHistory,
  GetRecommendations,
  GetCompetitionsFriendsBlocking,
  AddSecretCode,
  GetSchoolsLeaderboard,
  GetCompetitionDetails,
  User,
  GetCompetitionVideoLink,
  GetCodePushData,
  McdUser,
  AdLoginUser,
  SetUserTimeReward,
  GetUserTransactions,
  DirectLaunch,
  LoginType,
  PremiumCompetition,
  InstitutionalSummary,
  GetInstitutionalPerformance,
  GetInstitutionalPlayers,
  GetInstitutionalReport,
  GetInstitutionalGamesReport,
  UserSubscription,
  GamePlay,
  RefreshStatus,
  ComingFromPublic,
  GetInstanceConfig,
  GetInstConfig,
});

export default rootReducer;
