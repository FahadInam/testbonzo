/* eslint-disable camelcase */
import { API_CALLS, defaultCompetition, ALERT, LIMITS_CONFIG, CALL_PRIORITY, config, COMPETITION } from 'Constants';
import { gameDispatch } from 'Utils/ActionCreators';
import { GetObjFromArr, RemoveDuplicates, IsEmptyObject, validateSecretCode, IsObject_Empty, getInstanceType } from 'Utils';
import { PageSwitch } from 'Navigation';
import DefaultNav from 'Navigation/Paths/defaultNav.constants';
import SelectedCompetition from 'Actions/selectedCompetition.action';
import User from 'Actions/user.action';
import { CHALLENGE } from 'Constants/challenge.constants';
import { CompetitionNav, ChallengeNav } from 'Navigation/Paths';
import { ExecApiRequest } from './api.action';
import { Toast, Spinner, FromNotification, Dotted } from './app.control.action';
import Account from './account.action';
import moment from 'moment';
import { INSTANCES_ID } from 'Constants/instance.config';
window.pageRouteKey = false;

const ChangeGrade = (competition, grade, isOnlyCompetition, friendId, schoolId, user_data, competition_id) => {
  const user = User.Info();
  const demoUser = User.IsGuest();
  const dto = {
    grade,
    competition_id,
    school_id: schoolId || 0,
    friend_id: 0,
    points: 0,
  };
  if (friendId) dto.friend_id = friendId;
  else if (schoolId) dto.school_id = schoolId;

  return (dispatch) => {
    if (User.IsGuest()) {
      User.GuestSavedData('reset');
      // gameDispatch(COMPETITION.CLEAR_PAGES);
      SelectedCompetition.Set({
        item: { ...competition.item, current_grade: grade },
        // games: competition.games,
        user_data: user_data?.user_data,
        isOnlyCompetition,
      });

      // should clear all pages and challenge data from redux
      // if(user.active_role === 'principal'){
      //   console.log('runnign if')
      //   PageSwitch(CompetitionNav.OVERVIEW);
      // } else {
      //   console.log('runnign else')
      gameDispatch(COMPETITION.SET_CURRENT_GRADE, grade);
      SelectedCompetition.GotoCompetition();
      // }
      return;
    }
    if (!demoUser) {
      if (user.active_role === 'principal') {
        gameDispatch(COMPETITION.SET_CURRENT_GRADE, grade);
        PageSwitch(CompetitionNav.OVERVIEW, { competition_id: competition_id });
      } else {
        dispatch(
          ExecApiRequest(API_CALLS.ChangeGrade, dto, () => {
            // gameDispatch(API_CALLS.GetCompetitionDetails.CLEAR);
            gameDispatch(API_CALLS.GetRecommendations.CLEAR);
            gameDispatch(API_CALLS.GetCompetitionsFriends.CLEAR);
            gameDispatch(API_CALLS.GetCompetitionsLessons.CLEAR);
            gameDispatch(API_CALLS.GetCompetitionsGames.CLEAR);
            gameDispatch(API_CALLS.GetCompetitionsActivities.CLEAR);
            gameDispatch(API_CALLS.GetCompetitionsLeaderboard.CLEAR);
            gameDispatch(API_CALLS.GetSchoolsLeaderboard.CLEAR);
            // here
            SelectedCompetition.Set({
              item: { ...competition.item, current_grade: grade },
              // games: competition.games,
              user_data: user_data?.user_data,
              isOnlyCompetition,
            });
            // should clear all pages and challenge data from redux
            // SelectedCompetition.GotoCompetition();
            // if (user.active_role === 'principal') {
            //   PageSwitch(CompetitionNav.OVERVIEW, { competition_id: competition_id });
            // } else {
            gameDispatch(COMPETITION.SET_CURRENT_GRADE, grade);
            SelectedCompetition.GotoCompetition();
            // }
            config.friend_id = null;
          })
        );
      }
    } else {
      SelectedCompetition.Set({
        item: { ...competition.item, current_grade: grade },
        // games: competition.games,
        user_data: user_data?.user_data,
        isOnlyCompetition,
      });
      SelectedCompetition.GotoCompetition();
      dispatch(GetRecommendations({ competition_id: competition_id, current_grade: grade }, false, false));
    }
  };
};

