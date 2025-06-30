<script>
  import { forgotPasswordForm, resetPasswordForm } from "../../../data-actions/authentication/user.auth.da";
  import AuthenticationView from "../../../views/AuthenticationView/AuthenticationView.svelte";
  import { request } from "$lib/api.service";
  import { API_DEFINITIONS } from "../../../apis/api.definitions";
  import { getText, t } from "../../../stores/language.store";
  import { showSuccess } from "../../../stores/toast.store";
  import SuccessMessage from "../../../components/SuccessMessage/SuccessMessage.svelte";
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import { sideBarAndAppBarSettings } from "$lib/utils";
  import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage.svelte";
  import { isShupavu } from "../../../data-actions/system/system..da";
  import { shupavuForgotPasswordFields } from "../../../data-actions/authentication/common.auth.data";
  import { goto } from "$app/navigation";
  import { instanceStore } from "../../../stores/instance.store";
  import { get } from "svelte/store";
  import { otpStore } from "../../../stores/otp.store";

  // Local reactive variables
  let isEmailSent = false;
  let isPasswordReset = false;
  let userEmail = "";
  let changeCode = "";
  let userId = "";
  let hasChangeCode = false;

  // Create forgot password forms with custom submit handlers
  const modifiedForgotPasswordForm = {
    ...forgotPasswordForm,
    handleSubmit: async (formData) => {
      const { error_code } = await request(API_DEFINITIONS.FORGOT_PASSWORD, {
        email: formData.email,
        t_token: formData.turnstileToken,
      });

      if (error_code === 0) {
        showSuccess(await getText("password_reset_email_sent"));
        isEmailSent = true;
        userEmail = formData.email;
      }
    },
  };

  // Create reset password forms with custom submit handlers
  const modifiedResetPasswordForm = {
    ...resetPasswordForm,
    handleSubmit: async (formData) => {
      const { error_code } = await request(API_DEFINITIONS.RESET_PASSWORD, {
        change_code: changeCode,
        password: formData.password,
        user_id: userId,
      });

      if (error_code === 0) {
        showSuccess(await getText("password_reset_success"));
        isPasswordReset = true;
      }
    },
  };

  // Create shupavu forgot password fields
  const modifiedShupavuForgotPasswordForm = {
    ...shupavuForgotPasswordFields,
    handleSubmit: async (formData) => {
      //console.log("formData--->", formData);
      const instance_id = get(instanceStore).instance_id;
      const { error_code } = await request(
        API_DEFINITIONS.OTP_SIGNUP,
        {
          otp_type: 2,
          phone_number: formData.phone_number,
          t_token: formData.turnstileToken,
        },
        {
          headers: {
            instance_id: instance_id,
          },
        },
      );

      if (error_code === 0) {
        showSuccess(await getText("otp_send_text"));
        otpStore.update((store) => ({
          ...store,
          phone_number: formData.phone_number,
          otp_forgot_password: true, // indicates this is for forgot password
        }));
        goto("/account/verify-code");
      }
    },
  };

  // Setup and cleanup functions
  function setupPage() {
    // Extract URL parameters
    const urlParams = new URLSearchParams($page.url.search);
    changeCode = urlParams.get("change_code") || "";
    userId = urlParams.get("id") || "";
    hasChangeCode = Boolean(changeCode);

    // Configure UI
    sideBarAndAppBarSettings(false, "back", "/account/user/login");
  }

  onMount(() => {
    // call setupPage
    setupPage();
  });

  onDestroy(() => {
    sideBarAndAppBarSettings(true, "back", "/");
  });
  $: console.log("isShupavu", isShupavu);
</script>

{#if isShupavu}
  <div class="w-full">
    <AuthenticationView form={modifiedShupavuForgotPasswordForm} />
  </div>
{:else if isPasswordReset}
  <div class="w-full">
    <BackgroundImage />
    <SuccessMessage
      title={$t("password_reset")}
      message={$t("password_reset_message")}
      buttonLink="/account/user/login"
    />
  </div>
{:else if hasChangeCode}
  <AuthenticationView form={modifiedResetPasswordForm} showBackButton={false} />
{:else if isEmailSent}
  <div class="w-full">
    <BackgroundImage />
    <SuccessMessage
      title={$t("reset_link_sent")}
      message={$t("reset_link_sent_message")}
      buttonLink="/account/user/login"
      {userEmail}
    />
  </div>
{:else}
  <AuthenticationView form={modifiedForgotPasswordForm} />
{/if}
