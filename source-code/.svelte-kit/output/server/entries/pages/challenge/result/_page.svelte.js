import { s as store_get, k as copy_payload, l as assign_payload, u as unsubscribe_stores, p as pop, b as push, c as attr, f as stringify, e as escape_html, d as bind_props, m as spread_props } from "../../../../chunks/index.js";
import { f as fallback } from "../../../../chunks/utils2.js";
import { S as SubscriptionCard } from "../../../../chunks/SubscriptionCard.js";
import { I as IMAGES } from "../../../../chunks/images.constants.js";
import { w as writable, g as get } from "../../../../chunks/index3.js";
import { u as userStore } from "../../../../chunks/user.store.js";
import { g as getText, t } from "../../../../chunks/language.store.js";
import { I as IsSinglePlayerMatch, __tla as __tla_0 } from "../../../../chunks/challenge.da.js";
import { p as paymentStore } from "../../../../chunks/payment.store.js";
import { i as isGCLC, s as systemSettingsStore, a as isShupavu } from "../../../../chunks/system..da.js";
import { B as Button } from "../../../../chunks/Button.js";
import "../../../../chunks/avatar2.js";
import { g as goto } from "../../../../chunks/client.js";
import "../../../../chunks/useractivity.store.js";
import { c as competitionStore } from "../../../../chunks/appbar.store.js";
import { A as Avatar } from "../../../../chunks/Avatar.js";
import { h as handleGoogleLogin, g as gclcSignUpFields, e as signUpFields, c as loginFields, a as authModalStore, u as userSelectionCardsPopup, __tla as __tla_1 } from "../../../../chunks/common.auth.data.js";
import { o as onDestroy } from "../../../../chunks/index-server.js";
import "clsx";
import "lz-string";
import "../../../../chunks/client2.js";
import "../../../../chunks/index2.js";
import { __tla as __tla_2 } from "../../../../chunks/api.definitions.js";
import { d as signUpUserUsingFormData, l as loginUser, u as userSignUpFormPopup, e as userLoginFormPopup, __tla as __tla_3 } from "../../../../chunks/user.auth.da.js";
import "../../../../chunks/country.constant.js";
import { A as AuthenticationView, __tla as __tla_4 } from "../../../../chunks/AuthenticationView.js";
import { g as getInstanceText } from "../../../../chunks/utils.js";
import { p as page } from "../../../../chunks/stores.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })()
]).then(async () => {
  const initialState = {
    player: {
      name: "Player",
      avatar: null,
      score: "0",
      points: 0,
      accuracy: "0%",
      timeTaken: "0s"
    },
    opponent: {
      name: "Opponent",
      avatar: null,
      score: "0",
      accuracy: "-",
      timeTaken: "-"
    },
    gameStatus: {
      isWinner: false,
      isCompleted: false,
      statusText: "Ongoing"
    }
  };
  const resultStore = writable(initialState);
  const getSignUpInstitutionForm = async () => ({
    ...isGCLC ? gclcSignUpFields : signUpFields,
    handleSubmit: async (formData) => {
      await signUpUserUsingFormData(formData, "principal");
    },
    alternativeButtons: [
      {
        label: await getText("c_google"),
        type: "secondary-outlined-inverted",
        image: "/images/google-icon.png",
        onClick: (role) => handleGoogleLogin(role)
      }
    ],
    footer: {
      text: await getText("already_account"),
      button: {
        label: await getText("login"),
        type: "secondary-outlined-inverted",
        link: "/account/institution/login"
      }
    },
    role: "principal"
  });
  const getInstitutionLoginForm = async () => ({
    ...loginFields,
    handleSubmit: async (formData) => {
      await loginUser(formData.email, formData.password);
    },
    alternativeButtons: [
      {
        label: await getText("c_google"),
        type: "secondary-outlined-inverted",
        image: "/images/google-icon.png",
        onClick: (role) => handleGoogleLogin(role)
      }
    ],
    footer: {
      text: await getText("no_account"),
      button: {
        label: await getText("signup"),
        type: "secondary-outlined-inverted",
        link: "/account/signup"
      }
    },
    forgotPassword: {
      label: await getText("forgot_password"),
      link: "/account/forgot-password"
    },
    role: "principal"
  });
  const institutionLoginFormPopup = async () => ({
    ...await getInstitutionLoginForm(),
    footer: {
      text: await getText("no_account"),
      button: {
        label: await getText("signup"),
        type: "secondary-outlined-inverted",
        onClick: () => {
          authModalStore.set({
            visible: true,
            page: "institution-signup"
          });
        }
      }
    }
  });
  const signUpInstitutionFormPopup = async () => ({
    ...await getSignUpInstitutionForm(),
    footer: {
      text: await getText("already_account"),
      button: {
        label: await getText("login"),
        type: "secondary-outlined-inverted",
        onClick: () => {
          authModalStore.set({
            visible: true,
            page: "institution-login"
          });
        }
      }
    }
  });
  function AuthenticationPopupView($$payload, $$props) {
    push();
    var $$store_subs;
    let isVisible = false;
    let currentForm;
    let cards = [];
    const cardTitle = getInstanceText(store_get($$store_subs ??= {}, "$t", t), "bonzo_as");
    const config = get(systemSettingsStore);
    async function preloadForm(page2) {
      switch (page2) {
        case "user-signup":
          currentForm = await userSignUpFormPopup();
          break;
        case "user-login":
          currentForm = await userLoginFormPopup();
          break;
        case "institution-login":
          currentForm = await institutionLoginFormPopup();
          break;
        case "institution-signup":
          currentForm = await signUpInstitutionFormPopup();
          break;
        case "user-selection":
          if (config?.principal_enabled) {
            cards = await userSelectionCardsPopup();
          } else {
            currentForm = await userSignUpFormPopup();
          }
          break;
      }
    }
    const unsubscribe = authModalStore.subscribe(async (data) => {
      isVisible = data.visible;
      data.page;
      cards = [];
      if (data.visible) {
        await preloadForm(data.page);
      }
    });
    onDestroy(() => {
      unsubscribe();
    });
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      $$payload2.out += `<div>`;
      AuthenticationView($$payload2, {
        useModal: true,
        form: currentForm,
        cards,
        cardTitle,
        get isModalVisible() {
          return isVisible;
        },
        set isModalVisible($$value) {
          isVisible = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div>`;
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function EachStatMeter($$payload, $$props) {
    let l = fallback($$props["l"], "");
    let v = fallback($$props["v"], "-");
    let v2 = $$props["v2"];
    let isMulti = typeof v2 === "number" || typeof v2 === "string";
    $$payload.out += `<div class="flex min-w-[250px] max-h-[38px] items-center rounded-full bg-black/50 text-white text-center m-1"${attr("style", `justify-content: ${stringify(isMulti ? "space-around" : "space-between")};`)}>`;
    if (isMulti) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="w-20 px-2 font-poppins text-[16px] font-semibold leading-[34.91px] text-white whitespace-nowrap overflow-ellipsis">${escape_html(v || "-")}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="w-[135px] rounded-full bg-black px-2 text-center font-poppins text-[16px] font-semibold leading-[34.91px] text-white">${escape_html(l || "")}</div> <div class="w-20 px-2 font-poppins text-[16px] font-semibold leading-[34.91px] text-white whitespace-nowrap overflow-ellipsis">${escape_html(isMulti ? v2 || 0 : v || "-")}</div></div>`;
    bind_props($$props, {
      l,
      v,
      v2
    });
  }
  function formatGameData(player = {}, opponent = {}) {
    let isSubscribed = get(paymentStore)?.payment_status?.is_subscribed === 1;
    let isFreeShupavu = isShupavu && !isSubscribed && !get(userStore)?.is_guest_mode;
    const defaultOpponentAvatar = IMAGES.DEFAULT_AVATAR;
    const user = get(userStore);
    console.log(player, opponent, user, "player and opponent");
    return {
      playerName: player.playerName || "Player",
      score: user?.is_guest_mode || isFreeShupavu ? player.total_correct * 100 || "-" : player.score || "-",
      accuracy: player.accuracy ? `${player.accuracy * 100}%` : "-",
      timeTaken: player.timeTaken ? `${player.timeTaken}s` : "-",
      playerAvatar: user?.profile_picture,
      playerPoints: player?.points || "-",
      opponentName: opponent.playerName || "Opponent",
      opponentScore: opponent.score < 0 ? "0" : opponent.score,
      opponentAccuracy: opponent.accuracy && opponent.score >= 0 ? `${opponent.accuracy * 100}%` : "-",
      opponentTimeTaken: opponent.timeTaken ? `${opponent.timeTaken}s` : "-",
      opponentAvatar: opponent.avatar || defaultOpponentAvatar,
      opponentPoints: opponent?.points || "-"
    };
  }
  function determineWinner(resultStore2) {
    console.log(resultStore2.opponent.score < 0, "resultStore221");
    if (resultStore2?.player?.score == null || resultStore2?.opponent?.score == null || resultStore2.player.score < 0 || resultStore2.opponent.score < 0) {
      return {
        playerWon: false,
        opponentWon: false,
        isDraw: false
      };
    }
    const playerScore = parseInt(resultStore2.player.score);
    const opponentScore = parseInt(resultStore2.opponent.score);
    return {
      playerWon: playerScore > opponentScore,
      opponentWon: opponentScore > playerScore,
      isDraw: playerScore === opponentScore
    };
  }
  function checkMultiplayerStatus(result, user) {
    if (user?.is_guest_mode) {
      return false;
    } else if (IsSinglePlayerMatch(result?.opponent?.opponent_id)) {
      return false;
    } else {
      return result?.opponent?.opponent_id != null;
    }
  }
  function PlayerCard($$payload, $$props) {
    push();
    var $$store_subs;
    let playerName = fallback($$props["playerName"], "");
    let avatarType = fallback($$props["avatarType"], "");
    let isWinner = fallback($$props["isWinner"], false);
    let bgColor = fallback($$props["bgColor"], "bg-pink-500");
    let position = fallback($$props["position"], "left");
    let ml = fallback($$props["ml"], 10);
    let mr = fallback($$props["mr"], 10);
    let size = fallback($$props["size"], 72);
    $$payload.out += `<div${attr("class", `player-card ${stringify(position === "left" ? "pr-[1.7rem]" : "pl-[1.7rem]")} w-full py-6 flex flex-col items-center relative ${stringify(position === "left" ? "rounded-l-xl" : "rounded-r-xl")} svelte-qxw9fc`)}>`;
    if (isWinner) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="bonzoui__winner__ribbon bonzoui__winner__ribbon_MP win2x"${attr("style", {
        left: 0,
        right: 0
      })}><img class="w-[110px] md:w-[200px] h-auto object-contain"${attr("src", IMAGES.RIBBON_WINNER)} alt="Winner"> <span class="pb-title-shadow text-[14px] md:text-[26px] md:top-[2px] top-[-5px]" style="position: absolute; left: 0;">${escape_html(store_get($$store_subs ??= {}, "$t", t)("winner"))}</span></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div${attr("class", `w-18 h-18 rounded-full overflow-hidden mb-2 ${stringify(bgColor)} svelte-qxw9fc`)}>`;
    Avatar($$payload, {
      t: avatarType,
      ml,
      mr,
      s: size,
      u: size
    });
    $$payload.out += `<!----></div> <p class="text-white mt-2 w-[140px] md:w-[200px] text-center font-bold truncate text-[16px] md:text-lg">${escape_html(playerName)}</p></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      playerName,
      avatarType,
      isWinner,
      bgColor,
      position,
      ml,
      mr,
      size
    });
    pop();
  }
  function ResultAnimation($$payload, $$props) {
    push();
    let isPocketGames = fallback($$props["isPocketGames"], false);
    let scoreToShow = $$props["scoreToShow"];
    let onComplete = fallback($$props["onComplete"], () => {
    });
    $$payload.out += `<div${attr("class", `baseDiv svelte-i7qp4o ${stringify([
      ""
    ].filter(Boolean).join(" "))}`)}><div class="baseAnimDiv svelte-i7qp4o"><div class="raysBackground svelte-i7qp4o"></div> <div${attr("class", `${stringify(`coinsFront ${isPocketGames ? "coinsFrontPG" : ""}`)} svelte-i7qp4o`)}></div> <div class="starSmall starSmall1 svelte-i7qp4o" style="--left: calc(50vw - 4%); --top: calc(50vh - 8%); --w: 40px; --h: 30px;"></div> <div class="starSmall starSmall2 svelte-i7qp4o" style="--left: calc(50vw + 15%); --top: calc(50vh + 12%); --w: 30px; --h: 30px;"></div> <div class="starSmall starSmall3 svelte-i7qp4o" style="--left: calc(50vw - 23%); --top: calc(50vh + 8%); --w: 40px; --h: 40px;"></div> <div class="starSmall starSmall4 svelte-i7qp4o" style="--left: calc(50vw - 8%); --top: calc(50vh - 17%); --w: 30px; --h: 30px;"></div> <div class="starSmall starSmall5 svelte-i7qp4o" style="--left: calc(50vw + 4%); --top: calc(50vh + 8%); --w: 40px; --h: 40px;"></div> <div class="starSmall starSmall6 svelte-i7qp4o" style="--left: calc(50vw - 16%); --top: calc(50vh - 22%); --w: 30px; --h: 30px;"></div> <div class="starSmall starSmall7 svelte-i7qp4o" style="--left: calc(50vw + 12%); --top: calc(50vh - 25%); --w: 40px; --h: 40px;"></div> <div class="starSmall starSmall8 svelte-i7qp4o" style="--left: calc(50vw + 16%); --top: calc(50vh - 12%); --w: 30px; --h: 30px;"></div> <div class="amtTextAnim text-white text-[36px] md:text-[54px] font-bold title-shadow svelte-i7qp4o">+ ${escape_html(scoreToShow)}</div></div> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      isPocketGames,
      scoreToShow,
      onComplete
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let isMultiplayer, isSubscribed, isFreeShupavu, playerScore, gameData, hasPassed;
    let resultTitleText = "";
    const { playerWon, opponentWon, isDraw } = determineWinner(store_get($$store_subs ??= {}, "$resultStore", resultStore));
    let hideAnimation = false;
    let isAnimationComplete = false;
    let coinAnimation = store_get($$store_subs ??= {}, "$page", page).state;
    function handleAnimationComplete() {
      isAnimationComplete = true;
      hideAnimation = true;
      setTimeout(() => {
      }, 800);
    }
    isMultiplayer = checkMultiplayerStatus(store_get($$store_subs ??= {}, "$resultStore", resultStore), store_get($$store_subs ??= {}, "$userStore", userStore));
    console.log(store_get($$store_subs ??= {}, "$resultStore", resultStore), "determineWinner");
    {
      if (coinAnimation && coinAnimation.coinAnimation === false) {
        hideAnimation = true;
      } else {
        coinAnimation = true;
      }
    }
    isSubscribed = store_get($$store_subs ??= {}, "$paymentStore", paymentStore)?.payment_status?.is_subscribed === 1;
    isFreeShupavu = isShupavu && !isSubscribed && !store_get($$store_subs ??= {}, "$userStore", userStore)?.is_guest_mode;
    playerScore = store_get($$store_subs ??= {}, "$resultStore", resultStore)?.player?.points ?? 0;
    gameData = formatGameData(store_get($$store_subs ??= {}, "$resultStore", resultStore).player, store_get($$store_subs ??= {}, "$resultStore", resultStore).opponent);
    if (store_get($$store_subs ??= {}, "$resultStore", resultStore).player || store_get($$store_subs ??= {}, "$resultStore", resultStore).opponent) {
      gameData = formatGameData(store_get($$store_subs ??= {}, "$resultStore", resultStore).player, store_get($$store_subs ??= {}, "$resultStore", resultStore).opponent);
    }
    hasPassed = parseFloat(store_get($$store_subs ??= {}, "$resultStore", resultStore)?.player?.accuracy) >= 0.5;
    console.log(resultTitleText, hasPassed, gameData, "gameData123");
    $$payload.out += `<div${attr("class", `flex flex-col items-center justify-center w-full max-w-4xl mx-auto my-4 px-2 relative z-4 result-content svelte-uy7unn ${stringify([
      isAnimationComplete ? "fade-in" : ""
    ].filter(Boolean).join(" "))}`)}>`;
    SubscriptionCard($$payload, {
      icon: !isMultiplayer ? IMAGES.SINGLE_PLAYER_IMAGE : null,
      text: resultTitleText,
      padding: "px-4 pb-5",
      bgColor: "bg-blue-900",
      width: "w-full md:min-w-[920px]",
      children: ($$payload2) => {
        $$payload2.out += `<div class="w-full rounded-r-xl rounded-b-xl" style="background: linear-gradient(rgb(1, 238, 253) 0%, rgb(1, 137, 255) 100%);"><div class="flex flex-col relative items-center justify-center w-full">`;
        if (isMultiplayer) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="bonzoui__semi__orange rounded-r-xl rounded-b-xl svelte-uy7unn"></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (isDraw && isMultiplayer) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="bonzoui__winner__ribbon mt-2" style="position: relative; left: 0px; right: 0px; top: 0px;"><img${attr("src", IMAGES.RIBBON_DRAW)} alt="Draw" class="w-[130px] md:w-[170px]"> <span class="bonzoui__draw__ribbon__text svelte-uy7unn" style="position: absolute; left: 0; right: 0;">${escape_html(store_get($$store_subs ??= {}, "$t", t)("draw"))}</span></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (!isMultiplayer) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div${attr("class", `bonzoui__winner__ribbon ${stringify(isFreeShupavu ? "mb-[3rem]" : "")}`)} style="position: relative !important;"><img alt="ribbon"${attr("src", hasPassed ? IMAGES.RIBBON_WINNER_CONGRATS : IMAGES.RIBBON_WINNER_LOSE)} class="w-[210px] md:w-[240px]"> <div class="bonzoui__single__result__ribbon__sp pb-title-shadow text-sm md:text-base mt-[-20%] md:mt-[-21%] svelte-uy7unn">${escape_html(hasPassed ? store_get($$store_subs ??= {}, "$t", t)("congratulation") : store_get($$store_subs ??= {}, "$t", t)("try_again"))}</div></div> `;
          if (!isFreeShupavu) {
            $$payload2.out += "<!--[-->";
            if (!hasPassed && !store_get($$store_subs ??= {}, "$userStore", userStore)?.is_guest_mode) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<div class="bg-[#000000CC] w-full relative rounded-[19px] mb-[44px] p-[12px] text-white flex mt-[49px] max-w-[290px] md:max-w-[320px] flex-col items-center justify-center"><div class="font-semibold pt-1 pl-[2rem] pb-1 pr-4 p-[2px] flex items-center justify-center text-[15px] md:text-[17px] text-[#ffc200] absolute top-0 bg-black left-0 rounded-[19px]"><div class="bonzoui__hint__bulb"></div> ${escape_html(store_get($$store_subs ??= {}, "$t", t)("note"))}</div> <div class="flex flex-col items-center justify-center text-sm md:text-base">${escape_html(store_get($$store_subs ??= {}, "$t", t)("achieve"))}  <div class="font-bold text-[16px] md:text-[18px] text-[#ffe500]"><span class="text-[28px] md:text-[32px]">50%</span>  <span style="font-family: 'Poppins', sans-serif; font-weight: 400;">${escape_html(store_get($$store_subs ??= {}, "$t", t)("or_more_result_box"))}</span></div>  
                ${escape_html(store_get($$store_subs ??= {}, "$t", t)("to_unlock_result_box"))}</div></div>`;
            } else {
              $$payload2.out += "<!--[!-->";
              if (!store_get($$store_subs ??= {}, "$userStore", userStore)?.is_guest_mode) {
                $$payload2.out += "<!--[-->";
                $$payload2.out += `<div class="w-full mt-10 flex items-center justify-center"><img class="w-[120px] md:w-[160px] h-auto object-contain"${attr("src", IMAGES.MORE_COINS)} alt="Winner"> <span class="text-white text-[36px] md:text-[54px] font-bold title-shadow">+ ${escape_html(gameData?.playerPoints)}</span></div>`;
              } else {
                $$payload2.out += "<!--[!-->";
                $$payload2.out += `<div class="bg-[#000000CC] w-full relative rounded-[19px] mb-[44px] p-[12px] text-white flex mt-[49px] max-w-[290px] md:max-w-[320px] flex-col items-center justify-center"><div class="font-bold text-[20px] md:text-[24px] text-[#ffc200]">${escape_html(store_get($$store_subs ??= {}, "$t", t)("sign_up_now"))}</div> <div class="text-[16px] md:text-[18px] text-center font-semibold font-poppins">${escape_html(store_get($$store_subs ??= {}, "$t", t)("save_progress_unlock_rewards"))}</div></div>`;
              }
              $$payload2.out += `<!--]-->`;
            }
            $$payload2.out += `<!--]-->`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (isMultiplayer) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="w-full flex items-center justify-center relative mt-4"><div class="w-1/2">`;
          PlayerCard($$payload2, {
            playerName: gameData?.playerName,
            avatarType: gameData?.playerAvatar,
            bgColor: "bg-pink-500",
            position: "left",
            isWinner: playerWon
          });
          $$payload2.out += `<!----></div> <div class="absolute z-10"><img${attr("src", IMAGES.VS)} alt="VS" class="w-16 h-16 md:w-24 md:h-24"></div> <div class="w-1/2">`;
          PlayerCard($$payload2, {
            playerName: gameData?.opponentName,
            avatarType: gameData?.opponentAvatar,
            bgColor: "bg-pink-300",
            position: "right",
            isWinner: opponentWon
          });
          $$payload2.out += `<!----></div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> <div class="w-full pb-6 px-2 md:px-4 z-10 relative">`;
        if (playerWon || opponentWon) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div${attr("class", `md:absolute w-1/2 md:w-auto md:mr-0 mt-4 md:mt-0 md:ml-0 flex flex-col justify-center items-center ${stringify([
            playerWon ? "mr-auto" : "",
            opponentWon ? "ml-auto" : ""
          ].filter(Boolean).join(" "))}`)}${attr("style", `${stringify(playerWon ? "left: 15%; top: 40%;" : "right: 0; left: 54%; top: 40%;")} transform: translateY(-50%);`)}><img class="w-[120px] md:w-[160px] h-auto object-contain"${attr("src", IMAGES.MORE_COINS)} alt="Winner"> <span class="text-white w-[120px] text-center text-[18px] md:text-[24px] font-bold title-shadow">+ ${escape_html(playerWon ? gameData?.playerPoints : gameData?.opponentPoints)}</span></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> <div class="flex flex-col items-center space-y-4">`;
        EachStatMeter($$payload2, spread_props([
          {
            l: "Score",
            v: gameData?.score
          },
          isMultiplayer && gameData?.opponentScore ? {
            v2: gameData.opponentScore
          } : isMultiplayer && {
            v2: "-"
          }
        ]));
        $$payload2.out += `<!----> `;
        EachStatMeter($$payload2, spread_props([
          {
            l: "Accuracy",
            v: gameData?.accuracy
          },
          isMultiplayer && gameData?.opponentAccuracy ? {
            v2: gameData.opponentAccuracy
          } : {}
        ]));
        $$payload2.out += `<!----> `;
        EachStatMeter($$payload2, spread_props([
          {
            l: "Time taken",
            v: gameData?.timeTaken
          },
          isMultiplayer && gameData?.opponentTimeTaken ? {
            v2: gameData.opponentTimeTaken
          } : {}
        ]));
        $$payload2.out += `<!----></div></div></div></div> <div class="flex justify-center w-full mt-4">`;
        if (isFreeShupavu) {
          $$payload2.out += "<!--[-->";
          Button($$payload2, {
            label: store_get($$store_subs ??= {}, "$t", t)("subscribe_for_more_games"),
            size: "large",
            type: "3d-secondary",
            customClass: "w-[300px] text-lg md:text-[22px]",
            onClick: () => {
              paymentStore.set({
                competition_id: store_get($$store_subs ??= {}, "$competitionStore", competitionStore)?.competition_id,
                current_grade: store_get($$store_subs ??= {}, "$competitionStore", competitionStore)?.current_grade,
                url: store_get($$store_subs ??= {}, "$competitionStore", competitionStore)?.url
              });
              goto();
            }
          });
        } else {
          $$payload2.out += "<!--[!-->";
          if (!store_get($$store_subs ??= {}, "$userStore", userStore)?.is_guest_mode) {
            $$payload2.out += "<!--[-->";
            Button($$payload2, {
              label: store_get($$store_subs ??= {}, "$t", t)("continue"),
              size: "large",
              type: "3d-secondary",
              customClass: "w-[160px] text-lg md:text-[22px]",
              onClick: () => {
                goto(`/competitions/${store_get($$store_subs ??= {}, "$competitionStore", competitionStore)?.url}/home`);
              }
            });
          } else {
            $$payload2.out += "<!--[!-->";
            Button($$payload2, {
              label: store_get($$store_subs ??= {}, "$t", t)("signup"),
              size: "large",
              type: "3d-secondary",
              customClass: "w-[160px] text-lg md:text-[22px]",
              onClick: () => {
                authModalStore.set({
                  visible: true,
                  page: "user-selection"
                });
              }
            });
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]--></div>`;
      },
      $$slots: {
        default: true
      }
    });
    $$payload.out += `<!----></div> `;
    if (playerScore > 0 && !hideAnimation) {
      $$payload.out += "<!--[-->";
      ResultAnimation($$payload, {
        scoreToShow: playerScore,
        onComplete: handleAnimationComplete
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    {
      $$payload.out += "<!--[-->";
      AuthenticationPopupView($$payload);
    }
    $$payload.out += `<!--]-->`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
