<script>
  import { onMount } from "svelte";
  import AppBar from "../../../components/AppBar/AppBar.svelte";
  import { appbarStore } from "../../../stores/appbar.store";
  import { onLayoutPathMount } from "../../../stores/navigation.store";
  import { userStore } from "../../../stores/user.store";
  import { adminAppBarData } from "../../../data-actions/appbar/appbar.da";
  import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage.svelte";
  import { userActivityStore } from "../../../stores/useractivity.store";
  import { sidebarStore } from "../../../stores/sidebar.store";
  import SideBar from "../../../components/SideBar/SideBar.svelte";
  import { getAdminNavBarItems } from "../../../data-actions/competitions/competitions.da";
  import { competitionsLayoutLogic } from "../../../data-actions/layouts/competitions.layout.logic";

  /**
   * @type {({ icon: string; label: any; link: string; isRequired: boolean; } | { icon: string; label: any; link: string; isRequired?: undefined; })[]}
   */
  let sideBarNavItems;

  /**
   * @type {{ label: any; link: string; clickCB: () => void; icon: string; }[]}
   */
  let dropdownItems = [];

  const onCompetitionLayoutLoad = async () => {
    sideBarNavItems = await getAdminNavBarItems();

    dropdownItems = adminAppBarData;
  };

  onLayoutPathMount("/admin/competitions", async (path, params) => {
    await competitionsLayoutLogic(params);

    await onCompetitionLayoutLoad();
  });

  onMount(() => {
    onCompetitionLayoutLoad();
  });
</script>

<div class="flex flex-col h-screen">
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
        profilePicture={$userStore.profile_picture}
        coinCount={$userActivityStore.total_coins_earned}
        {dropdownItems}
        isVoucherButtonVisible={$appbarStore.isVoucherButtonVisible}
        isProfileVisible={$appbarStore.isProfileVisible}
      />
      <div class="flex-1 overflow-y-auto save-scroll">
        <slot />
      </div>
    </div>
  </div>
</div>
