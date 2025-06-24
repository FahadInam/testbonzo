<script>
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";
  import { userSelectionCardsPopup } from "../../data-actions/authentication/common.auth.data";
  import {
    institutionLoginFormPopup,
    signUpInstitutionFormPopup,
  } from "../../data-actions/authentication/institution.auth.da";
  import {
    getUserLoginForm,
    userLoginFormPopup,
    userSignUpFormPopup,
  } from "../../data-actions/authentication/user.auth.da";
  import { authModalStore } from "../../stores/auth.modal.store";
  import AuthenticationView from "../AuthenticationView/AuthenticationView.svelte";
  import { t } from "../../stores/language.store";
  import { getInstanceText } from "$lib/utils";
  import { systemSettingsStore } from "../../stores/systemsettings.store";
  import { get } from "svelte/store";

  let isVisible = false;
  let currentForm;
  let page = "";
  let cards = [];
  let hasPreloaded = false;
  const cardTitle = getInstanceText($t, "bonzo_as");
  const config = get(systemSettingsStore);

  async function preloadForm(page) {
    switch (page) {
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

  // Subscribe to the store and capture the unsubscribe function
  const unsubscribe = authModalStore.subscribe(async (data) => {
    isVisible = data.visible;
    page = data.page;
    cards = [];
    if (data.visible) {
      await preloadForm(data.page);
    }
  });

  onMount(async () => {
    // Optional: preload common form to ensure first render isn't blank
    if (!hasPreloaded) {
      await preloadForm("user-login"); // preload default or likely first form
      hasPreloaded = true;
    }
  });

  // Unsubscribe when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div>
  <AuthenticationView useModal={true} bind:isModalVisible={isVisible} form={currentForm} {cards} {cardTitle} />
</div>