const GetAllCompetitions = (callback) => {
  return (dispatch) => {
    Spinner.Show();
    try {
      let apiCall;
      let userData = User.Info();
      let config = localStorage.getItem('config');

      if ((userData?.name === 'Guest' || !userData) && config) {
        apiCall = API_CALLS.GetDemoCompetitions;
      } else if (userData?.active_role === 'learner') {
        apiCall = API_CALLS.GetAllCompetitions;
      } else if (userData?.active_role === 'principal') {
        apiCall = API_CALLS.GetAllInstCompetitions;
      }

      if (apiCall && !IsObject_Empty(callback) && !window.firstCompetitionCall) {
        dispatch(
          ExecApiRequest(apiCall, {}, (data) => {
            if (typeof callback === 'function') callback(data);
            const Inst_config = window.instanceConfig;
            const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
            if (!User.IsGuest() && !userData?.timezone && userData?.active_role === 'learner' && isShupavu) {
              const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's timezone
              dispatch(
                Account.UpdateTimezone(userTimezone, () => {
                  dispatch(Account.GetRefreshToken(userData));
                })
              );
            }
          })
        );
      }
    } catch (error) {
      console.error('Error fetching competitions:', error);
    } finally {
      Spinner.Hide();
    }
  };
};

const checkCompetitionCompatibility = (comp, url) => {
  const selectedCompetition = GetObjFromArr(comp, 'url', url);
  if (selectedCompetition) {
    // if (User.IsGuest() && !selectedCompetition.is_public && selectedCompetition.is_semi_private) return selectedCompetition;
    // if (User.IsGuest() && !selectedCompetition.is_public) return 'private';
    return selectedCompetition;
  }
  return false;
};

const GetFtpCallback = (data, url, text, user_data) => {
  Spinner.Show();
  let competition = defaultCompetition;
  //  console.log('inside ftp', competition, data);
  // console.log(data.competitions);
  if (data.competitions) {
    competition = checkCompetitionCompatibility(data.competitions, url);
    //  console.log('after ftp', competition);

    //  console.log('81 competition', competition);
    if (competition === 'private') {
      config.private_comp = url;
      PageSwitch(DefaultNav.COMPETITIONS);
    } else if (competition) {
      SelectedCompetition.Set({
        item: { ...competition },
        // games: data.games,
        user_data: user_data?.user_data,
        isOnlyCompetition: data.competitions.length === 1,
      });
      Spinner.Hide();
    } else {
      Spinner.Show();
      // User.Clear();
      PageSwitch(DefaultNav.COMPETITIONS);
      Toast.Show(text, ALERT.INFO, true);
    }
  } else User.Clear();
};

const GetFtpCompetitions = (allData, url, text, user_data) => {
  return (dispatch) => {
    if (allData) {
      GetFtpCallback(allData, url, text, user_data);
      return;
    }
    dispatch(
      ExecApiRequest(API_CALLS.GetFtpCompetitions, {}, (data) => {
        GetFtpCallback(data, url, text, user_data);
      })
    );
  };
};

const GetUserNotifications = ({ grade, competition_id }, callback) => {
  // console.log(user_id, competition_id, "competition_id")
  const dto = {
    grade,
    competition_id,
  };

  return (dispatch) => {
    // if (User.IsGuest() || !competition_id || window.location.href.indexOf('/challenge/') > -1) {
    //   // gameDispatch(API_CALLS.GetUserNotifications.SUCCESS, { error_code: 0, data: [] });
    //   // console.log('challengeStack: ', window.location.href.indexOf('/challenge/') > -1);
    //   return;
    // }
    if ((callback !== undefined && !User.IsGuest()) || (callback === undefined && User.IsGuest())) {
      dispatch(
        ExecApiRequest(API_CALLS.GetUserNotifications, dto, (data) => {
          if (callback) {
            callback(data.rows);
          }
        })
      );
    }
  };
};

