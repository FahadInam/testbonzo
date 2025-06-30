/* eslint-disable camelcase */
import React from 'react';
import { API_CALLS, ALERT, APP_INTERNAL_MESSAGES, STORAGE_KEYS } from 'Constants';
import { gameDispatch } from 'Utils/ActionCreators';

import { ChallengeNav, CompetitionNav } from 'Navigation/Paths';
import { CHALLENGE, SET_GAME_PLAY } from 'Constants/challenge.constants';

import Win from 'Assets/images/win.png';
import Draw from 'Assets/images/draw.png';
import Lost from 'Assets/images/lose.png';
import { UsernameResolver, GetObjFromObj, IsEmptyObject, LocalStorage, parseURL, handleScreen, getInstanceType } from 'Utils';

import { PageSwitch } from 'Navigation';
import SelectedCompetition from 'Actions/selectedCompetition.action';
import User from 'Actions/user.action';
import { SecondaryText } from 'Stacks/Competition/shared/ListBox';
import { store } from 'Store';
import { Toast } from './app.control.action';
import { ExecApiRequest } from './api.action';
import { GetCompetitionsActivities } from './competitions.action';
import { checkInternetStability } from 'Utils/internetStability';
import { INSTANCES_ID } from 'Constants/instance.config';
// import { useDispatch } from 'react-redux';

window.customVideoShow = false;

const SetInvitationStatus = (event, item, status, texts, callback, IsMcdUser) => {
  // console.log(event, item, status , "SetInvitationStatus" )
  const dto = {
    competition_id: event.competition_id,
    row_id: Number(item.row_id),
    match_id: Number(item.match_id),
    status: status === 'accept' ? 1 : 0,
  };

  const {
    match_id,
    skill,
    row_id,
    subject,
    virtual_skill,
    content_id,
    link,
    opponent_id,
    opponent_name,
    opponent_profile_picture,
    opponent_username,
  } = item;

  const data = {
    match_id,
    skill,
    row_id,
    subject,
    virtual_skill,
    type: item.content_type,
    content_id,
    link,
    summary_id: 0,
  };

  const Opponent = {
    name: opponent_name,
    profile_picture: opponent_profile_picture,
    ranking: 1,
    same_school: 0,
    tag: 'SET_OPPONENT',
    user_id: opponent_id,
    username: opponent_username,
    opponent_id,
    opponent_name,
    opponent_profile_picture,
    opponent_username,
  };
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.SetInvitationStatus, dto, () => {
        if (event.hold_navigation) {
          if (callback) callback();
          return;
        } else if (event.delete_notification) {
          if (callback) callback();
        }
        if (status === 'accept') {
          // console.log(status, "status")
          gameDispatch(CHALLENGE.SET_SUBJECT, data);
          gameDispatch(API_CALLS.GetCompetitionsActivities.CLEAR);
          gameDispatch(CHALLENGE.SET_OPPONENT, item);
          dispatch(
            PlayChallenge(
              event,
              item,
              () => {
                dispatch(
                  GoToVsScreen(
                    Opponent,
                    {
                      ...data,
                      subject: item.subject,
                      is_game: true,
                      content_id: item.content_id,
                      summary_id: 0,
                      simulation_time_limit: item?.simulation_time_limit,
                    },
                    [data],
                    texts,
                    event
                  )
                );
              },
              event.current_grade,
              IsMcdUser
            )
          );
        } else {
          gameDispatch(API_CALLS.GetCompetitionsActivities.CLEAR);
          dispatch(GetCompetitionsActivities(event));
        }
      })
    );
  };
};

