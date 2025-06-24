<script>
  import Button from "../../../components/Button/Button.svelte";
  export let imageSrc = "./images/bonzo-jumbotron.png";
  export let title = "Title";
  export let description = `Description`;
  //export let navbarHeight = "40px";

  export let buttons = [
    {
      name: "learner",
      type: "primary",
      label: "Learner",
      size: "medium",
      link: "",
    },
  ];

  /**
   * @param {string} buttonName
   */
  function handleButtonClick(buttonName) {
    console.log(`Button ${buttonName} clicked`);
  }
</script>

<div
  class="w-full bg-blue-500 text-white min-h-[calc(100vh-85px)] flex items-center justify-center"
  style="background: radial-gradient(circle, #012e60 0, #3e9aff 0, #003e82 100%);"
>
  <div class="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row items-center px-5 xl:px-4 py-5">
    <!-- Mobile: Image on Top -->
    <div class="md:hidden w-full flex justify-center mb-8">
      <img src={imageSrc} alt="Learning Illustration" class="w-2/4 max-w-lg object-contain" />
    </div>

    <!-- Left Content -->
    <div class="md:w-3/5 text-center md:text-left space-y-6 order-2 md:order-1">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        {title}
      </h1>
      <p class="text-lg md:text-xl lg:text-2xl leading-relaxed">
        {description}
      </p>
      <div class="space-y-4 pt-4">
        <p class="text-base md:text-lg font-semibold">Get Started as</p>
        <div class="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-5">
          {#each buttons as button}
            <Button type={button.type} label={button.label} link={button.link} responsive={true} />
          {/each}
        </div>
      </div>
    </div>

    <!-- Desktop: Image on Right -->
    <div class="hidden md:flex md:w-2/5 justify-center md:order-2">
      <img src={imageSrc} alt="Learning Illustration" class="w-full max-w-xl object-contain" />
    </div>
  </div>
</div>
