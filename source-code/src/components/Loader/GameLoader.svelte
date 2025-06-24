<script>
  import { onMount, onDestroy } from "svelte";

  // Import audio files
  import startChallengeSound from "$lib/assets/sounds/start_challenge.mp3";
  import drumrollSound from "$lib/assets/sounds/drumroll.mp3";
  import countdownSound from "$lib/assets/sounds/countdown.mp3";

  // Import images
  import vsImage from "$lib/assets/images/bonzoui/vs.svg";
  import polkaDots from "$lib/assets/images/bonzoui/polkadots.svg";
  import spikes from "$lib/assets/images/bonzoui/spikes.svg";
  import singlePlayerBanner from "$lib/assets/images/bonzoui/play_mode_banner.svg";
  import sword1 from "$lib/assets/images/bonzoui/sword1.png";
  import sword2 from "$lib/assets/images/bonzoui/sword2.png";
  import CountdownTimer from "../Timer/CountdownTimer.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import { userStore } from "../../stores/user.store";
  import { t } from "../../stores/language.store";
  import SwordAnimation from "../Animation/SwordAnimation.svelte";
  // Props
  export let percent = 0;
  export let callback;
  export let userData;
  export let gameData;
  export let isHundredReached = false;

  // Component state
  let scale = 1;
  let sound1 = false;
  let sound2 = false;
  let sound3 = false;

  // Audio elements
  let track1;
  let track2;
  let track3;

  // DOM element references
  let refMe;
  let refVs;
  let refOpp;
  let refSw1;
  let refSw2;

  // Derived values
  const user = { username: userData?.name };
  const isSinglePlayerMatch = gameData?.isSinglePlayer === 0;

  // Helper function to format usernames
  function formatUsername(username) {
    if (!username) return "";
    if (username.length > 12) {
      return username.substring(0, 10) + "...";
    }
    return username;
  }

  // Audio helpers
  function playAudio(track) {
    // When track3 (countdown) plays, pause all other tracks
    if (track === "track3") {
      if (track1) track1.pause();
      if (track2) track2.pause();
      if (track3) track3.play();
    } else {
      // For other tracks, play normally
      if (track === "track1" && track1) track1.play();
      if (track === "track2" && track2) track2.play();
    }
  }

  function pauseAudio(track) {
    if (track === "track1" && track1) track1.pause();
    if (track === "track2" && track2) track2.pause();
    if (track === "track3" && track3) track3.pause();
  }

  function getRandomScale() {
    return 1 + (Math.random() * 9 + 1) / 10;
  }

  // Animation helpers
  function animateWithDelay(element, animation, duration, loop, delay) {
    if (!element) return;

    setTimeout(() => {
      element.classList.add(animation);

      if (!loop) {
        setTimeout(() => {
          element.classList.remove(animation);
        }, duration);
      }
    }, delay);
  }

  // Effects
  onMount(() => {
    // Set up interval for scale animation
    const interval = setInterval(() => {
      scale = getRandomScale();
    }, 400);

    // Set initial animations
    if (refMe) {
      animateWithDelay(refMe, "animate-slideInLeft", 350, false, 500);
    }

    if (refOpp) {
      animateWithDelay(refOpp, "animate-slideInRight", 350, false, 500);
      animateWithDelay(refVs, "animate-fadeIn", 750, false, 950);
      animateWithDelay(refVs, "animate-jello", 750, false, 1200);
    }

    // Play initial sounds for multiplayer
    if (!isSinglePlayerMatch && !sound2) {
      setTimeout(() => {
        playAudio("track1");
        sound2 = true;
      }, 0);
    }

    // Setup drumroll sound
    if (!sound3) {
      setTimeout(() => {
        playAudio("track2");
        sound3 = true;
      }, 2500);
    }

    // Cleanup
    return () => {
      pauseAudio("track1");
      pauseAudio("track2");
      pauseAudio("track3");
      clearInterval(interval);
    };
  });

  // Watch for percent changes and trigger countdown
  $: if (percent >= 100 && !isHundredReached) {
    isHundredReached = true;
    // When loading is complete and we're about to show countdown, play the countdown sound
    setTimeout(() => {
      playAudio("track3");
      sound1 = true;
    }, 500);
  }

  // Handler functions
  function handleTimerComplete() {
    callback("timeToStart");
  }

  function handleCountdownStart() {
    playAudio("track3");
    sound1 = true;
  }

  onDestroy(() => {
    pauseAudio("track1");
    pauseAudio("track2");
    pauseAudio("track3");
  });
</script>

<div
  class="flex flex-col h-full w-full justify-center items-center text-red-500 absolute z-10 transition-width duration-300"
