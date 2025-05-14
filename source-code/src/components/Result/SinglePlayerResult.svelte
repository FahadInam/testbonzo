<script>
  import { t } from "../../stores/language.store";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";

  /**
   * @type {any[]}
   */
  // export let data = [];

  /**
   * @type {string}
   */
  export let title = "recently_played";

  export let icon = "";
</script>

<div
  class="bg-white rounded-[20px] shadow-lg overflow-hidden flex flex-col min-h-[500px] w-full max-w-[500px] lg:w-[48%] xl:w-[500px]"
>
  <div
    class="bg-blue-900 text-white py-2 md:py-3 flex justify-center items-center gap-4"
  >
    <Image src={icon} width="40" height="40" />
    <h2 class="text-xl font-semibold">{$t(title)}</h2>
  </div>

  <div class="p-4 flex-col flex-grow h-[400px] overflow-y-auto"></div>
  <div class="bg-gray-100 p-4 flex justify-center mt-auto w-full">
    <Button
      label={$t("start")}
      size="medium"
      type="3d-primary"
      customClass="w-[130px]"
      onClick={() => {
        console.log("Continue");
      }}
    />
  </div>
</div>
