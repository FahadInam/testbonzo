<script>
  // @ts-nocheck
  import { onDestroy } from "svelte";
  import { userSelectionCardsPopup } from "../../data-actions/authentication/common.auth.data";
  import {
    institutionLoginForm,
    institutionLoginFormPopup,
    signUpInstitutionForm,
    signUpInstitutionFormPopup,
  } from "../../data-actions/authentication/institution.auth.da";
  import {
    userLoginForm,
    userLoginFormPopup,
    userSignUpForm,
    userSignUpFormPopup,
  } from "../../data-actions/authentication/user.auth.da";
  import { authModalStore } from "../../stores/auth.modal.store";
  import AuthenticationView from "../AuthenticationView/AuthenticationView.svelte";
  import { t } from "../../stores/language.store";

  let isVisible = false;
  let currentForm;
  let page = "";
  let cards = [];

  // Subscribe to the store and capture the unsubscribe function
  const unsubscribe = authModalStore.subscribe((data) => {
    isVisible = data.visible;
    page = data.page;
    cards = [];
    switch (data.page) {
      case "user-signup":
        currentForm = userSignUpFormPopup;
        break;
      case "user-login":
        currentForm = userLoginFormPopup;
        break;
      case "institution-login":
        currentForm = institutionLoginFormPopup;
        break;
      case "institution-signup":
        currentForm = signUpInstitutionFormPopup;
        break;
      case "user-selection":
        cards = userSelectionCardsPopup;
        break;
    }
  });

  // Unsubscribe when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div>
  <AuthenticationView
    useModal={true}
    bind:isModalVisible={isVisible}
    form={currentForm}
    {cards}
    cardTitle={$t("bonzo_as")}
  />
</div>
