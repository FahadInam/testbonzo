<script>
  import Image from "../Image/Image.svelte";
  import { t } from "../../stores/language.store";

  export let title = "leaderboard";
  export let icon = "Leaderboard";
  export let imageClass = ""; // Default class prop
</script>

<div class="flex items-center justify-center w-full gap-3">
  <Image src={icon} className={`drop-shadow ${imageClass}`} />
  <h2
    class="text-white font-bold text-2xl sm:text-3xl title-shadow title-drop-shadow"
  >
    {$t(title)}
  </h2>
</div>
