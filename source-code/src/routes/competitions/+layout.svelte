<script>
  import { onMount } from "svelte";
  import AppBar from "../../components/AppBar/AppBar.svelte";
  import Button from "../../components/Button/Button.svelte";
  import SideBar from "../../components/SideBar/SideBar.svelte";
  import StickyBanner from "../../components/StickyBanner/StickyBanner.svelte";
  import { getNavBarItems, loadGrades } from "../../data-actions/competitions/competitions.da";
  import { appbarStore } from "../../stores/appbar.store";
  import { authModalStore } from "../../stores/auth.modal.store";
  import { t } from "../../stores/language.store";
  import { onLayoutPathMount } from "../../stores/navigation.store";
  import { sidebarStore } from "../../stores/sidebar.store";
  import { userStore } from "../../stores/user.store";
  import AuthenticationPopupView from "../../views/AuthenticationPopupView/AuthenticationPopupView.svelte";
  import {
    guestUserAppBarData,
    loggedInUserAppBarData,
    loggedInUserCompAppBarData,
  } from "../../data-actions/appbar/appbar.da";
  import { competitionsLayoutLogic } from "../../data-actions/layouts/competitions.layout.logic";
  import { userActivityStore } from "../../stores/useractivity.store";
  import { competitionStore } from "../../stores/competition.store";
  import { paymentStore } from "../../stores/payment.store";
  import { afterNavigate, goto } from "$app/navigation";
  import { get } from "svelte/store";
  import { transferStore } from "../../stores/transfer.store";
  import { guestStore } from "../../stores/guest.store";

  /**
   * @type {({ icon: string; label: any; link: string; isRequired: boolean; } | { icon: string; label: any; link: string; isRequired?: undefined; })[]}
   */
  let sideBarNavItems;

  let hidePopup = true;
  /**
   * @type {{ label: string; link: string; clickCB: () => void; icon: string | null; }[]}
   */
  let dropdownItems = [];
  let showBanner = false;
  const onCompetitionLayoutLoad = async () => {
    sideBarNavItems = await getNavBarItems();
    const grades = get(transferStore);
    //code for handling dropdown items in app bar
    if ($userStore.is_guest_mode) {
      dropdownItems = guestUserAppBarData;
    } else if ($userStore.user_id) {
      if (window && window.location.pathname == "/competitions") {
        dropdownItems = loggedInUserAppBarData;
      } else {
        if (!Array.isArray(grades) || !grades.length) {
          await loadGrades();
        }
        // @ts-ignore
        dropdownItems = await loggedInUserCompAppBarData();
      }
    }
  };
  // $: console.log(dropdownItems, "dropdownItems")
  //This function is called every time a user reaches the base path or any of its child paths.
  onLayoutPathMount("/competitions", async (path, params) => {
    //code for handling direct links and making sure data is ready for path
    if (!path.includes("rules")) {
      await competitionsLayoutLogic(params);
    }
    await onCompetitionLayoutLoad();
  });

  onMount(async () => {
    authModalStore.set({ visible: false, page: "" });

    onCompetitionLayoutLoad();
    setTimeout(() => {
      hidePopup = false;
    }, 60);
  });

  const unsubscribe = paymentStore.subscribe(async () => {
    dropdownItems = await loggedInUserCompAppBarData();
  });
</script>

<div class="flex flex-col h-screen">
  {#if $userStore.is_guest_mode}
    <StickyBanner>
      <span>{$t("learn_today")}</span>
      <Button
        label={$t("signup")}
        size="small"
        type="3d-secondary"
        customClass="w-[100px]"
        onClick={() => {
          authModalStore.set({ visible: true, page: "user-selection" });
        }}
      />
      <Button
        label={$t("login")}
        size="small"
        type="3d-primary"
        customClass="w-[100px]"
        onClick={() => {
          authModalStore.set({ visible: true, page: "user-login" });
        }}
      />
    </StickyBanner>
  {/if}
  {#if $appbarStore.isShowPaymentBanner && !$userStore.is_guest_mode}
    <StickyBanner>
      <span>{$t("subscription_detail")}</span>
      <Button
        label={$t("subscribe")}
        size="small"
        type="3d-secondary"
        customClass="w-[100px] ml-auto"
        onClick={() => {
          const { competition_id, current_grade = null, url } = $competitionStore;
          paymentStore.set({ competition_id, current_grade, url });
          goto("/payment");
        }}
      />
    </StickyBanner>
  {/if}

  <div class="flex flex-1 overflow-hidden">
    {#if $sidebarStore.visible}
      <SideBar navItems={sideBarNavItems} />
    {/if}

    <div class="flex flex-col flex-1">
      <AppBar
        backLabel={$appbarStore.backLabel}
        isBackButtonVisible={$appbarStore.isBackButtonVisible}
        isLogoVisible={$appbarStore.isLogoVisible}
        isCoinVisible={$appbarStore.isCoinVisible}
        isVoucherButtonVisible={$appbarStore.isVoucherButtonVisible}
        profilePicture={$userStore.profile_picture}
        coinCount={$userActivityStore.total_coins_earned}
        isProfileVisible={$appbarStore.isProfileVisible}
        {dropdownItems}
      />
      <div class="flex-1 overflow-y-auto save-scroll">
        <slot />
      </div>
    </div>
  </div>

  {#if !hidePopup}
    <AuthenticationPopupView />
  {/if}
</div>
