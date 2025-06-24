<script>
  import { getGameContentType, getRandomSubjectImage } from "./GameCard";
  export let completion = null;

  /**
   * @type {object}
   */
  export let data = [];

  /**
   * @type {() => void}
   */
  export let onClick;

  let gameContentType = getGameContentType(data);
  let Subject = getRandomSubjectImage(data.subject);

  function handleClick() {
    if (onClick) {
      onClick(data);
    }
  }
</script>

<!-- Game Card (Fixed for Small Screens) -->
<button
  class="bg-white rounded-[20px] shadow-lg p-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[450px]
  relative cursor-pointer transition-transform duration-200 hover:scale-100 sm:hover:scale-102 card-button-shadow"
  on:click={handleClick}
>
  <div
    class="flex flex-col items-center rounded-2xl"
    style="background-color: {Subject?.color};"
  >
    <div
      class="bg-black opacity-90 w-full sm:w-72 md:w-50 bonzo-text-yellow rounded-xl rounded-b-none sm:rounded-b-2xl sm:rounded-t-none py-1 px-4 text-center font-medium text-base sm:text-lg"
    >
      {data.subject}
    </div>

    <div
      class="flex space-x-2 sm:space-x-4 mb-3 sm:mb-4 items-center w-full p-3 sm:p-4 px-4"
    >
      <img
        src={Subject?.image}
        class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
        alt="Subject icon"
      />
      <div
        class="truncate-4line text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] font-semibold text-white break-words text-left"
      >
        {data.topic}
      </div>
    </div>
  </div>

  <div class="flex justify-between items-end px-2.5">
    <div
      class={`${completion ? 'bonzo-bg-green' : ''} font-medium text-white mt-2 rounded-full w-13 h-7 sm:w-12 md:w-14 flex items-center justify-center`}
    >
      {completion}
    </div>
  </div>

  <div
    class="bonzo-bg-blue text-sm bottom-2 sm:bottom-6 sm:text-lg rounded-s-full py-2 sm:py-3 px-3 sm:px-4 text-white font-medium flex items-center space-x-1 sm:space-x-2 absolute right-0"
  >
    <img
      src={gameContentType.content_type_image}
      class="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
      alt="Game icon"
    />
    <span class="ps-1 font-medium text-sm sm:text-sm md:text-base lg:text-lg">
      {gameContentType.content_type_label}
    </span>
  </div>
</button>

<style>
  .bonzo-text-yellow {
    color: rgb(250, 252, 84) !important;
  }
  .bonzo-bg-green {
    background-color: #29b358;
  }
  .bonzo-bg-blue {
    background-color: #112d70;
  }
  /* .break-word {
    word-break: break-word;
  } */
</style>
