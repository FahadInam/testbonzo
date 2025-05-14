<script>
  import GameCardSkeleton from "./GameCardSkeleton.svelte";
  import ListBoxSkeleton from "./ListBoxSkeleton.svelte";
</script>

<div
  class="flex w-full justify-center items-center mt-10 mb-10 animate-pulse space-y-4"
>
  <div class="bg-black/30 w-full flex flex-col p-2.5 rounded-full"></div>
</div>
<div class="mb-14">
  <GameCardSkeleton />
</div>
<ListBoxSkeleton />
