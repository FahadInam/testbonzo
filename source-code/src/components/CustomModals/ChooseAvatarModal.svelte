<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { t } from "../../stores/language.store";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";
  import Modal from "../Modal/Modal.svelte";

  export let showModal = false;
  export let headerTitle = "";
  export let headerImage = IMAGES.CHANGE_GRADE_ICON;

  /**
   * @param {string} action
   */
  export let onButtonClick = (action) => {};
</script>

<Modal
  bind:open={showModal}
  onClick={() => onButtonClick("cancel")}
  maxWidth={920}
  customClass="choose-avatar-modal"
>
  <!-- Custom modal header -->
  <span slot="header">
    <div
      class="bg-blue-400 px-4 py-3 flex justify-center items-center rounded-t-lg gap-2"
    >
      <Image src={headerImage} alt="" className="w-9 h-9 min-w-9" />
      <span class="text-white font-semibold text-xl ms-2">
        {headerTitle}
      </span>
    </div>
  </span>

  <!-- Custom modal body with slot -->
  <span slot="body">
    <slot />
  </span>

  <!-- Custom modal footer -->
  <span slot="footer" class="p-2">
    <div class="flex justify-center gap-4">
      <Button
        label={$t("cancel")}
        size="small"
        type="3d-primary"
        customClass="w-[160px] text-lg md:text-[22px]"
        onClick={() => onButtonClick("cancel")}
      />
      <Button
        label={$t("save")}
        size="small"
        type="3d-secondary"
        customClass="w-[160px] text-lg md:text-[22px]"
        onClick={() => onButtonClick("save")}
      />
    </div>
  </span>
</Modal>
