<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import DataCard from "../../../../components/DataCard/DataCard.svelte";
  import { getText, t } from "../../../../stores/language.store";
  import { competitionStore } from "../../../../stores/competition.store";
  import { sidebarStore } from "../../../../stores/sidebar.store";
  import { appbarStore } from "../../../../stores/appbar.store";
  import Button from "../../../../components/Button/Button.svelte";
  import { goto } from "$app/navigation";
  import { getInstanceText } from "$lib/utils";
  import { userStore } from "../../../../stores/user.store";
  sidebarStore.set({ visible: false });
  setTimeout(async () => {
    appbarStore.set({
      isProfileVisible: true,
      visible: true,
      backLabel: await getText("competitions"),
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
  $: console.log("rules", $competitionStore);
  $: isGuestMode = $userStore?.is_guest_mode;
</script>

<div class="mx-auto w-full max-w-[940px] relative px-4 sm:px-6">
  <DataCard
    title={$t("rules")}
    imageSrc={IMAGES.RULES}
    imageClass="w-10 h-10 sm:w-13 sm:h-13"
    maxHeight="calc(100vh - 175px)"
    cardClass="p-0"
  >
    <div
      class={`
       overflow-y-auto
      ${isGuestMode ? "sm:max-h-[calc(100vh-335px)] max-h-[calc(100vh-350px)]" : "sm:max-h-[calc(100vh-275px)] max-h-[calc(100vh-260px)]"}
       `}
    >
      <div
        class="rules-content sm:p-6 p-2"
        style="font-family: system-ui, sans-serif; line-height: 1.6; color: #515151; font-weight: 500; font-size: 14px; sm:font-size: 16px;"
      >
        {@html $competitionStore.rules}
      </div>
    </div>
    <div class="flex justify-center gap-2 sm:gap-4 px-2 pb-1 pt-2.5 mb-[15px]">
      <Button
        label={getInstanceText($t, "disagree")}
        type="3d-primary"
        customClass="w-full max-w-[140px] sm:max-w-[160px] text-base sm:text-lg md:text-[22px]"
        onClick={() => {
          goto("/competitions");
        }}
      />
      <Button
        label={getInstanceText($t, "agree")}
        type="3d-secondary"
        customClass="w-full max-w-[140px] sm:max-w-[160px] text-base sm:text-lg md:text-[22px]"
        onClick={() => {
          goto("home");
        }}
      />
    </div>
  </DataCard>
</div>
