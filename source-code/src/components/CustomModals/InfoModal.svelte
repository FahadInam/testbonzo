<!-- InfoModal.svelte -->
<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";
  import Modal from "../Modal/Modal.svelte";
 
  export let showModal = false;
  export let data = {}; // This will receive the rules data from API
   export let onClose = () => {}; 
  function onButtonClick(action) {
    if (action === "cancel") {
      showModal = false;
    }
    // Add other actions as needed
  }
</script>

<Modal
  bind:open={showModal}
  onClick={() => {
    onButtonClick("cancel");
    onClose();
  }}
  maxWidth={748}
>
  <!--custom modal header-->
  <span slot="header">
    <div
      class="bg-blue-800 px-4 py-3 flex justify-center items-center rounded-t-lg gap-2"
    >
      <Image
        src={IMAGES.RULES}
        alt="Rules"
        className="w-9 h-9 min-w-9"
      />
      <span class="text-white font-semibold text-xl ms-2">{"Rules"}</span>
    </div>
  </span>
  
  <span slot="body">
    <div class="p-6">
        <div class="rules-content h-[50vh]" style="font-family: system-ui, sans-serif; line-height: 1.8; color: #515151; font-weight: 500;">
          {@html data}
        </div>
    </div>
  </span>
  
  <span slot="footer" class="p-2">
    <div class="flex justify-center gap-4">
      <Button
        label="Close"
        size="small"
        type="3d-secondary"
        customClass="w-[300px] mb-4 max-h-[80vh]"
        onClick={() => {
          onButtonClick("cancel");
          onClose();
        }}
      />
    </div>
  </span>
</Modal>

<style>
  /* Add these styles to match the HTML from the API */
  :global(.rules-content h2) {
    color: #006400;
    font-size: 24px;
    margin-bottom: 0px;
  }
  
  :global(.rules-content p) {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  :global(.rules-content p:first-of-type) {
    font-size: 14px;
    margin-bottom: 20px;
    font-style: italic;
    margin-top: 4px;
  }
  
  :global(.rules-content ol) {
    padding-left: 20px;
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  :global(.rules-content li) {
    margin-bottom: 10px;
  }
  
  :global(.rules-content li span:first-child) {
    color: #000;
    font-weight: 600;
  }
</style>