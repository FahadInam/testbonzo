<script>
  import Avatar from "../Avatar/Avatar.svelte";
  import Button from "../Button/Button.svelte";
  import {t} from "../../stores/language.store";
  import { deleteUserNotification, formatDate, handleNotificationAction } from "../../data-actions/notifications/notifications.da";
  import { NOTIFICATION_TYPE } from "$lib/constants/notification.constants";
  import Image from "../Image/Image.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  export let notification;
  
  
  // Handle notification actions
  function handleReject() {
    event.preventDefault();
    console.log("handleReject");
    // TODO: Reject challenge
  }
  
  function handleAccept() {
    // TODO: Accept challenge
  }

    function handleClick(data) {
      handleNotificationAction(data);
    // deleteUserNotification(notification.notification_id); 
  }
  
  function handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }

 
</script>

<div 
  class="p-4 my-2 rounded-lg duration-200 {notification.event_item !== 1 ? 'hover:bg-[#EEEEEE] cursor-pointer' : ''}"
  on:click={() => handleClick(notification)}
  on:keydown={handleKeydown}
  tabindex="0"
  role="button"
  aria-label="Notification"
  >
  <div class="flex items-start gap-3">
    <div class="flex-shrink-0">
      {#if notification.event_item === NOTIFICATION_TYPE.CERTIFICATE}
      <Image src={IMAGES.YELLOW_BELL_ICON}   width="38" height="38" />
       {:else}
      <Avatar t={notification?.profile_picture} s={44} u={44} ml="auto" mr="auto" />
      {/if}
    </div>
    <div class="flex-1">
      <div class="flex flex-col">
        <div class="text-sm text-gray-600">
          {#if notification.formattedMessage}
            <span>{@html notification.formattedMessage}</span>
          {/if}
        </div>
        <div class="text-xs text-gray-500 mt-1">
          {formatDate(notification.on_date)}
        </div>
      </div>
      
      {#if notification.event_item === NOTIFICATION_TYPE.INVITATION }
        <div class="flex gap-2 mt-3">
            <Button
        label={$t("reject")}
        size="small"
        type="3d-primary"
        customClass=" !py-1.5 w-[108px] !text-base"
        onClick={handleReject}

      />
      <Button
        label={$t("accept")}
        size="small"
         type="3d-secondary"
        customClass="!py-1.5 w-[108px] !text-base"
      />
        </div>
      {/if}
    </div>
  </div>
</div>