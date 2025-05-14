<script>
  import { numbers } from "$lib/numbers.formate";
  import { UsernameResolver } from "../../data-actions/challenge/challenge.da";
  import Avatar from "../Avatar/Avatar.svelte";

  export let player;
  export let secondSection = false;
  export let isWinner = true;
  export let texts;
</script>

<div class="relative w-5/12">
  {#if isWinner}
    <div class="relative flex justify-center items-center win2x">
      <img src="/ribbon-winner.png" alt="Winner" class="min-w-[100px]" />
      <span class="absolute left-0 text-shadow font-bold text-lg">{texts.WINNER}</span>
    </div>
  {/if}

  {#if !secondSection}
    <div class="flex flex-col items-center">
      <Avatar t={player.avatar} s={72} mr='auto' ml='auto'/>
      <p class="mt-2 text-center font-semibold">{UsernameResolver(player.name, player.username)}</p>
    </div>
  {/if}

  {#if secondSection}
    <div class="flex justify-center items-center">
      <h4 class="font-bold text-xl">{numbers.AtLeastZero(player.score)}</h4>
    </div>
  {/if}
</div>

<style>
  .win2x {
    top: -30px;
  }
</style>