<script>
  import { onMount } from "svelte";
  import GameCard from "../../../../components/GameCard/GameCard.svelte";
  import Carousel from "../../../../components/Carousel/Carousel.svelte";
  import { getText, t } from "../../../../stores/language.store";
  import { competitionStore } from "../../../../stores/competition.store";
  import {
    getCompetitionActivities,
    getCompetitionRecommendation,
  } from "../../../../data-actions/competitions/competitions.da";
  import Progressbar from "../../../../components/Progessbar/Progressbar.svelte";
  import Listings from "../../../../components/Listings/Listings.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { userActivityStore } from "../../../../stores/useractivity.store";
  import { abbreviateNumber, IsGuestMode } from "$lib/utils";
  import { gameDataStore } from "../../../../stores/gamedata.store";
  import { gotoURL } from "$lib/navigation.service";
  import { metaStore } from "../../../../stores/meta.store";
  import HomeScreenSkeleton from "../../../../components/Skeleton/HomeScreenSkeleton.svelte";
  import { GamePlay, invitationAccepted, PlayChallenge, StartChallenge, updateGameData } from "../../../../data-actions/challenge/challenge.da";
  import { goto } from "$app/navigation";
  import { resetResultStore, updateOpponentData, updatePlayerData } from "../../../../stores/result.store";
  import { userStore } from "../../../../stores/user.store";
  import { AccuracyCalc } from "../../../../data-actions/challenge/result.da";
  import { guestStore } from "../../../../stores/guest.store";
  import moment from "moment";
  import { showError, showWarning } from "../../../../stores/toast.store";
  import { getLearnerPaymentStatus } from "../../../../data-actions/learner/learner.payments.da";
    import { get } from "svelte/store";

  /** @type {Array<{ topic: string, subject: string, game_name_alias: string, sort_order: number, total_lessons: number, skill: string, lessons_completed: number }>} */
  let recommendations = [],
    user_data = { lessons_completed: 0, total_lessons: 0 },
    /** @type {Array<any>} */
    results = [],
    /** @type {Array<any>} */
    their_turn = [],
    /** @type {Array<any>} */
    your_turn = [],
    /** @type {Array<any>} */
    invitations = [],
    title = "",
    isLoading = true;
  let isGuestMode = false;
  $: if ($userStore) {
    isGuestMode = IsGuestMode();
  }
  const utcDate = moment().utc();
  const currentDate = utcDate.format("YYYY-MM-DD HH:mm:ss");
  onMount(async () => {
    isLoading = true;
    await getLearnerPaymentStatus();
    const data = await getCompetitionRecommendation();
    const activities = await getCompetitionActivities();
    recommendations = data?.data || [];
    if (activities?.data) {
      ({ user_data, results, their_turn, your_turn, invitations } = activities.data);

      userActivityStore.set({
        total_coins_earned: isGuestMode ? $guestStore?.points : user_data?.points,
      });
      if (recommendations.length == 0) title = await getText("no_games");
      else {
        title = recommendations[0].skill;
      }
    }
    isLoading = false;
    const endDate = moment(activities?.data?.comp_info?.end_date, "YYYY-MM-DD HH:mm:ss");
    if (activities?.data?.comp_info?.is_hide_on_end && endDate.isBefore(currentDate)) {
      showWarning($t("competition_ended_msg"));
      goto("/competitions");
    }
  });

  /**
   * @param {any} data
   * @param {string} type
   */
  async function ActionCallback(data, type) {
    console.log("ActionCallback", data, type);
    if (type === "your_turn" || type === "accept") {
      const res = await PlayChallenge(data);
      if (type === "accept") {
        await invitationAccepted(data, 1);
      }
      if (res.error_code === 0) {
        gameDataStore.set({
          link: data?.link,
          opponent: {
            name: data?.opponent_name,
            profile_picture: data?.opponent_profile_picture,
            user_id: data?.opponent_id,
            username: data?.opponent_username,
          },
          isSinglePlayer: 1,
          matchData: {
            base_points: data?.base_points,
            match_id: data?.match_id,
            summary_id: data?.summary_id,
            content_id: data?.content_id,
          },
          subjectData: {
            summary_id: data?.summary_id,
            match_id: data?.match_id,
            content_id: data?.content_id,
          },
        });
        resetResultStore();
        goto("/challenge/vsscreen");
      }
    }
    if (type === "results" || type === "their_turn") {
      updatePlayerData({
        playerName: $userStore?.name,
        accuracy: AccuracyCalc(data?.my_total_correct, data?.my_total_questions, data?.my_total_questions),
        timeTaken: data?.my_time_spent,
        avatar: data?.profile_picture,
        score: data?.my_score,
        points: data?.my_points,
      });

      updateOpponentData({
        playerName: data?.opponent_name,
        score: data?.opponent_score,
        accuracy:
          type === "results"
            ? AccuracyCalc(data?.opponent_total_correct, data?.opponent_total_questions, data?.opponent_total_questions)
            : null,
        timeTaken: data?.opponent_time_spent,
        avatar: data?.opponent_profile_picture,
        opponent_id: data?.opponent_id,
        points: data?.opponent_points,
      });
      // gotoURL("/challenge/result");
      goto("/challenge/result", {
        state: {
          coinAnimation: false,
        },
      });
      // metaStore.set(JSON.stringify(data));
    } else if (type === "reject") {
      await invitationAccepted(data, 0);
    }
  }
  /**
   * @param {any} data
   */
  //  async function GamePlay(data) {
  //       gameDataStore.set({ ...data });
  //     if(!$competitionStore.is_multiplayer_allowed) {
  //       const response = await StartChallenge($gameDataStore, null, 0);
  //       if (response.error_code === 0) {
  //     updateGameData({
  //       opponent: $userStore,
  //       playMode: 0,
  //       matchData: response.data,
  //       subjectData: {
  //         summary_id: response?.data?.summary_id,
  //         match_id: response?.data?.match_id,
  //         content_id: $gameDataStore?.content_id,
  //         base_points: response?.data?.base_points,
  //       },
  //       matchingItem: $gameDataStore,
  //       link: $gameDataStore?.link,
  //     });
  //     goto("/challenge/vsscreen");
  //   }
  //       return
  //     }
  //    console.log($competitionStore, "comp here")
  //   gotoURL("/challenge");
  // }
