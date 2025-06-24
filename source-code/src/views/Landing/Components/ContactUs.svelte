<script>
  import { getInstanceText, useInView } from "$lib/utils";
  import { t } from "../../../stores/language.store";
  const contactInfo = [
    {
      icon: "email",
      size: "text-3xl",
      title: $t("email_us"),
      description: $t("email_us_desc"),
      contact: "bonzo@knowledgeplatform.com",
      link: "/",
    },
    {
      icon: "phone-receiver",
      size: "text-4xl",
      title: $t("call_us"),
      description: $t("call_us_desc"),
      contact: "+92-332-0484200",
      link: "/",
    },
    {
      icon: "whatsapp",
      size: "text-3xl",
      title: $t("whatsApp_now"),
      description: $t("whatsApp_now_desc"),
      contact: "Chat Now",
      link: "https://wa.me/923320484200",
    },
  ];
</script>

<div class="bg-white pt-16">
  <div class="px-4 lg:px-20">
    <h2
      class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-2xl mx-auto leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
    >
      {getInstanceText($t, "contact_us_main_title")}
    </h2>
    <p
      class="mt-4 text-gray-600 text-lg md:text-[22px] max-w-full md:max-w-3xl mx-auto text-center leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
    >
      {getInstanceText($t, "contact_us_main_description")}
    </p>
  </div>

  <!-- contact us cards -->
  <div
    class="container mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 px-4 md:px-0 xl:px-20 space-y-16 pb-20"
  >
    {#each contactInfo as { icon, size, title, description, contact, link }}
      <div
        class="bg-sky-100 p-6 rounded-[20px] flex flex-col text-center lg:text-start w-full mb-0 border border-sky-300"
      >
        <div
          class="bg-[var(--primary-color)] p-4 rounded-full w-14 h-14 min-w-14 flex items-center justify-center m-auto lg:m-0"
          use:useInView={{ animationClass: "animate__fadeInDown" }}
        >
          <i class="i {`i-${icon}`}  text-white font-semibold {size}"></i>
        </div>
        <h3 class="font-semibold text-gray-900 text-base md:text-xl mt-5">
          {title}
        </h3>
        <p class="text-gray-600 font-normal text-sm md:text-base">
          {description}
        </p>

        <p class="mt-2 font-bold underline">
          {#if link !== "/"}
            <a
              href={link}
              class="inline-block text-blue-900 whitespace-nowrap text-base lg:text-base xl:text-lg font-semibold items-center"
            >
              {contact}
              <svg
                class="w-5 h-5 inline-block ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M2 12h16m0 0l-5-5m5 5l-5 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          {:else}
            <span
              class="inline-block text-blue-900 whitespace-nowrap text-base lg:text-base xl:text-lg font-semibold"
            >
              {contact}
            </span>
          {/if}
        </p>
      </div>
    {/each}
  </div>
</div>