const GetUserPremiumStatus = ({ user_id, competition_id }, state, callback) => {
  // console.log('stateIn: ', state);
  const dto = {
    user_id: user_id || state.user_id,
    competition_id,
  };

  // console.log('dto: ', dto);
  return (dispatch) => {
    // if (User.IsGuest() || !competition_id) {
    //   // gameDispatch(API_CALLS.GetUserNotifications.SUCCESS, { error_code: 0, data: [] });
    //   return;
    // }
    dispatch(
      ExecApiRequest(API_CALLS.GetUserPremiumStatus, dto, (data) => {
        if (callback) callback(data);
      })
    );
  };
};

const GetCompetitionsActivities = (
  { competition_id, current_grade },
  priority = CALL_PRIORITY.HIGH,
  refetchRec = false,
  callback,
  texts
) => {
  const utcDate = moment().utc();
  const currentDate = utcDate.format('YYYY-MM-DD HH:mm:ss');

  const apiCall =
    priority === CALL_PRIORITY.HIGH ? API_CALLS.GetCompetitionsActivities : API_CALLS.GetCompetitionsActivitiesLowPriority;
  return (dispatch) => {
    dispatch(
      ExecApiRequest(
        apiCall,
        {
          competition_id,
          grade: current_grade,
        },
        (data) => {
          // window.shouldNotificationBeCalled = true;
          if (data.user_data) {
            if (data?.user_data?.is_show_qualified === '1' && data?.user_data?.is_show_certified === '0') {
              localStorage.setItem('showQualifiedToast', 'true');
              // CustomToast.Open('Congratulations Qualifying for Stage 2!', ALERT.SUCCESS, true);
            } else if (data?.user_data?.is_show_certified === '1') {
              localStorage.setItem('showCertifiedToast', 'true');
              // CustomToast.Open('Congratulations on Completing Stage 1. View your certificate in Rewards.', ALERT.SUCCESS, true);
            }

            const endDate = moment(data?.comp_info?.end_date, 'YYYY-MM-DD HH:mm:ss');

            setTimeout(() => {
              if (data?.comp_info?.is_hide_on_end && endDate.isBefore(currentDate) && texts) {
                Toast.Show(texts.COMPETITION_ENDS, ALERT.INFO, true);
                PageSwitch(DefaultNav.MAIN);
              }
            }, 2000);

            if (data.user_data.is_forced_resigned) {
              Toast.Show(data.user_data.forced_resigned_text, ALERT.ERROR);
            }
            if (refetchRec) {
              dispatch(GetRecommendations({ competition_id, current_grade }, false, true));
            }
            delete data.user_data.is_forced_resigned;
            delete data.user_data.forced_resigned_text;
            SelectedCompetition.Update({ user_data: data.user_data });
          }
          if (callback) {
            callback(data);
          }
          // if(priority === 0) {
          //     gameDispatch(API_CALLS.GetUserNotifications.CLEAR);
          // }
        }
      )
    );
  };
};

const GetRecommendations = ({ competition_id, current_grade }, isBlocking = false, getNotificationRun) => {
  const apiCall = isBlocking ? API_CALLS.GetRecommendationsBlocking : API_CALLS.GetRecommendations;
  //  console.log('api call');
  return (dispatch) => {
    dispatch(
      ExecApiRequest(
        apiCall,
        {
          competition_id,
          grade: current_grade,
        },
        (data) => {
          //   console.log(data, 'api call');
          if (getNotificationRun) dispatch(GetUserNotifications({ grade: current_grade, competition_id }));
          // console.log(data.user_data);
          if (data.user_data) {
            if (data.user_data.is_forced_resigned) {
              Toast.Show(data.user_data.forced_resigned_text, ALERT.ERROR);
            }
            delete data.user_data.is_forced_resigned;
            delete data.user_data.forced_resigned_text;
            SelectedCompetition.Update({ user_data: data.user_data });
          }
        }
      )
    );
  };
};

