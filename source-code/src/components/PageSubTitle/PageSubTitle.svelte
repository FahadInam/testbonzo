<script>
  export let logo = "";
  export let name = "";
</script>

<div
  class="w-full max-w-4xl mx-auto flex justify-center items-center gap-4 my-3 mb-8"
>
  <img src={logo} alt="icon" class="hidden" />
  <h3
    class="text-white text-lg sm:text-[26px] font-medium leading-none title-shadow"
  >
    {name}
  </h3>
</div>
