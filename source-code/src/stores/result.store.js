import { writable } from "svelte/store";

// Initial state for the result store
const initialState = {
  player: {
    name: "Player",
    avatar: null,
    score: "0",
    points: 0,
    accuracy: "0%",
    timeTaken: "0s",
  },
  opponent: {
    name: "Opponent",
    avatar: null,
    score: "0",
    accuracy: "-",
    timeTaken: "-",
  },
  gameStatus: {
    isWinner: false,
    isCompleted: false,
    statusText: "Ongoing",
  },
};

// Create the store
export const resultStore = writable(initialState);

/**
 * Reset result store to initial state
 */
export function resetResultStore() {
  resultStore.set(initialState);
}

/**
 * Update player data in the result store
 * @param {Object} playerData - New player data
 */
export function updatePlayerData(playerData) {
  resultStore.update((data) => ({
    ...data,
    player: {
      ...data.player,
      ...playerData,
    },
  }));
}

/**
 * Update opponent data in the result store
 * @param {Object} opponentData - New opponent data
 */
export function updateOpponentData(opponentData) {
  resultStore.update((data) => ({
    ...data,
    opponent: {
      ...data.opponent,
      ...opponentData,
    },
  }));
}

/**
 * Update game status in the result store
 * @param {Object} statusData - New game status data
 */
export function updateGameStatus(statusData) {
  resultStore.update((data) => ({
    ...data,
    gameStatus: {
      ...data.gameStatus,
      ...statusData,
    },
  }));
}
