<script>
  import { get } from "svelte/store";
  import AppBar from "../../components/AppBar/AppBar.svelte";
  import BackgroundImage from "../../components/BackgroundImage/BackgroundImage.svelte";
  import {
    guestUserAppBarData,
    loggedInUserAppBarData,
    loggedInUserCompAppBarData,
  } from "../../data-actions/appbar/appbar.da";
  import { getNavBarItems } from "../../data-actions/competitions/competitions.da";
  import { appbarStore } from "../../stores/appbar.store";
  import { getText } from "../../stores/language.store";
  import { onLayoutPathMount, setBackUrl } from "../../stores/navigation.store";
  import { userStore } from "../../stores/user.store";
  import { userActivityStore } from "../../stores/useractivity.store";
  import { competitionStore } from "../../stores/competition.store";

  setTimeout(async () => {
    appbarStore.set({
      visible: true,
      backLabel: await getText("back"),
      isLogoVisible: false,
      isCoinVisible: true,
      isBackButtonVisible: true,
      isProfileVisible: true,
      isNotificationVisible: true,
    });
  }, 50);

  let compItem = get(competitionStore);

  setBackUrl("/competitions/" + compItem.url + "/home");

  /**
   * @type {({ icon: string; label: any; link: string; isRequired: boolean; } | { icon: string; label: any; link: string; isRequired?: undefined; })[]}
   */
  let sideBarNavItems;

  /**
   * @type {{ label: string; link: string; clickCB: () => void; icon: string | null; }[]}
   */
  let dropdownItems = [];

  const onCompetitionLayoutLoad = async () => {
    sideBarNavItems = await getNavBarItems();
    //code for handling dropdown items in app bar
    if ($userStore.is_guest_mode) {
      dropdownItems = guestUserAppBarData;
    } else if ($userStore.user_id) {
      if (window && window.location.pathname == "/challenge") {
        dropdownItems = loggedInUserAppBarData;
      } else {
        // @ts-ignore
        dropdownItems = loggedInUserCompAppBarData;
      }
    }
  };

  //This function is called every time a user reaches the base path or any of its child paths.
  onLayoutPathMount("/challenge", async (path, params) => {
    //code for handling direct links and making sure data is ready for path

    await onCompetitionLayoutLoad();
  });
</script>

<BackgroundImage></BackgroundImage>

<div class="flex flex-col h-screen">
  <div class="flex flex-1 overflow-hidden">
    <div class="flex flex-col flex-1">
      <AppBar
        backLabel={$appbarStore.backLabel}
        isBackButtonVisible={$appbarStore.isBackButtonVisible}
        isLogoVisible={$appbarStore.isLogoVisible}
        isCoinVisible={$appbarStore.isCoinVisible}
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
</div>
