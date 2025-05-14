<script>
  import { get } from "svelte/store";
  import { goBack, navigationStore } from "../../stores/navigation.store";
  import ArrowButton from "../ArrowButton/ArrowButton.svelte";
  import DropDownMenu from "../DropDownMenu/DropDownMenu.svelte";
  import { onDestroy, onMount } from "svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import Button from "../Button/Button.svelte";
  import { t } from "../../stores/language.store";
  import { appbarStore } from "../../stores/appbar.store";
  import NotificationBell from "../Notifications/NotificationBell.svelte";
  import { logoutUser } from "../../data-actions/authentication/common.auth.data";
  import {
    getSystemLightLogo,
    isGlobalClimateLiteracy,
    isShupavu,
  } from "../../data-actions/system/system..da";
  import ConfirmationModal from "../CustomModals/ConfirmationModal.svelte";
  import { userStore } from "../../stores/user.store";
  import InviteFriends from "../InviteCard/InviteFriends.svelte";
  import { afterNavigate } from "$app/navigation";
  import { competitionStore } from "../../stores/competition.store";
  import { IsGuestMode } from "$lib/utils";

  export let coinCount = 0;
  export let isLogoVisible = false;
  export let backLabel = "Competitions";
  export let isBackButtonVisible = true;
  export let isCoinVisible = false;
  export let isProfileVisible = false;
  export let isVoucherButtonVisible = false;
  let isShareButtonVisible = false;

  /**
   * @type {string | null}
   */
  export let profilePicture;

  /**
   * @type {any[]}
   */
  export let dropdownItems = [];

  let profileSrc;
  $: profileSrc =
    profilePicture && profilePicture.length < 5
      ? `/images/profiles/${profilePicture}.png`
      : profilePicture;

  function openModal() {
    appbarStore.update((state) => ({ ...state, isVoucherModalVisible: true }));
  }

  // get the system logo for the web and mobile
  const { web_logo, mobile_logo } = getSystemLightLogo();
  let webLogoClass = isGlobalClimateLiteracy ? "w-55" : "w-40";
  let mobileLogoClass = "w-11 h-11";
  let logoFilterClass = isShupavu ? "" : "filter brightness-0 invert";

  // --- new sign-out confirmation state ----
  let showSignoutConfirm = false;
  let showShareModal = false;
  // grab the literal “Sign out” label to match against
  const SIGNOUT_LABEL = $t("signout");

  /**
   * user clicked a menu item → if it’s “Sign out” we show modal, else just fire clickCB
   * @param {{ label: any; clickCB: () => void; }} item
   */
  function handleMenuClick(item) {
    if (item.label === SIGNOUT_LABEL) {
      showSignoutConfirm = true;
    } else {
      item.clickCB();
    }
  }

  function onConfirmSignout() {
    showSignoutConfirm = false;
    logoutUser();
  }

  function onCancelSignout() {
    showSignoutConfirm = false;
  }

  function openShareModal() {
    showShareModal = true;
  }

  function closeShareModal() {
    showShareModal = false;
  }

  function checkIfFriendsPage() {
    const path = window.location.pathname;
    const pathSegments = path.split("/");

    return pathSegments[pathSegments.length - 1] === "friends";
  }
  // wrap your dropdownItems so that clicks go through handleMenuClick()
  $: processedDropdown = dropdownItems.map((item) => ({
    ...item,
    clickCB: () => handleMenuClick(item),
  }));

  onMount(() => {
    isShareButtonVisible = checkIfFriendsPage();

    if (isShareButtonVisible) {
      const competitionId = $competitionStore.competition_id;
    }
  });

  afterNavigate(() => {
    isShareButtonVisible = checkIfFriendsPage();

    if (isShareButtonVisible) {
      // // Update shareLink based on competition ID
      // const competitionId = $competitionStore.competition_id;
      // // shareLink = `${window.location.origin}/invite/competition/${competitionId}`;
    }
  });

  // get isGuestMode value from isGuestMode function
  $: isGuestMode = IsGuestMode();
