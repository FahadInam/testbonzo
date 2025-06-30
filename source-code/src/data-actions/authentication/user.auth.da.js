import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { request } from "$lib/api.service";
import { remapKeys, updateStoreVariable } from "$lib/utils";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { authModalStore } from "../../stores/auth.modal.store";
import { getText } from "../../stores/language.store";
import { showError, showSuccess } from "../../stores/toast.store";
import { userStore } from "../../stores/user.store";
import {
  forgotPasswordFields,
  gclcSignUpFields,
  handleGoogleLogin,
  loginFields,
  logoutUser,
  openCoachApp,
  resetPasswordFields,
  shupavuLoginFields,
  shupavuSignupFields,
  signUpFields,
} from "./common.auth.data";
import { page } from "$app/state";
import { instanceStore } from "../../stores/instance.store";
import { isGCLC, isPocketGames, isShupavu } from "../system/system..da";
import { otpStore } from "../../stores/otp.store";
import { getRandomAvatar, getRandomGenericAvatar } from "$lib/avatar";
import { guestStore } from "../../stores/guest.store";
import { competitionStore } from "../../stores/competition.store";
import { gradesStore } from "../../stores/grades.store";
import { setGradePoints } from "../challenge/challenge.da";
import { systemSettingsStore } from "../../stores/systemsettings.store";
import { USER_TYPE } from "$lib/constants/user.constants";

/*
 *
 * DATA
 *
 */
