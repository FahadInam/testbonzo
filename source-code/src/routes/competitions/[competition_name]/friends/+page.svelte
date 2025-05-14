<script>
  import { onMount } from "svelte";
  import { t } from "../../../../stores/language.store";
  import {
    extractSubjects,
    getCompetitionDetails,
    getCompetitionFriends,
    searchFriends,
  } from "../../../../data-actions/competitions/competitions.da";
  import SearchBar from "../../../../components/SearchBar/SearchBar.svelte";
  import Listings from "../../../../components/Listings/Listings.svelte";
  import Image from "../../../../components/Image/Image.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import PageHeading from "../../../../components/PageHeading/PageHeading.svelte";
  import NoDataFound from "../../../../components/NoDataFound/NoDataFound.svelte";
  import ListBoxSkeleton from "../../../../components/Skeleton/ListBoxSkeleton.svelte";
    import { goto } from "$app/navigation";
    import { avatar } from "$lib/avatar";

  /**
   * @type { any[]}
   */
  let friends_recommendation = [];
  /**
   * @type { any[]}
   */
  let search_result = [];

  /**
   * @type { any[]}
   */
  let existing_users = [];
  let subject = "";
  let isLoading = true;
  let isSearchDone = false;

  onMount(async () => {
    try {
      const data = await getCompetitionFriends(subject);
      friends_recommendation = data?.data.recommendations ?? [];
      existing_users = data?.data.users ?? [];
    } catch (error) {
      console.error("Error fetching competition friends:", error);
    } finally {
      isLoading = false;
    }
  });

  /**
   * @param {string} query
   */
  async function searchHandler(query) {
    if (!query) {
      isSearchDone = false;
      search_result = [];
      return;
    }

    try {
      isLoading = true;
      const data = await searchFriends(query);
      search_result = data?.data.users ?? [];
      isSearchDone = true;
    } catch (error) {
      console.error("Error searching friends:", error);
    } finally {
      isLoading = false;
    }
  }

  /**
   * @param {any} data
   */
 async function PlayChallenge(data) {
    console.log("PlayChallenge", data);
     const subjects =  await extractSubjects();
     goto('/challenge/selection', {
      state: {
        subject: subjects,
        fromFriends: true,
        opponent:{
          name: data.name,
          profile_picture: data.profile_picture,
          user_id: data.user_id || data.id,
        },
      },
     })
     console.log(subjects, "subjects");
  }
</script>

<svelte:head>
  <title>{$t("friends")}</title>
</svelte:head>

<!-- Responsive Container -->
<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10">
  <div class="w-full max-w-screen-lg space-y-6">
    <!--heading section-->
    <div class="w-full">
      <PageHeading
        icon={IMAGES.FRIENDS_ICON}
        title={"friends"}
        imageClass="w-9 h-11 sm:w-13 sm:h-11"
      />
    </div>

    <!--search section-->
    <div class="w-full mb-9">
      <SearchBar onSearch={searchHandler} />
    </div>

    {#if isLoading}
      <ListBoxSkeleton />
    {:else}
      <!--player listing section-->
      {#if !isSearchDone && existing_users.length > 0}
        <div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">
          <Listings
            listings={existing_users}
            title="my_friend_list"
            type={"my_friend_list"}
            icon={IMAGES.FRIENDS_LIST_ICON}
            {isLoading}
            onItemClick={PlayChallenge}
          />
        </div>
      {/if}

      <!--player listing section-->
      {#if !isSearchDone && friends_recommendation.length > 0}
        <div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">
          <Listings
            listings={friends_recommendation}
            title="recommendations"
            type={"is_friend_recommendation"}
            icon={IMAGES.FRIENDS_RECOMMENDED_ICON}
            {isLoading}
            onItemClick={PlayChallenge}
          />
        </div>
      {/if}

      {#if !isSearchDone && !friends_recommendation.length && !existing_users.length}
        <div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">
          <NoDataFound />
        </div>
      {/if}

      {#if isSearchDone && search_result.length > 0}
        <div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">
          <Listings
            listings={search_result}
            title="searched_friends"
            type={"is_friend_searched"}
            {isLoading}
            icon={IMAGES.FRIENDS_LIST_ICON}
            onItemClick={PlayChallenge}
          />
        </div>
      {:else if isSearchDone && !search_result.length}
        <div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">
          <NoDataFound />
        </div>
      {/if}
    {/if}
  </div>
</div>
