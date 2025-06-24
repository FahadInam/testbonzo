<script>
  import { page } from "$app/state";
  import { getSystemDarkLogo } from "../../data-actions/system/system..da";
  import { gotoURL } from "../../stores/navigation.store";
  import Image from "../Image/Image.svelte";

  export let navItems = [
    {
      icon: "",
      label: "Home",
      link: "/competition",
    },
  ];

  // get the system logo for the web and mobile
  const { web_logo, mobile_logo } = getSystemDarkLogo();
</script>

<div class="w-auto z-10">
  <!-- Bottom navigation bar on small screens -->
  <nav
    class="fixed flex md:hidden bottom-0 left-0 w-full bg-gray-50 pt-2 justify-center gap-0 md:gap-10"
  >
    {#each navItems as item}
      <button
        on:click={() => {
          gotoURL(item.link);
        }}
        class="flex flex-col items-center p-2 w-22  rounded-t-2xl hover:bg-gray-100 {page.url.pathname.indexOf(
          item.link.split('/')[1],
        ) > -1
          ? 'active text-yellow-400'
          : 'text-gray-400'}"
      >
        <div
          class="w-5 h-5 mb-1 object-contain lg:me-3 mb-1 lg:mb-0 gray-filter"
        >
          <Image src={item.icon} />
        </div>
        <span class="text-xs font-medium ">{item.label}</span>
      </button>
    {/each}
  </nav>

  <!-- Sidebar on large and medium screens -->
  <aside class="w-27 hidden md:flex lg:w-60 h-screen" aria-label="Sidebar">
    <div class="h-full pb-16 overflow-y-auto bg-gray-50 pt-6 w-full">
      <div class="flex items-center justify-center mb-5 px-4">
        <img
          src={web_logo}
          class="h-10 me-0 lg:flex sm:h-11 hidden"
          alt="Instance Logo"
        />
        <img
          src={mobile_logo}
          class="h-10 me-0 lg:hidden sm:h-11 flex"
          alt="Instance Logo"
        />
        <span
          class="self-center text-4xl font-semibold whitespace-nowrap hidden"
          >bonzo</span
        >
      </div>
      <ul class="space-y-5 mt-6 font-medium pt-10 flex flex-col">
        {#each navItems as item, index}
          <li class="mb-4">
            <button
              on:click={() => {
                gotoURL(item.link);
              }}
              class="flex lg:flex-row flex-col items-center py-3 text-gray-500 pl-0 lg:pl-6 w-19/20
 rounded-e-full hover:bg-blue-100 group {page.url.pathname.indexOf(
                item.link.split('/')[1],
              ) > -1
                ? 'active'
                : 'gray-color'}"
            >
              <div
                class="w-10 h-10 object-contain lg:me-3 mb-1 lg:mb-0 gray-filter"
              >
                <Image src={item.icon} />
              </div>
              <span class="text-xs lg:text-lg font-semibold">{item.label}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </aside>
</div>

<style>
  .active {
    color: #ffff00;
    background: #112d70;
  }

  .active .gray-filter {
    filter: none !important;
  }
</style>
