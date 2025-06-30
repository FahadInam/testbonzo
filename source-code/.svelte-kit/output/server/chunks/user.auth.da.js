import { g as goto } from "./client.js";
import { r as request } from "./api.service.js";
import { c as waitForCompetitionGradeData, r as remapKeys, u as updateStoreVariable } from "./utils.js";
import { g as get } from "./index3.js";
import { A as API_DEFINITIONS, __tla as __tla_0 } from "./api.definitions.js";
import { b as otpStore, a as authModalStore, c as openCoachApp, h as handleGoogleLogin, s as shupavuLoginFields, d as loginFields, g as gclcSignUpFields, e as shupavuSignupFields, f as signUpFields, i as guestStore, j as forgotPasswordFields, __tla as __tla_1 } from "./common.auth.data.js";
import { g as getText } from "./language.store.js";
import "notyf";
import { u as userStore } from "./user.store.js";
import { p as page } from "./index4.js";
import { i as instanceStore } from "./instance.store.js";
import { a as isShupavu, e as isPocketGames, i as isGCLC, s as systemSettingsStore } from "./system..da.js";
import { g as getRandomGenericAvatar, b as getRandomAvatar } from "./avatar2.js";
import { c as competitionStore } from "./appbar.store.js";
import { g as gameDataStore } from "./gamedata.store.js";
import "./useractivity.store.js";
import { U as USER_TYPE } from "./user.constants.js";
let IsSinglePlayerMatch, StartChallenge, refreshUserToken, userSignUpFormPopup, userLoginFormPopup, user_auth_da, forgotPasswordForm, loginUser, resendEmail, signUpUserUsingFormData, updateGameData;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  StartChallenge = async function(subjectData, opponent, playMode) {
    await waitForCompetitionGradeData();
    const grade = get(competitionStore).current_grade;
    const id = get(competitionStore).competition_id;
    const { subject, content_id, type } = subjectData;
    console.log({
      competition_id: id,
      grade,
      subject,
      content_id,
      friend_id: opponent.user_id || opponent.id,
      is_game: 1,
      content_type: type
    });
    return await request(API_DEFINITIONS.CHALLENGE_START, {
      competition_id: id,
      grade,
      subject,
      content_id,
      ...playMode === 1 ? {
        friend_id: opponent.user_id || opponent.id
      } : {},
      is_game: 1,
      content_type: type
    }, {});
  };
  IsSinglePlayerMatch = (opponent_id) => {
    const user_id = get(userStore)?.user_id;
    return user_id === opponent_id || opponent_id < 1;
  };
  updateGameData = function({ opponent, playMode, matchData, subjectData, matchingItem = {}, link }) {
    console.log(matchingItem, "matchingItem");
    gameDataStore.update((currentData) => {
      return {
        ...currentData,
        ...matchingItem,
        ...playMode === 1 && {
          opponent
        },
        isSinglePlayer: playMode,
        matchData,
        subjectData: {
          summary_id: matchData?.summary_id,
          match_id: matchData?.match_id,
          content_id: subjectData?.content_id || currentData?.content_id,
          base_points: subjectData?.base_points
        },
        link
      };
    });
  };
  async function setGradePoints(data) {
    const { competition_id, grade, points } = data;
    const pointsToSend = points > 200 ? 200 : points;
    await request(API_DEFINITIONS.SET_GRADE_POINTS, {
      competition_id,
      grade,
      points: pointsToSend
    });
  }
  const getUserLoginForm = async () => {
    const config = get(systemSettingsStore);
    return {
      ...isShupavu ? shupavuLoginFields : loginFields,
      handleSubmit: async (formData) => {
        await loginUser(formData.email, formData.password, formData.phone_number);
      },
      ...isShupavu ? {} : {
        alternativeButtons: [
          ...config?.lms_login_enabled ? [
            {
              label: await getText("c_coach"),
              type: "secondary-outlined-inverted",
              image: "/images/coach-icon.png",
              onClick: () => openCoachApp()
            }
          ] : [],
          {
            label: await getText("c_google"),
            type: "secondary-outlined-inverted",
            image: "/images/google-icon.png",
            onClick: (role) => handleGoogleLogin(role)
          }
        ]
      },
      footer: {
        text: await getText("no_account"),
        button: {
          label: await getText("signup"),
          type: "secondary-outlined-inverted",
          link: config?.principal_enabled ? "/account/signup" : "/account/user/signup"
        }
      },
      forgotPassword: {
        label: await getText("forgot_password"),
        link: "/account/forgot-password"
      },
      role: "login"
    };
  };
  const getSignUpFields = () => {
    if (isGCLC) {
      return gclcSignUpFields;
    }
    if (isShupavu) {
      return shupavuSignupFields;
    }
    return signUpFields;
  };
  const getUserSignUpForm = async () => {
    const config = get(systemSettingsStore);
    return {
      ...getSignUpFields(),
      handleSubmit: async (formData) => {
        await signUpUserUsingFormData(formData);
      },
      ...isShupavu ? {} : {
        alternativeButtons: [
          ...config?.lms_login_enabled ? [
            {
              label: await getText("c_coach"),
              type: "secondary-outlined-inverted",
              image: "/images/coach-icon.png",
              onClick: () => openCoachApp()
            }
          ] : [],
          {
            label: await getText("c_google"),
            type: "secondary-outlined-inverted",
            image: "/images/google-icon.png",
            onClick: (role) => handleGoogleLogin(role)
          }
        ]
      },
      footer: {
        text: await getText("already_account"),
        button: {
          label: await getText("login"),
          type: "secondary-outlined-inverted",
          link: "/account/user/login"
        }
      },
      role: "learner"
    };
  };
  userSignUpFormPopup = async () => ({
    ...await getUserSignUpForm(),
    footer: {
      text: await getText("already_account"),
      button: {
        label: await getText("login"),
        type: "secondary-outlined-inverted",
        onClick: () => {
          authModalStore.set({
            visible: true,
            page: "user-login"
          });
        }
      }
    }
  });
  userLoginFormPopup = async () => ({
    ...await getUserLoginForm(),
    footer: {
      text: await getText("no_account"),
      button: {
        label: await getText("signup"),
        type: "secondary-outlined-inverted",
        onClick: () => {
          authModalStore.set({
            visible: true,
            page: "user-selection"
          });
        }
      }
    }
  });
  forgotPasswordForm = {
    ...forgotPasswordFields,
    footer: {
      text: await getText("back_to_login"),
      button: {
        label: await getText("login"),
        type: "secondary-outlined-inverted",
        link: "/account/user/login"
      }
    },
    role: "learner"
  };
  ({
    footer: {
      text: await getText("back_to_login"),
      button: {
        label: await getText("login")
      }
    }
  });
  signUpUserUsingFormData = async function(formData, userRole = "learner", otpSuccess = false) {
    const config = get(systemSettingsStore);
    const domain = window.location.hostname;
    const userType = isShupavu && domain.includes(config?.safaricom_domain) ? USER_TYPE.Safaricom : void 0;
    const signUpData = remapKeys({
      ...formData,
      name: "",
      profile_picture: (isPocketGames ? getRandomGenericAvatar().id : getRandomAvatar()).toString(),
      role: config?.principal_enabled ? userRole : "learner",
      ...isShupavu && !otpSuccess && {
        otp_type: 1
      },
      ...userType && {
        user_type: userType
      }
    }, {
      email: isGCLC ? "email" : "username",
      turnstileToken: "t_token"
    });
    const instance_id = get(instanceStore).instance_id;
    const apiToCall = isGCLC ? API_DEFINITIONS.EMAIL_SIGNUP : isShupavu && !otpSuccess ? API_DEFINITIONS.OTP_SIGNUP : API_DEFINITIONS.SIGNUP_USER;
    const username = signUpData.username || signUpData.phone_number;
    const password = signUpData.password;
    const data = await request(apiToCall, signUpData, {
      headers: {
        instance_id
      }
    });
    if (data.error_code == 0) {
      if (isShupavu && !otpSuccess) {
        goto();
        otpStore.update((store) => ({
          ...store,
          phone_number: formData.phone_number
        }));
      } else if (data.data.origin) {
        goto("/account/verify", {});
      } else {
        await loginUser(username, password);
      }
    }
  };
  loginUser = async function(username, password, phone) {
    const instance_id = get(instanceStore).instance_id;
    const guestPoints = get(guestStore).points;
    get(competitionStore).url;
    const guestMode = get(guestStore).guest_mode;
    const data = await request(API_DEFINITIONS.LOGIN_USER, {
      username: username || phone,
      password
    }, {
      headers: {
        instance_id
      }
    });
    if (data.error_code == 0 && data.data.length > 0) {
      userStore.set(data.data[0]);
      updateStoreVariable(userStore, "is_guest_mode", false);
      if (get(authModalStore).visible) {
        authModalStore.set({
          visible: false,
          page: ""
        });
        if (guestPoints > 0 && data.data[0].active_role != "principal") {
          await setGradePoints({
            competition_id: get(competitionStore).competition_id,
            grade: get(competitionStore).current_grade,
            points: guestPoints
          });
        }
        if (guestMode) {
          if (data.data[0].active_role == "principal") {
            if (data.data[0].profile_completion_step) {
              goto();
            } else {
              goto();
            }
            updateStoreVariable(guestStore, "guest_mode", false);
          } else {
            goto();
            updateStoreVariable(guestStore, "guest_mode", false);
          }
        } else {
          updateStoreVariable(guestStore, "guest_mode", false);
          goto(page.url.pathname);
        }
        console.log(page, "pagepage");
      } else {
        if (data.data[0].active_role == "principal") {
          if (data.data[0].profile_completion_step) {
            goto();
          } else {
            goto();
          }
        } else {
          goto();
        }
      }
    }
  };
  refreshUserToken = async function(successCallback) {
  };
  resendEmail = async function(formData) {
    const data = await request(API_DEFINITIONS.EMAIL_SIGNUP, formData);
    if (data.error_code == 0) ;
  };
  user_auth_da = Object.freeze(Object.defineProperty({
    __proto__: null,
    forgotPasswordForm,
    getUserLoginForm,
    getUserSignUpForm,
    loginUser,
    refreshUserToken,
    resendEmail,
    signUpUserUsingFormData,
    userLoginFormPopup,
    userSignUpFormPopup
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  IsSinglePlayerMatch as I,
  StartChallenge as S,
  __tla,
  refreshUserToken as a,
  userSignUpFormPopup as b,
  userLoginFormPopup as c,
  user_auth_da as d,
  forgotPasswordForm as f,
  loginUser as l,
  resendEmail as r,
  signUpUserUsingFormData as s,
  updateGameData as u
};
