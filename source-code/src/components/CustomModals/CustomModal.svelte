<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { t } from "../../stores/language.store";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";
  import ActionInputField from "../InputField/ActionInputField.svelte";
  import Modal from "../Modal/Modal.svelte";
  export let showModal = false;
  export let certificate_status = 0;
  export let data = {
    title: "",
    instructionTitle: "",
    detailsText: "",
    type: 0,
  };
  export let user_name = "";

  /**
   * @param {string} action
   */
  export let onButtonClick = (action) => {}; // Callback function
  /**
   * @param {string} full_name
   */
  export let handleSave = (full_name) => {}; // Callback function
</script>

<Modal
  bind:open={showModal}
  onClick={() => {
    onButtonClick("cancel");
  }}
>
  <!--custom modal header-->
  <span slot="header">
    <div
      class="bg-blue-400 px-4 py-3 flex justify-center items-center rounded-t-lg gap-2"
    >
      <Image
        src={IMAGES.CHANGE_GRADE_ICON}
        alt=""
        className="w-9 h-9 min-w-9"
      />
      <span class="text-white font-semibold text-xl ms-2">{data.title}</span>
    </div>
  </span>

  <!--custom modal body-->
  <span slot="body">
    <div class="text-center">
      <h2 class="text-blue-400 font-semibold text-xl">
        {data.instructionTitle}
      </h2>
      <p class="text-gray-600 mt-2 font-medium text-base">{data.detailsText}</p>
    </div>

    {#if certificate_status === 1 && data.type === 1}
      <div class="p-3">
        <ActionInputField name={user_name} onSave={handleSave} />
      </div>
    {/if}
  </span>

  <!--custom modal footer-->
  <span slot="footer" class="p-2">
    <div class="flex justify-center gap-4">
      <Button
        label={$t("close")}
        size="small"
        type="3d-primary"
        customClass="w-[160px] text-lg md:text-[22px]"
        onClick={() => {
          onButtonClick("cancel");
        }}
      />
      {#if certificate_status === 1}
        <Button
          label={$t("download")}
          size="small"
          type="3d-secondary"
          customClass="w-[160px] text-lg md:text-[22px]"
          onClick={() => {
            onButtonClick("download");
          }}
        />
      {:else}
        <Button
          label={$t("play")}
          size="small"
          type="3d-secondary"
          customClass="w-[130px]"
          onClick={() => {
            onButtonClick("play");
          }}
        />
      {/if}
    </div>
  </span>
</Modal>