export const getUserLoginForm = async () => {
  const config = get(systemSettingsStore);

  return {
    ...(isShupavu ? shupavuLoginFields : loginFields),
    handleSubmit: async (/** @type {any} */ formData) => {
      await loginUser(formData.email, formData.password, formData.phone_number);
    },
    ...(isShupavu
      ? {}
      : {
          alternativeButtons: [
            ...(config?.lms_login_enabled
              ? [
                  {
                    label: await getText("c_coach"),
                    type: "secondary-outlined-inverted",
                    image: "/images/coach-icon.png",
                    onClick: () => openCoachApp(),
                  },
                ]
              : []),
            {
              label: await getText("c_google"),
              type: "secondary-outlined-inverted",
              image: "/images/google-icon.png",
              /** @param {string} role */
              onClick: (role) => handleGoogleLogin(role),
            },
          ],
        }),
    footer: {
      text: await getText("no_account"),
      button: {
        label: await getText("signup"),
        type: "secondary-outlined-inverted",
        //link: "/account/user/signup",
        link: config?.principal_enabled ? "/account/signup" : "/account/user/signup",
      },
    },
    forgotPassword: {
      label: await getText("forgot_password"),
      link: "/account/forgot-password",
    },
    role: "login",
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

export const getUserSignUpForm = async () => {
  const config = get(systemSettingsStore);

  return {
    ...getSignUpFields(),
    handleSubmit: async (/** @type {any} */ formData) => {
      await signUpUserUsingFormData(formData);
    },
    ...(isShupavu
      ? {}
      : {
          alternativeButtons: [
            ...(config?.lms_login_enabled
              ? [
                  {
                    label: await getText("c_coach"),
                    type: "secondary-outlined-inverted",
                    image: "/images/coach-icon.png",
                    onClick: () => openCoachApp(),
                  },
                ]
              : []),
            {
              label: await getText("c_google"),
              type: "secondary-outlined-inverted",
              image: "/images/google-icon.png",
              /** @param {string} role */
              onClick: (role) => handleGoogleLogin(role),
            },
          ],
        }),
    footer: {
      text: await getText("already_account"),
      button: {
        label: await getText("login"),
        type: "secondary-outlined-inverted",
        link: "/account/user/login",
      },
    },
    role: "learner",
  };
};

export const userSignUpFormPopup = async () => ({
  ...(await getUserSignUpForm()),
  footer: {
    text: await getText("already_account"),
    button: {
      label: await getText("login"),
      type: "secondary-outlined-inverted",
      onClick: () => {
        authModalStore.set({ visible: true, page: "user-login" });
      },
    },
  },
});

export const userLoginFormPopup = async () => ({
  ...(await getUserLoginForm()),
  footer: {
    text: await getText("no_account"),
    button: {
      label: await getText("signup"),
      type: "secondary-outlined-inverted",
      onClick: () => {
        authModalStore.set({ visible: true, page: "user-selection" });
      },
    },
  },
});

export const forgotPasswordForm = {
  ...forgotPasswordFields,
  footer: {
    text: await getText("back_to_login"),
    button: {
      label: await getText("login"),
      type: "secondary-outlined-inverted",
      link: "/account/user/login",
    },
  },
  role: "learner",
};

export const resetPasswordForm = {
  ...resetPasswordFields,
  footer: {
    text: await getText("back_to_login"),
    button: {
      label: await getText("login"),
      type: "secondary-outlined-inverted",
      link: "/account/user/login",
    },
  },
  role: "learner",
};

/*
 *
 * FUNCTIONS
 *
 */

/**
 * @param {Record<string, any>} formData
 */
export async function signUpUserUsingFormData(formData, userRole = "learner", otpSuccess = false) {
  const config = get(systemSettingsStore);
  const domain = window.location.hostname;
  const userType = isShupavu && domain.includes(config?.safaricom_domain) ? USER_TYPE.Safaricom : undefined;

  const signUpData = remapKeys(
    {
      ...formData,
      name: "",
      profile_picture: (isPocketGames ? getRandomGenericAvatar().id : getRandomAvatar()).toString(),
      role: config?.principal_enabled ? userRole : "learner",
      ...(isShupavu && !otpSuccess && { otp_type: 1 }),
      ...(userType && { user_type: userType }),
    },

    { email: isGCLC ? "email" : "username", turnstileToken: "t_token" },
  );
  const instance_id = get(instanceStore).instance_id;
  const apiToCall = isGCLC
    ? API_DEFINITIONS.EMAIL_SIGNUP
    : isShupavu && !otpSuccess
      ? API_DEFINITIONS.OTP_SIGNUP
      : API_DEFINITIONS.SIGNUP_USER;
  const username = signUpData.username || signUpData.phone_number;
  const password = signUpData.password;
  const data = await request(apiToCall, signUpData, {
    headers: {
      instance_id: instance_id,
    },
  });
  if (data.error_code == 0) {
    if (isShupavu && !otpSuccess) {
      showSuccess(await getText("otp_send_text"));
      goto("/account/verify-code");
      otpStore.update((store) => ({
        ...store,
        phone_number: formData.phone_number,
        otp_forgot_password: false,
      }));
    } else if (data.data.origin) {
      goto("/account/verify", {
        state: {
          data: signUpData,
        },
      });
    } else {
      await loginUser(username, password);
    }
  }
}

/**
 * @param {string} username
 * @param {string} password
 */
export async function loginUser(username, password, phone) {
  const instance_id = get(instanceStore).instance_id;
  const guestPoints = get(guestStore).points;
  const url = get(competitionStore).url;
  const guestMode = get(guestStore).guest_mode;

  const data = await request(
    API_DEFINITIONS.LOGIN_USER,
    {
      username: username || phone,
      password: password,
    },
    {
      headers: {
        instance_id: instance_id,
      },
    },
  );
  if (data.error_code == 0 && data.data.length > 0) {
    userStore.set(data.data[0]);
    updateStoreVariable(userStore, "is_guest_mode", false);
    if (get(authModalStore).visible) {
      authModalStore.set({ visible: false, page: "" });
      if (guestPoints > 0 && data.data[0].active_role != "principal") {
        await setGradePoints({
          competition_id: get(competitionStore).competition_id,
          grade: get(competitionStore).current_grade,
          points: guestPoints,
        });
      }
      if (guestMode) {
        if (data.data[0].active_role == "principal") {
          if (data.data[0].profile_completion_step) {
            goto("/admin/competitions");
          } else {
            goto("/account/institution/details");
          }
          updateStoreVariable(guestStore, "guest_mode", false);
        } else {
          goto(`/competitions/${url}/home`);
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
          goto("/admin/competitions");
        } else {
          goto("/account/institution/details");
        }
      } else {
        goto("/competitions");
      }
    }
  }
}

/**
 * @param {() => void} successCallback
 */
export async function refreshUserToken(successCallback) {
  if (browser) {
    let data = null;
    const refreshToken = get(userStore).refresh_token;

    if (!refreshToken) {
      return logoutUser(true);
    }

    try {
      data = await request(
        API_DEFINITIONS.TOKEN_REFRESH,
        {},
        {
          headers: { Authorization: "Bearer " + refreshToken },
          allowFailing: true,
        },
      );
    } catch {
      return logoutUser(true);
    }
    if (data && data.error_code == 0) {
      userStore.set(data.data[0]);
      successCallback();
    } else {
      logoutUser(true);
    }
  }
}

/**
 * @param {Record<string, any>} formData
 */
export async function resendEmail(formData) {
  const data = await request(API_DEFINITIONS.EMAIL_SIGNUP, formData);
  if (data.error_code == 0) {
    showSuccess("Email sent successfully!");
  }
}

/**
 * @param {undefined} [token]
 */
export async function resendOtp(token) {
  const otpData = get(otpStore);
  const instance_id = get(instanceStore).instance_id;

  const data = await request(
    API_DEFINITIONS.OTP_SIGNUP,
    {
      otp_type: 2,
      phone_number: otpData.phone_number,
      t_token: token,
    },
    {
      headers: {
        instance_id: instance_id,
      },
    },
  );
  if (data.error_code == 0) {
    showSuccess(await getText("otp_send_text"));
  }
}
