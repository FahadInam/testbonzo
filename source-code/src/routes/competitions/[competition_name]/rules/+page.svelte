<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import DataCard from "../../../../components/DataCard/DataCard.svelte";
  import { getText, t } from "../../../../stores/language.store";
  import { competitionStore } from "../../../../stores/competition.store";
  import { sidebarStore } from "../../../../stores/sidebar.store";
  import { appbarStore } from "../../../../stores/appbar.store";
  import Button from "../../../../components/Button/Button.svelte";
  import { goto } from "$app/navigation";

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
</script>

<div class="m-auto w-[940px]">
  <DataCard
    title={$t("rules")}
    imageSrc={IMAGES.RULES}
    imageClass="w-13 h-13"
    maxHeight="600px"
  >
    <div class="p-6">
      <div
        class="rules-content"
        style="font-family: system-ui, sans-serif; line-height: 1.8; color: #515151; font-weight: 500;"
      >
        {@html $competitionStore.rules}
      </div>
    </div>
    <div class="flex justify-center mb-3 gap-4">
      <Button
        label={$t("disagree")}
        type="3d-primary"
        customClass="w-[130px]"
        onClick={() => {
          goto("/competitions");
        }}
      />
      <Button
        label={$t("agree")}
        type="3d-secondary"
        customClass="w-[130px]"
        onClick={() => {
          goto("home");
        }}
      />
    </div>
  </DataCard>
</div>
