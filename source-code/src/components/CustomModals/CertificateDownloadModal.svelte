<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";
  import Modal from "../Modal/Modal.svelte";
  import { t } from "../../stores/language.store";
  import { goto } from "$app/navigation";

  export let showModal = false;
  export let title = "";
  export let buttonText = "";
  export let data = {};
  export let iconSrc = IMAGES.WARNING;
  export let onConfirm = () => {};
  export let onCancel = () => {};

  function handleConfirm() {
    showModal = false;
    onConfirm();
  }

  function handleCancel() {
    onCancel();
    showModal = false;
  }
  // console.log("data...", data);
</script>

<Modal bind:open={showModal} on:clickOutside={handleCancel}>
  <!-- Header -->
  <span slot="header">
    <div
      class="bg-[var(--primary-color)] px-4 py-3 flex justify-center items-center rounded-t-lg gap-2"
    >
      <Image src={iconSrc} alt="Warning Icon" className="w-9 h-9" />
      <span class="text-white font-semibold text-xl ms-2">{title}</span>
    </div>
  </span>

  <!-- Body -->
  <span slot="body">
    <div class="bg-white py-4 text-center">
      <h6 class="sm:text-xl text-lg font-medium text-[var(--black-gray)] mb-8">
        {$t("earned_certificate_of")}
        {data?.type}
        {$t("in")}
        <span class="text-[var(--theme-dark-blue)] font-semibold"
          >{data?.competition_name}</span
        >
        {$t("against")}
        <span class="text-[var(--theme-dark-blue)] font-semibold"
          >{$t("grade")} {data?.grade}</span
        >. {$t("to_download_certificate")}
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
      <h6 class="sm:text-xl font-medium !text-lg text-[var(--black-gray)] mt-8">
        {$t("update_name_from_profile")}
        <a href="profile/edit" class="underline text-[var(--primary-color)]">
          {$t("profile_settings")}
        </a>
      </h6>
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
