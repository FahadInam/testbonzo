import { c as attr, f as stringify, e as escape_html, d as bind_props, b as push, k as copy_payload, l as assign_payload, p as pop, s as store_get, u as unsubscribe_stores, j as ensure_array_like, h as head } from "../../../chunks/index.js";
import "clsx";
import { u as userStore } from "../../../chunks/user.store.js";
import { r as remapKeys, i as getItemByProperty } from "../../../chunks/utils.js";
import { o as onDestroy } from "../../../chunks/index-server.js";
import { __tla as __tla_0 } from "../../../chunks/api.definitions.js";
import "notyf";
import { I as IMAGES } from "../../../chunks/images.constants.js";
import { P as PageHeading } from "../../../chunks/PageHeading.js";
import { g as get } from "../../../chunks/index3.js";
import { d as addVoucherCode, f as getCompetitions, __tla as __tla_1 } from "../../../chunks/competitions.da.js";
import { s as systemSettingsStore } from "../../../chunks/system..da.js";
import { t } from "../../../chunks/language.store.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { I as Image } from "../../../chunks/Image.js";
import { M as Modal } from "../../../chunks/Modal.js";
import { f as fallback } from "../../../chunks/utils2.js";
import { T as TabSwitch } from "../../../chunks/TabSwitch.js";
import { i as instanceStore } from "../../../chunks/instance.store.js";
import { g as getTextForRole, B as BannerText } from "../../../chunks/BannerText.js";
import { N as NoDataFound } from "../../../chunks/NoDataFound.js";
import { B as BackgroundImage } from "../../../chunks/BackgroundImage.js";
import { s as sidebarStore } from "../../../chunks/sidebar.store.js";
import { g as goto } from "../../../chunks/client.js";
import { s as setBackUrl, a as appbarStore, c as competitionStore } from "../../../chunks/appbar.store.js";
import { m as metaStore } from "../../../chunks/meta.store.js";
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
  })()
]).then(async () => {
  function Progressbar($$payload, $$props) {
    let progress;
    let completed = fallback($$props["completed"], 0);
    let total = fallback($$props["total"], 1);
    let className = fallback($$props["className"], "");
    let outsideLabel = fallback($$props["outsideLabel"], false);
    progress = completed / total * 100;
    $$payload.out += `<div class="flex items-center w-full mb-3"><div class="w-full"><div${attr("class", `bg-blue-900 rounded-full w-full min-w-[100px] sm:min-w-[200px] font-[Poppins] flex items-center relative overflow-hidden ${stringify(className)}`)}><div class="bg-[var(--theme-green-color)] bg-color-green h-full rounded-full transition-all duration-300"${attr("style", `width: ${stringify(progress)}%;`)}></div> `;
    if (!outsideLabel) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="absolute right-2 top-0 bottom-0 flex items-center text-white text-xs sm:text-sm font-medium"><b class="font-bold">${escape_html(completed)}</b> / ${escape_html(total)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> `;
    if (outsideLabel) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="ml-2 text-sm font-semibold text-blue-900 whitespace-nowrap"><b class="font-semibold text-blue-400">${escape_html(completed)}</b> / ${escape_html(total)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      completed,
      total,
      className,
      outsideLabel
    });
  }
  function VoucherModal($$payload, $$props) {
    push();
    let showModal = fallback($$props["showModal"], false);
    let title = $$props["title"];
    let id = $$props["id"];
    let onSuccess = fallback($$props["onSuccess"], () => {
    });
    let onSubmit = fallback($$props["onSubmit"], async (code, successCallback, id2) => {
    });
    let instructionText = $$props["instructionText"];
    let voucherCode = "";
    function closeModal() {
      showModal = false;
      voucherCode = "";
    }
    async function handleSubmit() {
      const response = await onSubmit(voucherCode, onSuccess, id);
      if (response?.error_code === 0) {
        closeModal();
      }
    }
    let inputRef;
    if (showModal && inputRef) inputRef.focus();
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      Modal($$payload2, {
        onClick: closeModal,
        get open() {
          return showModal;
        },
        set open($$value) {
          showModal = $$value;
          $$settled = false;
        },
        $$slots: {
          header: ($$payload3) => {
            $$payload3.out += `<span slot="header"><div class="bg-[var(--accent)] px-4 py-3 flex justify-center items-center rounded-t-lg gap-2">`;
            Image($$payload3, {
              src: IMAGES.ADD_CODE_IMG,
              alt: "",
              className: "w-9 h-9 min-w-9"
            });
            $$payload3.out += `<!----> <span class="text-white font-semibold text-xl ms-2">${escape_html(title)}</span></div></span>`;
          },
          body: ($$payload3) => {
            $$payload3.out += `<span slot="body"><div class="p-4 text-center"><p class="text-gray-600 mt-2 font-medium text-base text-left">${escape_html(instructionText)}</p> <div class="mt-4 relative"><input type="text" placeholder="Enter voucher code..."${attr("value", voucherCode)} class="w-full border border-gray-300 rounded-lg p-2 py-4 pr-20 text-gray-700 focus:outline-none focus:ring-0"> <div class="absolute right-1 top-1/2 transform -translate-y-1/2">`;
            Button($$payload3, {
              label: "Join",
              type: "primary",
              customClass: "w-[100px]",
              onClick: () => handleSubmit()
            });
            $$payload3.out += `<!----></div></div></div></span>`;
          }
        }
      });
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    bind_props($$props, {
      showModal,
      title,
      id,
      onSuccess,
      onSubmit,
      instructionText
    });
    pop();
  }
  function CompetitionCard($$payload, $$props) {
    push();
    var $$store_subs;
    let competition = fallback($$props["competition"], () => ({
      id: 1,
      title: "The Green Singapore Competition",
      image: "https://bonzo.knowledgeplatform.com/images/competitions/learning_playground_banner1.png",
      is_demo: false,
      banner_image_mobile: "",
      is_private_comp_enabled: 0,
      is_public: 0,
      is_voucher_added: 0,
      end_date: ""
    }), true);
    let competition_id = 0;
    let showModal = false;
    let onItemClick = $$props["onItemClick"];
    const config = get(systemSettingsStore);
    let isPrincipal = store_get($$store_subs ??= {}, "$userStore", userStore)?.active_role === "principal";
    let isLocked = config?.comp_banner_locked && !isPrincipal && competition?.is_private_comp_enabled === 1 && competition?.is_public === 0 && competition?.is_voucher_added === 0;
    let isFinish = new Date(competition?.end_date) < /* @__PURE__ */ new Date();
    let isDemo = competition?.is_demo;
    function handleClick(id) {
      onItemClick(id);
    }
    function openModal(id) {
      competition_id = id;
      showModal = true;
    }
    async function onVoucherSuccess() {
      showModal = false;
      handleClick(competition.id);
    }
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      Card($$payload2, {
        className: `${isLocked ? "lock-card-shadow" : "card-button-shadow"} `,
        btnClass: `${isLocked || isPrincipal ? "!cursor-default" : ""}`,
        onClick: !isLocked && !isPrincipal ? () => handleClick(competition.id) : void 0,
        children: ($$payload3) => {
          $$payload3.out += `<div><div class="h-60 relative overflow-hidden p-2 w-full h-full max-w-[400px] md:max-w-[2000px] md:w-[640px] md:h-[170px] lg:w-[912px] lg:h-[240px]"><picture><source${attr("srcset", competition.banner_image_mobile)} media="(max-width: 768px)"> <img${attr("src", competition.image)}${attr("alt", competition.title)} class="w-full h-full object-cover rounded-[15px]"></picture> `;
          if (isLocked) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div class="absolute top-0 left-0 right-0 w-full h-full p-2"><div class="bg-[#0c0c0ca4] flex items-center justify-center rounded-[15px] w-full h-full"><div class="flex flex-col items-center justify-center text-white"><img${attr("src", IMAGES.LOCK_ICON)} alt="Lock" class="w-24 mb-2 translate-x-4"> `;
            Button($$payload3, {
              label: store_get($$store_subs ??= {}, "$t", t)("unlock_the_competition"),
              size: "large",
              type: "3d-secondary",
              customClass: "w-full",
              onClick: () => {
                openModal(competition.id);
              }
            });
            $$payload3.out += `<!----></div></div></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></div> <div class="p-3 pb-8 pt-0 relative">`;
          if (competition?.enrolled && !isLocked) {
            $$payload3.out += "<!--[-->";
            Progressbar($$payload3, {
              completed: competition?.lessons_completed,
              total: competition?.total_lessons,
              className: "h-2.5 mt-1",
              outsideLabel: true
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between"><div class="flex-1 min-w-0 pr-2"><h3${attr("class", `text-lg sm:text-xl lg:text-2xl font-medium break-words ${stringify([
            !isPrincipal ? "mb-2" : ""
          ].filter(Boolean).join(" "))}`)}>${escape_html(competition.title)}</h3> `;
          if (isPrincipal) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<span class="text-sm sm:text-base font-normal text-gray-500 block mb-4 sm:mb-0">Total Players: ${escape_html(competition?.total_players)}</span>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></div> `;
          if (isPrincipal) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div class="mt-2 sm:mt-0">`;
            Button($$payload3, {
              label: store_get($$store_subs ??= {}, "$t", t)("view_progress"),
              size: "small",
              type: "3d-secondary",
              customClass: "w-full sm:w-[200px]",
              onClick: () => handleClick(competition.id)
            });
            $$payload3.out += `<!----></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></div> `;
          if (!isPrincipal) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div class="absolute bottom-4 right-4 flex items-center space-x-[5px]"><div${attr("class", ` w-3  h-3 rounded-full   ${isDemo ? "bg-[var(--badge-blue)]   " : isFinish ? "bg-[var(--badge-gray)]  " : "bg-[var(--badge-green)]  "}`)}></div> <span${attr("class", `text-sm sm:text-base leading-0 sm:leading-normal font-poppins font-semibold ${isDemo ? "text-[var(--badge-blue)]   " : isFinish ? "text-[var(--badge-gray)]  " : "text-[var(--badge-green)]  "}`)}>${escape_html(isDemo ? store_get($$store_subs ??= {}, "$t", t)("demo") : isFinish ? store_get($$store_subs ??= {}, "$t", t)("finished") : store_get($$store_subs ??= {}, "$t", t)("live"))}</span></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></div></div> `;
          VoucherModal($$payload3, {
            id: competition_id,
            onSuccess: onVoucherSuccess,
            onSubmit: addVoucherCode,
            title: store_get($$store_subs ??= {}, "$t", t)("add_voucher_code"),
            instructionText: store_get($$store_subs ??= {}, "$t", t)("voucher_instruction"),
            get showModal() {
              return showModal;
            },
            set showModal($$value) {
              showModal = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: {
          default: true
        }
      });
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      competition,
      onItemClick
    });
    pop();
  }
  function CompetitionCardsContainer($$payload, $$props) {
    push();
    var $$store_subs;
    let filteredCompetitions, isGuestMode;
    const instance = get(instanceStore);
    const banner_text = JSON.parse(instance.banner_text);
    const user = get(userStore);
    const { text } = getTextForRole(user?.active_role, 0, banner_text?.banner_text);
    let competitions = fallback($$props["competitions"], () => [
      {
        id: 1,
        title: "The Green Singapore Competition",
        image: "https://bonzo.knowledgeplatform.com/images/competitions/learning_playground_banner1.png",
        is_demo: false,
        banner_image_mobile: "",
        enrolled: 1
      }
    ], true);
    let selectedTab = 0;
    let isPrincipal = store_get($$store_subs ??= {}, "$userStore", userStore)?.active_role === "principal";
    let onItemClick = $$props["onItemClick"];
    function handleClick(id) {
      onItemClick(id);
    }
    filteredCompetitions = selectedTab === 0 ? competitions : competitions.filter((comp) => comp.enrolled === 1);
    isGuestMode = store_get($$store_subs ??= {}, "$userStore", userStore)?.is_guest_mode;
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      $$payload2.out += `<div class="w-full mb-8">`;
      if (!isPrincipal) {
        $$payload2.out += "<!--[-->";
        PageHeading($$payload2, {
          icon: IMAGES.COMPETITION_IMG,
          title: "competitions",
          imageClass: "w-9 h-11 sm:w-13 sm:h-11"
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div> <div class="flex flex-col items-center space-y-8 bg-transparent mb-8 p-2 md:p-0">`;
      if (!isGuestMode && !isPrincipal) {
        $$payload2.out += "<!--[-->";
        TabSwitch($$payload2, {
          tabs: [
            store_get($$store_subs ??= {}, "$t", t)("all_competitions"),
            store_get($$store_subs ??= {}, "$t", t)("my_competitions")
          ],
          className: "gap-6 w-3/4 sm:w-1/2 md:w-2/3 lg:w-1/2",
          get selectedTab() {
            return selectedTab;
          },
          set selectedTab($$value) {
            selectedTab = $$value;
            $$settled = false;
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (!isGuestMode && !isPrincipal && text) {
        $$payload2.out += "<!--[-->";
        BannerText($$payload2, {
          text
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (filteredCompetitions.length > 0) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(filteredCompetitions);
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let competition = each_array[$$index];
          CompetitionCard($$payload2, {
            competition,
            onItemClick: handleClick
          });
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="md:max-w-[2000px] md:w-[640px] lg:w-[912px]">`;
        NoDataFound($$payload2, {
          noDataMsg: "No competitions found"
        });
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]--></div>`;
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      competitions,
      onItemClick
    });
    pop();
  }
  function SkeletonCompetitionCards($$payload, $$props) {
    push();
    const skeletonItems = Array(3).fill(0);
    const each_array = ensure_array_like(skeletonItems);
    $$payload.out += `<div class="animate-pulse space-y-8 p-4 flex flex-col w-full"><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      each_array[index];
      $$payload.out += `<div class="flex bg-gray-200 mx-auto rounded-2xl w-full h-70 max-w-[400px] md:max-w-[2000px] md:w-[640px] md:h-[230px] lg:w-[912px] lg:h-[300px]"></div>`;
    }
    $$payload.out += `<!--]--></div>`;
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let competitions = [];
    let competitionsData = [];
    let isLoading = true;
    let showModal = false;
    const isVoucherAllowed = store_get($$store_subs ??= {}, "$systemSettingsStore", systemSettingsStore)?.is_voucher_allowed;
    let previousGuestMode = store_get($$store_subs ??= {}, "$userStore", userStore).is_guest_mode;
    sidebarStore.set({
      visible: false
    });
    async function fetchCompetitions() {
      const data = await getCompetitions();
      competitionsData = data.data.competitions;
      let comps = competitionsData.map((comp) => remapKeys(comp, {
        banner_image: "image",
        competition_id: "id",
        name: "title"
      }));
      competitions = comps;
      isLoading = false;
    }
    setBackUrl("/");
    const unsubscribe = appbarStore.subscribe((value) => {
      showModal = value.isVoucherModalVisible;
    });
    const unsubscribeUser = userStore.subscribe((value) => {
      if (value.is_guest_mode !== previousGuestMode) {
        previousGuestMode = value.is_guest_mode;
        if (!isLoading) {
          fetchCompetitions();
        }
      }
    });
    onDestroy(() => {
      unsubscribe();
      unsubscribeUser();
    });
    {
      appbarStore.set({
        visible: true,
        backLabel: "",
        isLogoVisible: true,
        isCoinVisible: false,
        isBackButtonVisible: store_get($$store_subs ??= {}, "$userStore", userStore).is_guest_mode ? true : false,
        isVoucherButtonVisible: isVoucherAllowed,
        isVoucherModalVisible: false,
        isNotificationVisible: false,
        isShowPaymentBanner: false,
        isShowRules: false,
        isProfileVisible: true
      });
    }
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      head($$payload2, ($$payload3) => {
        $$payload3.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("competitions"))}</title>`;
      });
      BackgroundImage($$payload2, {});
      $$payload2.out += `<!----> <div>`;
      if (isLoading) {
        $$payload2.out += "<!--[-->";
        SkeletonCompetitionCards($$payload2);
      } else {
        $$payload2.out += "<!--[!-->";
        if (competitions.length > 0) {
          $$payload2.out += "<!--[-->";
          CompetitionCardsContainer($$payload2, {
            competitions,
            onItemClick: (id) => {
              const compItem = getItemByProperty(id, competitionsData, "competition_id");
              competitionStore.set(compItem);
              metaStore.update((value) => ({
                ...value,
                url: compItem.url,
                id: compItem.competition_id,
                current_grade: compItem.current_grade
              }));
              if (!compItem.enrolled && compItem.rules) {
                goto("competitions/" + compItem.url + "/rules");
              } else {
                goto("competitions/" + compItem.url + "/home");
              }
            }
          });
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<p class="text-center text-white">${escape_html(store_get($$store_subs ??= {}, "$t", t)("no_competitions"))}</p>`;
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--> `;
      VoucherModal($$payload2, {
        onSuccess: fetchCompetitions,
        onSubmit: addVoucherCode,
        title: store_get($$store_subs ??= {}, "$t", t)("add_voucher_code"),
        instructionText: store_get($$store_subs ??= {}, "$t", t)("voucher_instruction"),
        get showModal() {
          return showModal;
        },
        set showModal($$value) {
          showModal = $$value;
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
  };
});
export {
  __tla,
  _page as default
};
