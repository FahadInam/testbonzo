<script>
  import { t } from "../../stores/language.store";
  import Modal from "../Modal/Modal.svelte";
  import Button from "../Button/Button.svelte";
  import { competitionStore } from "../../stores/competition.store";
  import { afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { userStore } from "../../stores/user.store";
  import { get } from "svelte/store";
  import { encodeDecode } from "$lib/utils";
  import { instanceConfig } from "$lib/constants/config.constants";
  import { systemSettingsStore } from "../../stores/systemsettings.store";
  import { showSuccess } from "../../stores/toast.store";

  export let open = false;
  export let onClose = () => {};
  // export let shareLink = "https://bonzo.knowledgeplatform.com/account/sign"; // Default share link

  const user_id = get(userStore)?.user_id;
  const user_enc_id = encodeDecode("enc", `${user_id}`);
  console.log("this is user id", user_id, user_enc_id);

  const ShareLinkUrl = `account/sign-up?friends_id=${user_enc_id}`;

  const inst_config = get(systemSettingsStore).share_url || [];
  const shareUrlFriends = `${inst_config}${ShareLinkUrl}`;

  function handleClose() {
    onClose();
    open = false;
  }

  function copyLink() {
    navigator.clipboard
      .writeText(shareUrlFriends)
      .then(() => {
        showSuccess("Invite Link copied");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  }

  function shareOnPlatform(platform) {
    let shareUrl;
    const encodedLink = encodeURIComponent(shareUrlFriends);
    const encodedText = encodeURIComponent(
      "Challenge your friends and invite them to the competition!",
    );

    switch (platform) {
      case "twitter":
        // Twitter now uses X.com
        shareUrl = `https://x.com/intent/tweet?url=${encodedLink}&text=${encodedText}`;
        break;
      case "facebook":
        // Facebook share URL
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case "linkedin":
        // LinkedIn sharing with title and summary parameters for better sharing
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}&title=${encodeURIComponent("Join our competition!")}&summary=${encodedText}`;
        break;
      case "whatsapp":
        // Add WhatsApp sharing
        shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedLink}`;
        break;
      case "telegram":
        // Add Telegram sharing
        shareUrl = `https://t.me/share/url?url=${encodedLink}&text=${encodedText}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }
</script>

<Modal
  bind:open
  onClick={handleClose}
  maxWidth={500}
  customClass="overflow-hidden"
>
  <div slot="header" class="bg-[var(--primary-color)] py-4 px-6">
    <div class="flex justify-center items-center space-x-3">
      <img src="/images/icons/invite.png" alt="Invite icon" class="w-8 h-8" />

      <h2 class="text-white text-xl font-bold">Invite your friends</h2>
    </div>
  </div>

  <div slot="body" class="space-y-6">
    <p class="text-gray-700 text-lg">
      Challenge your friends and invite them to the competition by sharing the
      link.
    </p>

    <div class="flex items-center border rounded-full overflow-hidden">
      <input
        type="text"
        value={shareUrlFriends}
        class="flex-grow p-3 outline-none text-gray-600 overflow-hidden overflow-ellipsis"
        readonly
      />
      <button
        class="bg-[var(--primary-color)] text-white font-bold my-1 mx-1 rounded-4xl py-2 px-6"
        on:click={copyLink}
      >
        copy
      </button>
    </div>

    <div class="space-y-3">
      <button
        class="flex items-center justify-center w-full p-3 border rounded-full text-gray-600 hover:bg-gray-50"
        on:click={() => shareOnPlatform("twitter")}
      >
        <span class="text-blue-400 mr-3">
          <svg
            class="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
            />
          </svg>
        </span>
        Share on Twitter
      </button>

      <button
        class="flex items-center justify-center w-full p-3 border rounded-full text-gray-600 hover:bg-gray-50"
        on:click={() => shareOnPlatform("facebook")}
      >
        <span class="text-blue-600 mr-3">
          <svg
            class="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
        </span>
        Share on Facebook
      </button>

      <button
        class="flex items-center justify-center w-full p-3 border rounded-full text-gray-600 hover:bg-gray-50"
        on:click={() => shareOnPlatform("linkedin")}
      >
        <span class="text-blue-700 mr-3">
          <svg
            class="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </span>
        Share on LinkedIn
      </button>
    </div>
  </div>
</Modal>
