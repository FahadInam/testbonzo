<script>
  import { request } from "$lib/api.service";
  import { onDestroy, onMount } from "svelte";
  import { API_DEFINITIONS } from "../../apis/api.definitions";
  import { get } from "svelte/store";
  import { userStore } from "../../stores/user.store";
  import { loginAsGuest } from "../../data-actions/authentication/guest.auth.da";
  import CompetitionCardsContainer from "../../components/CompetitionCards/CompetitionCardsContainer.svelte";
  import { getItemById, getItemByProperty, remapKeys } from "$lib/utils";
  import BackgroundImage from "../../components/BackgroundImage/BackgroundImage.svelte";
  import StickyBanner from "../../components/StickyBanner/StickyBanner.svelte";
  import SkeletonCompetitionCards from "../../components/CompetitionCards/SkeletonCompetitionCards.svelte";
  import { t } from "../../stores/language.store";
  import { sidebarStore } from "../../stores/sidebar.store";
  import { afterNavigate, goto } from "$app/navigation";
  import { clearBackUrlIfPathMatches, setBackUrl, storeBackUrlOnNavigationTo } from "../../stores/navigation.store";
  import { browser } from "$app/environment";
  import { appbarStore } from "../../stores/appbar.store";
  import { addVoucherCode, getCompetitions } from "../../data-actions/competitions/competitions.da";
  import { clearScrollPosition, restoreScrollPosition, manageScrollOnNavigation } from "$lib/scroll.handler";
  import { competitionStore } from "../../stores/competition.store";
  import VoucherModal from "../../components/CustomModals/VoucherModal.svelte";
  import { systemSettingsStore } from "../../stores/systemsettings.store";
  import { metaStore } from "../../stores/meta.store";
  import { transferStore } from "../../stores/transfer.store";
    import { guestStore } from "../../stores/guest.store";
  //get all competitions and show them

  /**
   * @type {never[]}
   */
  let competitions = [];

  /**
   * @type {any[]}
   */
  let competitionsData = [];

  let isLoading = true;
  let showModal = false;
  const isVoucherAllowed = $systemSettingsStore?.is_voucher_allowed;
  let previousGuestMode = $userStore.is_guest_mode;
  sidebarStore.set({ visible: false });

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
    competitionStore.set({
      url: null,
      name: null,
      current_grade: null,
      competition_id: null,
      is_lesson_page_hide: null,
      is_games_page: null,
      is_premium: null,
    });

    transferStore.set({});
    fetchCompetitions();

    guestStore.update((state) => ({
      ...state,
      points: null,
    }));
  });

  setBackUrl("/");
  if (browser) {
    clearBackUrlIfPathMatches();
  }
  storeBackUrlOnNavigationTo("/competitions");

  const unsubscribe = appbarStore.subscribe((value) => {
    showModal = value.isVoucherModalVisible;
  });
  const unsubscribeUser = userStore.subscribe((value) => {
    // Only check for guest mode changes after initial mount
    if (value.is_guest_mode !== previousGuestMode) {
      previousGuestMode = value.is_guest_mode;
      // Only refetch if the component is already mounted (prevents double fetch on initial load)
      if (!isLoading) {
        fetchCompetitions();
      }
    }
  });

  $: {
    appbarStore.set({
      visible: true,
      backLabel: "",
      isLogoVisible: true,
      isCoinVisible: false,
      isBackButtonVisible: $userStore.is_guest_mode ? true : false,
      isVoucherButtonVisible: isVoucherAllowed,
      isVoucherModalVisible: false,
      isNotificationVisible: false,
      isShowPaymentBanner: false,
      isShowRules: false,
      isProfileVisible: true,
    });
  }
  manageScrollOnNavigation(["/"]);
  onDestroy(() => {
    unsubscribe();
    unsubscribeUser();
  });
</script>

<svelte:head>
  <title>{$t("competitions")}</title>
</svelte:head>

<BackgroundImage></BackgroundImage>
<div>
  {#if isLoading}
    <SkeletonCompetitionCards />
  {:else if competitions.length > 0}
    <CompetitionCardsContainer
      {competitions}
      onItemClick={(id) => {
        // console.log("first competition id", id);
        const compItem = getItemByProperty(id, competitionsData, "competition_id");
        competitionStore.set(compItem);
        metaStore.update((value) => ({
          ...value,
          url: compItem.url,
          id: compItem.competition_id,
          current_grade: compItem.current_grade,
        }));
        if (!compItem.enrolled && compItem.rules) {
          goto("competitions/" + compItem.url + "/rules");
        } else {
          goto("competitions/" + compItem.url + "/home");
        }
      }}
    />
  {:else}
    <p class="text-center text-white">{$t("no_competitions")}</p>
  {/if}

  <!-- {#if showModal} -->
  <VoucherModal
    bind:showModal
    onSuccess={fetchCompetitions}
    onSubmit={addVoucherCode}
    title={$t("add_voucher_code")}
    instructionText={$t("voucher_instruction")}
  />
  <!-- {/if} -->
</div>
