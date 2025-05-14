<script>
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import Button from "../Button/Button.svelte";
  import { t } from "../../stores/language.store";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { appbarStore } from "../../stores/appbar.store";

  export let url = "";
  export let showIframe = true;
  export let onClose = () => {};
  export let messageContent = "";

  let loading = true;
  let continueTimer = true;
  let iframeRef;
  let messageData = writable("");

  /**
   * @type { any[]}
   */
  let intervalId;

  function onLoad() {
    loading = false;
  }

  appbarStore.set({
    visible: false,
    isLogoVisible: false,
    isProfileVisible: false,
  });

  function handleMessage(event) {
    const allowedOrigins = [
      "http://localhost:5173",
      "globalclimateliteracy.org",
      "localhost",
      ".netlify.app",
      "knowledgeplatform",
    ];

    if (
      event.origin !== "*" &&
      !allowedOrigins.some((origin) => event.origin.includes(origin))
    ) {
      console.warn("Received message from untrusted origin:", event.origin);
      return;
    }

    const { type, payload } = event.data;
    if (type === "RESPONSE") {
      continueTimer = false;
      if (payload === "ABC") console.log("payload: ", payload);
    } else {
      console.warn("Unknown message type:", type);
    }
  }

  function sendMessageToIframe() {
    if (!iframeRef.contentWindow) return;

    messageData.update((data) => {
      console.log(data, "data");
      if (data && data.length > 0) {
        setTimeout(() => {
          // if (iframeRef && iframeRef.contentWindow) {
          const message = { type: "CERT_DATA", payload: data };
          console.log(message, "message");
          iframeRef.contentWindow.postMessage(message, "*"); // Change '*' to the actual origin if known
          // }
        }, 500);
      }
      return data;
    });
  }

  onMount(() => {
    window.addEventListener("message", handleMessage);

    intervalId = setInterval(() => {
      if (continueTimer) {
        if (showIframe && !loading && messageContent?.length > 0) {
          messageData.set(messageContent);
          sendMessageToIframe();
        }
      }
    }, 5000);
  });

  onDestroy(() => {
    window.removeEventListener("message", handleMessage);
    clearInterval(intervalId);
    loading = true;
    continueTimer = true;
  });

  // Reactive statement to trigger message sending when messageContent changes
  $: if (messageContent?.length > 0) {
    messageData.set(messageContent);
  }
</script>

<div
  class="fixed inset-0 bg-white shadow-lg flex flex-col overflow-hidden w-full h-full z-[9999]"
>
  <!-- Close button -->
  <div class="absolute z-10 right-4 top-[10px]">
    <Button
      image={IMAGES.CLOSE_ICON}
      size="small"
      customClass="w-[48px] h-[44px] border-2 border-black drop-shadow"
      onClick={() => {
        onClose();
        iframeRef = "";
      }}
    />
  </div>

  <!-- Iframe Wrapper -->
  <div class="relative flex-1 w-full h-full">
    {#if loading}
      <div
        class="absolute inset-0 flex items-center justify-center bg-gray-100 z-10"
      >
        Loading...
      </div>
    {/if}
    <iframe
      title={"ABC"}
      bind:this={iframeRef}
      src={url}
      on:load={onLoad}
      class="absolute inset-0 w-full h-full border-none"
    ></iframe>
  </div>
</div>
