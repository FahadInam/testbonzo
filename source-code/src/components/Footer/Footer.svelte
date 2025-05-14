<script>
  import { goto } from "$app/navigation";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Button from "../Button/Button.svelte";
  import Image from "../Image/Image.svelte";

  const socialMediaLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/knowledgeplatform/",
      icon: "facebook",
      size: "text-xl",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/kplearning",
      icon: "twitter",
      size: "text-xl",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/knowledge-platform",
      icon: "linkedIn",
      size: "text-xl",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UC5LwaQtX1wKakNJqgUNG2jQ",
      icon: "youtube",
      size: "text-xl",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/knowledge.platform/",
      icon: "instagram",
      size: "text-xl",
    },
  ];

  const navLinks = [
    { name: "Home", action: () => goto("/") },
    { name: "Features", action: () => console.log("Features") },
    { name: "Sign up", action: () => goto("/account/signup") },
    { name: "Privacy Policy", action: () => goto("/privacy-policy") },
  ];

  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-blue-900 text-white pt-10 pb-5">
  <div class="px-4 mt-10 lg:px-20 space-y-16 relative">
    <div class="flex flex-wrap items-center justify-between">
      <div class="w-full lg:w-1/4 flex justify-center lg:justify-start">
        <Image
          src={IMAGES.BONZO_TAGLINE_WHITE_LOGO}
          alt="Bonzo Logo"
          className="w-52 lg:w-40"
        />
      </div>

      <div
        class="w-full lg:w-2/4 flex flex-wrap justify-center lg:justify-center gap-4 mt-6 lg:mt-0"
      >
        {#each navLinks as link, index}
          <button class="hover:underline" on:click={link.action}
            >{link.name}</button
          >
        {/each}
      </div>

      <div
        class="w-full lg:w-1/4 flex justify-center lg:justify-end mt-6 lg:mt-0 items-center"
      >
        {#each socialMediaLinks as link}
          <a
            href={link.url}
            target="_blank"
            class="mx-4 hover:text-yellow-400"
            aria-label={link.name || "External link"}
          >
            <i class="i {`i-${link.icon}`} {link.size}"></i>
          </a>
        {/each}
      </div>
    </div>

    <div class="border-t border-white mt-6 pt-4">
      <p class="text-center text-base">
        ©{currentYear}
        <a
          href="http://www.knowledgeplatform.com/"
          class="text-yellow-400 hover:text-yellow-500"
          target="_blank"
        >
          Knowledge Platform.</a
        >
        All rights reserved.
      </p>
    </div>
  </div>
</footer>
