<script>
  import Image from "../Image/Image.svelte";

  export let avatar;
  export let selectedAvatar;
  export let selectAvatar;
</script>

<!-- avatar -->
<button
  type="button"
  class={`relative group cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:border-green-400 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-5 p-1 ${selectedAvatar === avatar ? "border-green-400" : "border-white"}`}
  on:click={() => selectAvatar(avatar)}
  on:keydown={(e) => e.key === "Enter" && selectAvatar(avatar)}
>
  <Image
    src={avatar}
    alt="avatar"
    className="w-full h-full object-cover rounded-full shadow-md"
  />
  <div
    class={`absolute transition-transform duration-200 group-focus:scale-100 top-0 right-0 bg-green-400 p-1 rounded-full w-6 h-6 flex items-center justify-center ${selectedAvatar === avatar ? "scale-100" : "scale-0"}`}
  >
    <i class="i i-tick text-white text-sm font-semibold"></i>
  </div>
</button>
