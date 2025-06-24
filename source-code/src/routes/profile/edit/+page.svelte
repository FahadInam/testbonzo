<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { onDestroy, onMount } from "svelte";
  import DataCard from "../../../components/DataCard/DataCard.svelte";
  import {
    getProfileData,
    getUserProfileFields,
  } from "../../../data-actions/profile/profile.da";
  import ProfileEditView from "../../../views/ProfileEditView/ProfileEditView.svelte";
  import ProfileSkeleton from "../../../components/Skeleton/EditProfileSkeleton.svelte";
  import { sideBarAndAppBarSettings } from "$lib/utils";
  import { getText, t } from "../../../stores/language.store";
  import EditProfileSkeleton from "../../../components/Skeleton/EditProfileSkeleton.svelte";
  import { userStore } from "../../../stores/user.store";

  let userProfileForm = {};
  let isLoading = true;
  let profile_picture = "";

  async function loadFields() {
    userProfileForm = await getUserProfileFields();
  }
  // Fetches user profile and initializes form data
  async function fetchUserProfile() {
    const userData = await getProfileData();
    const [user] = userData?.data?.users || [];

    // Early exit if no user data found
    if (!user) {
      isLoading = false;
      return;
    }

    if (user) {
      ({ profile_picture } = user);
    }

    /** @type {{ [formField: string]: keyof typeof user }} */
    // Map form field names to potentially different API response keys
    const fieldMapping = {
      date_of_birth: "dob",
      contact_number: "phone_number",
    };

    /**
     * Stores the form data.
     * @type {Record<string, string>}
     */
    const formData = {};
    const fields = userProfileForm.fields.map((field) => {
      const apiKey = fieldMapping[field.name] || field.name;
      let value = user[apiKey] ?? "";

      // Convert "YYYY-MM-DDTHH:mm:ss" to "YYYY-MM-DD"
      if (field.name === "date_of_birth" && value) {
        value = value.split("T")[0]; // Extracts only YYYY-MM-DD
      }

      formData[field.name] = value;
      return { ...field, value };
    });

    // Update form configuration immutably:
    userProfileForm = {
      ...userProfileForm,
      fields,
      formData,
    };

    // Update loading state
    isLoading = false;
  }

  // fetch user profile data on component mount
  onMount(async () => {
    await loadFields();
    await fetchUserProfile();
  });

  onMount(async () => {
    if ($userStore.active_role == "principal") {
      sideBarAndAppBarSettings(false, "competitions", "/admin/competitions");
    } else {
      sideBarAndAppBarSettings(false, "profile", "/profile");
    }
  });

  // Reset sidebar and appbar when navigating away
  onDestroy(() => {
    if ($userStore.active_role == "principal") {
      return;
    } else {
      sideBarAndAppBarSettings(true, "back", "/competitions");
    }
  });
</script>

<div class="w-full max-w-[940px] m-auto px-4">
  {#if isLoading}
    <div class="w-full">
      <EditProfileSkeleton />
    </div>
  {:else}
    <DataCard
      title={$t("personal_details")}
      imageSrc={IMAGES.PROFILE_ICON}
      imageClass="w-12 h-12"
      maxHeight="auto"
    >
      <div class="w-full">
        <ProfileEditView form={userProfileForm} {profile_picture} />
      </div>
    </DataCard>
  {/if}
</div>