const VideoToPlay = (data) => {
  if (data.content_type === 'RUMBLE IN THE JUMBLE') {
    const questionData = JSON.parse(data.json_data);
    const templateType = questionData[0].template_type;
    if (templateType === 'sorting') {
      return 'sorting';
    }
    if (templateType === 'matching') {
      return 'matching';
    }
  } else if (data.content_type === 'DINO EGGS') {
    const levelData = parseURL(data.json_data);
    if (
      (levelData.grade === '6' && levelData.topic === '4' && levelData.level === '1') ||
      (levelData.grade === '7' && levelData.topic === '2' && levelData.level === '1') ||
      (levelData.grade === '6' && levelData.topic === '2' && levelData.level === '1')
    ) {
      return 'numberline';
    }
    if (
      (levelData.grade === '6' && levelData.topic === '3' && levelData.level === '3') ||
      (levelData.grade === '6' && levelData.topic === '1' && levelData.level === '1') ||
      (levelData.grade === '6' && levelData.topic === '1' && levelData.level === '2') ||
      (levelData.grade === '6' && levelData.topic === '8' && levelData.level === '1' && levelData.difficulty === '2') ||
      (levelData.grade === '8' && levelData.topic === '2' && levelData.level === '1')
    ) {
      return 'classification';
    }
    return 'mcq';
  }
};

const TutorialCheck = (subject, specialGameData) => {
  const { item } = SelectedCompetition.Info();
  if (subject.type === 'CROSSWORD JSON' && item.competition_id === 7) {
    return true;
  }
  const seen = JSON.parse(LocalStorage.Get(STORAGE_KEYS.TUTORIAL_SEEN, '[]'));
  if (seen.indexOf(subject.type) > -1 || seen.indexOf(specialGameData) > -1) {
    return false;
  }

  if (specialGameData) {
    seen.push(specialGameData);
  } else {
    seen.push(subject.type);
  }

  LocalStorage.Set(STORAGE_KEYS.TUTORIAL_SEEN, seen);
  return true;
};

const TutorialToPlay = (subject, games, specialGameData) => {
  let videoSrc = '';
  if (IsEmptyObject(subject)) return null;
  const selectedGame = GetObjFromObj(games, 'game_id', subject.type);
  if (!selectedGame || IsEmptyObject(selectedGame)) return null;
  if (!selectedGame.game_help_video) return null;
  const videosObj = JSON.parse(selectedGame.game_help_video);
  const { item } = SelectedCompetition.Info();
  window.customVideoShow = false;
  const DummyVideos = [
    'https://player.vimeo.com/video/483433589',
    'https://player.vimeo.com/video/483437033',
    'https://player.vimeo.com/video/483438698',
  ];

  if (specialGameData) {
    if (specialGameData === 'sorting') {
      videoSrc = videosObj.sorting;
    } else if (specialGameData === 'matching') {
      videoSrc = videosObj.matching;
    } else if (specialGameData === 'numberline') {
      videoSrc = videosObj.numberline;
    } else if (specialGameData === 'classification') {
      videoSrc = videosObj.classification;
    } else if (specialGameData === 'mcq') {
      videoSrc = videosObj.mcq;
    }
  } else if (subject.type === 'CROSSWORD JSON' && item.competition_id === 7) {
    if (item.current_grade === 6) {
      videoSrc = DummyVideos[0];
      window.customVideoShow = true;
    } else if (item.current_grade === 7) {
      videoSrc = DummyVideos[1];
      window.customVideoShow = true;
    } else if (item.current_grade === 8) {
      videoSrc = DummyVideos[2];
      window.customVideoShow = true;
    }
  } else {
    videoSrc = videosObj.complete;
  }

  return videoSrc;
};

const StartChallenge = (event, opponent, Subject, callback, currentGrade, IsMcdUser) => {
  const { subject, content_id, type } = Subject;
  const dto = {
    competition_id: event.competition_id,
    grade: currentGrade,
    textbook_id: event.textbook_id,
    subject,
    content_id,
    friend_id: opponent.user_id || opponent.id,
    is_game: 1,
    content_type: type,
  };
  clearInterval(window.GlobalActivityTimer);
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.StartChallenge, dto, (data) => {
        // console.log('data', data);
        // debugger;
        gameDispatch(SET_GAME_PLAY.CLEAR);
        gameDispatch(CHALLENGE.SET_DATA, data);
        gameDispatch(CHALLENGE.PLAY_STATE, true);
        gameDispatch(CHALLENGE.SET_OPPONENT, opponent);
        checkInternetStability();
        handleScreen(true, 'landscape', IsMcdUser);
        if (callback) callback();
      })
    );
  };
};

