import { get } from "svelte/store";
import { competitionStore } from "../../stores/competition.store";
import { request } from "$lib/api.service";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { formatText, waitForCompetitionGradeData } from "$lib/utils";
import { NOTIFICATION_TYPE } from "$lib/constants/notification.constants";
import {
  invitationAccepted,
  PlayChallenge,
  updateGameData,
} from "../challenge/challenge.da";
import { goto } from "$app/navigation";

export async function loadNotifications() {
  await waitForCompetitionGradeData();
  const { competition_id, current_grade } = get(competitionStore);
  const data = await request(API_DEFINITIONS.GET_USER_NOTIFICATIONS, {
    competition_id: competition_id,
    grade: current_grade,
  });

  if (data.error_code === 0 && data.data?.rows) {
    return processNotifications(data.data.rows);
  }

  return [];
}

/**
 * Process notification data to ensure properly formatted messages
 * @param {Array<Record<string, any>>} notifications
 */
function processNotifications(notifications) {
  if (!notifications || !Array.isArray(notifications)) return [];

  return notifications.map((notification) => {
    try {
      if (notification.message_inapp && notification.json_data) {
        notification.formattedMessage = formatText(
          notification.message_inapp,
          notification.json_data,
        );
      } else {
        notification.formattedMessage =
          notification.message_inapp || "Unknown message";
      }
    } catch (error) {
      notification.formattedMessage =
        notification.message_inapp || "Unknown message";
    }
    return notification;
  });
}

export async function updateNotificationStatus() {
  const { competition_id } = get(competitionStore);
  const data = await request(API_DEFINITIONS.UPDATE_USER_NOTIFICATIONS, {
    competition_id: competition_id,
  });
}

/**
 * @param {string | number} id - The ID of the notification to delete.
 */
export async function deleteUserNotification(id) {
  const { competition_id } = get(competitionStore);
  const data = await request(API_DEFINITIONS.DELETE_USER_NOTIFICATIONS, {
    competition_id: competition_id,
    notification_id: id,
  });
}

/**
 * @param {string | number | Date} dateString
 */
export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, "0");

  return `${day} ${month}, ${year} (${formattedHours}:${minutes} ${ampm})`;
}

/**
 * @param {number} type
 */
export function handleNotificationAction(data) {
  const { event_item } = data;
  switch (event_item) {
    case NOTIFICATION_TYPE.RESULT:
      console.log("Handling Result notification");
      break;
    case NOTIFICATION_TYPE.INVITATION:
      handleInvitationAccept(data);
      break;
    case NOTIFICATION_TYPE.REWARD:
      console.log("Handling Reward notification");
      break;
    case NOTIFICATION_TYPE.REWARD_SCREEN:
      console.log("Handling Reward Screen notification");
      break;
    case NOTIFICATION_TYPE.NOTIFICATION:
      console.log("Handling General Notification");
      break;
    case NOTIFICATION_TYPE.CERTIFICATE:
      console.log("Handling Certificate notification");
      break;
    default:
      console.log("Unknown notification type");
  }
}

/**
 * @param {Object} data
 */
export async function handleInvitationAccept(data) {
  console.log(data, "data212");
  const { json_data, notifications_users_id, profile_picture, send } = data;
  const parsedJson = JSON.parse(json_data);
  console.log(parsedJson, "parsedJson");
  const res = await PlayChallenge(parsedJson);
  if (res.error_code === 0) {
    updateGameData({
      opponent: {
        profile_picture: parsedJson.opponent_profile_picture,
        name: parsedJson.opponent_name,
        user_id: parsedJson.opponent_id,
      },
      playMode: 1,
      matchData: res.data,
      subjectData: {
        summary_id: parsedJson?.summary_id,
        match_id: parsedJson?.match_id,
        content_id: parsedJson?.content_id,
      },
      link: parsedJson.link,
    });
    await invitationAccepted(parsedJson, 1);
    goto("/challenge/vsscreen");
  }
  // const { opponent, playMode, matchData, subjectData } = parsedJson;
  // console.log(opponent, playMode, matchData, subjectData, "parsedJson");
}
