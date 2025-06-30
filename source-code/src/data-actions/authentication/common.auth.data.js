import { getText, t } from "../../stores/language.store";
import { PUBLIC_LMS_URL, PUBLIC_TURNSTILE_KEY } from "$env/static/public";
import { authModalStore } from "../../stores/auth.modal.store";
import { goto } from "$app/navigation";
import { showSuccess, showWarning } from "../../stores/toast.store";
import { userStore } from "../../stores/user.store";
import { PUBLIC_GOOGLE_CLIENT_ID } from "$env/static/public";
import { request } from "$lib/api.service";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { instanceStore } from "../../stores/instance.store";
import { get, readonly } from "svelte/store";
import { PUBLIC_GOOGLE_ACCOUNT_OAUTH_URL } from "$env/static/public";
import { openIframe } from "../../stores/iframeStore";
import { getInstanceText, getInstanceTextAsync, waitForInstance } from "$lib/utils";
import { getRandomAvatar } from "$lib/avatar";
import { otpStore } from "../../stores/otp.store";
import { resetGuestStore } from "../../stores/guest.store";
import { systemSettingsStore } from "../../stores/systemsettings.store";

export const signUpFields = {
  title: await getText("get_started"),
  fields: [
    {
      name: "email",
      type: "email",
      label: await getText("email"),
      placeholder: await getText("enter_your_email"),
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: await getText("password"),
      placeholder: await getText("enter_your_password"),
      required: true,
      showPasswordStrength: true,
    },
  ],
  buttons: [
    {
      label: await getText("signup"),
      customClass: "w-full",
      type: "submit",
    },
  ],
  enableTurnstile: true,
  turnstileSiteKey: PUBLIC_TURNSTILE_KEY,
};

export const gclcSignUpFields = {
  title: await getText("get_started"),
  fields: [
    {
      name: "email",
      type: "email",
      label: await getText("email"),
      placeholder: await getText("enter_your_email"),
      required: true,
    },
  ],
  buttons: [
    {
      label: await getText("signup"),
      customClass: "w-full",
      type: "submit",
    },
  ],
  enableTurnstile: true,
  turnstileSiteKey: PUBLIC_TURNSTILE_KEY,
};
export const loginFields = {
  title: await getText("welcome"),
  fields: [
    {
      name: "email",
      type: "email",
      label: await getText("email"),
      placeholder: await getText("enter_your_email"),
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: await getText("password"),
      placeholder: await getText("enter_your_password"),
      required: true,
    },
  ],
  buttons: [
    {
      label: await getText("login"),
      type: "submit",
      customClass: "w-full",
    },
  ],
  enableTurnstile: false,
  turnstileSiteKey: "site-key",
};

export const userSelectionCards = async () => [
  {
    image: "/images/learner-icon.svg",
    title: await getText("a_learner"),
    description: await getText("play_fun_games"),
    link: "/account/user/signup",
  },
  {
    image: "/images/institute-icon.svg",
    title: await getInstanceTextAsync("an_institute"),
    description: await getInstanceTextAsync("empower"),
    link: "/account/institution/signup",
  },
];

export const userSelectionCardsPopup = async () => [
  {
    image: "/images/learner-icon.svg",
    title: await getText("a_learner"),
    description: await getText("play_fun_games"),
    onClick: () => {
      authModalStore.set({ visible: true, page: "user-signup" });
    },
  },
  {
    image: "/images/institute-icon.svg",
    title: await getInstanceTextAsync("an_institute"),
    description: await getInstanceTextAsync("empower"),
    onClick: () => {
      authModalStore.set({ visible: true, page: "institution-signup" });
    },
  },
];

/**
 * FORGOT PASSWORD FORM FIELDS
 */

export const forgotPasswordFields = {
  title: await getText("forgot_password"),
  fields: [
    {
      name: "email",
      type: "email",
      label: await getText("email"),
      placeholder: await getText("enter_your_email"),
      required: true,
    },
  ],
  buttons: [
    {
      label: await getText("send_reset_link"),
      type: "submit",
      customClass: "w-full",
    },
  ],
  enableTurnstile: true,
  turnstileSiteKey: PUBLIC_TURNSTILE_KEY,
};

/**
 * RESET PASSWORD FORM FIELDS
 */

export const resetPasswordFields = {
  title: await getText("reset_password"),
  fields: [
    {
      name: "password",
      type: "password",
      label: await getText("enter_new_password"),
      placeholder: await getText("enter_your_new_password"),
      required: true,
      showPasswordStrength: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      label: await getText("confirm_new_password"),
      placeholder: await getText("re_enter_new_password"),
      required: true,
    },
  ],
  buttons: [
    {
      label: await getText("reset_password"),
      type: "submit",
      customClass: "w-full",
    },
  ],
  enableTurnstile: false,
  turnstileSiteKey: "site-key",
};

