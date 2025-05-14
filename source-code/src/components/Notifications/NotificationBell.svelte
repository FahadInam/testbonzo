<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { onMount } from "svelte";
  import { loadNotifications } from "../../data-actions/notifications/notifications.da";
  import NotificationBar from "./NotificationBar.svelte";

  /**
   * @type {Array<Record<string, any>>}
   */
  let notificationData = [];
  let isNotificationSidebarOpen = false;
  let unreadNotifications = 0;
  $: if (notificationData) {
    unreadNotifications =
      Array.isArray(notificationData) && notificationData.length > 0
        ? notificationData.filter((n) => n?.is_read === 0).length
        : 0;
  }

  async function toggleNotificationSidebar() {
    isNotificationSidebarOpen = !isNotificationSidebarOpen;
    notificationData = await loadNotifications();
  }

  onMount(async () => {
    notificationData = await loadNotifications();
  });
</script>

<div
  class="self-baseline bg-white/20 bg-opacity-60 rounded-full w-[50px] h-[50px] flex justify-center items-center"
>
  <button
    data-tag="notifications"
    on:click={toggleNotificationSidebar}
    class="w-full h-full flex justify-center items-center cursor-pointer border-none bg-transparent rounded-full"
    aria-label="Notifications"
  >
    <div class="relative flex justify-center items-center">
      {#if unreadNotifications > 0}
        <span
          class="absolute -top-4 -right-2 bg-red-500 text-white rounded-full min-w-[18px] h-[18px] text-xs flex justify-center items-center p-[2px] font-bold"
        >
          {unreadNotifications}
        </span>
      {/if}
      <img
        src={IMAGES.BELL_ICON}
        alt="Notifications"
        class="w-[26px] h-[26px] brightness-0 invert"
      />
    </div>
  </button>
</div>
{#if isNotificationSidebarOpen}
  <NotificationBar
    isOpen={isNotificationSidebarOpen}
    onClose={() => (isNotificationSidebarOpen = false)}
    notifications={notificationData}
  />
{/if}
