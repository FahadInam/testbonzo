<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";
  import Modal from "../Modal/Modal.svelte";
  import { t } from "../../stores/language.store";

  export let showModal = false;
  export let title = "";
  export let message = "";
  export let iconSrc = IMAGES.SIGN_OUT;
  export let onConfirm = () => {};
  export let onCancel = () => {};
  export let cancelText;
  export let successText;
  $: console.log("here Here");
  function handleConfirm() {
    showModal = false;
    onConfirm();
  }

  function handleCancel() {
    showModal = false;
    onCancel();
  }
</script>

<Modal bind:open={showModal} on:clickOutside={handleCancel}>
  <!-- Header -->
  <span slot="header">
    <div
      class="bg-[var(--primary-color)] px-4 py-3 flex justify-center items-center rounded-t-lg gap-2"
    >
      <Image src={iconSrc} alt="" className="w-10 h-10 " />
      <span class="text-white font-semibold text-lg">{title}</span>
    </div>
  </span>

  <!-- Body -->
  <span slot="body" class="">
    <div class="bg-white py-4 text-center">
      <h6
        class="sm:text-xl text-lg font-semibold text-[var(--dark-gray)] pb-2 mb-6"
      >
        {message}
      </h6>
      <div class="flex justify-center sm:gap-6 gap-4">
        <Button
          label={successText}
          size="small"
          type="3d-primary"
          customClass="w-[160px] text-lg md:text-[22px]"
          onClick={handleConfirm}
        />
        <Button
          size="small"
          type="3d-secondary"
          customClass="w-[160px] text-lg md:text-[22px]"
          label={cancelText}
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