const GetCompetitionsFriends = ({ competition_id, current_grade }) => {
  return (dispatch) => {
    // if (User.IsGuest()) {
    //   gameDispatch(API_CALLS.GetCompetitionsFriends.SUCCESS, { users: [], recommendations: [] });
    //   return;
    // }
    dispatch(
      ExecApiRequest(API_CALLS.GetCompetitionsFriends, {
        competition_id,
        grade: current_grade,
        subject: '',
      })
    );
  };
};

const DeleteUserNotification = ({ competition_id, notification_id }, callback) => {
  const dto = {
    competition_id,
    notification_id,
  };
  return (dispatch) => {
    // if (User.IsGuest() || !competition_id) {
    //   // gameDispatch(API_CALLS.DeleteUserNotification.SUCCESS, { error_code: 0, data: [] });
    //   return;
    // }
    dispatch(
      ExecApiRequest(API_CALLS.DeleteUserNotification, dto, () => {
        if (callback) callback();
      })
    );
  };
};

const SetUserPayment = (user_id, competition_id, callback) => {
  const dto = {
    user_id,
    competition_id,
  };
  return (dispatch) => {
    // if (User.IsGuest() || !competition_id) {
    //   // gameDispatch(API_CALLS.SetUserPayment.SUCCESS, { error_code: 0, data: [] });
    //   return;
    // }
    dispatch(
      ExecApiRequest(API_CALLS.SetUserPayment, dto, (data) => {
        if (callback) callback(data);
      })
    );
  };
};

const ReadUserNotifications = ({ user_id, competition_id }, callback) => {
  const dto = {
    user_id,
    competition_id,
  };
  return (dispatch) => {
    // if (User.IsGuest() || !competition_id) {
    //   // gameDispatch(API_CALLS.ReadUserNotifications.SUCCESS, { error_code: 0, data: [] });
    //   return;
    // }
    dispatch(
      ExecApiRequest(API_CALLS.ReadUserNotifications, dto, () => {
        if (callback) callback();
      })
    );
  };
};

const ReadUserNotification = ({ competition_id, notification_id }, callback) => {
  const dto = {
    competition_id,
    notification_id,
  };
  return (dispatch) => {
    // if (User.IsGuest() || !competition_id) {
    //   // gameDispatch(API_CALLS.ReadUserNotifications.SUCCESS, { error_code: 0, data: [] });
    //   return;
    // }
    dispatch(
      ExecApiRequest(API_CALLS.ReadUserNotification, dto, () => {
        if (callback) callback();
      })
    );
  };
};

const GetOpponents = ({ competition_id, current_grade }, subject) => {
  return (dispatch) => {
    // if (User.IsGuest()) {
    //   gameDispatch(API_CALLS.GetOpponents.SUCCESS, { users: [], recommendations: [] });
    //   return;
    // }
    dispatch(
      ExecApiRequest(API_CALLS.GetOpponents, {
        competition_id,
        grade: current_grade,
        subject: subject,
      })
    );
  };
};

const GetCompetitionsFriendsBlocking = ({ competition_id, current_grade }, sender_id) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(
        API_CALLS.GetCompetitionsFriendsBlocking,
        {
          competition_id,
          grade: current_grade,
          subject: '',
        },
        (data) => {
          let item = {};
          const { users } = data;
          for (let i = 0; i < users.length; i++) {
            if (users[i].user_id === parseInt(sender_id, 10)) {
              item = users[i];
            }
          }
          if (!IsEmptyObject(item)) SelectedCompetition.GotoCompetition(CompetitionNav.CHAT, item, false);
        }
      )
    );
  };
};