/**
 * EMAIL PASSWORD SETUP
 */
export const emailVerificationFieldsSetup = {
  title: await getText("get_started"),
  fields: [
    {
      name: "password",
      type: "password",
      label: await getText("password"),
      placeholder: await getText("password"),
      required: true,
      showPasswordStrength: true,
    },
  ],
  buttons: [
    {
      label: await getText("signup"),
      type: "submit",
      customClass: "w-full",
    },
  ],
  footer: {
    text: await getText("already_account"),
    button: {
      label: await getText("login"),
      type: "secondary-outlined-inverted",
      link: "/account/user/login",
    },
  },
  handleSubmit: async (/** @type {any} */ formData) => {
    handleAccountVerification(formData);
  },
  enableTurnstile: true,
  turnstileSiteKey: PUBLIC_TURNSTILE_KEY,
};

export const shupavuLoginFields = {
  title: await getText("welcome"),
  fields: [
    {
      name: "phone_number",
      type: "tel",
      label: await getText("phone_number"),
      prefix: "+254",
      required: true,
      placeholder: await getText("enter_phone_number"),
    },
    {
      name: "password",
      type: "password",
      label: await getText("password"),
      placeholder: await getText("enter_your_password"),
      required: true,
    },
  ],
  buttons: [
    {
      label: await getText("login"),
      type: "submit",
      customClass: "w-full",
    },
  ],
  enableTurnstile: false,
  turnstileSiteKey: "site-key",
};

export const shupavuSignupFields = {
  title: await getText("enter_phone_number_continue"),
  fields: [
    {
      name: "phone_number",
      type: "tel",
      label: await getText("phone_number"),
      prefix: "+254",
      required: true,
      placeholder: await getText("enter_phone_number"),
    },
  ],
  buttons: [
    {
      label: await getText("signup"),
      type: "submit",
      customClass: "w-full",
    },
  ],
  enableTurnstile: true,
  turnstileSiteKey: PUBLIC_TURNSTILE_KEY,
};

/*
 * SHUPAVU FORGOT PASSWORD FORM FIELDS
 */
export const shupavuForgotPasswordFields = {
  title: await getText("reset_your_password"),
  fields: [
    {
      name: "phone_number",
      type: "tel",
      label: await getText("phone_number"),
      prefix: "+254",
      required: true,
      placeholder: await getText("enter_phone_number"),
    },
  ],
  buttons: [
    {
      label: await getText("next"),
      type: "submit",
      customClass: "w-full",
    },
  ],
  footer: {
    text: await getText("already_account"),
    button: {
      label: await getText("login"),
      type: "secondary-outlined-inverted",
      link: "/account/user/login",
    },
  },
  enableTurnstile: true,
  turnstileSiteKey: PUBLIC_TURNSTILE_KEY,
};

/**
 * OTP VERIFICATION SETUP
 */
export const getOtpVerificationFields = async () => {
  const { is_otp_verified } = get(otpStore);
  return {
    title: await getText("confirm_your_number"),
    fields: [
      {
        name: "otp",
        type: "text",
        label: await getText("otp_code"),
        placeholder: await getText("enter_code"),
        required: true,
        readonly: is_otp_verified,
      },
      {
        name: "password",
        type: "password",
        label: await getText("password"),
        placeholder: await getText("password"),
        required: true,
        isShow: false,
        showPasswordStrength: true,
      },
    ],
    buttons: [
      {
        label: await getText("verify"),
        type: "submit",
        customClass: "w-full",
      },
    ],
    footer: {},
    handleSubmit: async (/** @type {any} */ formData) => {
      const { is_otp_verified, phone_number, otp_forgot_password } = get(otpStore);

      if (is_otp_verified) {
        const updatedFormData = {
          ...formData,
          phone_number,
          username: "",
        };
        if (otp_forgot_password) {
          handleOtpVerificationForgotPassword(formData);
        } else {
          const { signUpUserUsingFormData } = await import("./user.auth.da");
          signUpUserUsingFormData(updatedFormData, "learner", true);
        }
      } else {
        handleOtpVerification(formData);
      }
    },
    enableTurnstile: true,
    turnstileSiteKey: PUBLIC_TURNSTILE_KEY,
  };
};

/**
 * Handles OTP verification for the "Forgot Password" flow.
 * Sends the OTP and new password to the API for verification.
 * If successful, shows a success message and logs in the user.
 *
 * @param {{ otp: string; password: string }} data - The OTP and new password entered by the user.
 * @returns {Promise<void>} A promise that resolves when the process is complete.
 */
export const handleOtpVerificationForgotPassword = async (data) => {
  const { user_id, phone_number } = get(otpStore);
  const { error_code } = await request(API_DEFINITIONS.OTP_RECOVER_MOBILE, {
    otp: data.otp,
    password: data.password,
    user_id: user_id,
  });

  if (error_code === 0) {
    showSuccess(await getText("password_changed_text"));
    const { loginUser } = await import("./user.auth.da");
    await loginUser("", data.password, phone_number);
  }
};