const GoToVsScreen = (opponent, subjectObj, recommendations, texts) => {
  const { subject, is_game, content_id } = subjectObj;
  const simulation_time_limit = subjectObj?.simulation_time_limit;

  const List = recommendations?.filter((x) => x.type.toLowerCase() !== 'video_jica');
  const subjectRec = List && subject && GetObjFromObj(List, 'subject', subject);

  let isRecommendation = false;
  let recContentId = content_id;
  let recIsGame = is_game;

  if (content_id === 0 && typeof subjectRec === 'object') {
    recContentId = subjectRec.content_id;
    recIsGame = 1;
    if (subjectRec.type.toLowerCase() === 'mcq') {
      recIsGame = 0;
    }
    isRecommendation = true;
  }

  clearInterval(window.GlobalActivityTimer);
  return () => {
    if ((!subjectRec || typeof subjectRec !== 'object' || IsEmptyObject(subjectRec)) && isRecommendation) {
      Toast.Show(texts.SELECT_ANOTHER_SUBJECT, ALERT.ERROR);
      return;
    }
    if (isRecommendation) {
      gameDispatch(CHALLENGE.SET_SUBJECT, {
        ...subjectObj,
        ...subjectRec,
        subject,
        is_game: recIsGame,
        content_id: recContentId,
        isStart: true,
      });
    } else {
      const challenge = store.getState().Challenge;
      if (challenge && challenge.subject) {
        gameDispatch(CHALLENGE.SET_SUBJECT, {
          ...challenge.subject,
          is_game: recIsGame,
          isStart: true,
        });
      } else {
        gameDispatch(CHALLENGE.SET_SUBJECT, {
          ...subjectObj,
          is_game: recIsGame,
          isStart: true,
        });
      }
    }
    gameDispatch(CHALLENGE.SET_OPPONENT, opponent);
    PageSwitch(ChallengeNav.CHALLENGE_PLAYER, { simulation_time_limit });
  };
};

const PlayChallenge = (event, { subject, match_id }, callback, currentGrade, IsMcdUser) => {
  const dto = {
    competition_id: event.competition_id,
    grade: currentGrade,
    subject,
    match_id,
  };
  // console.log(dto);
  clearInterval(window.GlobalActivityTimer);
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.PlayChallenge, dto, (data) => {
        //  console.log('data', data);
        gameDispatch(CHALLENGE.SET_DATA, data);
        gameDispatch(CHALLENGE.PLAY_STATE, true);
        handleScreen(true, 'landscape', IsMcdUser);
        if (callback) {
          //  console.log('callback');
          callback();
        }
      })
    );
  };
};

