<script>
    import { gotoURL } from "$lib/navigation.service";
    import { GamePlay } from "../../data-actions/challenge/challenge.da";
  import { preProcessLessonGames } from "../../data-actions/lessons/lesson.da";
    import { gameDataStore } from "../../stores/gamedata.store";
  import GameCard from "../GameCard/GameCard.svelte";

  export let index;
  export let item;
  export let list;

  const listToShow = preProcessLessonGames(item.skill, list);

  //  function GamePlay(data) {
  //   gameDataStore.set({ ...data });
  //   gotoURL("/challenge");
  // }
</script>

<div class="flex flex-col w-full p-4 box-border items-center">
  <div
    class="bg-black/50 w-full flex flex-col max-w-lg p-3 md:p-4 rounded-2xl md:rounded-3xl overflow-hidden text-white transition-shadow duration-300 ease-in-out"
  >
    <h2
      class="text-center text-white m-0 p-0 font-medium text-lg md:text-xl lg:text-2xl leading-tight"
    >
      {`${index + 1}. ${item.skill}`}
    </h2>
  </div>

  <div class="mt-4 flex flex-col w-full gap-4 items-center">
    {#each listToShow as game}
      <GameCard data={game} title={game.topic} 
      onClick={() => {
                    GamePlay(game);
                  }} />
    {/each}
  </div>
</div>
