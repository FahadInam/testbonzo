<script>
  import { onMount } from "svelte";
  import AppBar from "../../components/AppBar/AppBar.svelte";
  import BackgroundImage from "../../components/BackgroundImage/BackgroundImage.svelte";
  import { appbarStore } from "../../stores/appbar.store";
  import { getText } from "../../stores/language.store";
  import { userStore } from "../../stores/user.store";
  import { loggedInUserAppBarData } from "../../data-actions/appbar/appbar.da";
  import { afterNavigate } from "$app/navigation";
  import { setBackUrl } from "../../stores/navigation.store";

  /**
   * @type {{ label: string; link: string; clickCB: () => void; icon: string | null; }[]}
   */

  let dropdownItems = [];

  setTimeout(async () => {
    appbarStore.set({
      isProfileVisible: true,
      visible: true,
      backLabel: await getText("back"),
      isLogoVisible: false,
      isCoinVisible: false,
      isBackButtonVisible: true,
      isVoucherButtonVisible: false,
      isVoucherModalVisible: false,
      isNotificationVisible: false,
      isShowPaymentBanner: false,
      isShowRules: false,
    });
  }, 50);

  const onProfileLayoutLoad = async () => {
    dropdownItems = loggedInUserAppBarData;
  };

  onMount(async () => {
    onProfileLayoutLoad();
  });

  afterNavigate(({ from }) => {
    const previousURL = from?.url?.pathname ?? "/competitions";
    setBackUrl(previousURL);
  });
</script>

<!--star background-->
<BackgroundImage></BackgroundImage>

<div class="flex flex-col h-screen">
  <div class="flex flex-1 overflow-hidden">
    <div class="flex flex-col flex-1">
      <AppBar
        backLabel={$appbarStore.backLabel}
        isBackButtonVisible={$appbarStore.isBackButtonVisible}
        isLogoVisible={$appbarStore.isLogoVisible}
        isCoinVisible={$appbarStore.isCoinVisible}
        isVoucherButtonVisible={$appbarStore.isVoucherButtonVisible}
        profilePicture={$userStore.profile_picture}
        isProfileVisible={$appbarStore.isProfileVisible}
        {dropdownItems}
      />
      <div
        class="w-[100%] lg:w-[100%] rounded-2xl overflow-y-auto z-1 mb-8 lg:mb-0 p-4 md:p-6 mx-auto"
      >
        <div class="w-[100%] mx-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</div>
