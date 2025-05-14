<script>
    import Button from "../../../components/Button/Button.svelte";
import Modal from "../../../components/Modal/Modal.svelte";
    import PopupScreen from "../../../components/PopupScreen/PopupScreen.svelte";
    import { page } from '$app/stores';
    import Form from "../../../components/Form/Form.svelte";
    import { PUBLIC_TURNSTILE_KEY } from "$env/static/public";
    import { resendEmail, signUpUserUsingFormData } from "../../../data-actions/authentication/user.auth.da";
    import {t} from "../../../stores/language.store"
    import { afterNavigate } from "$app/navigation";
    import { navigationStore, setBackUrl } from "../../../stores/navigation.store";
    import AuthenticationView from "../../../views/AuthenticationView/AuthenticationView.svelte";
    import { otpVerificationField } from "../../../data-actions/authentication/common.auth.data";
    import { otpStore } from "../../../stores/otp.store";
    import { onMount } from "svelte";
  

      onMount(() => {
    otpStore.update(store => ({
      ...store,
      is_otp_verified: false
    }));
     if (!$otpStore.phone_number) {
      window.history.back();
     }
  });

  afterNavigate(({ from }) => {
    const previousURL = from?.url?.pathname ?? "/";
    setBackUrl(previousURL)
});
  
$: isOtpVerified = $otpStore.is_otp_verified;

  $: filteredOtpVerificationField = {
    ...otpVerificationField ,
    fields: otpVerificationField .fields.map(field => {
      if (field.name === "password") {
        return { ...field, isShow: isOtpVerified };
      }
      return field;
    }).filter(field => field.isShow !== false),
  };
</script>
  <AuthenticationView form={filteredOtpVerificationField}  />
