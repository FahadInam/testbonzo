<script>
  import { onMount } from "svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import {
    getOpponentsToChallenge,
    StartChallenge,
    updateGameData,
  } from "../../../data-actions/challenge/challenge.da";
  import PageHeading from "../../../components/PageHeading/PageHeading.svelte";
  import { t } from "../../../stores/language.store";
  import { userStore } from "../../../stores/user.store";
  import { get } from "svelte/store";
  import { showWarning } from "../../../stores/toast.store";
  import OpponentSelection from "../../../components/OpponentSelection/OpponentSelection.svelte";
  import { gotoURL } from "$lib/navigation.service";
  import { goto } from "$app/navigation";
  import { gameDataStore } from "../../../stores/gamedata.store";
  import { page } from "$app/stores";
  import { getCompetitionRecommendation } from "../../../data-actions/competitions/competitions.da";
  import OptionPicker from "../../../components/OptionPicker/OptionPicker.svelte";
  import { metaStore } from "../../../stores/meta.store";
  import { competitionsLayoutLogic } from "../../../data-actions/layouts/competitions.layout.logic";

  let data = $page.state;
  // console.log(data, "data *************");
  /**
   * @type { any[]}
   */
  let FriendsRecommendations = [],
    /**
     * @type { any[]}
     */
    alreadyInvited = [],
    /**
     * @type { any[]}
     */
    OpponentUsers = [];

  let gameData = {};

  let currentUser = {},
    isLoading = true;
  $: isGuest = get(userStore)?.is_guest_mode;

  onMount(async () => {
    const url = get(metaStore)?.url;
    const params = {
      competition_name: url,
    };
    await competitionsLayoutLogic(params);

    const { data } = (await getOpponentsToChallenge()) || {};
    if (data) {
      ({ recommendations: FriendsRecommendations, already_invited: alreadyInvited, users: OpponentUsers } = data);
    }
    currentUser = get(userStore);
    gameData = get(gameDataStore);
    // console.log(currentUser, "currentUser *************");
    // console.log(gameData, "gameData *************");
    isLoading = false;
  });

  /**
   * @param {string} Opponent
   * @param {number} playMode
   */

  async function StartChallengeCallback(Opponent, playMode) {
    if (playMode === 1 && !Object.keys(Opponent).length) return showWarning("Please Select Opponent.");
    if (playMode === 0) console.log("Single Player");

    const response = await StartChallenge(gameData, Opponent, playMode);
    const subject = get(gameDataStore);
    // console.log(
    //   response,
    //   Opponent,
    //   playMode,
    //   subject,
    //   "response *************",
    // );

    if (response.error_code === 0) {
      updateGameData({
        opponent: Opponent,
        playMode: playMode,
        matchData: response.data,
        subjectData: {
          summary_id: response?.data?.summary_id,
          match_id: response?.data?.match_id,
          content_id: subject?.content_id,
          base_points: response?.data?.base_points,
        },
        matchingItem: subject,
        link: subject?.link,
      });

      // gameDataStore.update(data => {
      //     return {
      //         ...data,
      //         ...(playMode === 1 && { opponent: Opponent }),
      //         isSinglePlayer: playMode,
      //         matchData: response.data,
      //         subjectData: {
      //           summary_id: response?.data?.summary_id,
      //           match_id: response?.data?.match_id,
      //           content_id: subject?.content_id
      //         }
      //     };
      // });
      const data = get(gameDataStore);
      // console.log(data, "data here");
      goto("/challenge/vsscreen");
    }
  }

  const handleSelect = async (subject) => {
    const Opponent = data.opponent;
    const playMode = 1;
    const res = await getCompetitionRecommendation();
    const matchingItem = res.data.find((item) => item.subject === subject);
    // console.log(matchingItem, data, Opponent, "subject *************");
    const response = await StartChallenge(matchingItem, Opponent, playMode);
    if (response.error_code === 0) {
      updateGameData({
        opponent: Opponent,
        playMode: playMode,
        matchData: response.data,
        subjectData: {
          summary_id: response?.data?.summary_id,
          match_id: response?.data?.match_id,
          content_id: matchingItem?.content_id,
        },
        matchingItem: matchingItem,
        link: matchingItem?.link,
      });
      //   gameDataStore.update(currentData => {
      //     return {
      //         ...currentData,
      //         ...matchingItem,
      //         isSinglePlayer: 1,
      //         matchData: response.data,
      //         subjectData: {
      //             summary_id: response?.data?.summary_id,
      //             match_id: response?.data?.match_id,
      //             content_id: matchingItem?.content_id
      //         }
      //     };
      // });
      const data = get(gameDataStore);
      // console.log(data, "data here");
      goto("/challenge/vsscreen");
    }
  };
</script>

<svelte:head>
  <title>{$t("select_mode")}</title>
</svelte:head>

<!-- Responsive Container -->
<div class="flex justify-center w-full">
  <div class="w-full max-w-screen-xl space-y-6">
    <!--heading section-->
    <div class="w-full mb-8">
      <PageHeading
        icon={IMAGES.SELECT_OPPONENT_ICON}
        title={data.fromFriends ? "select_subject" : "select_mode"}
        imageClass="w-9 h-10 sm:w-12 sm:h-11"
      />
    </div>

    <!-- Selection Section -->
    {#if data.fromFriends}
      <div>
        <h1>
          <div
            class="flex items-center justify-center max-w-xl w-full bg-transparent rounded-lg p-8 mx-auto text-center space-y-10"
          >
            <OptionPicker title={$t("select_subject")} options={data.subject} onSelect={handleSelect} />
          </div>
        </h1>
      </div>
    {:else}
      <div class="flex flex-wrap justify-center w-full gap-9 px-4 sm:px-6 md:px-8 lg:px-6">
        <!-- Single Player Option - Always render but show loading state when needed -->
        <OpponentSelection
          data={isLoading ? [] : [currentUser]}
          title={"single_mode"}
          icon={IMAGES.SINGLE_PLAYER_ICON}
          Mode={0}
          callback={StartChallengeCallback}
          {isLoading}
        />

        <!-- Challenge Mode Option - Always render for non-guest users but with appropriate state -->
        {#if !isGuest}
          <OpponentSelection
            data={isLoading ? [] : FriendsRecommendations.length > 0 ? FriendsRecommendations : alreadyInvited}
            title={"challenge_mode"}
            icon={IMAGES.MULTIPLAYER_PLAYER_ICON}
            Mode={1}
            callback={StartChallengeCallback}
            {isLoading}
            isLocked={!isLoading && FriendsRecommendations.length === 0}
          />
        {/if}
      </div>
    {/if}
  </div>
</div>
