/**
 * Formats player and opponent data for the result page display
 * @param {Object} player - Player information
 * @param {Object} opponent - Opponent information
 * @param {Object} gameStats - Game statistics
 * @returns {Object} Formatted data for the result page
 */
export function formatResultData(player = {}, opponent = {}, gameStats = {}) {
  // Default values for player
  const defaultPlayer = {
    name: "Player",
    avatar: null,
    score: "0",
    accuracy: "0%",
    timeTaken: "0s",
  };

  // Default values for opponent
  const defaultOpponent = {
    name: "Opponent",
    avatar: null,
    score: "0",
    accuracy: "-",
    timeTaken: "-",
  };

  // Default values for game stats
  const defaultGameStats = {
    isWinner: false,
    isCompleted: true,
  };

  // Merge provided data with defaults
  const playerData = { ...defaultPlayer, ...player };
  const opponentData = { ...defaultOpponent, ...opponent };
  const gameStatsData = { ...defaultGameStats, ...gameStats };

  // Format names (truncate if too long)
  const formatName = (name) => {
    if (name && name.length > 15) {
      return name.substring(0, 12) + "...";
    }
    return name;
  };

  // Build the result data object
  return {
    player: {
      name: formatName(playerData.name),
      avatar: playerData.avatar || null,
      score: playerData.score?.toString() || "0",
      accuracy:
        typeof playerData.accuracy === "number"
          ? `${playerData.accuracy}%`
          : playerData.accuracy,
      timeTaken:
        typeof playerData.timeTaken === "number"
          ? `${playerData.timeTaken}s`
          : playerData.timeTaken,
    },
    opponent: {
      name: formatName(opponentData.name),
      avatar: opponentData.avatar || null,
      score: opponentData.score?.toString() || "0",
      accuracy:
        typeof opponentData.accuracy === "number"
          ? `${opponentData.accuracy}%`
          : opponentData.accuracy,
      timeTaken:
        typeof opponentData.timeTaken === "number"
          ? `${opponentData.timeTaken}s`
          : opponentData.timeTaken,
    },
    gameStatus: {
      isWinner: !!gameStatsData.isWinner,
      isCompleted: !!gameStatsData.isCompleted,
      statusText: gameStatsData.isCompleted
        ? gameStatsData.isWinner
          ? "You Won!"
          : "Opponent Won!"
        : "Ongoing",
    },
  };
}
