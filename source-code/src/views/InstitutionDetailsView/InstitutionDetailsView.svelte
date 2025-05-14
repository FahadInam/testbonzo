<script>
  import Form from "../../components/Form/Form.svelte";
  import PopupScreen from "../../components/PopupScreen/PopupScreen.svelte";
  import { navigationStore } from "../../stores/navigation.store";
  import Modal from "../../components/Modal/Modal.svelte";
  export let useModal = false;
  export let isModalVisible = false;
  /**
   * @type { any[]}
   */
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
  };
  console.log(form, "form")
  const component = useModal ? Modal : PopupScreen;
</script>

<svelte:component
  this={component}
  backButtonLabel="Back"
  backButtonLink={$navigationStore.back_url}
  bind:open={isModalVisible}
>
  <div slot="body">
    <div class="text-left">
      <!-- <img src={logo} alt="Bonzo Logo" class="mx-auto mb-4 w-32" /> -->
        <h3 class="text-2xl font-medium text-gray-800 mt-5 pt-2">
          {form.title}
        </h3>
    </div>
      <main class="mt-4">
        <Form
          fields={form.fields}
          buttons={form.buttons}
          turnstileSiteKey={form.turnstileSiteKey}
          enableTurnstile={form.enableTurnstile}
          handleSubmit={form.handleSubmit}
        />
      
      </main>
  </div>
</svelte:component>