const GetCompetitionsBlocking = ({ competition_id, current_grade }, payload) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(
        API_CALLS.GetCompetitionsBlocking,
        {
          competition_id,
          grade: current_grade,
        },
        (data) => {
          let item = {};
          if (payload.action_type === 'invitation') {
            PageSwitch(CompetitionNav.COMPETITION_HOME);
            FromNotification.NotifyTrue();
            FromNotification.NotifyTo('invitations');
            setTimeout(() => {
              FromNotification.NotifyTrue();
              FromNotification.NotifyTo('invitations');
            }, 300);
          } else if (payload.action_type === 'result') {
            const { results } = data;
            for (let i = 0; i < results.length; i++) {
              if (results[i].match_id === parseInt(payload.match_id, 10)) {
                item = results[i];
              }
            }
            gameDispatch(CHALLENGE.SET_RESULT, {
              ...item,
              avatar: item.opponent_profile_picture,
              primary: item.title,
              tag: 'result',
            });
            PageSwitch(ChallengeNav.CHALLENGE_RESULT);
          }
        }
      )
    );
  };
};

const GetStats = (competition_id, current_grade) => {
  return (dispatch) => {
    dispatch(ExecApiRequest(API_CALLS.GetStats, { competition_id, grade: current_grade }));
  };
};

const GetCompetitionsLeaderboard = ({ competition_id, current_grade, is_global, subject, time_type, is_school_based }) => {
  // console.log(current_grade);
  return (dispatch) => {
    gameDispatch(API_CALLS.GetCompetitionsLeaderboard.CLEAR);
    dispatch(
      ExecApiRequest(API_CALLS.GetCompetitionsLeaderboard, {
        competition_id,
        grade: current_grade,
        is_global,
        // subject,
        time_type,
        is_school_based,
      })
    );
  };
};

const GetCompetitionsRewards = ({ competition_id, current_grade }) => {
  const dto = {
    grade: current_grade,
    competition_id,
  };

  return (dispatch) => {
    dispatch(ExecApiRequest(API_CALLS.GetCompetitionsRewards, dto));
  };
};

const GetCompetitionsLessons = ({ competition_id }, { current_grade }) => {
  const dto = {
    grade: current_grade,
    competition_id,
  };
  return (dispatch) => {
    dispatch(ExecApiRequest(API_CALLS.GetCompetitionsLessons, dto));
  };
};

const GetCompetitionsGames = ({ competition_id }, { current_grade }, { page }, callback) => {
  const dto = {
    grade: current_grade,
    competition_id,
    page,
  };
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.GetCompetitionsGames, dto, (data) => {
        if (callback) {
          callback(data);
        }
      })
    );
  };
};

const SearchUser = ({ competition_id, current_grade }, searchQuery, texts) => {
  //console.log('{ competition_id, current_grade }', { competition_id, current_grade });
  return (dispatch) => {
    if (searchQuery.trim().length === 0) {
      gameDispatch(API_CALLS.SearchUser.CLEAR);
      return;
    }
    if (searchQuery.trim().length < LIMITS_CONFIG.SEARCH_MIN_REQ) {
      Toast.Show(texts.SEARCH_MINIMUM_CHAR_LIMIT_MESSAGE.replace('|||', LIMITS_CONFIG.SEARCH_MIN_REQ), ALERT.INFO);
      return;
    }
    dispatch(
      ExecApiRequest(API_CALLS.SearchUser, {
        competition_id,
        grade: current_grade,
        username: searchQuery.trim(),
      })
    );
  };
};

const GetSubjectsFromGrade = (grades, current_grade, add = 0) => {
  //return;
  // console.log(grades, current_grade, 'current_gradecurrent_grade');
  const gradesSubject = [];
  for (let i = 0; i < grades?.length; i++) {
    if (current_grade === grades[i].grade) {
      gradesSubject.push({
        time_limit: grades[i].time_limit,
        name: grades[i].subject,
        index: i + add,
      });
    }
  }
  return gradesSubject;
};

