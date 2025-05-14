<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";
  import Modal from "../Modal/Modal.svelte";
  import { t } from "../../stores/language.store";

  export let showModal = false;
  export let title = "";
  export let message = "";
  export let buttonText = "";
  export let iconSrc = IMAGES.WARNING;
  export let onConfirm = () => {};
  export let onCancel = () => {};

  function handleConfirm() {
    onConfirm();
    showModal = false;
  }

  function handleCancel() {
    onCancel();
    showModal = false;
  }
</script>

<Modal bind:open={showModal} on:clickOutside={handleCancel}>
  <!-- Header -->
  <span slot="header">
    <div
      class="bg-[var(--primary-color)] px-4 py-2 flex justify-center items-center rounded-t-lg gap-2"
    >
      <Image src={iconSrc} alt="Warning Icon" className="w-10 h-10" />
      <span class="text-white font-semibold text-xl ms-2">{title}</span>
    </div>
  </span>

  <!-- Body -->
  <span slot="body">
    <div class="bg-white py-4 text-center">
      <h6
        class="sm:text-xl text-lg font-medium text-[var(--dark-gray)] mb-8 md:px-12"
      >
        {message}
      </h6>
      <div class="flex justify-center sm:gap-6 gap-4">
        <Button
          label={buttonText}
          size="small"
          type="3d-primary"
          customClass="w-[300px]"
          onClick={handleConfirm}
        />
      </div>
    </div>
  </span>
</Modal>

<style>
  /* Hide default modal close icon if the underlying component injects one */
  :global(.modal-close-button),
  :global(.close-icon) {
    display: none !important;
  }
</style>
