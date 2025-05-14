<script>
  import { gotoURL } from "../../stores/navigation.store";

  export let label = "";
  export let type = "primary"; // primary, secondary, secondary-outlined, secondary-outlined-inverted, 3d-primary, 3d-secondary
  export let size = "medium"; // small, medium, large
  export let responsive = false; // true for responsive full-width on smaller screens
  export let width = "auto";
  export let image = "";
  export let imagePosition = "before"; // "before" or "after" to control image position
  export let imageClass = ""; // Allows passing custom styles to images
  export let onClick = () => {};
  export let link = "";
  export let customClass = "";

  let isDisabled = false;

  const textSize = {
    small: "text-md",
    medium: "text-lg",
    large: "text-xl",
    xlarge: "text-2xl",
  }[size];

  const buttonClasses = {
    primary: `text-white bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] rounded-xl font-semibold text-lg`,
    secondary: `text-[var(--primary-color)] bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-hover)] rounded-xl font-semibold text-lg`,
    "secondary-outlined": `bg-transparent border-2 border-white text-white hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] rounded-xl font-semibold text-lg`,
    "secondary-outlined-inverted": `bg-transparent border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--secondary-color-hover)] hover:text-[var(--primary-color)] rounded-xl font-semibold text-lg`,
    "3d-primary": `button3d origin-center cursor-pointer font-semibold text-lg rounded-lg text-black button3d-text-shadow`,
    "3d-secondary": `button3d secondary origin-center cursor-pointer font-semibold text-lg text-center rounded-lg text-black button3d-text-shadow`,
  }[type];

  // Check if the image is an icon class (starts with "i-")
  const isIconClass = (img) => typeof img === "string" && img.startsWith("i-");

  // Handle button click with double-click prevention
  const handleClick = () => {
    if (isDisabled) return;
    isDisabled = true;
    if (onClick) {
      onClick();
    }
    if (link) {
      gotoURL(link);
    }

    setTimeout(() => {
      isDisabled = false;
    }, 1000);
  };
</script>

<button
  type="button"
  class={`${textSize} px-3 md:px-4 font-bold py-2.5 text-center inline-block ${customClass} ${buttonClasses} ${width === "full" ? "w-full" : width} ${responsive ? "w-full md:w-40" : ""}`}
  on:click={handleClick}
>
  <div class="flex flex-row items-center justify-center">
    {#if image?.length > 0 && imagePosition === "before"}
      {#if isIconClass(image)}
        <i class={`i ${image} ${imageClass} mr-2`}></i>
      {:else}
        <img src={image} class={`${imageClass} mr-2`} alt="Button icon" />
      {/if}
    {/if}

    {#if type.startsWith("3d-")}
      <span class="bg-white rounded-xl w-5 h-1 absolute top-0.5 right-3.5"
      ></span>
      <span class="bg-white rounded-xl w-1 h-1 absolute top-0.5 right-1.5"
      ></span>
    {/if}

    {label}

    {#if image?.length > 0 && imagePosition === "after"}
      {#if isIconClass(image)}
        <i class={`i ${image} ${imageClass} ml-2`}></i>
      {:else}
        <img src={image} class={`${imageClass} ml-2`} alt="Button icon" />
      {/if}
    {/if}
  </div>
</button>

<style>
  .button3d {
    background: linear-gradient(to top, #09b5ff, #40e8ff);
    box-shadow: 0 6px #0074de;
    transform: translateY(0px);
    color: #fff;
  }

  .button3d.secondary {
    background: linear-gradient(to top, #ffc700, #ffed48);
    box-shadow: 0 6px #f57c00;
  }

  .button3d.secondary:hover {
    background: linear-gradient(to top, #f5c413, #fff27e);
  }

  .button3d:active {
    box-shadow: 0 0px;
    transform: translateY(6px);
  }

  .button3d-text-shadow {
    text-shadow:
      rgb(0, 0, 0) 2px 0px 0px,
      rgb(0, 0, 0) 1.75517px 0.958851px 0px,
      rgb(0, 0, 0) 1.0806px 1.68294px 0px,
      rgb(0, 0, 0) 0.141474px 1.99499px 0px,
      rgb(0, 0, 0) -0.832294px 1.81859px 0px,
      rgb(0, 0, 0) -1.60229px 1.19694px 0px,
      rgb(0, 0, 0) -1.97998px 0.28224px 0px,
      rgb(0, 0, 0) -1.87291px -0.701566px 0px,
      rgb(0, 0, 0) -1.30729px -1.5136px 0px,
      rgb(0, 0, 0) -0.421592px -1.95506px 0px,
      rgb(0, 0, 0) 0.567324px -1.91785px 0px,
      rgb(0, 0, 0) 1.41734px -1.41108px 0px,
      rgb(0, 0, 0) 1.92034px -0.558831px 0px,
      0px 3px 0px rgba(0, 0, 0, 1),
      -2px 3px 0px rgba(0, 0, 0, 1),
      2px 3px 0px rgba(0, 0, 0, 1);
  }
</style>
