// @ts-nocheck

import { get } from "svelte/store";
import { competitionStore } from "../stores/competition.store";
import { userStore } from "../stores/user.store";
import LZString from "lz-string";
import { instanceStore } from "../stores/instance.store";
import { sidebarStore } from "../stores/sidebar.store";
import { appbarStore } from "../stores/appbar.store";
import { setBackUrl } from "../stores/navigation.store";
import { getText } from "../stores/language.store";
import { gradesStore } from "../stores/grades.store";
import { isGCLC, isPocketGames, isQuotient, isSGG, isShupavu } from "../data-actions/system/system..da";
import { goto } from "$app/navigation";
import { INSTANCES_ID } from "./constants/config.constants";
import { systemSettingsStore } from "../stores/systemsettings.store";
import { redirect } from "@sveltejs/kit";

/**
 * Remaps keys in a JSON object based on a replacers mapping.
 * @param {Record<string, any>} json - The original JSON object.
 * @param {Record<string, string>} replacers - An object mapping original keys to new keys.
 * @returns {Record<string, any>} - The JSON object with remapped keys.
 */
export function remapKeys(json, replacers) {
  /** @type {Record<string, any>} */
  const remappedJson = {};

  for (const key in json) {
    if (replacers.hasOwnProperty(key)) {
      // Use the new key from the replacers object
      remappedJson[replacers[key]] = json[key];
    } else {
      // Keep the original key if it's not in the replacers object
      remappedJson[key] = json[key];
    }
  }

  return remappedJson;
}

/**
 * @param {any[]} jsonArray
 * @param {any} id
 */
export function getItemById(jsonArray, id) {
  return jsonArray.find((item) => item.id === id);
}

/**
 * @param {any} id
 * @param {any[]} array
 * @param {string | number} idKey
 */
export function getItemByProperty(id, array, idKey) {
  return array.find((element) => element[idKey] === id);
}

/**
 * @param {{ update: (arg0: (current: any) => any) => void; }} store
 * @param {any} key
 * @param {any} value
 */
export function updateStoreVariable(store, key, value) {
  store.update((current) => {
    return { ...current, [key]: value };
  });
}

export function onEnter(node, callback) {
  function handleKeydown(event) {
    if (event.key === "Enter") {
      callback(event);
      event.preventDefault();
    }
  }

  node.addEventListener("keydown", handleKeydown);

  return {
    destroy() {
      node.removeEventListener("keydown", handleKeydown);
    },
  };
}

/**
 * Waits for a specific key in a Svelte store to have a valid value.
 * @param {Readable<any>} store - The Svelte store to monitor.
 * @param {string} key - The key to check in the store's value.
 * @returns {Promise<any>} - Resolves when the key has a valid value.
 */
export async function awaitStoreKey(store, key) {
  return new Promise((resolve) => {
    const checkValue = () => {
      const value = get(store);
      if (value?.[key]) {
        // console.log(value[key], "value[key]");
        resolve(value[key]);
      } else {
        if (typeof window !== "undefined") {
          requestAnimationFrame(checkValue); // Keep checking until the key is valid
        }
      }
    };
    checkValue();
  });
}

export async function waitForUserData() {
  return await awaitStoreKey(userStore, "auth_token");
}

export async function waitForInstance() {
  return await awaitStoreKey(instanceStore, "instance_id");
}

export async function waitForCompetitionGradeData() {
  return await awaitStoreKey(competitionStore, "current_grade");
}
export async function waitForGradeData() {
  return await awaitStoreKey(gradesStore, "current_grade");
}

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const RemoveDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

// Replacers object
const replacers = {
  email: "username",
  password: "pwd",
};

// // Remap the keys
// const remappedJson = remapKeys(originalJson, replacers);

// console.log(remappedJson);

export function decompressLZString(compressedData) {
  if (!compressedData) return null;
  return LZString.decompressFromBase64(compressedData);
}

export const validateSecretCode = (code) => {
  const re = /^[a-z0-9]+$/i;
  return re.test(code);
};

export function abbreviateNumber(num, digits = 1) {
  if (num === null || num === undefined || isNaN(num)) return "0";
  // console.log(num, "num here");
  if (num < 1000) return num.toString(); // No abbreviation needed

  const units = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];

  const unit = units.find((u) => num >= u.value) || units[units.length - 1];

  return (num / unit.value).toFixed(digits).replace(/\.0+$|(\.\d*[1-9])0+$/, "$1") + unit.symbol;
}

export const sideBarAndAppBarSettings = async (
  /** @type {boolean} */ visible,
  /** @type {string} */ backLabel,
  /** @type {string} */ backUrl,
) => {
  sidebarStore.set({ visible });

  // Pre-fetch translated backLabel
  const translatedBackLabel = await getText(backLabel);
  const backLabelText = await getText("back");

  const isPrincipal = get(userStore).active_role === "principal";
  // Update appbar state after sidebar update
  setTimeout(() => {
    appbarStore.set({
      visible: true,
      backLabel: isPrincipal ? backLabelText : translatedBackLabel,
      isLogoVisible: false,
      isCoinVisible: isPrincipal ? false : true,
      isBackButtonVisible: true,
      isProfileVisible: true,
    });
  }, 50);

  setBackUrl(backUrl);
};

export const formatText = (message, jsonString) => {
  console.log(jsonString, "data here");

  const data = JSON?.parse(jsonString);

  const email = data.opponent_username;
  const contentTitle = data.content_title;

  const boldEmail = `<b>${email}</b>`;
  const boldContentTitle = `<b>${contentTitle}</b>`;

  const formattedMessage = message.replace(email, boldEmail).replace(contentTitle, boldContentTitle);
  console.log(formattedMessage, "formattedMessage");
  return formattedMessage;
};

