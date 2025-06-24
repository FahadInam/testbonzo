<script>
  import Form from "../../components/Form/Form.svelte";
  import Avatar from "../../components/Avatar/Avatar.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { goto } from "$app/navigation";
  import ChooseAvatarModal from "../../components/CustomModals/ChooseAvatarModal.svelte";
  import { extractAvatarNumber, getSortedAvatars } from "$lib/utils";
  import { getText, t } from "../../stores/language.store";
  import ChooseAvatar from "../../components/ChooseAvatar/ChooseAvatar.svelte";
  import { isPocketGames } from "../../data-actions/system/system..da";

  let showAvatarModal = false;
  let selectedAvatar = "";

  /** @type {string} */
  export let profile_picture;

  /**
   * @type {{
   *   fields: { name: string, type: string, label: string, placeholder: string, required: boolean, layout: string, value: string }[],
   *   buttons: { label: string, type: string }[],
   *   turnstileSiteKey: string,
   *   enableTurnstile: boolean,
   * }}
   */
  export let form = {
    fields: [
      {
        name: "",
        type: "",
        label: "",
        placeholder: "",
        required: true,
        layout: "",
        value: "",
      },
    ],
    buttons: [
      {
        label: "",
        type: "",
      },
    ],
    turnstileSiteKey: "",
    enableTurnstile: false,
  };

  // Create a formData object with values from the API
  /** @type {Record<string, string>} */
  let formData = {};
  $: {
    form.fields.forEach((field) => {
      formData[field.name] = field.value || "";
    });
    formData.profile_picture = profile_picture || "";
  }

  // when we click on cancel, go to profile page
  function handleCancel() {
    // goto("/profile");
    history.back();
  }

  // Function to toggle avatar modal
  function openAvatarModal() {
    // Set selectedAvatar to the current profile_picture when opening the modal
    selectedAvatar = profile_picture
      ? `/images/profiles/a${profile_picture}.png`
      : "";
    showAvatarModal = !showAvatarModal;
  }

  /**
   * Handle actions within the modal.
   *
   * @param {string} action - The action to perform. This is a more general type to match the expected type in ChooseAvatarModal.
   */
  function modalActions(action) {
    showAvatarModal = false;
    if (action === "save" && selectedAvatar) {
      profile_picture = extractAvatarNumber(selectedAvatar);
      console.log("profile_picture", profile_picture);
      formData.profile_picture = profile_picture;
    }
  }

  // Dynamically import avatars from SvelteKit assets folder
  // const avatarFiles = import.meta.glob("$lib/assets/images/profiles/*.png", {
  //   eager: true,
  // });

  /**
   * @type {Record<string, string>}
   * A mapping from avatar image path to file name.
   */
  const avatarFiles = {};
  const totalAvatars = 67; // Adjust as needed

  for (let i = 1; i <= totalAvatars; i++) {
    const fileName = `a${i}.png`;
    avatarFiles[`/images/profiles/${fileName}`] = fileName;
  }

  // Get sorted avatars, limiting to the first 14 if isPocketGames is true, otherwise returning all.
  let avatars = getSortedAvatars(avatarFiles, isPocketGames);
  /**
   *
   * @param {string} avatar - The avatar's image URL or file path.
   */
  const selectAvatar = (avatar) => {
    selectedAvatar = avatar;
  };
</script>

<div>
  <div class="flex justify-center items-center py-2">
    <!-- <Avatar t={IMAGES.CHOOSE_AVATAR_ICON} ml={1} mr={1} s={96} u={96} /> -->
    <div
      role="button"
      on:click={openAvatarModal}
      on:keydown={(e) =>
        (e.key === "Enter" || e.key === " ") && openAvatarModal()}
      tabindex="0"
      class="relative cursor-pointer"
    >
      <Avatar t={profile_picture} s={100} u={100} ml="auto" mr="auto" />

      <!--Avatar modal button-->
      <button
        class="absolute -bottom-1 -right-1 bg-blue-900 hover:bg-blue-800 border-4 border-white rounded-full p-1.5 cursor-pointer"
        aria-label="Edit avatar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="p-6">
    <Form
      fields={form.fields}
      buttons={form.buttons}
      turnstileSiteKey={form.turnstileSiteKey}
      enableTurnstile={form.enableTurnstile}
      handleSubmit={form.handleSubmit}
      {formData}
      {handleCancel}
    />
  </div>
</div>

<!-- Choose avatar modal -->
<ChooseAvatarModal
  showModal={showAvatarModal}
  onButtonClick={modalActions}
  headerTitle={$t("choose_avatar")}
  headerImage={IMAGES.CHOOSE_AVATAR_ICON}
>
  <!--Avatar selection screen-->
  <div
    class="w-full max-w-4xl mx-auto max-h-[50vh] md:max-h-[60vh] overflow-y-auto py-4 md:py-8 bg-gradient-to-t from-[#277DFF] to-[#00FFE0] rounded-[15px] rounded-t-none"
  >
    <div
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mx-auto px-4 md:px-8 w-full max-w-3xl place-items-center justify-items-center"
    >
      {#each avatars as avatar}
        <ChooseAvatar {avatar} {selectedAvatar} {selectAvatar} />
      {/each}
    </div>
    <div class="h-2"></div>
    <!-- Reduced spacing at the bottom -->
  </div>
</ChooseAvatarModal>
