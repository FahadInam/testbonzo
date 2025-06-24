<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { useInView } from "$lib/utils";
  import Button from "../../../components/Button/Button.svelte";
  import { getText, t } from "../../../stores/language.store";

  const buttons = [
    {
      label: $t("explore_free_competitions"),
      type: "primary",
      link: "/competitions",
      width: "w-[280px]",
    },
    {
      label: $t("schedule_demo"),
      type: "secondary",
      link: "/contactus",
      width: "w-[280px]",
    },
  ];
</script>

<div
  class="relative w-full flex items-center justify-center min-h-[550px] bg-cover bg-center bg-no-repeat bg-fixed"
>
  <!-- Background Image -->
  <img
    src={IMAGES.EDUCATION_IMPACT_IMAGE}
    alt="Background"
    class="absolute inset-0 w-full h-full object-cover z-0"
  />

  <!-- Overlay with reduced opacity -->
  <div class="absolute inset-0 bg-black/70"></div>

  <!-- Content -->
  <div class="relative z-10 text-center text-white px-6">
    <h2
      class="text-4xl md:text-5xl font-bold mb-10 leading-16"
      use:useInView={{ animationClass: "animate__fadeInDown" }}
    >
      {$t("transform_learning_main_title_one")} <br />
      {$t("transform_learning_main_title_two")}
      <span class="text-blue-400"> {$t("competitions")} </span>
    </h2>

    <div
      class="mt-6 flex flex-wrap justify-center gap-4"
      use:useInView={{ animationClass: "animate__fadeInUp" }}
    >
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
