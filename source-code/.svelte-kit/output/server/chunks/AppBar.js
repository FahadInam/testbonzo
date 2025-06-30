import { b as push, a as slot, d as bind_props, p as pop, e as escape_html, c as attr, k as copy_payload, l as assign_payload, s as store_get, u as unsubscribe_stores, f as stringify } from "./index.js";
import { f as fallback } from "./utils2.js";
import { n as navigationStore, a as appbarStore } from "./appbar.store.js";
import { A as ArrowButton } from "./ArrowButton.js";
import "./client.js";
import { o as onDestroy } from "./index-server.js";
import "clsx";
import "./client2.js";
import { A as Avatar } from "./Avatar.js";
import { B as Button } from "./Button.js";
import { t } from "./language.store.js";
import { I as IMAGES } from "./images.constants.js";
import { u as userStore } from "./user.store.js";
import "lz-string";
import { s as systemSettingsStore, k as getSystemLightLogo, j as isGlobalClimateLiteracy, a as isShupavu } from "./system..da.js";
import "./index2.js";
import { __tla as __tla_0 } from "./api.definitions.js";
import "./useractivity.store.js";
import "notyf";
import "./avatar2.js";
import { f as guestStore, l as logoutUser, __tla as __tla_1 } from "./common.auth.data.js";
import { I as Image } from "./Image.js";
import { M as Modal } from "./Modal.js";
import { g as get } from "./index3.js";
import { f as encodeDecode, I as IsGuestMode, h as abbreviateNumber } from "./utils.js";
let AppBar;
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
  function DropDownMenu($$payload, $$props) {
    push();
    let items = fallback($$props["items"], () => [
      {
        label: "Option 1",
        link: "",
        clickCB: null,
        icon: null
      },
      {
        label: "Option 2",
        link: "",
        clickCB: null,
        icon: null
      }
    ], true);
    onDestroy(() => {
    });
    $$payload.out += `<div class="relative dropdown-container"><button><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></button> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      items
    });
    pop();
  }
  function NotificationBell($$payload, $$props) {
    push();
    let notificationData = [];
    let unreadNotifications = 0;
    if (notificationData) {
      unreadNotifications = Array.isArray(notificationData) && notificationData.length > 0 ? notificationData.filter((n) => n?.is_read === 0).length : 0;
    }
    $$payload.out += `<div class="self-baseline bg-white/20 bg-opacity-60 rounded-full w-[50px] h-[50px] flex justify-center items-center"><button data-tag="notifications" class="w-full h-full flex justify-center items-center cursor-pointer border-none bg-transparent rounded-full" aria-label="Notifications"><div class="relative flex justify-center items-center">`;
    if (unreadNotifications > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="absolute -top-4 -right-2 bg-red-500 text-white rounded-full min-w-[18px] h-[18px] text-xs flex justify-center items-center p-[2px] font-bold">${escape_html(unreadNotifications)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <img${attr("src", IMAGES.BELL_ICON)} alt="Notifications" class="w-[26px] h-[26px] brightness-0 invert"></div></button></div> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    pop();
  }
  function ConfirmationModal($$payload, $$props) {
    push();
    let showModal = fallback($$props["showModal"], false);
    let title = fallback($$props["title"], "");
    let message = fallback($$props["message"], "");
    let iconSrc = fallback($$props["iconSrc"], () => IMAGES.SIGN_OUT, true);
    let onConfirm = fallback($$props["onConfirm"], () => {
    });
    let onCancel = fallback($$props["onCancel"], () => {
    });
    let cancelText = $$props["cancelText"];
    let successText = $$props["successText"];
    function handleConfirm() {
      showModal = false;
      onConfirm();
    }
    function handleCancel() {
      showModal = false;
      onCancel();
    }
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      Modal($$payload2, {
        get open() {
          return showModal;
        },
        set open($$value) {
          showModal = $$value;
          $$settled = false;
        },
        $$slots: {
          header: ($$payload3) => {
            $$payload3.out += `<span slot="header"><div class="bg-[var(--primary-color)] px-4 py-3 flex justify-center items-center rounded-t-lg gap-2">`;
            Image($$payload3, {
              src: iconSrc,
              alt: "",
              className: "w-10 h-10 "
            });
            $$payload3.out += `<!----> <span class="text-white font-semibold text-lg">${escape_html(title)}</span></div></span>`;
          },
          body: ($$payload3) => {
            $$payload3.out += `<span slot="body"><div class="bg-white py-4 text-center"><h6 class="sm:text-xl text-lg font-semibold text-[var(--dark-gray)] pb-2 mb-6">${escape_html(message)}</h6> <div class="flex justify-center sm:gap-6 gap-4">`;
            Button($$payload3, {
              label: successText,
              size: "small",
              type: "3d-primary",
              customClass: "w-[170px] text-lg md:text-[22px]",
              onClick: handleConfirm
            });
            $$payload3.out += `<!----> `;
            Button($$payload3, {
              size: "small",
              type: "3d-secondary",
              customClass: "w-[170px] text-lg md:text-[22px]",
              label: cancelText,
              onClick: handleCancel
            });
            $$payload3.out += `<!----></div></div></span>`;
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
      message,
      iconSrc,
      onConfirm,
      onCancel,
      cancelText,
      successText
    });
    pop();
  }
  function InviteFriends($$payload, $$props) {
    push();
    let open = fallback($$props["open"], false);
    let onClose = fallback($$props["onClose"], () => {
    });
    const user_id = get(userStore)?.user_id;
    const user_enc_id = encodeDecode("enc", `${user_id}`);
    const ShareLinkUrl = `account/sign-up?friends_id=${user_enc_id}`;
    const inst_config = get(systemSettingsStore).share_url || [];
    const shareUrlFriends = `${inst_config}${ShareLinkUrl}`;
    function handleClose() {
      onClose();
      open = false;
    }
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      Modal($$payload2, {
        onClick: handleClose,
        maxWidth: 500,
        customClass: "overflow-hidden",
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        },
        $$slots: {
          header: ($$payload3) => {
            $$payload3.out += `<div slot="header" class="bg-[var(--primary-color)] py-4 px-6"><div class="flex justify-center items-center space-x-3"><img src="/images/icons/invite.png" alt="Invite icon" class="w-8 h-8"> <h2 class="text-white text-xl font-bold">Invite your friends</h2></div></div>`;
          },
          body: ($$payload3) => {
            $$payload3.out += `<div slot="body" class="space-y-6"><p class="text-gray-700 text-lg">Challenge your friends and invite them to the competition by sharing the
      link.</p> <div class="flex items-center border rounded-full overflow-hidden"><input type="text"${attr("value", shareUrlFriends)} class="flex-grow p-3 outline-none text-gray-600 overflow-hidden overflow-ellipsis" readonly> <button class="bg-[var(--primary-color)] text-white font-bold my-1 mx-1 rounded-4xl py-2 px-6">copy</button></div> <div class="space-y-3"><button class="flex items-center justify-center w-full p-3 border rounded-full text-gray-600 hover:bg-gray-50"><span class="text-blue-400 mr-3"><svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></span> Share on Twitter</button> <button class="flex items-center justify-center w-full p-3 border rounded-full text-gray-600 hover:bg-gray-50"><span class="text-blue-600 mr-3"><svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></span> Share on Facebook</button> <button class="flex items-center justify-center w-full p-3 border rounded-full text-gray-600 hover:bg-gray-50"><span class="text-blue-700 mr-3"><svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></span> Share on LinkedIn</button></div></div>`;
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
      open,
      onClose
    });
    pop();
  }
  AppBar = function($$payload, $$props) {
    push();
    var $$store_subs;
    let processedDropdown;
    let coinCount = fallback($$props["coinCount"], 0);
    let isLogoVisible = fallback($$props["isLogoVisible"], false);
    let backLabel = fallback($$props["backLabel"], "Competitions");
    let isBackButtonVisible = fallback($$props["isBackButtonVisible"], true);
    let isCoinVisible = fallback($$props["isCoinVisible"], false);
    let isProfileVisible = fallback($$props["isProfileVisible"], false);
    let isVoucherButtonVisible = fallback($$props["isVoucherButtonVisible"], false);
    let isGuestMode = false;
    let profilePicture = $$props["profilePicture"];
    let dropdownItems = fallback($$props["dropdownItems"], () => [], true);
    let profileSrc;
    function openModal() {
      appbarStore.update((state) => ({
        ...state,
        isVoucherModalVisible: true
      }));
    }
    const { web_logo, mobile_logo } = getSystemLightLogo();
    let webLogoClass = isGlobalClimateLiteracy ? "w-55" : "w-40";
    let mobileLogoClass = "w-11 h-11";
    let logoFilterClass = isShupavu ? "" : "filter brightness-0 invert";
    let showSignoutConfirm = false;
    let showShareModal = false;
    const SIGNOUT_LABEL = store_get($$store_subs ??= {}, "$t", t)("signout");
    function handleMenuClick(item) {
      if (item.label === SIGNOUT_LABEL) {
        showSignoutConfirm = true;
      } else {
        item.clickCB();
      }
    }
    function onConfirmSignout() {
      showSignoutConfirm = false;
      logoutUser();
    }
    function onCancelSignout() {
      showSignoutConfirm = false;
    }
    function closeShareModal() {
      showShareModal = false;
    }
    profileSrc = profilePicture && profilePicture.length < 5 ? `/images/profiles/${profilePicture}.png` : profilePicture;
    processedDropdown = dropdownItems.map((item) => ({
      ...item,
      clickCB: () => handleMenuClick(item)
    }));
    isGuestMode = store_get($$store_subs ??= {}, "$userStore", userStore) ? IsGuestMode() : false;
    if (isGuestMode) {
      coinCount = store_get($$store_subs ??= {}, "$guestStore", guestStore).points;
    }
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      $$payload2.out += `<div class="flex items-center justify-between p-4 bg-transparent z-5 px-4 md:px-6"><div class="flex items-center space-x-2">`;
      if (isBackButtonVisible) {
        $$payload2.out += "<!--[-->";
        ArrowButton($$payload2, {
          arrowType: "back",
          link: store_get($$store_subs ??= {}, "$navigationStore", navigationStore).back_url,
          customClass: "text-white",
          label: backLabel
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (isLogoVisible) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button${attr("class", `flex items-center space-x-2 ${stringify(!isBackButtonVisible ? "cursor-default" : "")} svelte-k3bx24`)}><img${attr("src", web_logo)} alt="Instance Logo"${attr("class", `${stringify(`${webLogoClass} object-contain hidden md:flex ${logoFilterClass} cursor-pointer`)} svelte-k3bx24`)}> <img${attr("src", mobile_logo)} alt="Instance Logo"${attr("class", `${stringify(`${mobileLogoClass} object-contain flex md:hidden ${logoFilterClass}`)} svelte-k3bx24`)}></button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div> <div class="flex items-center space-x-3">`;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (isCoinVisible) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex space-x-2 bg-[#00000099] relative rounded-full w-30 h-10 items-center coin-counter"><img src="/images/coin.svg" alt="Coin" class="flex absolute w-12 left-0"> <span class="text-white font-lg text-right w-full px-3 font-bold">${escape_html(abbreviateNumber(coinCount, 2))}</span></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (isVoucherButtonVisible && !isGlobalClimateLiteracy && !isGuestMode) {
        $$payload2.out += "<!--[-->";
        Button($$payload2, {
          label: store_get($$store_subs ??= {}, "$t", t)("add_voucher_code"),
          size: "large",
          type: "3d-secondary",
          customClass: "w-full mb-[0.6rem] text-lg md:text-[22px]",
          onClick: () => {
            openModal();
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (profileSrc && profileSrc.length > 0 && isProfileVisible) {
        $$payload2.out += "<!--[-->";
        DropDownMenu($$payload2, {
          items: processedDropdown,
          children: ($$payload3) => {
            $$payload3.out += `<div class="h-12 w-12 rounded-full cursor-pointer">`;
            Avatar($$payload3, {
              t: store_get($$store_subs ??= {}, "$userStore", userStore).profile_picture,
              s: 50,
              u: 50,
              ml: "auto",
              mr: "auto"
            });
            $$payload3.out += `<!----></div>`;
          },
          $$slots: {
            default: true
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isNotificationVisible && !isGuestMode) {
        $$payload2.out += "<!--[-->";
        NotificationBell($$payload2);
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div></div> `;
      ConfirmationModal($$payload2, {
        title: SIGNOUT_LABEL,
        message: `Are you sure you want to ${SIGNOUT_LABEL.toLowerCase()}?`,
        onConfirm: onConfirmSignout,
        onCancel: onCancelSignout,
        cancelText: store_get($$store_subs ??= {}, "$t", t)("cancel"),
        successText: store_get($$store_subs ??= {}, "$t", t)("signout"),
        get showModal() {
          return showSignoutConfirm;
        },
        set showModal($$value) {
          showSignoutConfirm = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      InviteFriends($$payload2, {
        onClose: closeShareModal,
        get open() {
          return showShareModal;
        },
        set open($$value) {
          showShareModal = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!---->`;
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      coinCount,
      isLogoVisible,
      backLabel,
      isBackButtonVisible,
      isCoinVisible,
      isProfileVisible,
      isVoucherButtonVisible,
      profilePicture,
      dropdownItems
    });
    pop();
  };
});
export {
  AppBar as A,
  __tla
};
