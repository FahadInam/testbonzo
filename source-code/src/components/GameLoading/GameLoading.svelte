<script>
  import { onMount, onDestroy } from "svelte";
  import Timer from "./Timer.svelte";
  import { OptAnimate } from "$lib/animations";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import UserBox from "./UserBox.svelte";

  // Props
  export let percent = 0;
  export let timerTick = false;
  export let callback;
  export let opponent;
  export let challenge;
  export let isCompleted = false;

  // Import sounds
  //   import startChallengeSound from '$lib/assets/sounds/start_challenge.mp3';
  //   import drumrollSound from '$lib/assets/sounds/drumroll.mp3';
  //   import countdownSound from '$lib/assets/sounds/countdown.mp3';

  // State
  let sound1 = false;
  let sound2 = false;
  let sound3 = false;
  let isHunderdReached = false;
  let time = 4;
  let scale = 1;
  let stripsLoadingState = false;
  let sw1LoadingState = false;
  let sw2LoadingState = false;

  // Refs
  let meElement;
  let vsElement;
  let oppElement;
  let bStrip;
  let sw1;
  let sw2;

  // Audio elements
  let track1;
  let track2;
  let track3;

  // Import user data and utilities
  const user = {
    // Mock user info - replace with your actual user store
    Info: () => ({ name: "Player", avatar: "" }),
    IsGuest: () => false,
    CombinedOpponent: (opp) => opp || { name: "Opponent", avatar: "" },
  };

  // Check if single player match
  const isSinglePlayerMatch = opponent && opponent.isSinglePlayer === true;
  const subject = challenge?.subject || {};
  const shouldGoToPlayer = !!subject.isStart;
  const calcOpponent = user.CombinedOpponent(opponent);

  const getRandomScale = () => {
    return 1 + (Math.random() * 9 + 1) / 10; // Generates a random scale between 1 and 2
  };

  const playAudio = (track) => {
    if (track === "track1" && track1) track1.play();
    if (track === "track2" && track2) track2.play();
    if (track === "track3" && track3) track3.play();
  };

  const pauseAudio = (track) => {
    if (track === "track1" && track1) track1.pause();
    if (track === "track2" && track2) track2.pause();
    if (track === "track3" && track3) track3.pause();
  };

  const handelStripLoad = () => {
    stripsLoadingState = true;
  };

  const handelSw1Load = () => {
    sw1LoadingState = true;
  };

  const handelSw2Load = () => {
    sw2LoadingState = true;
  };

  const localCallback = (e, item) => {
    if (e !== "completed") {
      time = 3 - item.sec;
    } else if (callback) {
      callback("timeToStart");
    }
  };

  // Effects
  onMount(() => {
    const interval = setInterval(() => {
      scale = getRandomScale();
    }, 400);

    // Add event listeners
    if (bStrip) bStrip.addEventListener("load", handelStripLoad);
    if (sw1) sw1.addEventListener("load", handelSw1Load);
    if (sw2) sw2.addEventListener("load", handelSw2Load);

    // Animations
    const animations = {};

    if (meElement) {
      animations.anim1 = new OptAnimate().AnimateWithDelay(
        meElement,
        "slideInLeft",
        350,
        null,
        false,
        500
      );
    }

    if (oppElement) {
      animations.anim2 = new OptAnimate().AnimateWithDelay(
        oppElement,
        "slideInRight",
        350,
        null,
        false,
        500
      );
    }

    if (vsElement) {
      animations.anim3 = new OptAnimate().AnimateWithDelay(
        vsElement,
        "fadeIn",
        750,
        null,
        false,
        950
      );
      animations.anim4 = new OptAnimate().AnimateWithDelay(
        vsElement,
        "jello",
        750,
        null,
        false,
        1200
      );
    }

    // Sound effects for multiplayer
    if (!isSinglePlayerMatch && !sound2 && !isCompleted) {
      setTimeout(() => {
        playAudio("track1");
      }, 100);
      sound2 = true;
    }

    // Drumroll sound
    setTimeout(() => {
      if (!sound3 && !isCompleted) {
        playAudio("track2");
        sound3 = true;
      }
    }, 2500);

    // Start player route transition after timer
    const timerX = setTimeout(() => {
      if (shouldGoToPlayer) {
        // Replace with your navigation logic
        // window.location.href = '/challenge/player';
      }
    }, 4000);

    // Cleanup
    return () => {
      clearInterval(interval);
      clearTimeout(timerX);

      if (bStrip) bStrip.removeEventListener("load", handelStripLoad);
      if (sw1) sw1.removeEventListener("load", handelSw1Load);
      if (sw2) sw2.removeEventListener("load", handelSw2Load);

      pauseAudio("track1");
      pauseAudio("track2");
      pauseAudio("track3");
    };
  });

  // Watch for percent change
  $: if (percent >= 100 && !isHunderdReached) isHunderdReached = true;

  // Watch for timer and sounds
  $: if (timerTick && time < 4 && !sound1 && !isCompleted) {
    if (!sound2) {
      pauseAudio("track2");
      sound2 = true;
    }
    if (!sound3) {
      pauseAudio("track1");
      sound3 = true;
    }
    playAudio("track3");
    sound1 = true;
  }

  // Stop navigation listener
  onDestroy(() => {
    pauseAudio("track1");
    pauseAudio("track2");
    pauseAudio("track3");
  });
