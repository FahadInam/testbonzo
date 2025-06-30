import { waitForCompetitionGradeData } from "$lib/utils";
import { get } from "svelte/store";
import { competitionStore } from "../../stores/competition.store";
import { gameDataStore } from "../../stores/gamedata.store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { request } from "$lib/api.service";
import { userStore } from "../../stores/user.store";
import { getText } from "../../stores/language.store";
import { IMAGES } from "$lib/assets/images/images.constants";
import { goto } from "$app/navigation";
import { resultStore, updateOpponentData, updatePlayerData } from "../../stores/result.store";
import { showSuccess } from "../../stores/toast.store";
import { userActivityStore } from "../../stores/useractivity.store";
import { metaStore } from "../../stores/meta.store";
import { guestStore } from "../../stores/guest.store";
import { checkInternetStability } from "$lib/internetStabilityChecker";

export async function getOpponentsToChallenge() {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;
  const subject = get(gameDataStore).subject;

  return await request(API_DEFINITIONS.CHALLENGE_FRIENDS, { competition_id: id, grade: grade, subject: subject }, {});
}

export const GameMode = Object.freeze({
  SINGLE: "Single Mode",
  CHALLENGE: "Challenge Mode",
});

/**
 * @param {any} subjectData
 * @param {any} opponent
 */
export async function StartChallenge(subjectData, opponent, playMode) {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;
  const { subject, content_id, type } = subjectData;
  checkInternetStability();

  return await request(
    API_DEFINITIONS.CHALLENGE_START,
    {
      competition_id: id,
      grade: grade,
      subject: subject,
      content_id: content_id,
      ...(playMode === 1 ? { friend_id: opponent.user_id || opponent.id } : {}),
      is_game: 1,
      content_type: type,
    },
    {},
  );
}

/**
 * @param {any} subjectData
 */
export async function PlayChallenge(subjectData) {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;
  const { subject, match_id } = subjectData;

  return await request(
    API_DEFINITIONS.CHALLENGE_PLAY,
    {
      competition_id: id,
      grade: grade,
      match_id: match_id,
      subject: subject,
    },
    {},
  );
}

/**
 * @param {any} subjectData
 * @param {any} resultData
 */
export async function ResignChallenge(subjectData, resultData) {
  console.log(subjectData, resultData, "subjectData");
  // await waitForCompetitionGradeData();
  // const grade = get(metaStore).current_grade;
  const grade = await waitForCompetitionGradeData();
  const id = get(metaStore).id;
  const url = get(metaStore).url;
  const { summary_id, content_id, match_id } = subjectData;

  const { question_data, total_questions, total_correct, total_attempted, total_time_spent } = resultData;
  const response = await request(
    API_DEFINITIONS.CHALLENGE_SAVE,
    {
      competition_id: id,
      grade: grade,
      match_id,
      summary_id,
      is_resigned: 1,
      content_id,
      total_questions,
      total_correct,
      total_attempted,
      total_time_spent,
      question_data: { data: question_data },
    },
    {},
  );
  if (response.error_code === 0) {
    resultStore.update((data) => {
      return {
        ...data,
        player: {
          ...data.player,
          score: response.data?.my_score,
        },
      };
    });
    console.log("url", url);
    goto(`/competitions/${url}`);
    showSuccess("You have quit the game.");
  }
}

/**
 * @param {any} subjectData
 * @param {any} resultData
 */
export async function SaveChallenge(subjectData, resultData) {
  await waitForCompetitionGradeData();
  // const grade = get(metaStore).current_grade;
  const grade = await waitForCompetitionGradeData();
  const id = get(metaStore).id;
  const { summary_id, content_id, match_id } = subjectData;
  const { question_data, total_questions, total_correct, total_attempted, total_time_spent } = resultData;

  const response = await request(
    API_DEFINITIONS.CHALLENGE_SAVE,
    {
      competition_id: id,
      grade: grade,
      match_id,
      summary_id,
      is_resigned: 0,
      content_id,
      total_questions,
      total_correct,
      total_attempted,
      total_time_spent,
      question_data: { data: question_data },
    },
    {},
  );
  if (response.error_code === 0) {
    handleChallengeResponse(response.data);
  }
}

/**
 * @typedef {Object} ChallengeResponseData
 * @property {number} points_earned - Points earned in the challenge
 * @property {number} my_score - Player's score
 * @property {number} opponent_score - Opponent's score
 * @property {number} opponent_total_correct - Opponent's total correct answers
 * @property {number} opponent_total_questions - Opponent's total questions
 * @property {number} opponent_time_spent - Time spent by opponent
 */

/**
 * Handles the challenge response data and updates the game state
 * @param {ChallengeResponseData} responseData - The response data from the challenge
 */
const handleChallengeResponse = (responseData) => {
  const points_earned = get(userActivityStore)?.total_coins_earned;

  const total_points_earned = points_earned + Number(responseData?.points_earned);
  console.log(responseData, points_earned, total_points_earned, "responseData");

  updatePlayerData({
    score: responseData?.my_score,
    points: responseData?.points_earned,
  });

  updateOpponentData({
    score: responseData?.opponent_score,
    accuracy: AccuracyCalc(
      responseData?.opponent_total_correct,
      responseData?.opponent_total_questions,
      responseData?.opponent_total_questions,
    ),
    timeTaken: responseData?.opponent_time_spent,
  });

  console.log(total_points_earned, points_earned, responseData?.points_earned, "points_earned");

  userActivityStore.set({
    total_coins_earned: total_points_earned,
  });

  goto("/challenge/result");
};

