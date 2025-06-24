<script>
  import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage.svelte";
  import { appbarStore } from "../../../stores/appbar.store";
  import { getText } from "../../../stores/language.store";
  import { setBackUrl } from "../../../stores/navigation.store";
  import { sidebarStore } from "../../../stores/sidebar.store";
  import { onDestroy, onMount } from "svelte";
  import { getLearnerPaymentStatus } from "../../../data-actions/learner/learner.payments.da";
  import InfoModal from "../../../components/CustomModals/InfoModal.svelte";
  import { competitionStore } from "../../../stores/competition.store";
  import { paymentStore } from "../../../stores/payment.store";

  let data = null;

  sidebarStore.set({ visible: true });

  setTimeout(async () => {
    appbarStore.set({
      isProfileVisible: true,
      visible: true,
      backLabel: await getText("competitions"),
      isLogoVisible: false,
      isCoinVisible: true,
      isBackButtonVisible: true,
      isVoucherButtonVisible: false,
      isVoucherModalVisible: false,
      isNotificationVisible: true,
      isShowPaymentBanner:
        $competitionStore?.is_premium === 1 &&
        $paymentStore.payment_status?.is_subscribed === 0
          ? true
          : false,
      isShowRules: false,
    });
  }, 50);

  setBackUrl("/competitions");

  const resetStore = () => {
    appbarStore.update((state) => ({
      ...state,
      isShowRules: false,
    }));
  };
  onMount(async () => {
    // data = await getLearnerPaymentStatus();
  });
</script>

<BackgroundImage></BackgroundImage>

<slot />
<InfoModal
  showModal={$appbarStore.isShowRules}
  data={$competitionStore.rules}
  onClose={() => resetStore()}
  useModal={false}
/>
