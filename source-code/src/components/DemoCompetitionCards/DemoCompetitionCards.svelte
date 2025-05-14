<script>
  import { t } from "../../stores/language.store";
  import Card from "../Card/Card.svelte";
  import Progressbar from "../Progessbar/Progressbar.svelte";

  export let competition = {
    id: 1,
    title: "The Green Singapore Competition",
    image:
      "https://bonzo.knowledgeplatform.com/images/competitions/learning_playground_banner1.png",
    is_demo: false,
    banner_image_mobile: "",
  };

  /**
   * @type {(arg0: string) => void}
   */
  export let onItemClick;

  /**
   * @param {string} url
   */
  function handleClick(url) {
    onItemClick(url);
  }

  // $: console.log("competition-->", competition);
</script>

<Card
  className="border-3 border-gray-200 hover:border-[var(--primary-color)] rounded-[20px] cursor-pointer p-1"
  onClick={() => handleClick(competition.url)}
>
  <div class="w-full">
    <div
      class="overflow-hidden p-2 w-full max-w-full md:max-w-[2000px] md:w-[640px] h-auto md:h-[170px] lg:w-[912px] lg:h-[240px]"
    >
      <picture>
        <source
          srcset={competition.banner_image_mobile}
          media="(max-width: 768px)"
        />
        <img
          src={competition.image}
          alt={competition.title}
          class="w-full h-full object-cover rounded-[15px]"
        />
      </picture>
    </div>
    <div class="flex justify-between items-center px-4 py-2">
      <h3 class="text-lg md:text-xl font-semibold">
        {competition.title}
      </h3>
      <div class="flex items-center space-x-2">
        <div
          class={`w-3 h-3 rounded-full ${!competition.is_demo ? "bg-green-600" : "bg-cyan-500"}`}
        ></div>
        <span
          class={`text-sm font-medium ${!competition.is_demo ? "text-green-600" : "text-cyan-500"}`}
        >
          {competition.is_demo ? $t("demo") : $t("live")}
        </span>
      </div>
    </div>
  </div>
</Card>
