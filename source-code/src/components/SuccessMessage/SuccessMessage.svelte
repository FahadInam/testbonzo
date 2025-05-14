<script>
  import { getFormViewLogo } from "../../data-actions/system/system..da";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";

  export let title = "Success!";
  export let message = "";
  export let buttonLabel = "Back to login";
  export let buttonLink = "/";
  export let userEmail = "";
  export let logo = getFormViewLogo();
</script>

<div class="flex flex-col items-center justify-center min-h-[100vh]">
  <div
    class="bg-white w-full max-w-[90%] md:max-w-[600px] md:max-h-[90%] md:h-auto rounded-[20px] shadow-lg overflow-y-auto relative px-5 py-14 mx-auto"
  >
    <Image src={logo} alt="Instance Logo" className="mx-auto mb-8 w-32" />

    <div class="text-center mt-15">
      <svg
        class="w-16 h-16 text-green-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>

      <h2 class="text-2xl font-medium text-gray-800 mb-2">{title}</h2>
      <p class="text-gray-700 mb-6 text-base md:text-lg">
        {message} <strong>{userEmail}</strong>.
      </p>

      <Button
        link={buttonLink}
        label={buttonLabel}
        customClass="w-full md:w-[160px]"
      />
    </div>
  </div>
</div>
