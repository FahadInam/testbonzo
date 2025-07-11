import { IMAGES } from "$lib/assets/images/images.constants";
import { get } from "svelte/store";
import { userStore } from "../../stores/user.store";
import { getText } from "../../stores/language.store";
import { IsSinglePlayerMatch } from "./challenge.da";
import { paymentStore } from "../../stores/payment.store";
import { isShupavu } from "../system/system..da";
/**
 * @param {Object} player - Player data with properties like name, score, accuracy, timeTaken
 * @param {Object} opponent - Opponent data with properties like name, score
 * @returns {Object} Formatted game data object ready for display
 */

export function formatGameData(player = {}, opponent = {}) {
  // Default images if not provided
  const defaultPlayerAvatar = IMAGES.DEFAULT_AVATAR;
  let isSubscribed = get(paymentStore)?.payment_status?.is_subscribed === 1;
  let isFreeShupavu = isShupavu && !isSubscribed && !get(userStore)?.is_guest_mode;

  const defaultOpponentAvatar = IMAGES.DEFAULT_AVATAR;
  const user = get(userStore);
  console.log(player, opponent, user, "player and opponent");

  return {
    // Player data
    playerName: player.playerName || "Player",
    score: user?.is_guest_mode || isFreeShupavu ? player.total_correct * 100 || "-" : player.score || "-",
    accuracy: player.accuracy ? `${player.accuracy * 100}%` : "-",
    timeTaken: player.timeTaken ? `${player.timeTaken}s` : "-",
    playerAvatar: user?.profile_picture,
    playerPoints: player?.points || "-",

    // Opponent data
    opponentName: opponent.playerName || "Opponent",
    opponentScore: opponent.score < 0 ? "0" : opponent.score,
    opponentAccuracy: opponent.accuracy && opponent.score >= 0 ? `${opponent.accuracy * 100}%` : "-",
    opponentTimeTaken: opponent.timeTaken ? `${opponent.timeTaken}s` : "-",
    opponentAvatar: opponent.avatar || defaultOpponentAvatar,
    opponentPoints: opponent?.points || "-",
  };
}
/**
 * @param {boolean} isMultiplayer - Whether the game is multiplayer
 * @returns {string} Result title text
 */
export async function getResultTitleText(isMultiplayer) {
  let text = "";
  if (!isMultiplayer) {
    text = await getText("single_mode_result");
    return text;
  } else {
    text = await getText("opponent_turn");
    return text;
  }
}

export const AccuracyCalc = (correct, attempted, total) => {
  let nAttempted = attempted;
  if (attempted < 5 && attempted < total) nAttempted = 5;
  return correct / nAttempted;
};

export function determineWinner(resultStore) {
  console.log(resultStore.opponent.score < 0, "resultStore221");
  if (
    resultStore?.player?.score == null ||
    resultStore?.opponent?.score == null ||
    resultStore.player.score < 0 ||
    resultStore.opponent.score < 0
  ) {
    return {
      playerWon: false,
      opponentWon: false,
      isDraw: false,
    };
  }
  const playerScore = parseInt(resultStore.player.score);
  const opponentScore = parseInt(resultStore.opponent.score);

  return {
    playerWon: playerScore > opponentScore,
    opponentWon: opponentScore > playerScore,
    isDraw: playerScore === opponentScore,
  };
}

// Function to check if user is in guest mode and determine multiplayer status
export function checkMultiplayerStatus(result, user) {
  // If user is in guest mode, return false
  if (user?.is_guest_mode) {
    return false;
  } else if (IsSinglePlayerMatch(result?.opponent?.opponent_id)) {
    return false;
  } else {
    return result?.opponent?.opponent_id != null;
  }
}