</script>

<div class="preloader">
  <!-- Audio elements -->
  <!-- <audio bind:this={track1} preload="auto">
    <source src={startChallengeSound} type="audio/mp3" />
  </audio>
  <audio bind:this={track2} preload="auto">
    <source src={drumrollSound} type="audio/mp3" />
  </audio>
  <audio bind:this={track3} preload="auto">
    <source src={countdownSound} type="audio/mp3" />
  </audio> -->

  <div class="boxClassName coreChallengeBgBox h-full">
    <div
      class="containerClass {isSinglePlayerMatch ? 'twistedUIS' : 'twistedUI'}"
    >
      <div
        class="{isSinglePlayerMatch
          ? 'halfFull'
          : 'half'} blackBg {isSinglePlayerMatch ? '' : 'animatedLeft'}"
      ></div>
      {#if !isSinglePlayerMatch}
        <div
          class="half whiteBg {isSinglePlayerMatch ? '' : 'animatedRight'}"
        ></div>
      {/if}
    </div>

    <div class="coreChallengeBoxBgAnims">
      <div class="coreChallengeBoxBgAnimsInner">
        <div
          class="polkaDots"
          style="background-image: url({IMAGES.POLKA_DOTS})"
        ></div>
        <div
          class="spikes"
          style="background-image: url({IMAGES.SPIKES}); transform: scale({scale})"
        ></div>
      </div>
    </div>

    <div class="containerClass upperLayer">
      <div class="containerClass innerBox w-full max-w-4xl">
        <div class="h-12 mt-4 hidden items-end">
          <h4 class="text-center text-white">
            {challenge?.subject?.subject || ""}
          </h4>
        </div>

        <div class="mt-6 mb-6 w-full max-w-4xl playersCirclesContainer">
          <div
            class="grid grid-cols-12 items-center {isSinglePlayerMatch
              ? 'innerPlayerCirclesSP'
              : 'innerPlayerCircles'}"
          >
            <div
              class="{isSinglePlayerMatch
                ? 'modeTextSP'
                : 'modeText'} {!stripsLoadingState
                ? 'invisible'
                : 'bonzoui__strips__bg'}"
            >
              <span
                class={isSinglePlayerMatch
                  ? "modeTextLabelSP"
                  : "modeTextLabelMP"}
              >
                {#if percent >= 0 && !isHunderdReached}
                  <span style="font-size: 18px; margin-left: 10px;"
                    >Loading...</span
                  >
                {:else}
                  {isSinglePlayerMatch
                    ? "SINGLE PLAYER MODE IN"
                    : "MULTIPLAYER CHALLENGE IN"}
                {/if}

                <!-- Loading percentage -->
                {#if percent >= 0 && !isHunderdReached && !(time < 4)}
                  <div class="percentTimerContainer">
                    <span class="text-[60px] font-bold text-white">
                      {percent}
                      <span class="text-xl ml-1">%</span>
                    </span>
                  </div>
                {/if}

                <!-- Timer container -->
                <div
                  class="timerContainer"
                  style="visibility: {!(timerTick && time < 4)
                    ? 'hidden'
                    : 'visible'}"
                >
                  <span class="countdown_digits">
                    <span
                      class="timerContainer1 {timerTick && time < 4
                        ? 'timerAnim'
                        : ''} text-white font-bold text-7xl"
                    >
                      {time === 0 ? "0" : time}
                    </span>
                  </span>
                </div>
              </span>

              <!-- Mode banners -->
              <img
                bind:this={bStrip}
                src={isSinglePlayerMatch
                  ? IMAGES.SINGLE_PLAYER_BANNER
                  : IMAGES.MULTI_PLAYER_BANNER}
                alt={isSinglePlayerMatch
                  ? "SINGLE PLAYER"
                  : "MULTIPLAYER CHALLENGE"}
                height={isSinglePlayerMatch ? 85 : 85}
                style="margin: auto;"
              />

              <!-- Swords -->
              <div
                class="bonzoui__swords__container {!sw1LoadingState ||
                !sw2LoadingState
                  ? 'invisible'
                  : ''}"
              >
                <img
                  src={IMAGES.SWORD1}
                  bind:this={sw1}
                  alt=""
                  class="bonzoui__sword1__overlay {!sw1LoadingState
                    ? 'invisible'
                    : ''}"
                  height="70"
                />
                {#if !isSinglePlayerMatch}
                  <img
                    bind:this={sw2}
                    src={IMAGES.SWORD2}
                    alt="Multiplayer Mode"
                    class="bonzoui__sword2__overlay {!sw2LoadingState
                      ? 'invisible'
                      : ''}"
                    height="70"
                  />
                {/if}
              </div>
            </div>

            <!-- Hidden Timer component -->
            <div class="hidden">
              <Timer
                min={0}
                sec={0}
                start={timerTick}
                {callback}
                totalTime={4}
              />
            </div>

            <!-- User boxes -->
            <div class="col-span-5">
              <UserBox
                bind:this={meElement}
                user={user.Info()}
                isLeft={true}
                {isSinglePlayerMatch}
                animated={true}
                isGuest={user.IsGuest()}
              />
            </div>

            {#if !isSinglePlayerMatch}
              <div class="col-span-2" style="z-index: 123;">
                <div class="vs" bind:this={vsElement} style="display: none;">
                  <img src={IMAGES.VS_IMAGE} alt="VS" class="vsImg" />
                </div>
              </div>

              <div class="col-span-5">
                <UserBox
                  bind:this={oppElement}
                  user={calcOpponent}
                  {isSinglePlayerMatch}
                  animated={true}
                />
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Loading Screen Styles */
  .preloader {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: red;
    position: absolute;
    z-index: 5;
    transition: width 0.3s;
  }

  /* Box and container styles */
  .boxClassName {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .coreChallengeBgBox {
    max-height: 100vh;
    max-width: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    background: black;
  }

  .containerClass {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    margin: 0;
    display: flex;
  }

  /* UI transformation styles */
  .twistedUI {
    transform: rotate(-76deg) scale(2.5);
  }

  .twistedUIS {
    transform: scale(2.5);
  }

  /* Half panels */
  .half {
    flex: 1 1 1;
    background: transparent;
    height: 50%;
    width: 100%;
  }

  .halfFull {
    flex: 1 1 1;
    background: transparent;
    height: 100%;
    width: 100%;
  }

  .whiteBg {
    border: 12px solid black;
    background: radial-gradient(at top, #ff981e 0%, #cb1e47 60%);
  }

  .blackBg {
    background: radial-gradient(at bottom, #00f0ff 0%, #1c62cb 60%);
  }

  /* Background effects */
  .coreChallengeBoxBgAnims {
    max-height: 100vh;
    max-width: 100%;
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .polkaDots {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
  }

  .spikes {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0s;
    transform-origin: 50% 50%;
  }

  /* Upper layer styling */
  .upperLayer {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: hidden;
    height: 100%;
    max-height: 100%;
    overflow-y: hidden;
  }

  .innerBox {
    justify-content: space-between;
  }

  /* VS image styling */
  .vsImg {
    width: 165px;
    height: 165px;
    margin-left: 15px;
    z-index: 120;
  }

  .vs {
    height: 120px;
    width: 100%;
    left: 0;
    right: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    margin: auto;
    font-size: 24px;
    animation: zoomOut 0.2s ease-out;
    z-index: 120;
  }

  @keyframes zoomOut {
    from {
      transform: scale(20);
    }
    to {
      transform: scale(1);
    }
  }

  /* Player circles styling */
  .playersCirclesContainer {
    /* Add your styling here */
  }

  .innerPlayerCircles {
    display: flex;
    justify-content: center;
  }

  .innerPlayerCirclesSP {
    display: flex;
    justify-content: center;
  }

  /* Mode text styling */
  .modeText {
    font-family: "Fredoka", sans-serif;
    font-weight: 700;
    font-size: 16px;
    position: absolute;
    margin: auto;
    z-index: 1;
    color: #ffffff;
    top: 30%;
  }

  .modeTextSP {
    font-family: "Fredoka", sans-serif;
    font-weight: 700;
    font-size: 16px;
    position: absolute;
    margin: auto;
    top: calc(50% - 140px);
    z-index: 1;
    color: #ffffff;
  }

  .modeTextLabelMP {
    position: absolute;
    left: 110px;
    top: 31px;
    margin: auto;
  }

  .modeTextLabelSP {
    position: absolute;
    left: 84px;
    top: 30px;
    margin: auto;
  }

  /* Timer styling */
  .timerContainer {
    font-family: "Fredoka", sans-serif;
    font-weight: 700;
    font-size: 56px;
    text-align: left;
    position: absolute;
    top: -74px;
    right: -80px;
  }

  .timerContainer1 {
    transform-origin: 20px 40px;
    z-index: 1;
    text-shadow:
      -2px 0px 1px rgba(0, 0, 0, 1),
      2px 0px 1px rgba(0, 0, 0, 1),
      2px -2px 1px rgba(0, 0, 0, 1),
      -2px -2px 1px rgba(0, 0, 0, 1),
      -2px 4px 1px rgba(0, 0, 0, 1),
      2px 4px 1px rgba(0, 0, 0, 1);
  }

  .timerAnim {
    transform-origin: calc(50% - 4px) calc(50% + 4px);
    animation: zoomInCountdown 1s ease-in-out 4;
  }

  .percentTimerContainer {
    z-index: 1;
    position: absolute;
    top: -36px;
    right: -122px;
    text-align: left;
  }

  .countdown_digits {
    position: absolute;
    width: 70px;
    height: 70px;
    max-height: 70px;
    left: -90px;
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

  /* Animation classes */
  .animatedRight {
    transform: translateY(2099px);
    animation: comeFromRight 2s cubic-bezier(0.25, 0.25, 0.25, 1) forwards;
  }

  @keyframes comeFromRight {
    0% {
      transform: translateY(2099px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .animatedLeft {
    transform: translateY(-2099px);
    animation: comeFromLeft 2s cubic-bezier(0.25, 0.25, 0.25, 1) forwards;
  }

  @keyframes comeFromLeft {
    0% {
      transform: translateY(-2099px);
    }
    100% {
      transform: translateY(0);
    }
  }

  /* Swords and banner styling */
  .bonzoui__swords__container {
    position: relative;
    z-index: 10;
  }

  .bonzoui__sword1__overlay {
    position: absolute;
    left: -30px;
    top: 10px;
    transform: rotate(-45deg);
  }

  .bonzoui__sword2__overlay {
    position: absolute;
    right: -30px;
    top: 10px;
    transform: rotate(45deg);
  }

  .bonzoui__strips__bg {
    position: relative;
  }

  /* Responsive media queries */
  @media (max-width: 1023.88px) {
    .vsImg {
      width: 100%;
      height: 100%;
      margin-left: 0px;
    }
  }

  @media (max-width: 638.88px) {
    .twistedUI {
      transform: rotate(-8deg) scale(2.5);
    }

    .whiteBg {
      border: 6px solid black;
    }

    .vsImg {
      width: 70px;
      height: 70px;
      margin-left: 0px;
    }

    .vs {
      position: fixed;
      top: 135px;
      bottom: 0;
      width: 70px;
      height: 70px;
    }

    .polkaDots {
      background-position: right;
    }

    .modeText {
      transform: scale(0.6);
      font-size: 28px;
      position: absolute;
      top: 48%;
      bottom: 52%;
    }

    .modeTextSP {
      transform: scale(0.6);
      font-size: 22px;
      position: absolute;
    }

    .modeTextLabelMP {
      top: 25px;
      left: 87px;
    }

    .innerPlayerCircles {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .innerPlayerCirclesSP {
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-height: 630.88px) and (max-width: 370.88px) {
    .modeText,
    .modeTextSP {
      position: fixed;
      top: 40px;
    }
  }

  @media (max-height: 542px) {
    .modeText,
    .modeTextSP {
      position: fixed !important;
      top: 40px !important;
      transform: scale(0.8) !important;
    }
  }

  @media (max-height: 400px) {
    .upperLayer {
      margin: 0 auto;
    }

    .innerBox {
      margin: 0 auto;
      transform: scale(0.8);
    }

    .playersCirclesContainer {
      margin: -12px;
    }
  }

  /* Utility classes */
  .invisible {
    visibility: hidden;
  }

  /* The styles will be in a separate CSS file */
</style>
