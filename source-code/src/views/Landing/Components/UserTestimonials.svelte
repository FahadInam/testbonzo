<script>
  import { useInView } from "$lib/utils";
  import Carousel from "../../../components/Carousel/Carousel.svelte";
  import TestimonialCard from "../../../components/TestimonialCard/TestimonialCard.svelte";
  import { t } from "../../../stores/language.store";

  // Sample testimonials data - in a real app, this would be passed as a prop
  const testimonials = [
    {
      id: 1,
      name: "Maryam Shah",
      position: "Language Teacher at KGS",
      avatar: "M",
      avatarColor: "bg-amber-100 text-amber-900",
      content:
        "Adoption of Knowledge Platform was the best decision KGS ever made. It is an innovative system which is helping teachers to engage the students in grasping the concepts easily.",
    },
    {
      id: 2,
      name: "Miss Nabila Anjum",
      position: "Primary Headmistress at Chiniot Islamia School & College, FSD",
      avatar: "A",
      avatarColor: "bg-purple-100 text-purple-900",
      content:
        "I thank Knowledge Platform for enhancing my skills and capabilities as a teacher, which will have a positive impact on my students.",
    },
    {
      id: 3,
      name: "Miss Shazia Atta",
      position: "Teacher at Kohinoor Grammar School",
      avatar: "M",
      avatarColor: "bg-blue-100 text-blue-900",
      content:
        "Knowledge platform inculcates cognitive learning and integrated skills simultaneously. is a great and unique platform which provides us the facility to delve deep in the ocean of learning.",
    },
    {
      id: 4,
      name: "Manzoor Ilahi",
      position: "Director at Alpine Grammar School, Sialkot",
      avatar: "M",
      avatarColor: "bg-amber-100 text-amber-900",
      content:
        "Thank you, KP for assisting us in developing our students to thrive in a competitive era. A supportive environment, active engagement, and effective learning empowered us to overcome the challenges of technological adaptation.",
    },
    {
      id: 5,
      name: "Anonymous",
      position: "Teacher at Beaconhouse School System (BSS)",
      avatar: "A",
      avatarColor: "bg-purple-100 text-purple-900",
      content:
        "In the current tech era, the new learning experience is designed to benefit both students and teachers by being easy and convenient. For students, who are increasingly tech-savvy, this approach enhances their learning experience and make it enjoyable.",
    },
  ];

  const carouselSettings = {
    autoplayInterval: 7000,
    loop: true,
    navBgColor: "bg-[var(--primary-color)]",
    navIconColor: "text-white",
  };
</script>

<!-- Main container with top curve -->
<div class="relative bg-white pt-10">
  <!-- Top curve for the sky-blue section -->
  <div
    class="absolute top-0 left-0 w-full overflow-hidden"
    style="transform: rotate(180deg)"
  >
    <svg class="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path
        class="fill-sky-50"
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
      ></path>
    </svg>
  </div>

  <!-- Main content section -->
  <div class="relative mx-auto px-4 bg-sky-50 pb-8 md:pb-32">
    <div class="px-4 lg:px-20">
      <div class="text-center">
        <div use:useInView={{ animationClass: "animate__fadeInDown" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            role="img"
            class="w-9 h-9 mx-auto mb-0 text-[var(--primary-color)]"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
      </div>

      <h2
        class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-[500px] mx-auto leading-snug"
        use:useInView={{ animationClass: "animate__fadeIn" }}
      >
        {$t("our_community_main_title")}
      </h2>
    </div>

    <div class="mt-10">
      <Carousel settings={carouselSettings}>
        {#each testimonials as testimonial}
          <div
            class="flex-[0_0_calc(100%/1)] md:flex-[0_0_calc(100%/2)] lg:flex-[0_0_calc(100%/3)] min-w-0 py-0 sm:py-3"
          >
            <TestimonialCard data={testimonial} />
          </div>
        {/each}
      </Carousel>
    </div>
  </div>
</div>
