import { w as writable, g as get } from "./index3.js";
import { a as appbarStore, s as setBackUrl, c as competitionStore } from "./appbar.store.js";
import { u as userStore } from "./user.store.js";
import "lz-string";
import { s as sidebarStore } from "./sidebar.store.js";
import { g as getText } from "./language.store.js";
import { a as isShupavu, e as isPocketGames, i as isGCLC, f as isQuotient, h as isSGG, I as INSTANCES_ID, s as systemSettingsStore } from "./system..da.js";
import { g as goto } from "./client.js";
import { r as redirect } from "./index2.js";
const gradesStore = writable({ current_grade: null, grades: [] });
function remapKeys(json, replacers) {
  const remappedJson = {};
  for (const key in json) {
    if (replacers.hasOwnProperty(key)) {
      remappedJson[replacers[key]] = json[key];
    } else {
      remappedJson[key] = json[key];
    }
  }
  return remappedJson;
}
function getItemByProperty(id, array, idKey) {
  return array.find((element) => element[idKey] === id);
}
function updateStoreVariable(store, key, value) {
  store.update((current) => {
    return { ...current, [key]: value };
  });
}
async function awaitStoreKey(store, key) {
  return new Promise((resolve) => {
    const checkValue = () => {
      const value = get(store);
      if (value?.[key]) {
        resolve(value[key]);
      } else {
        if (typeof window !== "undefined") {
          requestAnimationFrame(checkValue);
        }
      }
    };
    checkValue();
  });
}
async function waitForUserData() {
  return await awaitStoreKey(userStore, "auth_token");
}
async function waitForCompetitionGradeData() {
  return await awaitStoreKey(competitionStore, "current_grade");
}
async function waitForGradeData() {
  return await awaitStoreKey(gradesStore, "current_grade");
}
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const validateSecretCode = (code) => {
  const re = /^[a-z0-9]+$/i;
  return re.test(code);
};
function abbreviateNumber(num, digits = 1) {
  if (num === null || num === void 0 || isNaN(num)) return "0";
  if (num < 1e3) return num.toString();
  const units = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" }
  ];
  const unit = units.find((u) => num >= u.value) || units[units.length - 1];
  return (num / unit.value).toFixed(digits).replace(/\.0+$|(\.\d*[1-9])0+$/, "$1") + unit.symbol;
}
const sideBarAndAppBarSettings = async (visible, backLabel, backUrl) => {
  sidebarStore.set({ visible });
  const translatedBackLabel = await getText(backLabel);
  const backLabelText = await getText("back");
  const isPrincipal = get(userStore).active_role === "principal";
  setTimeout(() => {
    appbarStore.set({
      visible: true,
      backLabel: isPrincipal ? backLabelText : translatedBackLabel,
      isLogoVisible: false,
      isCoinVisible: isPrincipal ? false : true,
      isBackButtonVisible: true,
      isProfileVisible: true
    });
  }, 50);
  setBackUrl(backUrl);
};
function zeroPad(num) {
  return num < 10 ? `0${num}` : `${num}`;
}
const encodeDecode = (type, value) => {
  let changedValue = "";
  if (value !== "undefined") {
    {
      changedValue = window.btoa(value);
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
    [INSTANCES_ID.QUOTIENT_ID]: "qg_"
  };
  return prefixMap[instanceId] ? prefixMap[instanceId] + id : id;
}
function getInstanceText(textFn, id) {
  if (!textFn || typeof textFn !== "function") return void 0;
  const textId = resolveTextId(id);
  return textFn(textId) || textFn(id);
}
async function getInstanceTextAsync(id) {
  const textId = resolveTextId(id);
  let result = await getText(textId);
  if (!result) {
    result = await getText(id);
  }
  return result;
}
function LandingPageNavigation() {
  const currentUrl = window.location.href;
  if (isShupavu) {
    const targetDomain = "https://app.shupavugames.com/";
    const targetDomain2 = "https://learningapp.shupavugames.com/";
    if (currentUrl === targetDomain) {
      window.location.href = "https://shupavugames.com/";
    } else if (currentUrl === targetDomain2) {
      window.location.href = "https://learning.shupavugames.com/";
    }
  } else if (isPocketGames) {
    const targetDomain = "https://pocketgames.21c.digital/";
    if (currentUrl === targetDomain) {
      goto();
    }
  } else if (isGCLC) {
    const targetDomain = "https://globalclimateliteracy.org/";
    const targetDomain2 = "https://www.globalclimateliteracy.org/";
    const targetDomain3 = "https://kpbonzodev.netlify.app";
    if (currentUrl === targetDomain || currentUrl === targetDomain2 || location.origin === targetDomain3) {
      throw redirect(302, `${location.origin}/program/glc`);
    }
  } else if (isQuotient) {
    const targetDomain = "https://app.quotient.games/";
    if (currentUrl === targetDomain) {
      window.location.href = "https://quotient.games/";
    }
  } else if (isSGG) {
    const targetDomain = "https://games.greenguardians.com/";
    if (window.location.href === targetDomain) {
      window.location.href = "https://singapore.greenguardians.com/competitions";
    }
  }
}
function IsGuestMode() {
  const userData = get(userStore);
  return !!userData.is_guest_mode;
}
export {
  IsGuestMode as I,
  LandingPageNavigation as L,
  gradesStore as a,
  waitForUserData as b,
  waitForCompetitionGradeData as c,
  awaitStoreKey as d,
  getInstanceTextAsync as e,
  encodeDecode as f,
  getInstanceText as g,
  abbreviateNumber as h,
  getItemByProperty as i,
  getRandomInt as j,
  remapKeys as r,
  sideBarAndAppBarSettings as s,
  updateStoreVariable as u,
  validateSecretCode as v,
  waitForGradeData as w,
  zeroPad as z
};
