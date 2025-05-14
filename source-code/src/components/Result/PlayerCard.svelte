<!-- PlayerCard.svelte -->
<script>
    import Avatar from '../Avatar/Avatar.svelte';
    import { IMAGES } from '$lib/assets/images/images.constants';
    import { t } from "../../stores/language.store"
    export let playerName = "";
    export let avatarType = "";
    export let isWinner = false;
    export let bgColor = "bg-pink-500";
    export let position = "left"; // left or right
    
    // Avatar props
    export let ml = 10;
    export let mr = 10;
    export let size = 72;
</script>

<div class="player-card {position === 'left' ? 'pr-[1.7rem]' : 'pl-[1.7rem]'} w-full py-6 flex flex-col items-center relative {position === 'left' ? 'rounded-l-xl' : 'rounded-r-xl'}">
    {#if isWinner}
         <div class="bonzoui__winner__ribbon bonzoui__winner__ribbon_MP win2x" style={{ left: 0, right: 0 }}>
          <img class="w-[110px] md:w-[200px] h-auto object-contain" src={IMAGES.RIBBON_WINNER} alt="Winner" />
          <span class="pb-title-shadow text-[14px] md:text-[26px] md:top-[2px] top-[-5px]" style="position: absolute; left: 0;">
            {$t("winner")}
          </span>
        </div>
    {/if}
    
    <div class="w-18 h-18 rounded-full overflow-hidden mb-2 {bgColor}">
        <Avatar t={avatarType} ml={ml} mr={mr} s={size} u={size}/>
    </div>
    <p class="text-white mt-2 w-[140px] md:w-[200px] text-center font-bold truncate text-[16px] md:text-lg">{playerName}</p>
     
   
</div>

<style>
    .player-card {
        position: relative;
        z-index: 1;
    }
</style>