/**
/**
 * @param {boolean | undefined} [isToast]
 */
export async function logoutUser(isToast) {
  if (localStorage) {
    userStore.set({});
    localStorage.clear();
    resetGuestStore();
  }
  if (sessionStorage) {
    sessionStorage.clear();
  }
  if (isToast) {
    showWarning(await getText("logout_message"));
  }
  goto("/");
}

/**
 * @param {string} role
 */
export function handleGoogleLogin(role) {
  const currentPage = window.location.href;
  const isGuestMode = get(userStore).is_guest_mode;
  const params = new URLSearchParams({
    client_id: PUBLIC_GOOGLE_CLIENT_ID,
    redirect_uri: `${window.location.origin}/auth/google`,
    response_type: "token",
    scope: "openid email profile",
    prompt: "select_account",
  });
  const stateData = {
    defaultUrl: currentPage,
    ...(isGuestMode ? { returnUrl: currentPage, role } : { role }),
  };

  params.append("state", encodeURIComponent(JSON.stringify(stateData)));
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

/**
 * @param {object} data
 * @param {string} accessToken
 * @param {number} type
 * @param {Function} callback
 * @param {string} role
 */
export const handleSocialLogin = async (data, accessToken, type, callback = () => {}, role) => {
  const instance_id = get(instanceStore).instance_id;
  const config = get(systemSettingsStore);
  const userRole = config?.principal_enabled ? role : "learner";

  const requestData = {
    action_type: userRole,
    email: data?.email,
    login_type: type,
    token: accessToken,
    role: userRole,
  };

  const response = await request(API_DEFINITIONS.SOCIAL_LOGIN, requestData, {
    headers: {
      instance_id: instance_id,
    },
  });
  if (response.error_code == 0 && response.data.length > 0) {
    userStore.set(response.data[0]);
    let navigateTo = "/competitions";

    if (response.data[0].active_role === "principal") {
      navigateTo = response.data[0].profile_completion_step ? "/admin/competitions" : "/account/institution/details";
    }
    await goto(navigateTo);
    if (typeof callback === "function") {
      callback();
    }
  }
  return response;
};

/**
 * @param {string} hash
 */
export async function fetchGoogleUserInfo(hash) {
  const params = new URLSearchParams(hash.replace("#", "?"));
  const accessToken = params.get("access_token");
  const isGuestMode = get(userStore).is_guest_mode;
  let returnUrl = null,
    defaultUrl = null,
    role = null;

  if (params.has("state")) {
    const stateData = JSON.parse(decodeURIComponent(params.get("state") || ""));
    ({ returnUrl, defaultUrl, role } = stateData);
  }
  if (accessToken) {
    const response = await request(
      API_DEFINITIONS.GOOGLE_USER,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    const res = await handleSocialLogin(response, accessToken, 3, undefined, role);

    if (returnUrl) {
      goto(returnUrl);
    }
    if (res?.error_code !== 0 && !isGuestMode) {
      goto(defaultUrl);
    }
  }
}

export function openCoachApp() {
  const authModalState = get(authModalStore);
  if (authModalState.visible) {
    authModalStore.set({ visible: false, page: "" });
  }
  window.dispatchEvent(new Event("loaderStart"));
  openIframe(PUBLIC_LMS_URL);
}

export const handleAccountVerification = async (data) => {
  const urlParams = new URLSearchParams(window.location.search);
  const config = get(systemSettingsStore);

  const changeCode = urlParams.get("change_code") || "";
  const userRole = urlParams.get("role") || "";
  const index = urlParams.get("index") || "";

  const requestData = {
    change_code: changeCode,
    profile_picture: getRandomAvatar().toString(),
    password: data?.password,
    t_token: data?.turnstileToken,
    role: config?.principal_enabled ? userRole : "learner",
    index: index,
  };

  const response = await request(API_DEFINITIONS.EMAIL_SIGNUP_VERIFICATION, requestData, {});
  if (response.error_code == 0) {
    const { loginUser } = await import("./user.auth.da");
    await loginUser(response?.data?.email, data?.password);
  }
};
export const handleOtpVerification = async (data) => {
  const otpData = get(otpStore);
  const { turnstileToken, ...filteredData } = data;
  const requestData = {
    ...filteredData,
    phone_number: otpData.phone_number,
    t_token: turnstileToken,
    otp: data.otp,
  };

  const response = await request(API_DEFINITIONS.OTP_VERIFY, requestData, {});
  if (response.error_code == 0) {
    otpStore.update((store) => ({
      ...store,
      is_otp_verified: true,
      user_id: response?.data?.user_id,
    }));
  }
};
