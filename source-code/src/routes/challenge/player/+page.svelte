<script>
  import { onMount } from "svelte";
  import GameLoading from "../../../components/GameLoading/GameLoading.svelte";
  import GamePlayer from "../../../components/GamePlayer/GamePlayer.svelte";
  import { t } from "../../../stores/language.store";


  let currentUser = {},
    isLoading = true;

  onMount(async () => {
    isLoading = true;
  });

</script>

<svelte:head>
  <title>{$t("select_mode")}</title>
</svelte:head>

<!-- Responsive Container -->
<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10">
  <div class="w-full max-w-screen-xl space-y-6">

    <!-- Selection Section -->
    <div
      class="flex flex-wrap justify-center w-full gap-9 px-4 sm:px-6 md:px-8 lg:px-10"
    >
      {#if isLoading}
        <GameLoading  /> 
        {:else}
        <!-- <GamePlayer/> -->
      {/if}
    </div>
  </div>
</div>
          <!-- subject={subject}
          selectedGame={subject}
          data={subject}
          callback={callback}
          allowPlaying={stateRef.allowPlaying}
          competition={competition}
          user={me}
          totalTime={timeLimit}
          gameMode={gameMode} -->