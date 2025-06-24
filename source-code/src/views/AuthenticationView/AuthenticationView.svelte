<script>
  import { get } from "svelte/store";
  import Button from "../../components/Button/Button.svelte";
  import Form from "../../components/Form/Form.svelte";
  import PopupScreen from "../../components/PopupScreen/PopupScreen.svelte";
  import Modal from "../../components/Modal/Modal.svelte";
  import InfoCardButton from "../../components/InfoCardButton/InfoCardButton.svelte";
  import { getFormViewLogo, isGlobalClimateLiteracy, isShupavu } from "../../data-actions/system/system..da";
  import Image from "../../components/Image/Image.svelte";
  import { systemSettingsStore } from "../../stores/systemsettings.store";

  export let useModal = false;
  export let isModalVisible = false;
  export let showBackButton = true;
  /**
   * @type { any[]}
   */
  export let cards = [];
  export let logo = getFormViewLogo();
  export let cardTitle = "";
  export let form = {
    title: "",
    fields: [
      {
        name: "",
        type: "",
        label: "",
        placeholder: "",
        required: true,
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
    handleSubmit: (/** @type {any} */ formData) => {},
    forgotPassword: {
      label: "",
      link: "",
    },
    alternativeButtons: [
      {
        label: "",
        type: "",
        image: "",
        onClick: () => {},
      },
    ],
    footer: {
      text: "",
      button: {
        label: "",
        type: "",
        link: "",
      },
    },
    role: "",
  };
  const component = useModal ? Modal : PopupScreen;
  // console.log(form, "form");

  let logoClass = "w-32";
  if (isGlobalClimateLiteracy) {
    logoClass = "w-42 md:w-50";
  }
  if (isShupavu) {
    logoClass = "w-40 md:w-48";
  }

  const back_url = get(systemSettingsStore)?.account_back_url;
  // console.log("navigationStore ====>>", $navigationStore.back_url);
</script>

<!-- backButtonLink={$navigationStore.back_url} -->
<svelte:component
  this={component}
  backButtonLabel="Home"
  backButtonLink={back_url}
  bind:open={isModalVisible}
  {showBackButton}
>
  <div slot="body">
    <div class="text-left">
      <Image src={logo} alt="Instance Logo" className={`${logoClass} mx-auto mb-4`} />
      {#if cards.length == 0}
        <h3 class="text-2xl font-medium text-gray-800 mt-5 pt-2">
          {form.title}
        </h3>
      {/if}
    </div>

    {#if cards.length > 0}
      <p class="text-2xl font-semibold text-gray-800 mt-5 pt-2 text-center">
        {cardTitle}
      </p>
      <div class="mt-6 space-y-7">
        {#each cards as card}
          <InfoCardButton {...card} />
        {/each}
      </div>
    {:else}
      <main class="mt-4">
        <Form
          fields={form.fields}
          buttons={form.buttons}
          turnstileSiteKey={form.turnstileSiteKey}
          enableTurnstile={form.enableTurnstile}
          handleSubmit={form.handleSubmit}
          forgotPassword={form.forgotPassword}
        />

        {#if form.alternativeButtons && form.alternativeButtons.length > 0}
          <div class="text-center my-4 text-gray-500 font-poppins text-sm font-semibold">or</div>
          <div class="flex {form.alternativeButtons.length === 1 ? 'flex-col' : 'gap-4 flex-wrap'}">
            {#each form.alternativeButtons as button}
              <Button
                label={button.label}
                type={button.type}
                image={button.image}
                imageClass="w-6 h-6 mr-2 mt-[2px]"
                customClass="grow"
                onClick={() => button.onClick(form.role)}
              />
            {/each}
          </div>
        {/if}
      </main>
    {/if}
  </div>

  <div slot="footer">
    {#if cards.length == 0}
      <div class="text-center mt-0 text-gray-600 bg-gray-100 p-2">
        {form.footer.text}
        <span class="ms-3"></span>
        <Button width="w-[120px]" {...form.footer.button} />
      </div>
    {/if}
  </div>
</svelte:component>
