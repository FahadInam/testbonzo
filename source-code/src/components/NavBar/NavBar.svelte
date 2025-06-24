<script>
  import { onMount } from "svelte";
  import Button from "../Button/Button.svelte";
  import { page } from "$app/state";
  import { getSystemDarkLogo } from "../../data-actions/system/system..da";
  import { get } from "svelte/store";
  import { systemSettingsStore } from "../../stores/systemsettings.store";
  import { goto } from "$app/navigation";

  let isDropdownOpen = false;
  let isMenuOpen = false;

  /**
   * @type {any[]}
   */
  let navItems = [];

  // Get instance config from store
  const config = get(systemSettingsStore);

  // Use landing_navigation from config if available
  onMount(() => {
    if (config && config.landing_navigation) {
      navItems = config.landing_navigation;
    }
  });

  const buttons = [
    {
      label: "Log in",
      type: "primary",
      link: "/account/user/login",
      width: "w-[130px]",
      class: "flex justify-center items-center",
    },
    {
      label: "Sign up",
      type: "secondary-outlined-inverted",
      link: config?.principal_enabled ? "/account/signup" : "/account/user/signup",
      width: "w-[130px]",
      class: "!hidden xl:!inline-flex xl:flex xl:justify-center xl:items-center",
    },
  ];

  const toggleDropdown = () => {
    isDropdownOpen = !isDropdownOpen;
  };

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  // @ts-ignore
  const closeAll = (event) => {
    if (!event.target.closest("nav")) {
      isDropdownOpen = false;
      isMenuOpen = false;
    }
  };

  const onItemClick = (item) => {
    // console.log("Menu item clicked:", item);
    goto(item.pathname || item.ref || "/");
  };

  onMount(() => {
    document.addEventListener("click", closeAll);
    return () => {
      document.removeEventListener("click", closeAll);
    };
  });

  // get the system logo for the web and mobile
  const { web_logo, mobile_logo } = getSystemDarkLogo();
</script>

<nav class="bg-white w-full z-20 border-b border-gray-200">
  <div class="max-w-[1600px] w-full mx-auto flex flex-wrap items-center justify-between py-4 px-3">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse animate__animated animate__fadeInDown mr-auto">
      <img src={web_logo} class="h-10 me-0 sm:flex sm:h-11 hidden" alt="Instance Logo" />
      <img src={mobile_logo} class="h-10 me-0 sm:hidden sm:h-11 flex" alt="Instance Logo" />
    </a>

    <div class="flex xl:ml-0 xl:w-auto xl:order-2 space-x-2 rtl:space-x-reverse animate__animated animate__fadeInDown">
      <!-- Desktop buttons -->
      {#each buttons as button}
        <Button
          label={button.label}
          type={button.type}
          link={button.link}
          width={button.width}
          customClass={button.class}
        />
      {/each}
      <button
        on:click={toggleMenu}
        type="button"
        class="inline-flex items-center p-3 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100"
        aria-controls="navbar-sticky"
        aria-expanded={isMenuOpen}
      >
        <span class="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
        {#if isMenuOpen}
          <!-- Cross/X icon when menu is open -->
          <svg
            class="w-8 h-8 pointer-events-none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        {:else}
          <!-- Hamburger icon when menu is closed -->
          <svg
            class="w-6 h-6 pointer-events-none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        {/if}
      </button>
    </div>

    <div
      class="items-center justify-end mr-10 {isMenuOpen
        ? 'block'
        : 'hidden'} xl:flex w-full xl:w-auto xl:order-1 xl:ml-0 overflow-visible fixed xl:static left-0 top-[80px] bg-white p-3 xl:p-0 z-50"
      id="navbar-sticky"
    >
      <ul
        class="flex items-center justify-end flex-col p-4 xl:p-0 font-medium border border-gray-100 rounded-lg bg-white xl:space-x-8 rtl:space-x-reverse xl:flex-row xl:mt-0 xl:border-0 xl:bg-white text-left w-full"
      >
        {#each navItems as item}
          <li
            class="w-full relative animate__animated animate__fadeInDown text-left border-b border-gray-100 last:border-b-0 xl:border-b-0 pl-0 pr-0 xl:pl-2 xl:pr-2 xl:m-0"
          >
            {#if item.hasSubMenu && item.subMenuItems}
              <button
                on:click={toggleDropdown}
                class="font-semibold text-lg block py-3 px-3 text-gray-900 rounded-sm xl:hover:text-[var(--primary-color)] xl:p-0 cursor-pointer w-full text-left flex justify-between items-center"
              >
                <span>{item.name}</span>
                <svg
                  class="w-4 h-4 inline ml-1 transition-transform {isDropdownOpen ? 'rotate-180' : ''}"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {#if isDropdownOpen}
                <ul
                  class="relative xl:absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-md w-full xl:w-56 z-50 xl:z-30 mt-2 xl:mt-0"
                >
                  {#each item.subMenuItems as child}
                    <li class="border-b border-gray-100 last:border-b-0">
                      <a
                        href={child.pathname}
                        class="block text-lg px-4 py-3 text-md font-semibold text-gray-700 hover:bg-blue-50 xl:hover:bg-blue-50 text-left rounded-lg"
                        on:click={() => {
                          onItemClick(child);
                          toggleDropdown();
                        }}>{child.name}</a
                      >
                    </li>
                  {/each}
                </ul>
              {/if}
            {:else}
              <a
                href={item.pathname}
                class="whitespace-nowrap {(Array.isArray(item.pathname) && item.pathname.includes(page.url.pathname)) ||
                page.url.pathname === item.pathname
                  ? 'bg-[var(--primary-color)] text-white'
                  : ''} font-semibold text-start xl:text-center xl:leading-[30px] xl:pb-0.5 text-base xl:text-lg block px-3 py-3 xl:py-0 text-gray-900 rounded-sm xl:rounded-full hover:bg-[var(--primary-color)] hover:text-white cursor-pointer"
                on:click={() => onItemClick(item)}>{item.name}</a
              >
            {/if}
          </li>
        {/each}

        <!-- Mobile buttons - visible only on mobile -->
        <li class="w-full flex flex-row gap-2 xl:hidden mt-4">
          {#each buttons as button}
            <Button label={button.label} type={button.type} link={button.link} width="w-full" customClass="" />
          {/each}
        </li>
      </ul>
    </div>
  </div>
</nav>
