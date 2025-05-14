<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { useInView } from "$lib/utils";
  import Image from "../../../components/Image/Image.svelte";
  import { getText, t } from "../../../stores/language.store";

  const categories = [
    {
      icon: IMAGES.WHO_IS_IT_IMAGE_ONE,
      title: $t("who_use_it_card_one_title"),
      description: $t("who_use_it_card_one_desc"),
      features: [
        $t("first_key_feature_title_one"),
        $t("first_key_feature_title_two"),
        $t("first_key_feature_title_three"),
      ],
    },
    {
      icon: IMAGES.WHO_IS_IT_IMAGE_TWO,
      title: $t("who_use_it_card_two_title"),
      description: $t("who_use_it_card_two_desc"),
      features: [
        $t("second_key_feature_title_one"),
        $t("second_key_feature_title_two"),
        $t("second_key_feature_title_three"),
      ],
    },
    {
      icon: IMAGES.WHO_IS_IT_IMAGE_THREE,
      title: $t("who_use_it_card_three_title"),
      description: $t("who_use_it_card_three_desc"),
      features: [
        $t("third_key_feature_title_one"),
        $t("third_key_feature_title_two"),
        $t("third_key_feature_title_three"),
      ],
    },
  ];
</script>

<div class="bg-white pt-16">
  <div class="px-4 lg:px-20">
    <h2
      class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-2xl mx-auto leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
      s
    >
      {$t("who_use_it_main_title")}
    </h2>
    <p
      class="mt-4 text-gray-600 text-lg md:text-[22px] max-w-full md:max-w-6xl mx-auto text-center leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
    >
      {$t("who_use_it_main_description")}
    </p>
  </div>

  <div
    class="container mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 px-6 lg:px-20 space-y-16"
  >
    {#each categories as category}
      <div
        class="bg-white p-6 rounded-[20px] border border-gray-300 w-full mb-0"
      >
        <h3 class="flex items-center">
          <span use:useInView={{ animationClass: "animate__fadeInDown" }}>
            <Image
              src={category.icon}
              alt={category.title}
              className="w-8 h-8 mr-2"
            />
          </span>

          <span
            class="text-xl md:text-[28px] lg:text-xl xl:text-[28px] font-semibold text-gray-700"
          >
            {category.title}</span
          >
        </h3>
        <div class="flex items-center min-h-auto lg:min-h-[150px] py-3 lg:py-0">
          <p
            class="mt-2 text-gray-600 text-base md:text-lg lg:text-base xl:text-lg"
          >
            {category.description}
          </p>
        </div>
        <hr class="my-4 border-gray-300" />
        <h4 class="font-semibold text-gray-700 text-lg my-5">
          {$t("key_features")}
        </h4>
        <ul class="mt-2 space-y-2">
          {#each category.features as feature}
            <li class="flex items-baseline mb-4">
              <span
                class="text-white text-sm mr-2 bg-green-500 rounded-full w-5 h-5 min-w-5 text-center leading-[20px]"
                >✔</span
              >
              <span class="text-gray-700 text-base"> {feature} </span>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
