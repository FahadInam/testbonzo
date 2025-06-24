<script>
  export let isPocketGames = false;
  export let scoreToShow;
  export let onComplete = () => {}; // Callback when everything is done

  let mainAnimationComplete = false;
  let showCoinMovement = false;
  let allAnimationsComplete = false;
  let coinCounterPosition = { x: 0, y: 0 }; // Store the coin counter position

  // Function to get the coin-counter element position
  function getCoinCounterPosition() {
    const coinCounter = document.querySelector(".coin-counter");
    if (coinCounter) {
      const rect = coinCounter.getBoundingClientRect();
      coinCounterPosition = {
        x: rect.left + rect.width / 2, // Center of the element
        y: rect.top + rect.height / 2,
      };
      console.log("Coin counter position:", coinCounterPosition);
    } else {
      console.warn("Coin counter element not found, using fallback position");
      // Fallback to original position if element not found
      coinCounterPosition = {
        x: window.innerWidth - 140,
        y: window.innerHeight * 0.05,
      };
    }
  }

  // Handle when the main background animation ends
  function handleMainAnimationEnd() {
    console.log("Main animation ended");
    mainAnimationComplete = true;
    // Get the coin counter position before starting coin movement
    getCoinCounterPosition();
    // Wait a bit then start coin movement
    setTimeout(() => {
      showCoinMovement = true;
    }, 3000); // Pause before coins start moving
  }

  // Handle when coin animations are done
  function handleCoinAnimationsComplete() {
    console.log("All coin movements complete");
    allAnimationsComplete = true;
    // Call the parent callback
    setTimeout(() => {
      onComplete();
    }, 500);
  }
</script>

