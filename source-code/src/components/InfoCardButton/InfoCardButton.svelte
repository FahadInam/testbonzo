<script>
  import { gotoURL } from "../../stores/navigation.store";

  export let image = "";
  export let title = "";
  export let description = "";
  export let link = "";
  export let onClick = () => {};

  const onBtClick = () => {
    if (link) {
      gotoURL(link);
    }
    if (onClick) {
      onClick();
    }
  };
</script>

<button
  class="flex flex-col md:flex-row md:items-center text-left md:text-left p-10 bg-white w-full rounded-3xl border-2 border-gray-200 hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)]/5"
  on:click={onBtClick}
>
  <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
    <img
      src={image}
      alt="Learner Icon"
      class="w-28 object-contain mx-auto md:mx-0"
    />
  </div>

  <div class="text-center md:text-left w-full md:w-auto ps-0 md:ps-5">
    <h2 class="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
    <p class="text-sm font-normal text-gray-600">
      {description}
    </p>
  </div>
</button>
