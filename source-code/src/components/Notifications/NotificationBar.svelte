<script>
  import { onMount, onDestroy } from "svelte";
  import NotificationItem from "./NotificationItem.svelte";
  import { updateNotificationStatus } from "../../data-actions/notifications/notifications.da";
  import {t} from "../../stores/language.store"
  export let isOpen = false;
  export let onClose = () => {};
 /** 
 * @type {Array<Record<string, any>>} 
 */
  export let notifications = [];
 
  // Close on escape key
  function handleKeydown(e) {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }
 
  // Handle overlay keyboard interaction
  function handleOverlayKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      onClose();
    }
  }
 
  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
  });
 
  onDestroy(() => {
    updateNotificationStatus();
    document.removeEventListener('keydown', handleKeydown);
  });
 
  // Prevent body scrolling when sidebar is open
  $: if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
</script>

<div
  role="button"
  tabindex="0"
  class="fixed inset-0  bg-opacity-20 backdrop-blur-[2px] z-40 transition-opacity duration-300 ease-in-out overflow-hidden"
  style="opacity: {isOpen ? '1' : '0'}; pointer-events: {isOpen ? 'auto' : 'none'};"
  on:click={onClose}
  on:keydown={handleOverlayKeydown}
  aria-label="Close notifications"
></div>

<div
  class="fixed top-0 right-0 h-full w-full max-w-[350px] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out overflow-hidden"
  style="border-top-left-radius: 20px; border-bottom-left-radius: 20px; transform: translateX({isOpen ? '0' : '100%'});"
>
  <div class="flex items-center justify-between p-4 ">
    <h2 class="text-xl font-bold text-[#415861]">{$t("notifications")}</h2>
    <button
      on:click={onClose}
      class="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
      aria-label="Close notifications"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
 
  <div class="p-2 overflow-y-auto" style="max-height: calc(100vh - 70px);">
    {#if !notifications || notifications.length === 0}
      <div class="p-4 text-center text-gray-500">
        {$t("no_notifications")}
      </div>
    {:else}
      {#each notifications as notification}
        <NotificationItem {notification} />
      {/each}
    {/if}
  </div>
</div>