const ResignChallenge = (
  { competition_id },
  { match_id, summary_id },
  { question_data, total_questions, total_correct, total_attempted, total_time_spent },
  { content_id },
  current_grade,
  text,
  IsMcdUser,
  paymentData
) => {
  const dto = {
    competition_id,
    grade: current_grade,
    match_id,
    summary_id,

    is_resigned: 1,
    content_id,

    total_questions,
    total_correct,
    total_attempted,

    total_time_spent,
    // total_mistakes: mistakes,
    question_data: { data: question_data },
  };
  const Inst_config = window.instanceConfig;
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  return (dispatch) => {
    const moduleData = JSON.parse(LocalStorage.Get(STORAGE_KEYS.MODULE_SELECTED, null));
    //  console.log('moduleData: ', moduleData);
    gameDispatch(CHALLENGE.PLAY_STATE, false);
    // if (User.IsGuest()) {
    //   Toast.Show(text, ALERT.INFO, true);
    //   // should clear all pages and challenge data from redux
    //   if (moduleData?.data?.isCalledFromLessons) {
    //     //  console.log('HHH');
    //     SelectedCompetition.GotoCompetition(CompetitionNav.LESSON_LISTING);
    //   } else {
    //     //  console.log('Deleting Selected Module data');
    //     LocalStorage.Delete(STORAGE_KEYS.MODULE_SELECTED);
    //     SelectedCompetition.GotoCompetition();
    //   }
    //   return;
    // }
    if (User.IsGuest() || (isShupavu && paymentData?.is_subscribed === 0 && paymentData?.is_expired_subscription === 0)) {
      PageSwitch(ChallengeNav.CHALLENGE_RESULT);
    } else {
      dispatch(
        ExecApiRequest(API_CALLS.SaveChallenge, dto, () => {
          Toast.Show(text, ALERT.INFO, true);
          handleScreen(false, 'portrait', IsMcdUser);
          // should clear all pages and challenge data from redux
          if (moduleData?.data?.isCalledFromLessons) {
            //  console.log('HHH');
            SelectedCompetition.GotoCompetition(CompetitionNav.LESSON_LISTING);
          } else if (moduleData?.data?.isCalledFromGames) {
            SelectedCompetition.GotoCompetition(CompetitionNav.GAMES);
          } else {
            //  console.log('Deleting Selected Module data');
            LocalStorage.Delete(STORAGE_KEYS.MODULE_SELECTED);
            SelectedCompetition.GotoCompetition();

            gameDispatch(CHALLENGE.PLAY_STATE, false);
            gameDispatch(SET_GAME_PLAY.CLEAR);
          }
        })
      );
    }
    if (moduleData?.data?.isCalledFromGames) {
      Toast.Show(text, ALERT.INFO, true);
      SelectedCompetition.GotoCompetition(CompetitionNav.GAMES);
    }
  };
};

const SaveChallenge = (
  { competition_id },
  { match_id, summary_id },
  { score, total_questions, total_correct, total_attempted, total_time_spent, question_data },
  { content_id },
  current_grade,
  IsMcdUser = null,
  texts,
  paymentData
) => {
  const dto = {
    competition_id,
    grade: current_grade,
    match_id,
    summary_id,

    is_resigned: 0,
    content_id,

    total_questions,
    total_correct,
    total_attempted,

    total_time_spent,
    // total_mistakes: mistakes,
    question_data: { data: question_data },
  };
  const Inst_config = window.instanceConfig;
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  // console.log(dto, 'ZZZZZZZ');
  return (dispatch) => {
    gameDispatch(CHALLENGE.SET_RESULT, {
      score,
      total_questions,
      total_correct,
      total_attempted,
      total_time_spent,
    });
    // if (paymentData?.is_subscribed === 0 && paymentData?.is_expired_subscription === 0) {
    //   PageSwitch(ChallengeNav.CHALLENGE_RESULT);
    //   return;
    // }

    if (User.IsGuest() || (isShupavu && paymentData?.is_subscribed === 0 && paymentData?.is_expired_subscription === 0)) {
      PageSwitch(ChallengeNav.CHALLENGE_RESULT);
    } else {
      dispatch(
        ExecApiRequest(API_CALLS.SaveChallenge, dto, (data) => {
          if (data.error_code === 1) {
            Toast.Show(APP_INTERNAL_MESSAGES.CHALLENGE_RESULT_ALREADY_SUBMITTED, ALERT.INFO);
            // should clear all pages and challenge data from redux
            SelectedCompetition.GotoCompetition();
            return;
          }
          gameDispatch(API_CALLS.GetCompetitionsActivities.CLEAR);
          dispatch(GetCompetitionsActivities({ competition_id, current_grade }, 1, true, null, texts));

          PageSwitch(ChallengeNav.CHALLENGE_RESULT);
          gameDispatch(CHALLENGE.PLAY_STATE, false);
          gameDispatch(SET_GAME_PLAY.CLEAR);
        })
      );
    }
  };
};

const IsSinglePlayerMatch = (opponent) => {
  const user = User.Info();
  if (user.user_id === opponent.opponent_id) return true;
  if (opponent.opponent_id < 1) return true;
  return false;
};

