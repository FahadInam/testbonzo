<script>
  import { onMount } from "svelte";
  import EachStatMeter from "../../../components/Result/EachStatMeter.svelte";
  import SubscriptionCard from "../../../components/Card/SubscriptionCard.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import {
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
  import { metaStore } from "../../../stores/meta.store";
  import { authModalStore } from "../../../stores/auth.modal.store";
  import AuthenticationPopupView from "../../../views/AuthenticationPopupView/AuthenticationPopupView.svelte";

  $: isMultiplayer = $resultStore?.opponent?.opponent_id != null;
  let resultTitleText = "";
  let competitionUrl;
  let hidePopup = true;
  let winnerCalc = {
    winner: 2,
  };
  const { playerWon, opponentWon, isDraw } = determineWinner($resultStore);
  $: console.log($resultStore, "determineWinner");

  onMount(async () => {
    authModalStore.set({ visible: false, page: "" });
    resultTitleText = await getResultTitleText(isMultiplayer);
  });

  // Use the formatter function
  $: console.log($resultStore, "1gameDataStore");
  let gameData = formatGameData($resultStore.player, $resultStore.opponent);

  // Optional: Update gameData when props change
  $: if ($resultStore.player || $resultStore.opponent) {
    gameData = formatGameData($resultStore.player, $resultStore.opponent);
  }

  $: hasPassed = parseFloat($resultStore?.player?.accuracy) >= 0.5;
  $: console.log(resultTitleText, hasPassed, gameData, "gameData123");
</script>

<div
  class="flex flex-col items-center justify-center w-full max-w-4xl mx-auto my-4 px-2"
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
          <div
            class="bonzoui__winner__ribbon mt-2"
            style="position: relative; left: 0px; right: 0px; top: 0px;"
          >
            <img
              src={IMAGES.RIBBON_DRAW}
              alt="Draw"
              class="w-[130px] md:w-[170px]"
            />
            <span
              class="bonzoui__draw__ribbon__text"
              style="position: absolute; left: 0; right: 0;"
            >
              {$t("draw")}
            </span>
          </div>
        {/if}

        <!-- Winner ribbon section -->
        {#if !isMultiplayer}
          <div
            class="bonzoui__winner__ribbon"
            style="position: relative !important;"
          >
            <img
              src={hasPassed
                ? IMAGES.RIBBON_WINNER_CONGRATS
                : IMAGES.RIBBON_WINNER_LOSE}
              class="w-[210px] md:w-[240px]"
            />
            <div
              class="bonzoui__single__result__ribbon__sp pb-title-shadow text-sm md:text-base mt-[-20%] md:mt-[-21%]"
            >
              {hasPassed ? $t("congratulation") : $t("try_again")}
            </div>
          </div>

          {#if !hasPassed}
            <div
              class="bg-[#000000CC] w-full relative rounded-[19px] mb-[44px] p-[12px] text-white flex mt-[49px] max-w-[290px] md:max-w-[320px] flex-col items-center justify-center"
            >
              <div
                class="font-semibold pt-1 pl-[2rem] pb-1 pr-4 p-[2px] flex items-center justify-center text-[15px] md:text-[17px] text-[#ffc200] absolute top-0 bg-black left-0 rounded-[19px]"
              >
                <div class="bonzoui__hint__bulb"></div>
                {$t("note")}
              </div>

              <div
                class="flex flex-col items-center justify-center text-sm md:text-base"
              >
                {$t("achieve")}{" "}
                <div
                  class="font-bold text-[16px] md:text-[18px] text-[#ffe500]"
                >
                  <span class="text-[28px] md:text-[32px]"> 50% </span>{" "}
                  <span
                    style="font-family: 'Poppins', sans-serif; font-weight: 400;"
                  >
                    {$t("or_more_result_box")}</span
                  >
                </div>
                {" "}
                {$t("to_unlock_result_box")}
              </div>
            </div>
          {:else if !$userStore?.is_guest_mode}
            <div class="w-full mt-10 flex items-center justify-center">
              <img
                class="w-[120px] md:w-[160px] h-auto object-contain"
                src={IMAGES.MORE_COINS}
                alt="Winner"
              />
              <span
                class="text-white text-[36px] md:text-[54px] font-bold title-shadow"
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
              <div class="text-[16px] md:text-[18px] text-center font-semibold">
                {$t("save_progress_unlock_rewards")}
              </div>
            </div>
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
              <img
                class="w-[120px] md:w-[160px] h-auto object-contain"
                src={IMAGES.MORE_COINS}
                alt="Winner"
              />
              <span
                class="text-white w-[120px] text-center text-[18px] md:text-[24px] font-bold title-shadow"
                >+ {playerWon
                  ? gameData?.playerPoints
                  : gameData?.opponentPoints}</span
              >
            </div>
          {/if}
          <div class="flex flex-col items-center space-y-4">
            <EachStatMeter
              l="Score"
              v={gameData?.score}
              {...isMultiplayer && gameData?.opponentScore
                ? { v2: gameData.opponentScore }
                : {}}
            />
            <EachStatMeter
              l="Accuracy"
              v={gameData?.accuracy}
              {...isMultiplayer && gameData?.opponentAccuracy
                ? { v2: gameData.opponentAccuracy }
                : {}}
            />
            <EachStatMeter
              l="Time taken"
              v={gameData?.timeTaken}
              {...isMultiplayer && gameData?.opponentTimeTaken
                ? { v2: gameData.opponentTimeTaken }
                : {}}
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full mt-4">
      {#if !$userStore?.is_guest_mode}
        <Button
          label={$t("continue")}
          size="large"
          type="3d-secondary"
          customClass="w-[200px] md:w-[250px]"
          onClick={() => {
            goto(`/competitions/${$competitionStore?.url}/home`);
          }}
        />
      {:else}
        <Button
          label={$t("signup")}
          size="large"
          type="3d-secondary"
          customClass="w-[200px] md:w-[250px]"
          onClick={() => {
            authModalStore.set({ visible: true, page: "user-selection" });
          }}
        />
      {/if}
    </div>
  </SubscriptionCard>
</div>

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

  /* Add responsive styles */
  @media (max-width: 768px) {
    /* .bonzoui__winner__ribbon img {
            max-width: 140px;
        } */

    .bonzoui__single__result__ribbon__sp {
      font-size: 14px;
    }

    .bonzoui__draw__ribbon__text {
      font-size: 14px;
    }
  }

  /* @media (max-width: 480px) {
        .bonzoui__winner__ribbon img {
            max-width: 120px;
        }
    } */
</style>
