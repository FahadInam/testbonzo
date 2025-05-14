<script>
  import { onMount } from "svelte";
  import Button from "../Button/Button.svelte";
  import { page } from "$app/state";
  import { getSystemDarkLogo } from "../../data-actions/system/system..da";
  import { get } from "svelte/store";
  import { systemSettingsStore } from "../../stores/systemsettings.store";

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
      link: "/account/signup",
      width: "w-[130px]",
      class:
        "!hidden md:!inline-flex md:flex md:justify-center md:items-center",
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
    console.log("Menu item clicked:", item);
  };

  onMount(() => {
    document.addEventListener("click", closeAll);
    return () => {
      document.removeEventListener("click", closeAll);
    };
  });

  // get the system logo for the web
  const { web_logo } = getSystemDarkLogo();
</script>

<nav class="bg-white w-full z-20 border-b border-gray-200">
  <div
    class="max-w-[1400px] w-full mx-auto flex flex-wrap items-center justify-between px-5 xl:px-4 py-4"
  >
    <a
      href="/"
      class="flex items-center space-x-3 rtl:space-x-reverse animate__animated animate__fadeInDown mr-auto"
    >
      <img
        src={web_logo}
        alt="Instance Logo"
        class={`w-36 object-contain cursor-pointer`}
      />
    </a>

    <div
      class="flex ml-auto md:ml-0 md:w-auto md:order-2 space-x-2 rtl:space-x-reverse animate__animated animate__fadeInDown md:flex"
    >
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
        class="ml-auto mt-1 inline-flex items-center p-3 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100"
        aria-controls="navbar-sticky"
        aria-expanded={isMenuOpen}
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
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
      </button>
    </div>

    <div
      class="items-center justify-between {isMenuOpen
        ? ''
        : 'hidden'} w-full md:flex md:w-auto md:order-1 ml-auto md:mr-16 overflow-visible"
      id="navbar-sticky"
    >
      <ul
        class="flex items-center flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
      >
        {#each navItems as item}
          <li class="relative animate__animated animate__fadeInDown py-2">
            {#if item.hasSubMenu && item.subMenuItems}
              <button
                on:click={toggleDropdown}
                class="font-semibold text-lg block py-3 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[var(--primary-color)] md:p-0 cursor-pointer"
              >
                {item.name}
                <svg
                  class="w-4 h-4 inline ml-1"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {#if isDropdownOpen}
                <ul
                  class="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-md w-56 z-50 md:z-30"
                >
                  {#each item.subMenuItems as child}
                    <li>
                      <a
                        href={child.pathname}
                        class="block text-lg px-3 py-2 text-md font-semibold text-gray-700 hover:bg-gray-100"
                        on:click={() => onItemClick(child)}>{child.name}</a
                      >
                    </li>
                  {/each}
                </ul>
              {/if}
            {:else}
              <a
                href={item.pathname || item.ref || "/"}
                class="{(Array.isArray(item.pathname) &&
                  item.pathname.includes(page.url.pathname)) ||
                page.url.pathname === item.pathname
                  ? 'bg-[var(--primary-color)] text-white'
                  : ''} font-semibold text-base md:text-lg block px-2 text-gray-900 rounded-full hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[var(--primary-color)] cursor-pointer"
                on:click={() => onItemClick(item)}>{item.name}</a
              >
            {/if}
          </li>
        {/each}

        <!-- Mobile buttons - visible only on mobile -->
        <li class="w-full flex flex-col space-y-2 md:hidden mt-4">
          {#each buttons as button}
            <Button
              label={button.label}
              type={button.type}
              link={button.link}
              width="w-full"
              customClass=""
            />
          {/each}
        </li>
      </ul>
    </div>
  </div>
</nav>
