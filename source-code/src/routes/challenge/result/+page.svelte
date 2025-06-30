<script>
  import { onMount } from "svelte";
  import EachStatMeter from "../../../components/Result/EachStatMeter.svelte";
  import SubscriptionCard from "../../../components/Card/SubscriptionCard.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import {
    checkMultiplayerStatus,
    determineWinner,
    formatGameData,
    getResultTitleText,
  } from "../../../data-actions/challenge/result.da";
  import { resultStore } from "../../../stores/result.store";
  import Button from "../../../components/Button/Button.svelte";
  import Avatar from "../../../components/Avatar/Avatar.svelte";
  import { goto } from "$app/navigation";
  import { t } from "../../../stores/language.store";
  import { gameDataStore } from "../../../stores/gamedata.store";
  import { competitionStore } from "../../../stores/competition.store";
  import PlayerCard from "../../../components/Result/PlayerCard.svelte";
  import { userStore } from "../../../stores/user.store";
  import { paymentStore } from "../../../stores/payment.store";
  import { metaStore } from "../../../stores/meta.store";
  import { authModalStore } from "../../../stores/auth.modal.store";
  import AuthenticationPopupView from "../../../views/AuthenticationPopupView/AuthenticationPopupView.svelte";
  import ResultAnimation from "../../../components/Animation/ResultAnimation.svelte";
  import { page } from "$app/stores";
  import { isShupavu } from "../../../data-actions/system/system..da";
  $: isMultiplayer = checkMultiplayerStatus($resultStore, $userStore);
  let resultTitleText = "";
  let competitionUrl;
  let hidePopup = true;
  let winnerCalc = {
    winner: 2,
  };
  const { playerWon, opponentWon, isDraw } = determineWinner($resultStore);
  $: console.log($resultStore, "determineWinner");

  // === ADDED SOUND PLAYBACK LOGIC ===
  let isSoundPlaying = false;
  let isSoundLoaded = false;

  // Animation control variables
  let hideAnimation = false;
  let isAnimationComplete = false;
  let showResultContent = false; // Control when to show the main result content

  // If the user comes from the home page (by clicking the "Recently Played" box), then coinAnimation should be set to false.
  let coinAnimation = $page.state;
  $: {
    if (coinAnimation && coinAnimation.coinAnimation === false) {
      isSoundPlaying = false; // Reset sound playback if coinAnimation is false
      hideAnimation = true; // Hide animation if coinAnimation is false
    } else {
      coinAnimation = true;
    }
  }
  $: isSubscribed = $paymentStore?.payment_status?.is_subscribed === 1;
  $: isFreeShupavu = isShupavu && !isSubscribed && !$userStore?.is_guest_mode ;
  $: playerScore = $resultStore?.player?.points ?? 0;

  function checkForScore() {
    return $resultStore?.player?.points > 0;
  }

  // Handle when animation completes
  function handleAnimationComplete() {
    isAnimationComplete = true;
    hideAnimation = true;
    // Show result content after animation
    setTimeout(() => {
      showResultContent = true;
    }, 800);
  }

  onMount(() => {
    console.log("SCORE==========>", $resultStore);
    console.log("checkForScore-->", checkForScore());

    // Show result content immediately if no score/animation
    if (!checkForScore()) {
      showResultContent = true;
    }

    const timeoutId = setTimeout(() => {
      const audio = new Audio("/sound/result_audio.mp3");
      audio.load();

      const handleCanPlayThrough = () => {
        if (!hideAnimation && !isAnimationComplete) {
          if (checkForScore() && !isSoundPlaying) {
            audio.play();
            isSoundPlaying = true;
          }
        }
        isSoundLoaded = true;
      };

      audio.addEventListener("canplaythrough", handleCanPlayThrough, {
        once: true,
      });

      return () => {
        audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      };
    }, 500);

    return () => clearTimeout(timeoutId);
  });

  // Your existing reactive data & statements
  $: gameData = formatGameData($resultStore.player, $resultStore.opponent);

  // Optional: Update gameData when props change
  $: if ($resultStore.player || $resultStore.opponent) {
    gameData = formatGameData($resultStore.player, $resultStore.opponent);
  }

  $: hasPassed = parseFloat($resultStore?.player?.accuracy) >= 0.5;
  $: console.log(resultTitleText, hasPassed, gameData, "gameData123");

  onMount(async () => {
    authModalStore.set({ visible: false, page: "" });
    resultTitleText = await getResultTitleText(isMultiplayer);
  });