const claimVerification = ({ phoneNumber, address, city, user_image }, texts) => {
  if (!city) {
    Toast.Show(texts.CITY_REQUIRED, ALERT.ERROR);
  } else if (!phoneNumber) {
    Toast.Show(texts.PHONE_NO_REQUIRED, ALERT.ERROR);
  } else if (phoneNumber.length < LIMITS_CONFIG.PHONE_NO_LENGTH) {
    Toast.Show(texts.PHONE_NO_INVALID, ALERT.ERROR);
  } else if (!address) {
    Toast.Show(texts.SHIPPING_ADDRESS_REQUIRED, ALERT.ERROR);
  } else if (!user_image) {
    Toast.Show(texts.IMAGE_REQUIRED, ALERT.ERROR);
  } else return true;
  return false;
};

const ClaimReward = (
  { competition_id, current_grade },
  { name, schoolName, email, phoneNumber, address, city, reward_id, user_image },
  texts,
  callback
) => {
  // const user_data = JSON.stringify({ name, schoolName, email, phoneNumber, address, city });
  const user_data = { name, schoolName, email, phoneNumber, address, city };

  const dto = {
    grade: current_grade,
    competition_id,
    user_data,
    reward_id,
    user_image,
  };
  return (dispatch) => {
    if (claimVerification({ phoneNumber, address, city, user_image }, texts)) {
      dispatch(ExecApiRequest(API_CALLS.ClaimReward, dto, callback));
    }
  };
};

const GetAllGradesList = ({ grades }, text) => {
  const fList = [];
  const fGrades = RemoveDuplicates(grades, 'grade');
  for (let i = 0; i < fGrades.length; i++) {
    fList.push({
      index: fGrades[i].grade,
      name: !fGrades[i].grade_alias ? `${text} ${fGrades[i].grade}` : fGrades[i].grade_alias,
      sort: fGrades[i]?.sort_order ?? null,
    });
  }

  // Sort only if sort_order has values
  if (fList.some((item) => item.sort !== null)) {
    fList.sort((a, b) => (a.sort !== null && b.sort !== null ? a.sort - b.sort : 0));
  }

  return fList;
};

const GetRewardTransactions = ({ competition_id, current_grade }) => {
  const dto = {
    grade: current_grade,
    competition_id,
  };
  return (dispatch) => {
    // if (User.IsGuest()) return;
    dispatch(ExecApiRequest(API_CALLS.GetRewardsHistory, dto));
  };
};

const GetCompetitionDetails = (is_already_enrolled, competition_id) => {
  // console.log(user_id, competition_id, "competition_id check")
  const dto = {
    is_already_enrolled,
    competition_id,
  };
  return (dispatch) => {
    dispatch(ExecApiRequest(API_CALLS.GetCompetitionDetails, dto));
  };
};

const CodeVerification = (secretCode, texts) => {
  if (!secretCode) {
    Toast.Show(texts.CODE_REQUIRED, ALERT.ERROR);
  } else if (!validateSecretCode(secretCode)) {
    Toast.Show(texts.CODE_REQUIRED_ALPHA_NUMERIC, ALERT.ERROR);
  } else if (secretCode.length < LIMITS_CONFIG.SECRET_CODE) {
    Toast.Show(texts.CODE_REQUIRED_INVALID, ALERT.ERROR);
  } else return true;
  return false;
};

const AddSecretCode = (secretCode, texts, callback, competition_id, comp_banner_locked) => {
  const { codeSecret } = secretCode;
  const dto = {
    secret_code: codeSecret,
    competition_id: competition_id ?? '',
  };
  const user = User.Info();

  return (dispatch) => {
    let apiCall;
    if (comp_banner_locked) {
      apiCall = API_CALLS.AddSecretCodeForGCLC;
    } else {
      apiCall = API_CALLS.AddSecretCode;
    }
    if (CodeVerification(codeSecret, texts)) {
      dispatch(
        ExecApiRequest(apiCall, dto, (data) => {
          dispatch(Account.GetRefreshToken(user));

          // after adding secrete code, call GetAllCompetitions API
          !comp_banner_locked && dispatch(GetAllCompetitions());

          if (callback) {
            callback(data);
          }
        })
      );
    }
  };
};

