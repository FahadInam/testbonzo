<script>
  import { onMount, onDestroy } from "svelte";
  import { otpStore } from "../../stores/otp.store";
  import { resendOtp } from "../../data-actions/authentication/user.auth.da";
  import { t } from "../../stores/language.store";
  import { showError } from "../../stores/toast.store";

  let timer = 0;
  let clickCount = 0;
  let isDisabled = true;
  /**
   * @type {undefined}
   */
  export let token;
  /**
   * @type {() => void}
   */
  export let resetTurnstile;
  /**
   * @type {number | undefined}
   */
  let intervalId;
  $: isOtpVerified = $otpStore.is_otp_verified;

  /**
   * @param {number} seconds
   */
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  }

  /**
   * @param {number} seconds
   */
  function startTimer(seconds) {
    timer = seconds;
    isDisabled = true;
    if (intervalId !== undefined) clearInterval(intervalId);

    intervalId = setInterval(() => {
      timer -= 1;
      if (timer <= 0) {
        clearInterval(intervalId);
        intervalId = undefined;
        isDisabled = false;
      }
    }, 1000);
  }
  async function handleResendOtp() {
    if (isDisabled) return;

    try {
      if (!token) {
        showError($t("complete_captcha"));
        return;
      }
      await resendOtp(token);
      clickCount += 1;
      const delay = clickCount === 1 ? 120 : 300;
      startTimer(delay);
      resetTurnstile();
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  }

  onMount(() => {
    isDisabled = true;
    startTimer(30);
  });
  onDestroy(() => {
    if (intervalId !== undefined) clearInterval(intervalId);
  });
</script>

{#if !isOtpVerified}
  <button
    class="resend-btn bg-transparent border-0 font-medium text-base text-gray-700 p-0 cursor-pointer"
    class:disabled={isDisabled}
    on:click={handleResendOtp}
    disabled={isDisabled}
    type="button"
  >
    {#if isDisabled}
      Resend in {formatTime(timer)}
    {:else}
      {$t("resend_code")}
    {/if}
  </button>
{/if}

<style>
  .resend-btn {
    transition: opacity 0.3s ease;
  }

  .resend-btn.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  }
</style>
