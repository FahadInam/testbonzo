<script>
  import { onMount } from "svelte";
  import { appbarStore } from "../../../stores/appbar.store";
  import { t } from "../../../stores/language.store";
  import { getTitle } from "../../../stores/title.store";
  import { getAdminPaymentStatus } from "../../../data-actions/admin/admin.payments.da";
  import Button from "../../../components/Button/Button.svelte";
  import PageHeading from "../../../components/PageHeading/PageHeading.svelte";
  import { goto } from "$app/navigation";
  import InviteCard from "../../../components/InviteCard/InviteCard.svelte";
  import { getItemByProperty, remapKeys } from "$lib/utils";
  import { restoreScrollPosition } from "$lib/scroll.handler";
  import { getCompetitions } from "../../../data-actions/competitions/competitions.da";
  import CompetitionCardsContainer from "../../../components/CompetitionCards/CompetitionCardsContainer.svelte";
  import { competitionStore } from "../../../stores/competition.store";
  import SkeletonCompetitionCards from "../../../components/CompetitionCards/SkeletonCompetitionCards.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import BannerText from "../../../components/CompetitionCards/BannerText.svelte";
  import { getTextForRole } from "../../../data-actions/banner/banner.text.da";
  import { instanceStore } from "../../../stores/instance.store";
  import { get } from "svelte/store";
  import { userStore } from "../../../stores/user.store";
  import { sidebarStore } from "../../../stores/sidebar.store";
  import { metaStore } from "../../../stores/meta.store";

  // let instance;
  let unsubscribe;
  const instance = get(instanceStore);
  let banner_text = instance.banner_text
    ? JSON.parse(instance.banner_text)
    : null;
  const user = get(userStore);
  let text = "";

  sidebarStore.set({ visible: false });
  /**
   * @type {never[]}
   */
  let competitions = [];

  /**
   * @type {any[]}
   */
  let competitionsData = [];

  let isLoading = true;

  let isPaidUser = false;
  /**
   * @type {{ is_subscribed: number; } | null}
   */
  let data = null;

  async function fetchCompetitions() {
    const data = await getCompetitions();
    competitionsData = data.data.competitions;

    let comps = competitionsData.map((comp) =>
      remapKeys(comp, {
        banner_image: "image",
        competition_id: "id",
        name: "title",
      }),
    );

    // @ts-ignore
    competitions = comps;

    isLoading = false;
    restoreScrollPosition();
  }

  onMount(async () => {
    unsubscribe = instanceStore.subscribe((value) => {
      let instance = value;
      if (instance?.banner_text) {
        banner_text = JSON.parse(instance.banner_text);
      } else {
        banner_text = null;
      }
    });

    appbarStore.set({
      visible: true,
      backLabel: "",
      isLogoVisible: true,
      isCoinVisible: false,
      isBackButtonVisible: false,
      isVoucherButtonVisible: false,
      isVoucherModalVisible: false,
      isNotificationVisible: false,
      isShowPaymentBanner: false,
      isShowRules: false,
      isProfileVisible: true,
    });

    data = await getAdminPaymentStatus();
    if (data) {
      if (data.is_subscribed == 1) {
        isPaidUser = true;
        await fetchCompetitions();
      }
    }
  });

  $: text = getTextForRole(
    user?.active_role,
    isPaidUser ? 1 : 0,
    banner_text?.banner_text,
  ).text;

  const continueToPay = () => {
    goto("/payment");
  };

  console.log("this is final text", text, isPaidUser);
</script>

<svelte:head>
  <title>{getTitle($t("competitions"))}</title>
</svelte:head>
<div class="container mx-auto px-4 md:px-6 lg:px-8 mb-8">
  {#if isPaidUser}
    <div class="w-full mb-8">
      <PageHeading
        icon={IMAGES.COMPETITION_IMG}
        title={"competitions"}
        imageClass="w-9 h-11 sm:w-13 sm:h-11"
      />
    </div>
    {#if text}
      <div class="flex flex-col items-center mb-8">
        {console.log("this is false running 0", isPaidUser, text)}
        <BannerText {text} />
      </div>
    {/if}
    <InviteCard paymentData={data} />
    {#if isLoading}
      <SkeletonCompetitionCards />
    {:else if competitions.length > 0}
      <CompetitionCardsContainer
        {competitions}
        onItemClick={(id) => {
          const compItem = getItemByProperty(
            id,
            competitionsData,
            "competition_id",
          );
          competitionStore.set(compItem);

          goto("competitions/" + compItem.url + "/overview");
        }}
      />
    {/if}
  {:else}
    <div class="flex flex-col items-center space-y-10">
      {console.log("this is false running")}
      {#if text}
        <BannerText {text} />
      {/if}
      <div
        class="card-button-shadow bg-white rounded-2xl p-8 space-y-4 max-w-[400px] md:max-w-[2000px] md:w-[640px] lg:w-[912px]"
      >
        <div class="font-bold text-2xl">{$t("pay_access")}</div>
        <div class="text-lg">
          {$t("pay_message")}
        </div>
        <div class="pt-2">
          <Button
            label={$t("continue_pay")}
            width="full"
            onClick={continueToPay}
          />
        </div>
      </div>

      <div
        class="card-button-shadow bg-white rounded-2xl p-8 space-y-4 max-w-[400px] md:max-w-[2000px] md:w-[640px] lg:w-[912px]"
      >
        <div class="relative w-full" style="padding-top: 56.25%;">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://player.vimeo.com/video/1018288891?"
            title={$t("bonzo_overview")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div class="font-bold text-2xl">
          {$t("bonzo_overview")}
        </div>
      </div>
    </div>
  {/if}
</div>
