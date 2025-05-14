<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  export let text;
</script>

<div
  class="card-button-shadow bg-white card rounded-[20px] overflow-hidden flex justify-center items-center px-3 py-8 w-full h-full max-w-[400px] md:max-w-[2000px] md:w-[640px] lg:w-[912px]"
>
  <img src={IMAGES.BANNER_CERT_IMG} class="mr-3 w-14 h-12 object-contain" alt="Button icon" />
  <div class="">{@html text}</div>
</div>
