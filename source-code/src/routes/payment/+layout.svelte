<script>
  import { onMount } from "svelte";
  import AppBar from "../../components/AppBar/AppBar.svelte";
  import { loggedInUserAppBarData } from "../../data-actions/appbar/appbar.da";
  import { appbarStore } from "../../stores/appbar.store";
  import { getText } from "../../stores/language.store";
  import { setBackUrl } from "../../stores/navigation.store";
  import { paymentStore } from "../../stores/payment.store";
  import { userStore } from "../../stores/user.store";
  import { t } from "../../stores/language.store";

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
      isShowPaymentBanner: false,
      isShowRules: false,
      isNotificationVisible: false,
    });
  }, 50);
  /**
   * @type {{ label: string; link: string; clickCB: () => void; icon: string | null; }[]}
   */
  let dropdownItems = [];
  let sideBarNavItems;

  const onCompetitionLayoutLoad = async () => {
    dropdownItems = loggedInUserAppBarData;
  };

  onMount(async () => {
    await onCompetitionLayoutLoad();
  });
  if ($userStore.active_role == "principal") {
    setBackUrl("/admin/competitions/");
  } else {
    setBackUrl("/competitions/" + $paymentStore.url + "/home");
  }
</script>

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
        class="bg-white w-[95%] lg:w-[80%] rounded-2xl overflow-y-auto z-1 mb-8 lg:mb-0 p-6 mx-auto"
      >
        <div class="w-[91%] mx-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</div>
