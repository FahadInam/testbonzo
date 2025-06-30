<script>
  import Button from "../../../components/Button/Button.svelte";
  import Modal from "../../../components/Modal/Modal.svelte";
  import PopupScreen from "../../../components/PopupScreen/PopupScreen.svelte";
  import { page } from "$app/stores";
  import Form from "../../../components/Form/Form.svelte";
  import { PUBLIC_TURNSTILE_KEY } from "$env/static/public";
  import { resendEmail, signUpUserUsingFormData } from "../../../data-actions/authentication/user.auth.da";
  import { t } from "../../../stores/language.store";
  import { afterNavigate } from "$app/navigation";
  import { navigationStore, setBackUrl } from "../../../stores/navigation.store";
  import AuthenticationView from "../../../views/AuthenticationView/AuthenticationView.svelte";
  import { getOtpVerificationFields } from "../../../data-actions/authentication/common.auth.data";
  import { otpStore } from "../../../stores/otp.store";
  import { onMount } from "svelte";

  // debugger;
  /**
   * @type {{ title: any; fields: ({ name: string; type: string; label: any; placeholder: any; required: boolean; readonly: boolean; isShow?: undefined; } | { name: string; type: string; label: any; placeholder: any; required: boolean; isShow: boolean; readonly?: undefined; })[]; buttons: { label: any; type: string; customClass: string; }[]; footer: { text: any; button: { label: any; type: string; link: string; }; }; handleSubmit: (formData: any) => Promise<void>; enableTurnstile: boolean; turnstileSiteKey: string; }}
   */
  let otpVerificationFields;

  onMount(async () => {
    otpVerificationFields = await getOtpVerificationFields();
    otpStore.update((store) => ({
      ...store,
      is_otp_verified: false,
    }));
    if (!$otpStore.phone_number) {
      window.history.back();
    }
  });

  afterNavigate(({ from }) => {
    const previousURL = from?.url?.pathname ?? "/";
    setBackUrl(previousURL);
  });

  $: isOtpVerified = $otpStore.is_otp_verified;

  $: filteredOtpVerificationField = {
    ...otpVerificationFields,
    fields: otpVerificationFields?.fields
      .map((field) => {
        if (field.name === "password") {
          return { ...field, isShow: isOtpVerified };
        }
        if (field.name === "otp") {
          return { ...field, readonly: isOtpVerified };
        }
        return field;
      })
      .filter((field) => field.isShow !== false),
  };
</script>

{#if otpVerificationFields && otpVerificationFields.fields.length > 0}
  <AuthenticationView form={filteredOtpVerificationField} />
{/if}
