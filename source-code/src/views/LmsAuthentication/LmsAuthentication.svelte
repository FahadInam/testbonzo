<script>
    import { onDestroy } from "svelte";
    import { iframeStore, closeIframe } from "../../stores/iframeStore"
    import { onMount } from "svelte";
    import { handleSocialLogin } from "../../data-actions/authentication/common.auth.data";
    import { browser } from "$app/environment"; 

    let isVisible = false;
    let url = "";
    let iframeRef; 
    
    const unsubscribe = iframeStore.subscribe((state) => {
      isVisible = state.isVisible;
      url = state.url;
    });
    /**
     * @param {MessageEvent} event - The message event received.
     */

    async function handleMessage(event) {
        if (event.data && event.data.success) {
          const { auth_token, active_role } = event?.data?.data 
            await handleSocialLogin(event?.data?.data, auth_token, 7, closeIframe, active_role);
        }
        if (event.data === "closeIframe") {
            closeIframe();
        }
    }
    
    onMount(() => {
        if (browser) {
      window.addEventListener("message", handleMessage);
    }
    });
    
    function handleIframeLoad() {
        window.dispatchEvent(new Event("loaderEnd")); 
    }
    onDestroy(() => {
        if (browser) {
        window.removeEventListener("message", handleMessage);
        }
        unsubscribe();
        closeIframe();
    });
  </script>
  <div>
  {#if isVisible}
    <div class="iframe-container">
      <iframe bind:this={iframeRef} id="myIframe" title="Login With LMS" src={url} on:load={handleIframeLoad}></iframe>
    </div>
  {/if}
  </div>
  
  <style>

    .iframe-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 10;
    }
  
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  
    
  </style>
  