</script>

<!-- Main result content - only show after animation completes or if no animation -->
<div
  class="flex flex-col items-center justify-center w-full max-w-4xl mx-auto my-4 px-2 relative z-4 result-content"
  class:fade-in={isAnimationComplete}
>
  <SubscriptionCard
    icon={!isMultiplayer ? IMAGES.SINGLE_PLAYER_IMAGE : null}
    text={resultTitleText}
    padding="px-4 pb-5"
    bgColor="bg-blue-900"
    width="w-full md:min-w-[920px]"
  >
    <div
      class="w-full rounded-r-xl rounded-b-xl"
      style="background: linear-gradient(rgb(1, 238, 253) 0%, rgb(1, 137, 255) 100%);"
    >
      <div class="flex flex-col relative items-center justify-center w-full">
        {#if isMultiplayer}
          <div class="bonzoui__semi__orange rounded-r-xl rounded-b-xl"></div>
        {/if}

        {#if isDraw && isMultiplayer}
          <div class="bonzoui__winner__ribbon mt-2" style="position: relative; left: 0px; right: 0px; top: 0px;">
            <img src={IMAGES.RIBBON_DRAW} alt="Draw" class="w-[130px] md:w-[170px]" />
            <span class="bonzoui__draw__ribbon__text" style="position: absolute; left: 0; right: 0;">
              {$t("draw")}
            </span>
          </div>
        {/if}

        <!-- Winner ribbon section -->
        {#if !isMultiplayer}
          <div   class="bonzoui__winner__ribbon {isFreeShupavu ? 'mb-[3rem]' : '' }" style="position: relative !important;">
            <img
              alt="ribbon"
              src={hasPassed ? IMAGES.RIBBON_WINNER_CONGRATS : IMAGES.RIBBON_WINNER_LOSE}
              class="w-[210px] md:w-[240px]"
            />
            <div
              class="bonzoui__single__result__ribbon__sp pb-title-shadow text-sm md:text-base mt-[-20%] md:mt-[-21%]"
            >
              {hasPassed ? $t("congratulation") : $t("try_again")}
            </div>
          </div>
          {#if !isFreeShupavu}
          {#if !hasPassed && !$userStore?.is_guest_mode }
            <div
              class="bg-[#000000CC] w-full relative rounded-[19px] mb-[44px] p-[12px] text-white flex mt-[49px] max-w-[290px] md:max-w-[320px] flex-col items-center justify-center"
            >
              <div
                class="font-semibold pt-1 pl-[2rem] pb-1 pr-4 p-[2px] flex items-center justify-center text-[15px] md:text-[17px] text-[#ffc200] absolute top-0 bg-black left-0 rounded-[19px]"
              >
                <div class="bonzoui__hint__bulb"></div>
                {$t("note")}
              </div>

              <div class="flex flex-col items-center justify-center text-sm md:text-base">
                {$t("achieve")}{" "}
                <div class="font-bold text-[16px] md:text-[18px] text-[#ffe500]">
                  <span class="text-[28px] md:text-[32px]"> 50% </span>{" "}
                  <span style="font-family: 'Poppins', sans-serif; font-weight: 400;"> {$t("or_more_result_box")}</span>
                </div>
                {" "}
                {$t("to_unlock_result_box")}
              </div>
            </div>
          {:else if !$userStore?.is_guest_mode  }
            <div class="w-full mt-10 flex items-center justify-center">
              <img class="w-[120px] md:w-[160px] h-auto object-contain" src={IMAGES.MORE_COINS} alt="Winner" />
              <span class="text-white text-[36px] md:text-[54px] font-bold title-shadow"
                >+ {gameData?.playerPoints}</span
              >
            </div>
          {:else}
            <div
              class="bg-[#000000CC] w-full relative rounded-[19px] mb-[44px] p-[12px] text-white flex mt-[49px] max-w-[290px] md:max-w-[320px] flex-col items-center justify-center"
            >
              <div class="font-bold text-[20px] md:text-[24px] text-[#ffc200]">
                {$t("sign_up_now")}
              </div>
              <div class="text-[16px] md:text-[18px] text-center font-semibold font-poppins">
                {$t("save_progress_unlock_rewards")}
              </div>
            </div>
          {/if}
          {/if}
        {/if}

        <!-- Players comparison section -->
        {#if isMultiplayer}
          <div class="w-full flex items-center justify-center relative mt-4">
            <div class="w-1/2">
              <PlayerCard
                playerName={gameData?.playerName}
                avatarType={gameData?.playerAvatar}
                bgColor="bg-pink-500"
                position="left"
                isWinner={playerWon}
              />
            </div>

            <!-- VS Image -->
            <div class="absolute z-10">
              <img src={IMAGES.VS} alt="VS" class="w-16 h-16 md:w-24 md:h-24" />
            </div>

            <div class="w-1/2">
              <PlayerCard
                playerName={gameData?.opponentName}
                avatarType={gameData?.opponentAvatar}
                bgColor="bg-pink-300"
                position="right"
                isWinner={opponentWon}
              />
            </div>
          </div>
        {/if}

        <!-- Stats section -->
        <div class="w-full pb-6 px-2 md:px-4 z-10 relative">
          {#if playerWon || opponentWon}
            <div
              class="md:absolute w-1/2 md:w-auto md:mr-0 mt-4 md:mt-0 md:ml-0 flex flex-col justify-center items-center"
              class:mr-auto={playerWon}
              class:ml-auto={opponentWon}
              style="{playerWon
                ? 'left: 15%; top: 40%;'
                : 'right: 0; left: 54%; top: 40%;'} transform: translateY(-50%);"
            >
              <img class="w-[120px] md:w-[160px] h-auto object-contain" src={IMAGES.MORE_COINS} alt="Winner" />
              <span class="text-white w-[120px] text-center text-[18px] md:text-[24px] font-bold title-shadow"
                >+ {playerWon ? gameData?.playerPoints : gameData?.opponentPoints}</span
              >
            </div>
          {/if}
          <div class="flex flex-col items-center space-y-4">
            <EachStatMeter
              l="Score"
              v={gameData?.score}
              {...isMultiplayer && gameData?.opponentScore
                ? { v2: gameData.opponentScore }
                : isMultiplayer && { v2: "-" }}
            />
            <EachStatMeter
              l="Accuracy"
              v={gameData?.accuracy}
              {...isMultiplayer && gameData?.opponentAccuracy ? { v2: gameData.opponentAccuracy } : {}}
            />
            <EachStatMeter
              l="Time taken"
              v={gameData?.timeTaken}
              {...isMultiplayer && gameData?.opponentTimeTaken ? { v2: gameData.opponentTimeTaken } : {}}
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full mt-4">
      {#if isFreeShupavu} 
         <Button
          label={$t("subscribe_for_more_games")}
          size="large"
          type="3d-secondary"
          customClass="w-[300px] text-lg md:text-[22px]"
          onClick={() => {
          paymentStore.set({ competition_id: $competitionStore?.competition_id, current_grade: $competitionStore?.current_grade, url: $competitionStore?.url });
            goto(`/payment`);
          }}
        />
        
      {:else if !$userStore?.is_guest_mode}
        <Button
          label={$t("continue")}
          size="large"
          type="3d-secondary"
          customClass="w-[160px] text-lg md:text-[22px]"
          onClick={() => {
            goto(`/competitions/${$competitionStore?.url}/home`);
          }}
        />
      {:else}
        <Button
          label={$t("signup")}
          size="large"
          type="3d-secondary"
          customClass="w-[160px] text-lg md:text-[22px]"
          onClick={() => {
            authModalStore.set({ visible: true, page: "user-selection" });
          }}
        />
      {/if}
    </div>
  </SubscriptionCard>
</div>

<!-- Result animation - show only when score > 0 and animation not hidden -->
{#if playerScore > 0 && !hideAnimation}
  <ResultAnimation scoreToShow={playerScore} onComplete={handleAnimationComplete} />
{/if}

{#if hidePopup}
  <AuthenticationPopupView />
{/if}

<style>
  .bonzoui__semi__orange {
    position: absolute;
    background: linear-gradient(180deg, #fd9221, #ce2645);
    right: 0;
    left: 50%;
    top: 0;
    bottom: 0;
    display: flex;
    border-radius: 0 0 12px 0;
    z-index: 0;
  }

  .result-content {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-in-out;
  }

  .result-content.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  /* If no animation, show content immediately */
  .result-content:not(.fade-in) {
    opacity: 1;
    transform: translateY(0);
    transition: none;
  }

  @media (max-width: 768px) {
    .bonzoui__single__result__ribbon__sp {
      font-size: 14px;
    }

    .bonzoui__draw__ribbon__text {
      font-size: 14px;
    }
  }
</style>
