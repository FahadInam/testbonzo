<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";
  import Modal from "../Modal/Modal.svelte";
  import { t } from "../../stores/language.store";

  export let showModal = false;
  export let title = "";
  export let message = "";
  export let warningText = "";
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
      class="bg-[var(--primary-color)] px-4 py-3 flex justify-center items-center rounded-t-lg gap-2"
    >
      <Image src={iconSrc} alt="Warning Icon" className="w-9 h-9 min-w-9" />
      <span class="text-white font-semibold text-xl ms-2">{title}</span>
    </div>
  </span>

  <!-- Body -->
  <span slot="body">
    <div class="bg-white py-4 text-center">
      <h6 class="sm:text-xl text-lg font-semibold text-[var(--dark-gray)] mb-4">
        {message}
      </h6>
      {#if warningText}
        <h6 class="text-red-600 sm:text-xl text-lg font-semibold mb-7">
          {warningText}
        </h6>
      {/if}
      <div class="flex justify-center sm:gap-6 gap-4">
        <Button
          label={$t("change")}
          size="small"
          type="3d-primary"
          customClass="w-[160px] text-lg md:text-[22px]"
          onClick={handleConfirm}
        />
        <Button
          size="small"
          type="3d-secondary"
          customClass="w-[160px] text-lg md:text-[22px]"
          label={$t("cancel")}
          onClick={handleCancel}
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
