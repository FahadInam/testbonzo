import { IMAGES } from "$lib/assets/images/images.constants";
import { IsSinglePlayerMatch } from "../../data-actions/challenge/challenge.da";
import { AccuracyCalc } from "../../data-actions/challenge/result.da";

/**
 * @param {Array<{ profile_picture: string, name: string, username?: string, opponent_profile_picture?: string, min_completion_percentage?: number, my_accuracy?: number, opponent_name?: string, is_same_grade?: boolean, opponent_id?: number, my_score?: number, opponent_score?: number, you_resigned?: boolean, topic?: string }>} listings
 * @param {string} type
 * @returns {Array<Object>}
 */
export function structureListingsData(listings, type) {
  let defaultBadgeClass = "w-9 h-9 min-w-9"; // Default class
  return listings.map((item, index) => {
    if (type === "is_friend_recommendation") {
      return {
        id: index,
        primaryText: item.name,
        badgeIcon: IMAGES.CHALLENGE_ICON,
        badgeClass: "w-5 h-5 min-w-5",
        dualAction: false,
        ...listings[index],
        two_column_split: true,
      };
    } else if (type === "my_friend_list") {
      return {
        id: index,
        primaryText: item.name,
        secondaryText: item.is_same_grade ? item.username : "Different Grade",
        badgeIcon: IMAGES.PLAY_ICON,
        badgeClass: "w-5 h-5 min-w-5",
        dualAction: false,
        ...listings[index],
        two_column_split: true,
      };
    } else if (type === "is_friend_search") {
      return {
        id: index,
        secondaryText: item.is_same_grade ? item.username : "Different Grade",
        primaryText: item.name,
        badgeIcon: "❌",
        badgeClass: defaultBadgeClass,
        dualAction: false,
        ...listings[index],
        two_column_split: true,
      };
    } else if (type === "your_turn") {
      return {
        id: index,
        ...listings[index],
        profile_picture: item.opponent_profile_picture,
        primaryText: item.opponent_name,
        badgeIcon: IMAGES.PLAY_ICON,
        badgeClass: "w-5 h-5 min-w-5",
        dualAction: false,
        two_column_split: true,
      };
    } else if (type === "invitations") {
      return {
        id: index,
        ...listings[index],
        primaryText: item.opponent_name,
        profile_picture: item.opponent_profile_picture,
        badgeIcon: IMAGES.REJECT,
        badgeIcon2: IMAGES.ACCEPT,
        badgeClass: "w-8 h-8 min-w-8 p-1",
        dualAction: true,
        two_column_split: true,
      };
    } else if (type === "their_turn") {
      return {
        id: index,
        // badgeIcon: "⚠️",
        badgeIcon: IMAGES.WAITING_ICON,
        badgeClass: "w-5 h-5 min-w-5",
        ...listings[index],
        profile_picture: item.opponent_profile_picture,
        primaryText: item.opponent_name,
        secondaryText: "Waiting for opponent to play",
        dualAction: false,
        two_column_split: true,
      };
    } else if (type === "results") {
      console.log(item, "item");
      return {
        id: index,
        badgeClass: defaultBadgeClass,
        ...listings[index],
        dualAction: false,
        ...generateMatchDisplay({
          opponent_id: item.opponent_id ?? 0,
          opponent_name: item.opponent_name || "",
          you_resigned: item.you_resigned ?? false,
          opponent_score: item.opponent_score ?? 0,
          my_score: item.my_score ?? 0,
          opponent_profile_picture: item.opponent_profile_picture || "",
          min_completion_percentage: item.min_completion_percentage ?? 0,
          my_accuracy: AccuracyCalc(
            item?.my_total_correct ?? 0,
            item?.my_total_questions ?? 0,
            item?.my_total_questions ?? 0,
          ),
        }),
        two_column_split: true,
      };
    } else if (type === "is_lesson_subjects") {
      return {
        id: index,
        primaryText: item.topic,
        two_column_split: false,
        badgeIcon: IMAGES.CHALLENGE_ICON,
        badgeIcon2: IMAGES.CHALLENGE_ICON,
        dualAction: true,
        topicName: item.topic,
      };
    } else {
      return {
        id: index,
        badgeIcon: IMAGES.PLAY_ICON,
        badgeClass: "w-5 h-5 min-w-5",
        avatar: item.profile_picture,
        ...listings[index],
        primaryText: item.name,
        two_column_split: true,
      };
    }
  });
}

/**
 * @param {Object} params
 * @param {number} params.opponent_id
 * @param {string} params.opponent_name
 * @param {boolean} params.you_resigned
 * @param {number} params.opponent_score
 * @param {number} params.my_score
 * @param {string} params.opponent_profile_picture
 * @param {number} params.min_completion_percentage
 * @param {number} params.my_accuracy
 */
function generateMatchDisplay({
  opponent_id,
  opponent_name,
  you_resigned,
  opponent_score,
  my_score,
  opponent_profile_picture,
  min_completion_percentage,
  my_accuracy,
}) {
  let primaryText, secondaryText, badgeIcon, profile_picture;

  if (opponent_id > 1) {
    if (IsSinglePlayerMatch(opponent_id)) {
      primaryText = "Single Player";
      if (+my_accuracy * 100 >= min_completion_percentage) {
        badgeIcon = IMAGES.WIN_ICON;
      } else {
        badgeIcon = IMAGES.LOSE_ICON;
      }
    } else {
      primaryText = `Vs ${opponent_name}`;
    }
    profile_picture = opponent_profile_picture;
    if (IsSinglePlayerMatch(opponent_id)) {
      secondaryText = `You Scored ${my_score}`;
    } else if (my_score > opponent_score) {
      secondaryText = `You Win! (${my_score} - ${opponent_score})`;
      //badgeIcon = "🏆";
      badgeIcon = IMAGES.WIN_ICON;
    } else if (my_score < opponent_score) {
      secondaryText = `You Lose! (${my_score} - ${opponent_score})`;
      // badgeIcon = "❌";
      badgeIcon = IMAGES.LOSE_ICON;
    } else {
      secondaryText = `Draw (${my_score} - ${opponent_score})`;
      // badgeIcon = "⚖️";
      badgeIcon = IMAGES.DRAW_ICON;
    }
  } else if (opponent_id === 1) {
    primaryText = "Single Player";

    if (you_resigned) {
      secondaryText = "You Resigned";
      badgeIcon = "⚠️";
    } else {
      secondaryText = `You Scored ${my_score}`;
      badgeIcon = "✅";
    }
  }

  return {
    primaryText,
    secondaryText,
    badgeIcon,
    profile_picture,
  };
}
