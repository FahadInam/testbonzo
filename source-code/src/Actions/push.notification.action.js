import OsProperties from 'Utils/OsProperties';
import { ALERT, API_CALLS } from 'Constants';
import {store} from 'Store';
import { GetCompetitionsFriendsBlocking, GetCompetitionsBlocking, SelectedCompetition } from 'Actions';
import { gameDispatch } from 'Utils/ActionCreators';
import User from './user.action';
import { Toast } from './app.control.action';

const NotificationRouter = (payload) => {
  const competitionStr = store.getState().Competition;
  const competition = SelectedCompetition.StrToObj(competitionStr);

  switch (payload.action_type) {
    case 'message':
      // blocking call of friends
      store.dispatch(GetCompetitionsFriendsBlocking(competition.item, payload.sender_id));
      break;
    case 'invitation':
      gameDispatch(API_CALLS.GetCompetitionsActivities.CLEAR);
      store.dispatch(GetCompetitionsBlocking(competition.item, payload));
      break;
    case 'result':
      gameDispatch(API_CALLS.GetCompetitionsActivities.CLEAR);
      store.dispatch(GetCompetitionsBlocking(competition.item, payload));
      break;
    default:
      break;
  }
};

window.NotificationRouter = NotificationRouter;

const ForegroundMsg = () => {
  window.cordova.plugins.firebase.messaging.onMessage((payload) => {
    // console.log('New foreground FCM message: ', payload);
    if (window.location.href.indexOf('challenge/player') > -1 || window.location.href.indexOf('chat') > -1) return null;
    if (payload.gcm && payload.gcm.body) Toast.Show(payload.gcm.body, ALERT.INFO);
    return null;
  });
};

const BackgroundMsg = () => {
  window.cordova.plugins.firebase.messaging.onBackgroundMessage((payload) => {
    // console.log('New background FCM message: ', payload);
    if (window.location.href.indexOf('challenge/player') > -1) return null;
    const user = User.Info();
    if (parseInt(payload.receiver_id, 10) === parseInt(user.userId, 10)) return null;

    NotificationRouter(payload);
    return null;
  });
};

const RequestPermission = (callback) => {
  window.cordova.plugins.firebase.messaging
    .requestPermission()
    .then(() => {
      if (callback) callback(true);
    })
    .catch(() => {
      if (callback) callback(false);
    });
};

const GetToken = (callback) => {
  window.cordova.plugins.firebase.messaging
    .getToken()
    .then((token) => {
      // console.log('Got device token: ', token);
      if (callback) callback(token);
    })
    .catch(() => {
      if (callback) callback('');
    });
};

const Clear = (callback) => {
  window.cordova.plugins.firebase.messaging
    .clearNotifications(() => {
      if (callback) callback(true);
    })
    .catch(() => {
      if (callback) callback(false);
    });
};

const Init = (callback) => {
  if (!window.cordova || !window.cordova.plugins.firebase || !window.cordova.plugins.firebase.messaging) {
    if (callback) callback('');
    return null;
  }
  if (OsProperties.IsIos()) {
    RequestPermission((allowed) => {
      return allowed ? GetToken(callback) : callback('');
    });
  } else {
    GetToken(callback);
  }

  BackgroundMsg();

  ForegroundMsg();
  return null;
};

const Notification = {
  Init,
  ForegroundMsg,
  BackgroundMsg,
  RequestPermission,
  GetToken,
  Clear,
};

export default Notification;