const GetSchoolsLeaderboard = ({ competition_id, current_grade, is_global, subject, time_type }) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.GetSchoolsLeaderboard, {
        competition_id,
        grade: current_grade,
        is_global,
        // subject,
        time_type,
      })
    );
  };
};

const ClaimCertificate = ({ current_grade, competition_id, full_name, user_data }, callback) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(
        API_CALLS.ClaimCertificate,
        {
          // user_id,
          // session_id,
          grade: current_grade,
          competition_id,
          full_name,
          user_data,
        },
        () => {
          if (callback) {
            callback();
          }
        }
      )
    );
  };
};

const SetUserTimeReward = (competition_id, grade, reward_id, status = 1, callback) => {
  // alert('status ' + status);
  if (status === 2) {
    // 2 is not a part of API, its for setting up final steps after MCD success.
    return (dispatch) => {
      Toast.Show(
        "Reward claimed successfully! You can find the claimed rewards in 'Rewards' section of McDonald's app",
        ALERT.SUCCESS,
        true
      );
      Dotted.Hide();
      gameDispatch(API_CALLS.GetCompetitionsRewards.CLEAR);
      //  console.log('---->>>>>', competition_id, grade);
      dispatch(GetCompetitionsRewards({ competition_id, current_grade: grade }));
      //window.location.href = 'gmalite://gmalite-offers-detail?offerid=' + secondaryId;
      // window.location.href = `gmalite://gmalite-deals?filterid=dealFilter1`;
      window.location.href = `gmalite://gmalite-deals?filterid=dealFilter2&apn=com.mcdonalds.mobileapp7&isi=1217507712&ibi=com.mcdonalds.mobileapp`;
    };
  }

  const user = User.Info();
  const dto = {
    user_id: user.user_id,
    competition_id,
    grade,
    reward_id,
    status,
  };

  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.SetUserTimeReward, dto, (data) => {
        if (data) {
          //  console.log('SetUserTimeReward Success');
          //  console.log('GO TO', `gmalite://gmalite-deals?filterid=dealFilter`);
          if (status === 1) {
            if (callback) callback(data);
          }
        } else {
          Toast.Show(`There is an error in claiming the reward, please try again later. (${data.error_code})`, ALERT.ERROR, true);
        }
      })
    );
  };
};

const GetUserTransactions = ({ competition_id, current_grade, session_id, user_id }, callback, SendHeader) => {
  // const dto = {
  //   grade: current_grade,
  //   competition_id,
  //   session_id,
  // };

  // const header = {
  //   user_id: user_id || '',
  //   session_id: session_id || '',
  // };
  // We will fix later (GetUserTransactions API Call)
  return (dispatch) => {
    // dispatch(
    //   ExecApiRequest(
    //     API_CALLS.GetUserTransactions,
    //     dto,
    //     (data) => {
    //       if (callback) callback(data);
    //     },
    //     SendHeader && header
    //   )
    // );
  };
};

export {
  GetAllCompetitions,
  GetFtpCompetitions,
  GetCompetitionsActivities,
  GetCompetitionsFriends,
  GetCompetitionsLeaderboard,
  GetCompetitionsRewards,
  GetCompetitionsLessons,
  GetCompetitionsGames,
  GetUserPremiumStatus,
  GetUserNotifications,
  ReadUserNotifications,
  SetUserPayment,
  ReadUserNotification,
  DeleteUserNotification,
  SearchUser,
  GetSubjectsFromGrade,
  GetAllGradesList,
  GetOpponents,
  ClaimReward,
  GetRewardTransactions,
  claimVerification,
  GetStats,
  ChangeGrade,
  GetRecommendations,
  GetCompetitionsFriendsBlocking,
  GetCompetitionsBlocking,
  GetCompetitionDetails,
  CodeVerification,
  AddSecretCode,
  GetSchoolsLeaderboard,
  ClaimCertificate,
  SetUserTimeReward,
  GetUserTransactions,
  checkCompetitionCompatibility,
  GetFtpCallback,
};