</script>

<svelte:head>
  <title>{$competitionStore.name || $t("competition")}</title>
</svelte:head>

<!-- Responsive Container -->
<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10">
  <div class="w-full max-w-screen-lg space-y-6">
    <!--heading section-->
    <div class="w-full mb-0 text-center">
      <h2 class="text-white font-medium text-2xl md:text-3xl mb-2">
        {$competitionStore.name}
      </h2>
      <p class="text-white font-normal text-lg">{title}</p>
    </div>

    <!--progressbar section-->
    {#if user_data?.total_lessons}
      <div class="w-full flex justify-center">
        <Progressbar completed={user_data?.lessons_completed} total={user_data?.total_lessons} className="h-5 mt-3" />
      </div>
    {/if}

    {#if isLoading}
      <HomeScreenSkeleton />
    {:else}
      <!--subject carousel section-->
      {#if recommendations.length}
        <div class="flex w-full overflow-x-hidden text-center">
          <Carousel>
            {#each recommendations as recommendation}
              <div class="flex-[0_0_100%] min-w-0 py-0 sm:py-3">
                <GameCard
                  data={recommendation}
                  title={recommendation.topic}
                  completion={`${recommendation.lessons_completed}/${recommendation.total_lessons}`}
                  onClick={() => {
                    GamePlay(recommendation);
                  }}
                />
              </div>
            {/each}
          </Carousel>
        </div>
      {/if}

      <!--player listing section-->
      {#each [{ title: "invitations", data: invitations, type: "invitations", icon: IMAGES.TURN_INVITE_ICON }, { title: "your_turn", data: your_turn, type: "your_turn", icon: IMAGES.TURN_YOUR_ICON }, { title: "their_turn", data: their_turn, type: "their_turn", icon: IMAGES.TURN_THEIR_ICON }, { title: "results", data: results, type: "results", icon: IMAGES.RESULT_ICON }] as section}
        {#if section.data.length}
          <div class="w-full overflow-x-hidden mt-5 last:mb-20 md:last:mb-10 md:mb-10">
            <Listings
              listings={section.data}
              title={section.title}
              type={section.type}
              icon={section.icon}
              {isLoading}
              onItemClick={ActionCallback}
            />
          </div>
        {/if}
      {/each}
    {/if}
  </div>
</div>