const WinCalculator = (
  {
    opponent_resigned,
    you_resigned,
    my_score,
    opponent_score,
    opponent_id,
    opponent_name,
    opponent_username,
    subject,
    my_accuracy,
    skill,
    min_completion_percentage,
  },
  user,
  texts,
  is_mcd
) => {
  // console.log('min_completion_percentage', min_completion_percentage);
  // console.log('my_accuracy', my_accuracy);

  // console.log('my_accuracy', min_completion_percentage);
  const result = { title: '', winner: 0, single: true, str: '', icon: null };
  if (IsSinglePlayerMatch({ opponent_id })) {
    result.single = true;
    result.matchType = 1;
    result.title = texts.SINGLE_PLAYER;
    if (!you_resigned && my_accuracy * 100 >= min_completion_percentage) {
      result.icon = <img src={Win} alt={texts.WINNER} className="bonzoui__result__mini__icon" />;
      result.final = 'Challenge completed';
      result.winner = 2;
      result.score = my_score;
      result.str = <SecondaryText merge1={is_mcd ? skill : subject} merge2="" thirdLine={`${texts.YOU_SCORED} ${my_score}`} />;
    } else if (!you_resigned && my_accuracy * 100 < min_completion_percentage) {
      result.winner = 0;
      result.icon = <img src={Lost} alt={texts.YOU_LOST} className="bonzoui__result__mini__icon" />;
      result.str = <SecondaryText merge1={is_mcd ? skill : subject} merge2="" thirdLine={`${texts.YOU_SCORED} ${my_score}`} />;
      result.final = texts.CHALLENGE_FAILED;
      result.score = my_score;
    } else {
      result.winner = 0;
      result.icon = <img src={Lost} alt={texts.YOU_LOST} className="bonzoui__result__mini__icon" />;
      result.str = <SecondaryText merge1={is_mcd ? skill : subject} merge2="" thirdLine={texts.YOU_RESIGNED} />;
      result.final = texts.YOU_RESIGNED;
      result.score = my_score;
    }
  } else {
    result.title = `Vs ${UsernameResolver(opponent_name, opponent_username)}`;
    result.single = false;
    if (my_score === opponent_score) {
      result.winner = 1;
      result.icon = <img src={Draw} width="36" height="36" alt="Draw" />;
      result.str = <SecondaryText merge1={subject} merge2="" thirdLine={`${texts.MATCH_TIED} ${my_score} - ${opponent_score}`} />;
      result.final = `${texts.MATCH_TIED}!`;
    } else if (my_score > opponent_score) {
      result.winner = 2;
      result.icon = <img src={Win} width="36" height="36" alt="Win" />;
      result.str = <SecondaryText merge1={subject} merge2="" thirdLine={`${texts.YOU_WON} ${my_score} - ${opponent_score}`} />;
      result.final = `${texts.YOU_WON}!`;
    } else if (opponent_score > my_score) {
      result.winner = 0;
      result.icon = <img src={Lost} width="36" height="36" alt="Lost" />;
      result.str = <SecondaryText merge1={subject} merge2="" thirdLine={`${texts.YOU_LOST} ${my_score} - ${opponent_score}`} />;
      result.final = `${texts.YOU_LOST}!`;
    }
  }
  return result;
};

const AccuracyCalc = (correct, attempted, total) => {
  let nAttempted = attempted;
  if (attempted < 5 && attempted < total) nAttempted = 5;
  return correct / nAttempted;
};

const PointsCalc = (correct, attempted, total, basePoints) => {
  const accuracy = AccuracyCalc(correct, attempted, total);
  return accuracy * basePoints;
};

const SetGameData = (data) => {
  gameDispatch(CHALLENGE.SET_GAME_DATA, data);
};

export {
  SetInvitationStatus,
  StartChallenge,
  PlayChallenge,
  ResignChallenge,
  SaveChallenge,
  WinCalculator,
  AccuracyCalc,
  PointsCalc,
  IsSinglePlayerMatch,
  GoToVsScreen,
  TutorialCheck,
  TutorialToPlay,
  VideoToPlay,
  SetGameData,
};
