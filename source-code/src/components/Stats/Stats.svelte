<script>
  import StatBadge from "./StatBadge.svelte";
  import { t } from "../../stores/language.store";
  import { IMAGES } from "$lib/assets/images/images.constants";

  // Define default values for props
  export let Data = {
    total_coins: 0,
    total_ties: 0,
    total_wins: 0,
    multiplayer_matches: 0,
    single_matches: 0,
    total_lost: 0,
    accuracy: 0,
  };

  export let title = "";

  
</script>

<div class="rounded-2xl mb-8 px-4 max-w-[600px] md:max-w-[960px] mx-auto">
  <div
    class="bg-[var(--theme-dark-blue)] text-white font-semibold p-3 rounded-t-2xl text-center flex items-center justify-center"
  >
    <img loading="lazy" src={IMAGES.STATS} alt="Competition" class="w-10 h-10 mr-2" />
    <span class="font-fredoka font-semibold text-xl">{title}</span>
  </div>
  <div class=" bg-white p-4 pt-0 rounded-b-2xl w-full">
    <div
      style="background: var(--background-gradient-cyan)"
      class="text-white text-center px-4 md:py-10 py-8 flex rounded-b-2xl flex-col md:flex-row justify-evenly"
    >
      <div class="mb-4 md:mb-0 flex items-center flex-col">
        <p class="w-[230px] rounded-full font-semibold px-4 md:text-base text-sm py-2 bg-black">
          {$t("total_coins")}
        </p>
        <img
          src={IMAGES.MORE_COINS}
          alt="Coins"
          loading="lazy"
          class="md:max-w-[380px] h-full max-w-[320px]"
        />
        <p class="text-6xl title-shadow font-bold !font-fredoka -mt-2 ml-2 text-white">
          {Data.total_coins}
        </p>
      </div>

     <div class="text-left mx-auto md:m-0 mt-3">
      {#each [
          { label: "accuracy", value: Data.accuracy },
          { label: "games_won", value: Data.total_wins },
          { label: "games_lost", value: Data.total_lost },
          { label: "games_tied", value: Data.total_ties },
          { label: "single_player_matches", value: Data.single_matches },
          { label: "multiplayer_matches", value: Data.multiplayer_matches }
        ] as stat}
          <StatBadge label={$t(stat.label)} value={stat.value} />
        {/each}
</div>
    </div>
  </div>
</div>
