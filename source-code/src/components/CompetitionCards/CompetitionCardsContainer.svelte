<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import PageHeading from "../PageHeading/PageHeading.svelte";
  import CompetitionCard from "./CompetitionCard.svelte";
  import TabSwitch from "../TabSwitcher/TabSwitch.svelte";
  import { getText } from "../../stores/language.store";
  import { t } from "../../stores/language.store";
  import { userStore } from "../../stores/user.store";
  import { instanceStore } from "../../stores/instance.store";
  import { get } from "svelte/store";
  import { getTextForRole } from "../../data-actions/banner/banner.text.da";
  import BannerText from "./BannerText.svelte";
  const instance = get(instanceStore);
  const banner_text = JSON.parse(instance.banner_text);
  const user = get(userStore);

  const { text } = getTextForRole(
    user?.active_role,
    0,
    banner_text?.banner_text,
  );

  export let competitions = [
    {
      id: 1,
      title: "The Green Singapore Competition",
      image:
        "https://bonzo.knowledgeplatform.com/images/competitions/learning_playground_banner1.png",
      is_demo: false,
      banner_image_mobile: "",
      enrolled: 1,
    },
  ];
  let selectedTab = 0;
  let isPrincipal = $userStore?.active_role === "principal";
  /**
   * @type {(arg0: number) => void}
   */
  export let onItemClick;

  /**
   * @param {number} id
   */
  function handleClick(id) {
    onItemClick(id);
  }
  // Filter competitions based on selected tab
  $: filteredCompetitions =
    selectedTab === 0
      ? competitions
      : competitions.filter((comp) => comp.enrolled === 1);
  $: isGuestMode = $userStore?.is_guest_mode;

</script>

<!--heading section-->
<div class="w-full mb-8">
  {#if !isPrincipal}
    <PageHeading
      icon={IMAGES.COMPETITION_IMG}
      title={"competitions"}
      imageClass="w-9 h-11 sm:w-13 sm:h-11"
    />
  {/if}
</div>

<div
  class="flex flex-col items-center space-y-8 bg-transparent mb-8 p-2 md:p-0"
>
  <!--<div
    class="flex h-60 animate-pulse space-x-4 bg-gray-200 card w-full sm:w-4/5 md:w-4/5 lg:w-4/5 xl:w-4/5 relative rounded-2xl"
  ></div> -->
  {#if !isGuestMode && !isPrincipal}
    <TabSwitch
      tabs={[$t("all_competitions"), $t("my_competitions")]}
      bind:selectedTab
      className="gap-6 w-3/4 sm:w-1/2 md:w-2/3 lg:w-1/2"
    />
  {/if}
  {#if !isGuestMode && !isPrincipal && text}
    <BannerText {text} />
  {/if}
  {#each filteredCompetitions as competition}
    <CompetitionCard {competition} onItemClick={handleClick} />
  {/each}
</div>