export const getSortedAvatars = (avatarFiles, isPocketGames) => {
  let avatars = Object.keys(avatarFiles)
    .filter((key) => !key.includes("a66.png") && !key.includes("a67.png")) // Exclude specific avatars
    .sort((a, b) => {
      const numA = parseInt(a.match(/a(\d+)\.png/)[1], 10);
      const numB = parseInt(b.match(/a(\d+)\.png/)[1], 10);
      return numA - numB;
    })
    .map((key) => key); // Just use the URL string directly

  // Limit to first 14 avatars if isPocketGames is true
  if (isPocketGames) {
    avatars = avatars.slice(0, 14);
  }

  return avatars;
};

export const extractAvatarNumber = (avatarLink) => {
  // Extract the filename from the URL
  const filename = avatarLink.split("/").pop(); // e.g., "a41.DXZ5qRWm.png"
  // Match 'a' followed by digits at the start of the filename
  const match = filename.match(/^a(\d+)/);
  return match ? match[1] : null;
};

/**
 * Svelte action: Triggers Animate.css animation when element enters the viewport.
 *
 * @param {HTMLElement} node - The DOM element to animate.
 * @param {Object} params - Configuration object.
 * @param {string} params.animationClass - Animate.css class (e.g., 'animate__fadeInLeft').
 */
export function useInView(node, { animationClass }) {
  // Create the observer
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Apply Animate.css classes
        node.classList.add("animate__animated", animationClass);

        // Stop observing after first trigger (comment out to allow repeated animation)
        observer.unobserve(node);
      }
    },
    {
      // 10% visibility threshold before triggering
      //threshold: 0.3,
    },
  );

  // Start observing the node
  observer.observe(node);

  return {
    // Cleanup observer when element is destroyed
    destroy() {
      observer.unobserve(node);
    },
  };
}

/**
 * Adds a leading zero to numbers less than 10
 * @param {number} num - The number to format
 * @returns {string} - The formatted number as a string with leading zero if needed
 */
export function zeroPad(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

export const encodeDecode = (type, value) => {
  let changedValue = "";
  if (value !== "undefined") {
    if (type === "enc") {
      changedValue = window.btoa(value);
    } else if (type === "dec") {
      changedValue = window.atob(value);
    }
  }
  return changedValue;
};

function resolveTextId(id) {
  const instanceId = get(systemSettingsStore)?.instance_id;
  const prefixMap = {
    [INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID]: "gg_",
    [INSTANCES_ID.SHUPAVU_ID]: "sh_",
    [INSTANCES_ID.POCKET_GAMES_ID]: "pg_",
    [INSTANCES_ID.QUOTIENT_ID]: "qg_",
  };
  return prefixMap[instanceId] ? prefixMap[instanceId] + id : id;
}

export function getInstanceText(textFn, id) {
  if (!textFn || typeof textFn !== "function") return undefined;

  const textId = resolveTextId(id);
  return textFn(textId) || textFn(id);
}

export async function getInstanceTextAsync(id) {
  const textId = resolveTextId(id);

  let result = await getText(textId);
  if (!result) {
    result = await getText(id);
  }
  return result;
}

// If the current URL matches the target URL, redirect to the new URL
export function LandingPageNavigation() {
  const currentUrl = window.location.href;

  // Shupavu Logic
  if (isShupavu) {
    const targetDomain = "https://app.shupavugames.com/";
    const targetDomain2 = "https://learningapp.shupavugames.com/";
    if (currentUrl === targetDomain) {
      window.location.href = "https://shupavugames.com/";
    } else if (currentUrl === targetDomain2) {
      window.location.href = "https://learning.shupavugames.com/";
    }
  }

  // PocketGames Logic
  else if (isPocketGames) {
    const targetDomain = "https://pocketgames.21c.digital/";
    if (currentUrl === targetDomain) {
      goto("/account/signup");
    }
  }

  // GCLC Logic
  else if (isGCLC) {
    const targetDomain = "https://globalclimateliteracy.org/";
    const targetDomain2 = "https://www.globalclimateliteracy.org/";
    const targetDomain3 = "https://kpbonzodev.netlify.app";
    // TODO: change local when going live
    if (currentUrl === targetDomain || currentUrl === targetDomain2 || location.origin === targetDomain3) {
      throw redirect(302, `${location.origin}/program/glc`);
    }
  }

  // Quotient Logic
  else if (isQuotient) {
    //const targetDomain = "http://localhost:5173/"; // for local testing
    const targetDomain = "https://app.quotient.games/";
    if (currentUrl === targetDomain) {
      window.location.href = "https://quotient.games/";
    }
  }

  // SGG Logic
  else if (isSGG) {
    const targetDomain = "https://games.greenguardians.com/";
    if (window.location.href === targetDomain) {
      window.location.href = "https://singapore.greenguardians.com/competitions";
    }
  }
}

/**
 * Check if the current user is in guest mode
 * @returns {boolean} True if user is in guest mode, false otherwise
 */
export function IsGuestMode() {
  const userData = get(userStore);
  return !!userData.is_guest_mode;
}

/**
 * @returns {boolean} true if screen width is less than 1024px
 */
export function isMobile() {
  // Check if we're in a browser environment (important for SSR)
  if (typeof window === "undefined") {
    return false; // Default to desktop for server-side rendering
  }

  return window.innerWidth < 1024;
}
