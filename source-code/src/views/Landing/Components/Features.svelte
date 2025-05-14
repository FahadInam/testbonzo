<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { useInView } from "$lib/utils";
  import Button from "../../../components/Button/Button.svelte";
  import Image from "../../../components/Image/Image.svelte";
  import { getText, t } from "../../../stores/language.store";

  const buttons = [
    {
      label: "Get Started",
      type: "primary",
      link: "/account/signup",
      width: "w-[180px]",
    },
    {
      label: "Request a Demo",
      type: "secondary-outlined-inverted",
      link: "/account/signup",
      width: "w-[180px]",
    },
  ];

  const features = [
    {
      title: $t("feature_card_one_title"),
      description: [
        $t("feature_card_one_desc_one"),
        $t("feature_card_one_desc_two"),
      ],
      image: IMAGES.FEATURE_IMAGE_ONE,
      vector_image: IMAGES.LINE_VECTOR_ONE,
      vector_image_class: "w-80 right-[80%] -bottom-[126px]",
      reverse: false,
      text_animate_class: "animate__fadeInLeft",
      image_animate_class: "animate__fadeInRight",
    },
    {
      title: $t("feature_card_two_title"),
      description: [
        $t("feature_card_two_desc_one"),
        $t("feature_card_two_desc_two"),
      ],
      image: IMAGES.FEATURE_IMAGE_TWO,
      vector_image: IMAGES.LINE_VECTOR_TWO,
      vector_image_class: "w-80 -right-[130px] -bottom-[196px]",
      reverse: true,
      text_animate_class: "animate__fadeInRight",
      image_animate_class: "animate__fadeInLeft",
    },
    {
      title: $t("feature_card_three_title"),
      description: [
        $t("feature_card_three_desc_one"),
        $t("feature_card_three_desc_two"),
      ],
      image: IMAGES.FEATURE_IMAGE_THREE,
      vector_image: "",
      vector_image_class: "",
      reverse: false,
      text_animate_class: "animate__fadeInLeft",
      image_animate_class: "animate__fadeInRight",
    },
  ];
</script>

<div class="bg-white md:pt-16">
  <div class="px-4 lg:px-20">
    <h2
      class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-2xl mx-auto leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
    >
      {$t("feature_main_title")}
    </h2>
    <p
      class="mt-4 text-gray-600 text-lg md:text-[22px] max-w-full md:max-w-6xl mx-auto text-center leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
    >
      {$t("feature_main_description")}
    </p>
  </div>
  <div class="py-16 px-4 lg:px-20 space-y-16">
    {#each features as feature}
      <div
        class="flex flex-col md:flex-row overflow-hidden px-1 {feature.reverse
          ? 'md:flex-row-reverse'
          : ''} items-center gap-8"
      >
        <div class="md:w-1/2">
          <div use:useInView={{ animationClass: feature.text_animate_class }}>
            <h3
              class="text-2xl md:text-4xl font-semibold text-blue-900 text-left pr-0 md:pr-12 mb-5 md:mb-10"
            >
              {feature.title}
            </h3>
            <ul class="mt-4 space-y-2 list-disc pl-4 pr-0 md:pr-10">
              {#each feature.description as desc}
                <li
                  class="text-gray-600 font-poppins text-base md:text-lg lg:text-xl font-normal mb-5"
                >
                  {desc}
                </li>
              {/each}
            </ul>
            <div class="mt-4 flex gap-4 justify-center md:justify-start">
              {#each buttons as button}
                <Button
                  label={button.label}
                  type={button.type}
                  link={button.link}
                  width={button.width}
                />
              {/each}
            </div>
          </div>
        </div>
        <div class="md:w-1/2 w-full max-w-full md:max-w-none relative">
          <div use:useInView={{ animationClass: feature.image_animate_class }}>
            <Image
              src={feature.image}
              alt={feature.title}
              className="w-full max-w-[350px] md:max-w-[600px] m-auto"
            />
            {#if feature.vector_image}
              <Image
                src={feature.vector_image}
                alt="Vector Decoration"
                className="absolute opacity-0 lg:opacity-100 {feature.vector_image_class}"
              />
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