>
  <!-- Audio elements -->
  <audio bind:this={track1} preload="auto">
    <source src={startChallengeSound} type="audio/mp3" />
  </audio>
  <audio bind:this={track2} preload="auto">
    <source src={drumrollSound} type="audio/mp3" />
  </audio>
  <audio bind:this={track3} preload="auto">
    <source src={countdownSound} type="audio/mp3" />
  </audio>

  <!-- Main container -->
  <div class="h-full w-full fixed top-0 bg-black">
    <!-- Background animations container -->
    <div
      class={`justify-center items-center flex-col h-full m-0 flex ${isSinglePlayerMatch ? "twisted-ui-s" : "twisted-ui"}`}
    >
      <div
        class={`flex-1 ${isSinglePlayerMatch ? "h-full" : "h-1/2"} w-full bg-transparent ${isSinglePlayerMatch ? "" : "animated-left"}`}
        style="background: radial-gradient(at bottom, #00F0FF 0%, #1C62CB 60%);"
      ></div>
      {#if !isSinglePlayerMatch}
        <div
          class="flex-1 h-1/2 w-full bg-transparent animated-right"
          style="border: 12px solid black; background: radial-gradient(at top, #FF981E 0%, #CB1E47 60%);"
        ></div>
      {/if}
    </div>

    <!-- Background patterns -->
    <div class="max-h-screen max-w-full overflow-hidden h-full w-full fixed left-0 top-0 bottom-0 right-0">
      <div>
        <div
          class="absolute left-0 right-0 top-0 bottom-0 bg-cover bg-center"
          style={`background-image: url("${polkaDots}")`}
        ></div>
        <div
          class="absolute left-0 right-0 top-0 bottom-0 bg-cover bg-center transition-transform duration-0"
          style={`background-image: url("${spikes}"); transform: scale(${scale}); transform-origin: 50% 50%;`}
        ></div>
      </div>
    </div>

    <!-- Content layer -->
    <div
      class="justify-center items-center flex-col h-full m-0 flex absolute top-0 bottom-0 right-0 left-0 overflow-hidden h-full max-h-full"
    >
      <div class="justify-center items-center flex-col h-full m-0 flex w-full max-w-5xl justify-between">
        <!-- Banner -->
        <div class="relative w-full flex justify-center mt-10">
          <div
            class="relative bg-contain bg-center bg-no-repeat h-[85px] w-[350px] md:w-[430px]"
            style={`background-image: url("${singlePlayerBanner}")`}
          >
            <!-- Crossed swords animation for both single and multiplayer modes -->
            <SwordAnimation {isSinglePlayerMatch} />

            <div class="absolute w-full h-full flex items-center justify-center top-0">
              {#if percent >= 0 && !isHundredReached}
                <div class="flex items-center gap-4">
                  <div class="text-white font-bold text-xl">Loading...</div>
                  <div class="text-white text-[60px] font-bold pb-[0.5rem]">
                    {percent}<span class="text-white font-bold text-xl">%</span>
                  </div>
                </div>
              {:else}
                <div class="mode-text flex gap-2 items-center">
                  <span
                    class="text-white font-bold {isSinglePlayerMatch ? 'text-base md:text-lg' : 'text-base md:text-xl'}"
                  >
                    {isSinglePlayerMatch ? "Single Player Mode" : "Challenge Mode"} in</span
                  >
                  <CountdownTimer start={true} callback={handleTimerComplete} on:mount={handleCountdownStart} />
                </div>
              {/if}
            </div>
          </div>
        </div>

        <!-- Players container -->
        <div class="mt-6 mb-6 w-full max-w-4xl">
          <div
            class={`flex ${isSinglePlayerMatch ? "flex-col items-center" : "flex-row items-center justify-center"} gap-8`}
          >
            <!-- User box (left player) -->
            <div bind:this={refMe} class="flex flex-col items-center">
              <div class="h-[120px] w-[120px] rounded-full overflow-hidden bg-[#e5e5e5] relative p-2">
                <Avatar t={$userStore.profile_picture} fullSize={true} ml="auto" mr="auto" />
              </div>
              <div class="text-center mt-2 font-bold text-white text-lg">
                {#if !$userStore?.is_guest_mode}
                  {formatUsername(user.username)}
                {:else}
                  {$t("guest_mode")}
                {/if}
              </div>
            </div>

            <!-- VS symbol and Loading content -->
            <div class="flex flex-col items-center justify-center">
              {#if !isSinglePlayerMatch}
                <div bind:this={refVs} class="h-32 w-full flex justify-center items-center">
                  <img src={vsImage} alt="VS" class="w-[165px] h-[165px] z-[120]" />
                </div>
              {/if}
            </div>

            <!-- Opponent box -->
            {#if !isSinglePlayerMatch}
              <div bind:this={refOpp} class="flex flex-col items-center">
                <div class="h-[120px] w-[120px] rounded-full overflow-hidden bg-[#e5e5e5] relative p-2">
                  <Avatar t={gameData?.opponent?.profile_picture} fullSize={true} ml="auto" mr="auto" />
                </div>
                <div class="text-center mt-2 font-bold text-white text-lg">
                  {formatUsername(gameData?.opponent?.name)}
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Animation utilities */
  .animate-slideInLeft {
    animation: slideInLeft 0.5s forwards;
  }

  .animate-slideInRight {
    animation: slideInRight 0.5s forwards;
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s forwards;
  }

  .animate-jello {
    animation: jello 0.8s forwards;
  }

  .timer-anim {
    transform-origin: calc(50% - 4px) calc(50% + 4px);
    animation: zoomInCountdown 1s ease-in-out 4;
  }

  .animated-right {
    transform: translateY(2099px);
    animation: comeFromRight 2s cubic-bezier(0.25, 0.25, 0.25, 1) forwards;
  }

  .animated-left {
    transform: translateY(-2099px);
    animation: comeFromLeft 2s cubic-bezier(0.25, 0.25, 0.25, 1) forwards;
  }

  .twisted-ui {
    transform: rotate(-76deg) scale(2.5);
  }

  @media (max-width: 638.88px) {
    .twisted-ui {
      transform: rotate(-8deg) scale(2.5);
    }
  }

  .twisted-ui-s {
    transform: scale(2.5);
  }

  /* Keyframe animations */
  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes jello {
    0% {
      transform: scale3d(1, 1, 1);
    }
    30% {
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes zoomInCountdown {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(3);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes comeFromRight {
    0% {
      transform: translateY(2099px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes comeFromLeft {
    0% {
      transform: translateY(-2099px);
    }
    100% {
      transform: translateY(0);
    }
  }
  .percent-display {
    font-size: 30px;
    color: white;
    font-weight: 500;
  }
</style>
