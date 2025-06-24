<script>
  import { onMount } from "svelte";
  import Jumbotron from "../components/Jumbotron/Jumbotron.svelte";
  import NavBar from "../components/NavBar/NavBar.svelte";
  import { getText, t } from "../stores/language.store";
  import { mainSectionButtons } from "../data-actions/home/home.da";
  import Features from "../views/Landing/Components/Features.svelte";
  import WhoUsesIt from "../views/Landing/Components/WhoUsesIt.svelte";
  import EnhanceLearning from "../views/Landing/Components/EnhanceLearning.svelte";
  import StartYourJourney from "../views/Landing/Components/StartYourJourney.svelte";
  import UserTestimonials from "../views/Landing/Components/UserTestimonials.svelte";
  import LearningPromoBanner from "../views/Landing/Components/LearningPromoBanner.svelte";
  import ContactUs from "../views/Landing/Components/ContactUs.svelte";
  import Footer from "../components/Footer/Footer.svelte";
  import IconsSlider from "../views/Landing/Components/IconsSlider.svelte";
  import DemoCompetitions from "../views/Landing/Components/DemoCompetitions.svelte";
  import { getDemoCompetitions } from "../data-actions/competitions/competitions.da";
  import {
    getInstanceText,
    LandingPageNavigation,
    remapKeys,
  } from "$lib/utils";
  import BackToTop from "../components/BackToTop/BackToTop.svelte";
  import { systemSettingsStore } from "../stores/systemsettings.store";
  import { get } from "svelte/store";
  import { competitionStore } from "../stores/competition.store";
  import { goto } from "$app/navigation";
  import { custom_paths, INSTANCES_ID } from "$lib/constants/config.constants";
  // import { goto } from "$app/navigation";

  /**
   * @type {never[]}
   */
  let competitions = [];

  /**
   * @type {any[]}
   */
  let competitionsData = [];

  async function fetchDemoCompetitions() {
    const data = await getDemoCompetitions();
    competitionsData = data.data.competitions;

    let comps = competitionsData.map((comp) =>
      remapKeys(comp, {
        banner_image: "image",
        competition_id: "id",
        name: "title",
      }),
    );

    // @ts-ignore
    competitions = comps;
  }

  onMount(async () => {
    competitionStore.set({
      url: null,
      name: null,
      current_grade: null,
      competition_id: null,
      is_lesson_page_hide: null,
      is_games_page: null,
      is_premium: null,
    });
    fetchDemoCompetitions();
  });

  const config_store = get(systemSettingsStore);
  console.log("config_store ==>", config_store);

  // onMount(() => {
  //   // landing page navigation call
  //   // LandingPageNavigation();
  // });
</script>

<svelte:head>
  <!-- <title>{$t("bonzo_title")}</title> -->
  <title>{config_store?.meta_settings?.title || $t("bonzo_title")}</title>
</svelte:head>

<div class="flex flex-col h-screen">
  <!-- Back to top button -->
  <BackToTop />

  <!-- Navigation bar -->
  <div class="w-full fixed top-0 z-50 shadow-md">
    <NavBar />
  </div>

  <!-- Hero section -->
  <div class="flex-1 mt-[84px]">
    <Jumbotron
      title={getInstanceText($t, "home_main_title")}
      description={getInstanceText($t, "home_main_description")}
      buttons={mainSectionButtons}
    />
  </div>

  <!-- Icons slider section -->
  <div class="w-full">
    <IconsSlider />
  </div>

  <!-- Demo Competitions section -->
  <div class="w-full">
    <DemoCompetitions
      {competitions}
      onItemClick={(url) => {
        //goto("competitions/" + url + "/home"); // this goto not working for time being using window.location.href
        window.location.href = location.href + "competitions/" + url + "/home";
      }}
    />
  </div>

  <!-- Features section -->
  <div class="w-full">
    <Features />
  </div>

  <!-- Who Uses It section -->
  <div class="w-full">
    <WhoUsesIt />
  </div>

  <!-- Enhance Learning section -->
  <div class="w-full">
    <EnhanceLearning />
  </div>

  <!-- Start Your Journey section -->
  <div class="w-full">
    <StartYourJourney />
  </div>

  <!-- User Testimonials section -->
  <div class="w-full">
    <UserTestimonials />
  </div>

  <!-- Learning Promo Banner section -->
  <div class="w-full">
    <LearningPromoBanner />
  </div>

  <!-- Contact Us section -->
  <div class="w-full">
    <ContactUs />
  </div>

  <!-- Footer section -->
  <div class="w-full">
    <Footer />
  </div>
</div>