<div class="baseDiv" class:animation-ended={mainAnimationComplete}>
  <div class="baseAnimDiv" on:animationend={handleMainAnimationEnd}>
    <div class="raysBackground"></div>
    <div class={`coinsFront ${isPocketGames ? "coinsFrontPG" : ""}`}></div>

    <div
      class="starSmall starSmall1"
      style="--left: calc(50vw - 4%); --top: calc(50vh - 8%); --w: 40px; --h: 30px;"
    ></div>
    <div
      class="starSmall starSmall2"
      style="--left: calc(50vw + 15%); --top: calc(50vh + 12%); --w: 30px; --h: 30px;"
    ></div>
    <div
      class="starSmall starSmall3"
      style="--left: calc(50vw - 23%); --top: calc(50vh + 8%); --w: 40px; --h: 40px;"
    ></div>
    <div
      class="starSmall starSmall4"
      style="--left: calc(50vw - 8%); --top: calc(50vh - 17%); --w: 30px; --h: 30px;"
    ></div>
    <div
      class="starSmall starSmall5"
      style="--left: calc(50vw + 4%); --top: calc(50vh + 8%); --w: 40px; --h: 40px;"
    ></div>
    <div
      class="starSmall starSmall6"
      style="--left: calc(50vw - 16%); --top: calc(50vh - 22%); --w: 30px; --h: 30px;"
    ></div>
    <div
      class="starSmall starSmall7"
      style="--left: calc(50vw + 12%); --top: calc(50vh - 25%); --w: 40px; --h: 40px;"
    ></div>
    <div
      class="starSmall starSmall8"
      style="--left: calc(50vw + 16%); --top: calc(50vh - 12%); --w: 30px; --h: 30px;"
    ></div>

    <div class="amtTextAnim text-white text-[36px] md:text-[54px] font-bold title-shadow">
      + {scoreToShow}
    </div>
  </div>

  <!-- Coin movement animation - ONLY after main animation completely ends -->
  {#if showCoinMovement}
    <div class="coinMovementContainer">
      <div
        class="movingCoin coin1"
        style="--target-x: {coinCounterPosition.x}px; --target-y: {coinCounterPosition.y}px;"
        on:animationend={handleCoinAnimationsComplete}
      ></div>
      <div
        class="movingCoin coin2"
        style="--target-x: {coinCounterPosition.x}px; --target-y: {coinCounterPosition.y}px;"
      ></div>
      <div
        class="movingCoin coin3"
        style="--target-x: {coinCounterPosition.x}px; --target-y: {coinCounterPosition.y}px;"
      ></div>
      <div
        class="movingCoin coin4"
        style="--target-x: {coinCounterPosition.x}px; --target-y: {coinCounterPosition.y}px;"
      ></div>
      <div
        class="movingCoin coin5"
        style="--target-x: {coinCounterPosition.x}px; --target-y: {coinCounterPosition.y}px;"
      ></div>
    </div>
  {/if}
</div>

<style>
  /* Base container covering full viewport */
  .baseDiv {
    position: fixed; /* fixed covers viewport */
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 5; /* higher than result-wrapper */
    pointer-events: none; /* so clicks go through */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Hide the main animation container after animation ends */
  .baseDiv.animation-ended .baseAnimDiv {
    opacity: 0;
    pointer-events: none;
  }

  .baseAnimDiv {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle, rgba(2, 2, 2, 0.3557) 0%, rgba(0, 0, 0, 0.689) 100%);
    animation: bgColor 4s linear forwards;
    transition: opacity 0.5s ease-out;
  }

  .raysBackground {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-image: url("../../lib/assets/images/result/sunrays.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    animation: zoomRotate 4s linear forwards;
  }

  .coinsFront {
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 100vh;
    background-image: url("../../lib/assets/images/result/stack1.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    animation: zoomSimple 8s linear forwards;
    transform: scale(0);
  }

  .coinsFrontPG {
    background-image: url("../../lib/assets/images/result/stack1-pg.png");
  }

  .amtTextAnim {
    font-size: 72px !important;
    animation: textZoom 4s ease-in-out forwards;
    position: absolute;
    color: white;
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: black;
    text-align: center;
    width: 100%;
    top: 65%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .starSmall {
    position: absolute;
    background-image: url("../../lib/assets/images/result/starsmall.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    animation: zoomRotateQuick 1.4s ease-in-out forwards;

    left: var(--left);
    top: var(--top);
    width: var(--w);
    height: var(--h);
  }

  /* Different animation delays for stars */
  .starSmall1 {
    animation-delay: 0.5s;
  }
  .starSmall2 {
    animation-delay: 1.2s;
  }
  .starSmall3 {
    animation-delay: 1.8s;
  }
  .starSmall4 {
    animation-delay: 2.4s;
  }
  .starSmall5 {
    animation-delay: 3s;
  }
  .starSmall6 {
    animation-delay: 3.3s;
  }
  .starSmall7 {
    animation-delay: 4s;
  }
  .starSmall8 {
    animation-delay: 4.6s;
  }

  /* Coin Movement Styles - SEPARATE from main animation */
  .coinMovementContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    z-index: 15; /* Higher than main animation */
    background: transparent; /* No background for coin movement */
  }

  .movingCoin {
    position: absolute;
    width: 55px;
    height: 55px;
    background-image: url("../../lib/assets/images/result/coin.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
  }

  /* Starting positions - center of screen */
  .coin1 {
    left: calc(50% - 25px);
    top: calc(60% - 25px);
    animation: moveCoinToTarget1 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .coin2 {
    left: calc(50% - 35px);
    top: calc(60% - 15px);
    animation: moveCoinToTarget2 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.1s;
  }

  .coin3 {
    left: calc(50% - 15px);
    top: calc(60% - 35px);
    animation: moveCoinToTarget3 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.2s;
  }

  .coin4 {
    left: calc(50% - 45px);
    top: calc(60% - 5px);
    animation: moveCoinToTarget4 1.05s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.3s;
  }

  .coin5 {
    left: calc(50% - 5px);
    top: calc(60% - 45px);
    animation: moveCoinToTarget5 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.4s;
  }

  /* Keyframes */
  @keyframes bgColor {
    0% {
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    95% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes zoomRotateQuick {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      transform: scale(0.2) rotate(90deg);
      opacity: 0;
    }
    50% {
      transform: scale(1) rotate(180deg);
      opacity: 1;
    }
    90% {
      transform: scale(0.2) rotate(270deg);
      opacity: 0;
    }
    100% {
      transform: scale(0) rotate(360deg);
      opacity: 0;
      display: none;
    }
  }

  @keyframes zoomRotate {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    50% {
      transform: scale(1.2) rotate(180deg);
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: scale(0) rotate(360deg);
      opacity: 0;
      display: none;
    }
  }

  @keyframes zoomSimple {
    0% {
      transform: scale(0);
    }
    10% {
      transform: scale(0.5);
    }
    50% {
      transform: scale(0.55);
    }
    90% {
      transform: scale(0.45);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes textZoom {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    20% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    80% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
      display: none;
    }
  }

  /* Dynamic coin animations using CSS custom properties */
  @keyframes moveCoinToTarget1 {
    0% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    25% {
      transform: scale(1.2) rotate(90deg);
      opacity: 1;
    }
    50% {
      transform: scale(0.9) rotate(180deg);
      opacity: 0.9;
      left: calc(var(--target-x) - 25px);
      top: calc(var(--target-y) + 20px);
    }
    75% {
      transform: scale(0.7) rotate(270deg);
      opacity: 0.7;
      left: calc(var(--target-x) - 25px);
      top: calc(var(--target-y) + 10px);
    }
    100% {
      transform: scale(0.4) rotate(360deg);
      opacity: 0;
      left: calc(var(--target-x) - 25px);
      top: calc(var(--target-y) - 25px);
    }
  }

  @keyframes moveCoinToTarget2 {
    0% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    25% {
      transform: scale(1.2) rotate(120deg);
      opacity: 1;
    }
    50% {
      transform: scale(0.9) rotate(240deg);
      opacity: 0.9;
      left: calc(var(--target-x) - 35px);
      top: calc(var(--target-y) + 15px);
    }
    75% {
      transform: scale(0.7) rotate(300deg);
      opacity: 0.7;
      left: calc(var(--target-x) - 30px);
      top: calc(var(--target-y) + 5px);
    }
    100% {
      transform: scale(0.4) rotate(480deg);
      opacity: 0;
      left: calc(var(--target-x) - 25px);
      top: calc(var(--target-y) - 25px);
    }
  }

  @keyframes moveCoinToTarget3 {
    0% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    25% {
      transform: scale(1.2) rotate(60deg);
      opacity: 1;
    }
    50% {
      transform: scale(0.9) rotate(150deg);
      opacity: 0.9;
      left: calc(var(--target-x) - 15px);
      top: calc(var(--target-y) + 25px);
    }
    75% {
      transform: scale(0.7) rotate(240deg);
      opacity: 0.7;
      left: calc(var(--target-x) - 20px);
      top: calc(var(--target-y) + 15px);
    }
    100% {
      transform: scale(0.4) rotate(300deg);
      opacity: 0;
      left: calc(var(--target-x) - 25px);
      top: calc(var(--target-y) - 25px);
    }
  }

  @keyframes moveCoinToTarget4 {
    0% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    25% {
      transform: scale(1.2) rotate(180deg);
      opacity: 1;
    }
    50% {
      transform: scale(0.9) rotate(270deg);
      opacity: 0.9;
      left: calc(var(--target-x) - 45px);
      top: calc(var(--target-y) + 10px);
    }
    75% {
      transform: scale(0.7) rotate(360deg);
      opacity: 0.7;
      left: calc(var(--target-x) - 35px);
      top: calc(var(--target-y) + 0px);
    }
    100% {
      transform: scale(0.4) rotate(540deg);
      opacity: 0;
      left: calc(var(--target-x) - 25px);
      top: calc(var(--target-y) - 25px);
    }
  }

  @keyframes moveCoinToTarget5 {
    0% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    25% {
      transform: scale(1.2) rotate(45deg);
      opacity: 1;
    }
    50% {
      transform: scale(0.9) rotate(135deg);
      opacity: 0.9;
      left: calc(var(--target-x) - 5px);
      top: calc(var(--target-y) + 30px);
    }
    75% {
      transform: scale(0.7) rotate(225deg);
      opacity: 0.7;
      left: calc(var(--target-x) - 15px);
      top: calc(var(--target-y) + 20px);
    }
    100% {
      transform: scale(0.4) rotate(315deg);
      opacity: 0;
      left: calc(var(--target-x) - 25px);
      top: calc(var(--target-y) - 25px);
    }
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .movingCoin {
      width: 35px;
      height: 35px;
    }

    /* Adjust coin starting positions for mobile */
    .coin1 {
      left: calc(50% - 17px);
      top: calc(60% - 17px);
      animation: moveCoinToTargetMobile1 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .coin2 {
      left: calc(50% - 27px);
      top: calc(60% - 7px);
      animation: moveCoinToTargetMobile2 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.1s;
    }

    .coin3 {
      left: calc(50% - 7px);
      top: calc(60% - 27px);
      animation: moveCoinToTargetMobile3 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.2s;
    }

    .coin4 {
      left: calc(50% - 37px);
      top: calc(60% + 3px);
      animation: moveCoinToTargetMobile4 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.3s;
    }

    .coin5 {
      left: calc(50% + 3px);
      top: calc(60% - 37px);
      animation: moveCoinToTargetMobile5 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.4s;
    }

    /* Mobile-specific animations using CSS custom properties */
    @keyframes moveCoinToTargetMobile1 {
      0% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      25% {
        transform: scale(1.2) rotate(90deg);
        opacity: 1;
      }
      50% {
        transform: scale(0.9) rotate(180deg);
        opacity: 0.9;
        left: calc(var(--target-x) - 17px);
        top: calc(var(--target-y) + 15px);
      }
      75% {
        transform: scale(0.7) rotate(270deg);
        opacity: 0.7;
        left: calc(var(--target-x) - 17px);
        top: calc(var(--target-y) + 5px);
      }
      100% {
        transform: scale(0.3) rotate(360deg);
        opacity: 0;
        left: calc(var(--target-x) - 17px);
        top: calc(var(--target-y) - 17px);
      }
    }

    @keyframes moveCoinToTargetMobile2 {
      0% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      25% {
        transform: scale(1.2) rotate(120deg);
        opacity: 1;
      }
      50% {
        transform: scale(0.9) rotate(240deg);
        opacity: 0.9;
        left: calc(var(--target-x) - 27px);
        top: calc(var(--target-y) + 10px);
      }
      75% {
        transform: scale(0.7) rotate(300deg);
        opacity: 0.7;
        left: calc(var(--target-x) - 22px);
        top: calc(var(--target-y) + 0px);
      }
      100% {
        transform: scale(0.3) rotate(480deg);
        opacity: 0;
        left: calc(var(--target-x) - 17px);
        top: calc(var(--target-y) - 17px);
      }
    }

    @keyframes moveCoinToTargetMobile3 {
      0% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      25% {
        transform: scale(1.2) rotate(60deg);
        opacity: 1;
      }
      50% {
        transform: scale(0.9) rotate(150deg);
        opacity: 0.9;
        left: calc(var(--target-x) - 7px);
        top: calc(var(--target-y) + 20px);
      }
      75% {
        transform: scale(0.7) rotate(240deg);
        opacity: 0.7;
        left: calc(var(--target-x) - 12px);
        top: calc(var(--target-y) + 10px);
      }
      100% {
        transform: scale(0.3) rotate(300deg);
        opacity: 0;
        left: calc(var(--target-x) - 17px);
        top: calc(var(--target-y) - 17px);
      }
    }

    @keyframes moveCoinToTargetMobile4 {
      0% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      25% {
        transform: scale(1.2) rotate(180deg);
        opacity: 1;
      }
      50% {
        transform: scale(0.9) rotate(270deg);
        opacity: 0.9;
        left: calc(var(--target-x) - 37px);
        top: calc(var(--target-y) + 5px);
      }
      75% {
        transform: scale(0.7) rotate(360deg);
        opacity: 0.7;
        left: calc(var(--target-x) - 27px);
        top: calc(var(--target-y) - 5px);
      }
      100% {
        transform: scale(0.3) rotate(540deg);
        opacity: 0;
        left: calc(var(--target-x) - 17px);
        top: calc(var(--target-y) - 17px);
      }
    }

    @keyframes moveCoinToTargetMobile5 {
      0% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      25% {
        transform: scale(1.2) rotate(45deg);
        opacity: 1;
      }
      50% {
        transform: scale(0.9) rotate(135deg);
        opacity: 0.9;
        left: calc(var(--target-x) + 3px);
        top: calc(var(--target-y) + 25px);
      }
      75% {
        transform: scale(0.7) rotate(225deg);
        opacity: 0.7;
        left: calc(var(--target-x) - 7px);
        top: calc(var(--target-y) + 15px);
      }
      100% {
        transform: scale(0.3) rotate(315deg);
        opacity: 0;
        left: calc(var(--target-x) - 17px);
        top: calc(var(--target-y) - 17px);
      }
    }
  }
</style>
