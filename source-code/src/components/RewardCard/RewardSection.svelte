<script>
  import {
    getBadgeIcon,
    RewardsType,
  } from "../../data-actions/rewards/rewards.da";
  import NoDataFound from "../NoDataFound/NoDataFound.svelte";
  import PageSubTitle from "../PageSubTitle/PageSubTitle.svelte";
  import RewardCard from "./RewardCard.svelte";

  export let selectedRewardsType = 0;
  /**
   * @type { any[]}
   */
  export let time_rewards = [];
  /**
   * @type { any[]}
   */
  export let rewards = [];

  export let certificate_data = {
    title: "",
    image: "",
    primary_text: "",
    cost: 0,
    quantity: 0,
  };
  export let certificate_status = 0;

  /**
   * @param {string} label
   * @param {any} data
   */
  export let ActionButton = (label, data) => {}; // Callback function

  $: showTimeRewards =
    selectedRewardsType === 1 ||
    (selectedRewardsType === 0 &&
      (time_rewards.length > 0 || certificate_status === 1));
  $: showOtherRewards = selectedRewardsType === 2 || selectedRewardsType === 0;

  // Show claimed rewards if selectedRewardsType is 3 (explicit selection) OR if selectedRewardsType is 0 (show all rewards)
  $: showClaimedRewards =
    selectedRewardsType === 3 ||
    (selectedRewardsType === 0 &&
      time_rewards.some((reward) => reward.is_claimed === 1));

  // Show NoDataFound when both arrays are empty
  $: showNoDataRewards =
    selectedRewardsType === 0 &&
    time_rewards.length === 0 &&
    rewards.length === 0;
</script>

{#if showTimeRewards}
  <div class="flex flex-col w-full mb-15">
    <PageSubTitle name={RewardsType[1]?.label} />
    {#if selectedRewardsType === 1 && time_rewards.length === 0 && certificate_status === 0}
      <NoDataFound />
    {:else}
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {#if certificate_status === 1 && certificate_data.title}
          <RewardCard
            data={certificate_data}
            onButtonClick={ActionButton}
            buttonLabel="Download"
          />
        {/if}
        {#each time_rewards as reward (reward.title)}
          <RewardCard
            data={reward}
            onButtonClick={ActionButton}
            buttonLabel="Claimed"
          />
        {/each}
      </div>
    {/if}
  </div>
{/if}

{#if showOtherRewards}
  <div class={`flex flex-col w-full  ${showNoDataRewards ? "mb-0" : "mb-15"}`}>
    {#if !showNoDataRewards}
      <PageSubTitle name={RewardsType[2]?.label} />
    {/if}
    {#if selectedRewardsType === 2 && time_rewards.length === 0 && rewards.length === 0}
      <NoDataFound />
    {:else}
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {#if certificate_data.title && certificate_status === 0}
          <RewardCard
            data={certificate_data}
            onButtonClick={ActionButton}
            buttonLabel="How to Earn"
          />
        {/if}
        {#if rewards.length > 0}
          {#each rewards as reward (reward.title)}
            <RewardCard
              data={reward}
              badgeIcon={getBadgeIcon(Number(reward.reward_type))}
              onButtonClick={ActionButton}
              buttonLabel="How to Earn"
            />
          {/each}
        {/if}
      </div>
    {/if}
  </div>
{/if}

{#if showClaimedRewards}
  <div class="flex flex-col w-full mb-15">
    <PageSubTitle name={RewardsType[3]?.label} />
    {#if selectedRewardsType === 3 && !time_rewards.some((reward) => reward.is_claimed === 1)}
      <NoDataFound />
    {:else}
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {#each time_rewards as reward (reward.title)}
          {#if reward.is_claimed === 1}
            <RewardCard
              data={reward}
              badgeIcon={getBadgeIcon(Number(reward.reward_type))}
              onButtonClick={ActionButton}
              buttonLabel="Claimed"
            />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
{/if}

{#if showNoDataRewards}
  <div class="flex flex-col w-full">
    <NoDataFound />
  </div>
{/if}