/**
 * @param {number} opponent_id
 */
export const IsSinglePlayerMatch = (opponent_id) => {
  const user_id = get(userStore)?.user_id;
  return user_id === opponent_id || opponent_id < 1;
};

/**
 * @param {string} name
 * @param {string} username
 */
export const UsernameResolver = (name, username) => {
  let nName = "";
  if (name) {
    nName = name;
  } else if (username) {
    const [first] = username.split("@");
    nName = first;
  }
  return nName;
};

/**
 * @param {any} matchData
 * @param {boolean} is_mcd
 */

export const WinCalculator = async (matchData, is_mcd) => {
  const {
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
  } = matchData;

  const result = {
    title: "",
    winner: 0,
    single: IsSinglePlayerMatch(opponent_id),
    str: "",
    icon: null,
    final: "",
    score: my_score,
  };

  const minAccuracyMet = my_accuracy * 100 >= min_completion_percentage;
  const merge1 = is_mcd ? skill : subject;
  const opponentDisplayName = UsernameResolver(opponent_name, opponent_username);

  if (result.single) {
    result.title = await getText("single_player");
    result.matchType = 1;

    if (you_resigned) {
      result.final = await getText("you_resigned");
      result.icon = IMAGES.LOSE_ICON;
      result.str = `${merge1} ${result.final}`;
    } else if (minAccuracyMet) {
      result.winner = 2;
      result.final = await getText("challenge_completed");
      result.icon = IMAGES.WIN_ICON;
      result.str = `${merge1} ${await getText("you_scored")} ${my_score}`;
    } else {
      result.final = await getText("challenge_failed");
      result.icon = IMAGES.LOSE_ICON;
      result.str = `${merge1} ${await getText("you_scored")} ${my_score}`;
    }
  } else {
    result.title = `Vs ${opponentDisplayName}`;
    result.single = false;

    if (my_score === opponent_score) {
      result.winner = 1;
      result.final = await getText("match_tied");
      result.icon = IMAGES.DRAW_ICON;
      result.str = `${subject} ${result.final} ${my_score}-${opponent_score}`;
    } else {
      const won = my_score > opponent_score;
      result.winner = won ? 2 : 0;
      result.final = await getText(won ? "you_win" : "you_lost");
      result.icon = won ? IMAGES.WIN_ICON : IMAGES.LOSE_ICON;
      result.str = `${subject} ${result.final} ${my_score}-${opponent_score}`;
    }
  }

  return result;
};

/**
 * @param {number} correct
 * @param {number} attempted
 * @param {number} total
 */
const AccuracyCalc = (correct, attempted, total) => {
  let nAttempted = attempted;
  if (attempted < 5 && attempted < total) nAttempted = 5;
  return correct / nAttempted;
};

/**
 * @param {number} correct
 * @param {number} attempted
 * @param {number} total
 * @param {number} basePoints
 */
export const PointsCalc = (correct, attempted, total, basePoints) => {
  const accuracy = AccuracyCalc(correct, attempted, total);
  return accuracy * basePoints;
};

export const CHALLENGE_GLOBAL = {
  LOADING: "LOADING",
  ON_LOAD: "ON_LOAD",
  START: "START",
  SUBMIT_QUESTION: "SUBMIT_QUESTION",
  STOP: "STOP",
  RESIGN: "RESIGN",
  SOUND: "SOUND",
  STOP_TIMER: "STOP_TIMER",
  START_TIMER: "START_TIMER",
  TIMER_UP: "TIMER_UP",
  NOT_FOUND: "NOT_FOUND",
};

export function updateGameData({ opponent, playMode, matchData, subjectData, matchingItem = {}, link }) {
  console.log(matchingItem, "matchingItem");
  gameDataStore.update((currentData) => {
    return {
      ...currentData,
      ...matchingItem,
      ...(playMode === 1 && { opponent }),
      isSinglePlayer: playMode,
      matchData,
      subjectData: {
        summary_id: matchData?.summary_id,
        match_id: matchData?.match_id,
        content_id: subjectData?.content_id || currentData?.content_id,
        base_points: subjectData?.base_points,
      },
      link,
    };
  });
}

export async function invitationAccepted(data, status) {
  const { row_id, match_id } = data;
  const competition_id = get(competitionStore).competition_id;

  const response = await request(API_DEFINITIONS.CHALLENGE_INVITATION_STATUS, {
    competition_id,
    row_id,
    match_id,
    status: status,
  });
}

export async function setGradePoints(data) {
  const { competition_id, grade, points } = data;
  const pointsToSend = points > 200 ? 200 : points;
  const response = await request(API_DEFINITIONS.SET_GRADE_POINTS, {
    competition_id,
    grade,
    points: pointsToSend,
  });
}

export async function GamePlay(data) {
  gameDataStore.set({ ...data });

  const compeStore = get(competitionStore);
  const gameStore = get(gameDataStore);
  const user = get(userStore);

  if (!compeStore.is_multiplayer_allowed) {
    const response = await StartChallenge(gameStore, null, 0);

    if (response.error_code === 0) {
      updateGameData({
        opponent: user,
        playMode: 0,
        matchData: response.data,
        subjectData: {
          summary_id: response?.data?.summary_id,
          match_id: response?.data?.match_id,
          content_id: gameStore?.content_id,
          base_points: response?.data?.base_points,
        },
        matchingItem: gameStore,
        link: gameStore?.link,
      });

      goto("/challenge/vsscreen");
      return;
    }
  }
  goto("/challenge");
}
