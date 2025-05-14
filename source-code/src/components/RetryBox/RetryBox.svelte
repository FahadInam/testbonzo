<script>
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import Button from "../Button/Button.svelte";
  import { t } from "../../stores/language.store";
  import { refreshUserToken } from "../../data-actions/authentication/user.auth.da";

  export let retryLabel = "Retry";
  let isVisible = false;
  let isForceVisible = false;
  let message = "";
  let showLoader = false;
  /**
   * @type {() => void}
   */
  let retryCB;

  // @ts-ignore
  const showError = (e) => {
    if (e.detail.status == 401) {
      refreshUserToken(e.detail.retryCallback);
      return;
    }
    message = e.detail.message;
    retryCB = e.detail.retryCallback;
    isForceVisible = true;
    isVisible = true;
  };

  onMount(() => {
    if (browser) {
      window.addEventListener("apiError", showError);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("apiError", showError);
    }
  });

  const handleRetry = () => {
    showLoader = true;
    isForceVisible = false;
    retryCB();

    setTimeout(() => {
      showLoader = false;
      if (!isForceVisible) {
        isVisible = false;
      }
    }, 300);
  };
</script>

<div>
  {#if isVisible || isForceVisible}
    <div
      class="fixed px-4 text-center inset-0 z-50 flex items-center justify-center bg-white flex flex-col space-y-5"
    >
      <div class="text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 1a11 11 0 100 22 11 11 0 000-22z"
          />
        </svg>
      </div>
      <div class="text-2xl font-bold">{$t("unable_to_connect")}</div>
      <div>
        {$t("request_failed")}
      </div>
      {#if showLoader}
        <div
          class="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"
        ></div>
      {:else}
        <Button label={retryLabel} onClick={handleRetry} />
      {/if}
      <div class="flex text-gray-500">Developer Message: {message}</div>
    </div>
  {/if}
</div>

<style>
  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: #3498db;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
