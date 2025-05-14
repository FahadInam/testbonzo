<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";
  import Modal from "../Modal/Modal.svelte";

  export let showModal = false;
  export let title;
  /**
   * @type {number}
   */
  export let id;
  export let onSuccess = () => {};
  export let onSubmit = async (
    /** @type {string} */ code,
    /** @type {() => void} */ successCallback,
    /** @type {number} */ id,
  ) => {};
  export let instructionText;
  let voucherCode = "";

  function closeModal() {
    showModal = false;
    voucherCode = "";
  }

  async function handleSubmit() {
    const response = await onSubmit(voucherCode, onSuccess, id);
    if (response?.error_code === 0) {
      closeModal();
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }
</script>

<Modal bind:open={showModal} onClick={closeModal}>
  <!--custom modal header-->
  <span slot="header">
    <div
      class="bg-blue-400 px-4 py-3 flex justify-center items-center rounded-t-lg gap-2"
    >
      <Image src={IMAGES.ADD_CODE_IMG} alt="" className="w-9 h-9 min-w-9" />
      <span class="text-white font-semibold text-xl ms-2">{title}</span>
    </div>
  </span>

  <!--custom modal body-->
  <span slot="body">
    <div class="p-4 text-center">
      <!-- <p class="text-gray-700 text-left font-semibold">{instructionText}</p> -->
      <p class="text-gray-600 mt-2 font-medium text-base text-left">
        {instructionText}
      </p>
      <div class="mt-4 relative">
        <input
          type="text"
          placeholder="Enter voucher code..."
          bind:value={voucherCode}
          on:keydown={handleKeyDown}
          class="w-full border border-gray-300 rounded-lg p-2 py-4 pr-20 text-gray-700 focus:outline-none focus:ring-0"
        />
        <div class="absolute right-1 top-1/2 transform -translate-y-1/2">
          <Button
            label="Join"
            type="primary"
            customClass="w-[100px]"
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  </span>
</Modal>