</script>

<div
  class="flex items-center justify-between p-4 bg-transparent z-5 px-4 md:px-6"
>
  <!-- Left-aligned content -->
  <div class="flex items-center space-x-2">
    {#if isBackButtonVisible}
      <!-- Back button (SVG icon) -->
      <ArrowButton
        arrowType="back"
        link={$navigationStore.back_url}
        customClass="text-white"
        label={backLabel}
      />
    {/if}

    {#if isLogoVisible}
      <!-- Logo -->
      <button
        class="flex items-center space-x-2 {!isBackButtonVisible
          ? 'cursor-default'
          : ''}"
        on:click={() => {
          if (!isBackButtonVisible) return;
          goBack();
        }}
      >
        <img
          src={web_logo}
          alt="Instance Logo"
          class={`${webLogoClass} object-contain hidden md:flex ${logoFilterClass} cursor-pointer`}
        />

        <img
          src={mobile_logo}
          alt="Instance Logo"
          class={`${mobileLogoClass} object-contain flex md:hidden ${logoFilterClass}`}
        />
      </button>
    {/if}
  </div>

  <!-- Right-aligned content -->
  <div class="flex items-center space-x-3">
    {#if isShareButtonVisible}
      <button
        type="button"
        class="border-none bg-transparent rounded-full p-0 cursor-pointer"
        on:click={openShareModal}
        on:keydown={(e) => e.key === "Enter" && openShareModal()}
        aria-label={$t("share")}
      >
        <div
          class="p-3 bg-white/20 rounded-full flex justify-center items-center"
        >
          <img
            src="/images/share.svg"
            alt="Share"
            class="w-[26px] h-[26px] brightness-0 invert"
          />
        </div>
      </button>
    {/if}
    {#if isCoinVisible}
      <!-- Coin icon and count -->
      <div
        class="flex space-x-2 bg-[#00000099] relative rounded-full w-30 h-10 items-center"
      >
        <img
          src="/images/coin.svg"
          alt="Coin"
          class="flex absolute w-12 left-0"
        />
        <span class="text-white font-lg text-right w-full px-3 font-bold"
          >{coinCount}</span
        >
      </div>
    {/if}

    {#if isVoucherButtonVisible && !isGlobalClimateLiteracy && !isGuestMode}
      <Button
        label={$t("add_voucher_code")}
        size="large"
        type="3d-secondary"
        customClass="w-full mb-[0.6rem] text-lg md:text-[22px]"
        onClick={() => {
          openModal();
        }}
      />
    {/if}
    {#if profileSrc && profileSrc.length > 0 && isProfileVisible}
      <!-- <DropDownMenu items={dropdownItems}>  -->
      <DropDownMenu items={processedDropdown}>
        <div class="h-12 w-12 rounded-full cursor-pointer">
          <!-- <img src={profilePicture} alt="Profile" /> -->
          <Avatar
            t={$userStore.profile_picture}
            s={50}
            u={50}
            ml="auto"
            mr="auto"
          />
        </div>
      </DropDownMenu>
    {/if}
    {#if $appbarStore.isNotificationVisible && !isGuestMode}
      <NotificationBell />
    {/if}
  </div>
</div>

<!-- sign-out confirmation modal -->
<ConfirmationModal
  bind:showModal={showSignoutConfirm}
  title={SIGNOUT_LABEL}
  message={`Are you sure you want to ${SIGNOUT_LABEL.toLowerCase()}?`}
  onConfirm={onConfirmSignout}
  onCancel={onCancelSignout}
  cancelText={$t("cancel")}
  successText={$t("signout")}
/>

<!-- Invite Friends Modal -->
<InviteFriends bind:open={showShareModal} onClose={closeShareModal} />

<style>
  .cursor-default {
    cursor: default !important;
  }
</style>
