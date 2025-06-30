import { f as ensure_array_like, c as bind_props, s as store_get, d as stringify, u as unsubscribe_stores, p as pop, b as push, a as slot, h as head } from "../../chunks/index.js";
import { B as Button } from "../../chunks/Button.js";
import { f as fallback } from "../../chunks/utils2.js";
import { a as attr } from "../../chunks/attributes.js";
import { e as escape_html } from "../../chunks/escaping.js";
import { N as NavBar } from "../../chunks/NavBar.js";
import { g as getText, t } from "../../chunks/language.store.js";
import { I as IMAGES } from "../../chunks/images.constants.js";
import { g as getInstanceText } from "../../chunks/utils.js";
import { I as Image } from "../../chunks/Image.js";
import "clsx";
import "../../chunks/user.store.js";
import "lz-string";
import { g as goto } from "../../chunks/client.js";
import "../../chunks/client2.js";
import { s as systemSettingsStore } from "../../chunks/system..da.js";
import "../../chunks/index2.js";
import { h as html } from "../../chunks/html.js";
import { o as onDestroy } from "../../chunks/index-server.js";
import { g as get } from "../../chunks/index3.js";
import { C as Card } from "../../chunks/Card.js";
import { N as NoDataFound } from "../../chunks/NoDataFound.js";
import { __tla as __tla_0 } from "../../chunks/api.definitions.js";
import "notyf";
import { __tla as __tla_1 } from "../../chunks/user.auth.da.js";
import { B as BackToTop } from "../../chunks/BackToTop.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  function Jumbotron($$payload, $$props) {
    let imageSrc = fallback($$props["imageSrc"], "./images/bonzo-jumbotron.png");
    let title = fallback($$props["title"], "Title");
    let description = fallback($$props["description"], () => `Description`, true);
    let buttons = fallback($$props["buttons"], () => [
      {
        name: "learner",
        type: "primary",
        label: "Learner",
        size: "medium",
        link: ""
      }
    ], true);
    const each_array = ensure_array_like(buttons);
    $$payload.out += `<div class="w-full bg-blue-500 text-white min-h-[calc(100vh-85px)] flex items-center justify-center" style="background: radial-gradient(circle, #012e60 0, #3e9aff 0, #003e82 100%);"><div class="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row items-center px-5 xl:px-4 py-5"><div class="md:hidden w-full flex justify-center mb-8"><img${attr("src", imageSrc)} alt="Learning Illustration" class="w-2/4 max-w-lg object-contain"></div> <div class="md:w-3/6 text-center md:text-left space-y-6 order-2 md:order-1 animate__animated animate__fadeIn"><h1 class="text-4xl md:text-5xl lg:text-[52px] font-bold leading-tight">${escape_html(title)}</h1> <p class="text-lg md:text-xl lg:text-[22px] leading-relaxed pe-0 lg:pe-12">${escape_html(description)}</p> <div class="space-y-4 pt-4"><p class="text-base md:text-lg font-semibold">Get Started as</p> <div class="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-5"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let button = each_array[$$index];
      Button($$payload, {
        type: button.type,
        label: button.label,
        link: button.link,
        responsive: true
      });
    }
    $$payload.out += `<!--]--></div></div></div> <div class="hidden md:flex md:w-3/6 justify-center md:order-2 overflow-hidden"><div class="animate__animated animate__fadeInRight"><img${attr("src", imageSrc)} alt="Learning Illustration" class="w-full max-w-xl object-contain move-diagonal svelte-1fy15c9"></div></div></div></div>`;
    bind_props($$props, {
      imageSrc,
      title,
      description,
      buttons
    });
  }
  const mainSectionButtons = [
    {
      name: "learner",
      type: "primary",
      label: await getText("learner"),
      size: "large",
      link: "/account/user/signup"
    },
    {
      name: "institution",
      type: "secondary",
      label: await getText("institution"),
      size: "large",
      link: "/account/institution/signup"
    },
    {
      name: "guest",
      type: "secondary-outlined",
      label: await getText("guests"),
      size: "large",
      link: "/competitions"
    }
  ];
  function Features($$payload, $$props) {
    push();
    var $$store_subs;
    const buttons = [
      {
        label: "Get Started",
        type: "primary",
        link: "/account/signup",
        width: "w-[180px]"
      },
      {
        label: "Request a Demo",
        type: "secondary-outlined-inverted",
        link: "/contactus",
        width: "w-[180px]"
      }
    ];
    const features = [
      {
        title: store_get($$store_subs ??= {}, "$t", t)("feature_card_one_title"),
        description: [
          store_get($$store_subs ??= {}, "$t", t)("feature_card_one_desc_one"),
          store_get($$store_subs ??= {}, "$t", t)("feature_card_one_desc_two")
        ],
        image: IMAGES.FEATURE_IMAGE_ONE,
        vector_image: IMAGES.LINE_VECTOR_ONE,
        vector_image_class: "w-80 right-[80%] -bottom-[126px]",
        reverse: false,
        text_animate_class: "animate__fadeInLeft",
        image_animate_class: "animate__fadeInRight"
      },
      {
        title: store_get($$store_subs ??= {}, "$t", t)("feature_card_two_title"),
        description: [
          store_get($$store_subs ??= {}, "$t", t)("feature_card_two_desc_one"),
          store_get($$store_subs ??= {}, "$t", t)("feature_card_two_desc_two")
        ],
        image: IMAGES.FEATURE_IMAGE_TWO,
        vector_image: IMAGES.LINE_VECTOR_TWO,
        vector_image_class: "w-80 -right-[130px] -bottom-[196px]",
        reverse: true,
        text_animate_class: "animate__fadeInRight",
        image_animate_class: "animate__fadeInLeft"
      },
      {
        title: store_get($$store_subs ??= {}, "$t", t)("feature_card_three_title"),
        description: [
          store_get($$store_subs ??= {}, "$t", t)("feature_card_three_desc_one"),
          store_get($$store_subs ??= {}, "$t", t)("feature_card_three_desc_two")
        ],
        image: IMAGES.FEATURE_IMAGE_THREE,
        vector_image: "",
        vector_image_class: "",
        reverse: false,
        text_animate_class: "animate__fadeInLeft",
        image_animate_class: "animate__fadeInRight"
      }
    ];
    const each_array = ensure_array_like(features);
    $$payload.out += `<div class="bg-white md:pt-16"><div class="px-4 lg:px-20"><h2 class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-2xl mx-auto leading-snug">${escape_html(getInstanceText(store_get($$store_subs ??= {}, "$t", t), "feature_main_title"))}</h2> <p class="mt-4 text-gray-600 text-lg md:text-[22px] max-w-full md:max-w-6xl mx-auto text-center leading-snug">${escape_html(store_get($$store_subs ??= {}, "$t", t)("feature_main_description"))}</p></div> <div class="py-16 px-4 lg:px-20 space-y-16"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
      let feature = each_array[$$index_2];
      const each_array_1 = ensure_array_like(feature.description);
      const each_array_2 = ensure_array_like(buttons);
      $$payload.out += `<div${attr("class", `flex flex-col md:flex-row overflow-hidden px-1 ${stringify(feature.reverse ? "md:flex-row-reverse" : "")} items-center gap-8`)}><div class="md:w-1/2"><div><h3 class="text-2xl md:text-4xl font-semibold text-blue-900 text-left pr-0 md:pr-12 mb-5 md:mb-10">${escape_html(feature.title)}</h3> <ul class="mt-4 space-y-2 list-disc pl-4 pr-0 md:pr-10"><!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let desc = each_array_1[$$index];
        $$payload.out += `<li class="text-gray-600 font-poppins text-base md:text-lg lg:text-xl font-normal mb-5">${escape_html(desc)}</li>`;
      }
      $$payload.out += `<!--]--></ul> <div class="mt-4 flex gap-4 justify-center md:justify-start"><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let button = each_array_2[$$index_1];
        Button($$payload, {
          label: button.label,
          type: button.type,
          link: button.link,
          width: button.width
        });
      }
      $$payload.out += `<!--]--></div></div></div> <div class="md:w-1/2 w-full max-w-full md:max-w-none relative"><div>`;
      Image($$payload, {
        src: feature.image,
        alt: feature.title,
        className: "w-full max-w-[350px] md:max-w-[600px] m-auto"
      });
      $$payload.out += `<!----> `;
      if (feature.vector_image) {
        $$payload.out += "<!--[-->";
        Image($$payload, {
          src: feature.vector_image,
          alt: "Vector Decoration",
          className: `absolute opacity-0 lg:opacity-100 ${stringify(feature.vector_image_class)}`
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function WhoUsesIt($$payload, $$props) {
    push();
    var $$store_subs;
    const categories = [
      {
        icon: IMAGES.WHO_IS_IT_IMAGE_ONE,
        title: store_get($$store_subs ??= {}, "$t", t)("who_use_it_card_one_title"),
        description: store_get($$store_subs ??= {}, "$t", t)("who_use_it_card_one_desc"),
        features: [
          store_get($$store_subs ??= {}, "$t", t)("first_key_feature_title_one"),
          store_get($$store_subs ??= {}, "$t", t)("first_key_feature_title_two"),
          store_get($$store_subs ??= {}, "$t", t)("first_key_feature_title_three")
        ]
      },
      {
        icon: IMAGES.WHO_IS_IT_IMAGE_TWO,
        title: store_get($$store_subs ??= {}, "$t", t)("who_use_it_card_two_title"),
        description: store_get($$store_subs ??= {}, "$t", t)("who_use_it_card_two_desc"),
        features: [
          store_get($$store_subs ??= {}, "$t", t)("second_key_feature_title_one"),
          store_get($$store_subs ??= {}, "$t", t)("second_key_feature_title_two"),
          store_get($$store_subs ??= {}, "$t", t)("second_key_feature_title_three")
        ]
      },
      {
        icon: IMAGES.WHO_IS_IT_IMAGE_THREE,
        title: store_get($$store_subs ??= {}, "$t", t)("who_use_it_card_three_title"),
        description: store_get($$store_subs ??= {}, "$t", t)("who_use_it_card_three_desc"),
        features: [
          store_get($$store_subs ??= {}, "$t", t)("third_key_feature_title_one"),
          store_get($$store_subs ??= {}, "$t", t)("third_key_feature_title_two"),
          store_get($$store_subs ??= {}, "$t", t)("third_key_feature_title_three")
        ]
      }
    ];
    const each_array = ensure_array_like(categories);
    $$payload.out += `<div class="bg-white pt-16"><div class="px-4 lg:px-20"><h2 class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-2xl mx-auto leading-snug" s="">${escape_html(store_get($$store_subs ??= {}, "$t", t)("who_use_it_main_title"))}</h2> <p class="mt-4 text-gray-600 text-lg md:text-[22px] max-w-full md:max-w-6xl mx-auto text-center leading-snug">${escape_html(store_get($$store_subs ??= {}, "$t", t)("who_use_it_main_description"))}</p></div> <div class="container mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 px-6 lg:px-20 space-y-16"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let category = each_array[$$index_1];
      const each_array_1 = ensure_array_like(category.features);
      $$payload.out += `<div class="bg-white p-6 rounded-[20px] border border-gray-300 w-full mb-0"><h3 class="flex items-center"><span>`;
      Image($$payload, {
        src: category.icon,
        alt: category.title,
        className: "w-8 h-8 mr-2"
      });
      $$payload.out += `<!----></span> <span class="text-xl md:text-[28px] lg:text-xl xl:text-[28px] font-semibold text-gray-700">${escape_html(category.title)}</span></h3> <div class="flex items-center min-h-auto lg:min-h-[150px] py-3 lg:py-0"><p class="mt-2 text-gray-600 text-base md:text-lg lg:text-base xl:text-lg">${escape_html(category.description)}</p></div> <hr class="my-4 border-gray-300"> <h4 class="font-semibold text-gray-700 text-lg my-5">${escape_html(store_get($$store_subs ??= {}, "$t", t)("key_features"))}</h4> <ul class="mt-2 space-y-2"><!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let feature = each_array_1[$$index];
        $$payload.out += `<li class="flex items-baseline mb-4"><span class="text-white text-sm mr-2 bg-green-500 rounded-full w-5 h-5 min-w-5 text-center leading-[20px]">\u2714</span> <span class="text-gray-700 text-base">${escape_html(feature)}</span></li>`;
      }
      $$payload.out += `<!--]--></ul></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function EnhanceLearning($$payload, $$props) {
    push();
    var $$store_subs;
    let activeTab = "personalised";
    const tabsData = [
      {
        id: "personalised",
        title: store_get($$store_subs ??= {}, "$t", t)("personalised"),
        description: store_get($$store_subs ??= {}, "$t", t)("personalised_desc"),
        img: IMAGES.LEARNING_BANNER_ONE
      },
      {
        id: "measurable",
        title: store_get($$store_subs ??= {}, "$t", t)("measurable"),
        description: store_get($$store_subs ??= {}, "$t", t)("measurable_desc"),
        img: IMAGES.LEARNING_BANNER_TWO
      },
      {
        id: "gamified",
        title: store_get($$store_subs ??= {}, "$t", t)("gamified"),
        description: store_get($$store_subs ??= {}, "$t", t)("gamified_desc"),
        img: IMAGES.LEARNING_BANNER_THREE
      },
      {
        id: "adaptive",
        title: store_get($$store_subs ??= {}, "$t", t)("adaptive"),
        description: store_get($$store_subs ??= {}, "$t", t)("adaptive_desc"),
        img: IMAGES.LEARNING_BANNER_FOUR
      },
      {
        id: "social",
        title: store_get($$store_subs ??= {}, "$t", t)("social"),
        description: store_get($$store_subs ??= {}, "$t", t)("social_desc"),
        img: IMAGES.LEARNING_BANNER_FIVE
      },
      {
        id: "bitesized",
        title: store_get($$store_subs ??= {}, "$t", t)("bitesized"),
        description: store_get($$store_subs ??= {}, "$t", t)("bitesized_desc"),
        img: IMAGES.LEARNING_BANNER_SIX
      }
    ];
    const each_array = ensure_array_like(tabsData);
    const each_array_1 = ensure_array_like(tabsData);
    $$payload.out += `<div class="bg-white pt-16"><div class="px-4 lg:px-20"><h2 class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-[400px] mx-auto leading-snug">${escape_html(getInstanceText(store_get($$store_subs ??= {}, "$t", t), "enhance_learning_main_title"))}</h2> <p class="mt-4 text-gray-600 text-lg md:text-[22px] max-w-full md:max-w-4xl mx-auto text-center leading-snug">${escape_html(getInstanceText(store_get($$store_subs ??= {}, "$t", t), "enhance_learning_main_description"))}</p></div> <div class="px-4 mt-10 lg:px-20 space-y-16 relative"><div class="relative flex items-center justify-center mb-10 md:mb-20"><button class="absolute -left-3 shadow-md w-8 h-8 min-w-8 text-center bg-gray-200 text-gray-600 rounded-full md:hidden z-10">\u25C0</button> <div class="w-full relative"><div id="tab-scroll" class="flex w-full overflow-x-auto no-scrollbar justify-between md:justify-center svelte-yan7o"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$payload.out += `<button${attr("class", `flex-1 text-center px-6 py-6 border-b-3 whitespace-nowrap focus:outline-none font-semibold text-base md:text-xl ${stringify(tab.id === activeTab ? "text-[var(--primary-color)] border-[var(--primary-color)]" : "text-gray-600 hover:text-[var(--primary-color)] border-b border-gray-300")}`)}>${escape_html(tab.title)}</button>`;
    }
    $$payload.out += `<!--]--></div></div> <button class="absolute -right-3 w-8 h-8 min-w-8 text-center bg-gray-200 text-gray-600 shadow-md rounded-full md:hidden z-10">\u25B6</button></div> <div class="w-full"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let tabContent = each_array_1[$$index_1];
      $$payload.out += `<div${attr("class", `grid grid-cols-1 md:grid-cols-2 gap-6 items-center overflow-hidden ${stringify(tabContent.id === activeTab ? "block" : "hidden")}`)}><div class="max-w-[250px] md:max-w-[450px] m-auto">`;
      Image($$payload, {
        src: tabContent.img,
        alt: tabContent.title,
        className: "w-full h-auto rounded-lg"
      });
      $$payload.out += `<!----></div> <div class="ml-0 md:ml-20 animate__delay"><h3 class="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2 md:mb-4 text-center md:text-left">${escape_html(tabContent.title)}</h3> <p class="text-gray-700 text-base md:text-xl max-w-full md:max-w-[390px] text-center md:text-left">${escape_html(tabContent.description)}</p></div></div>`;
    }
    $$payload.out += `<!--]--></div></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function StartYourJourney($$payload, $$props) {
    push();
    var $$store_subs;
    let openIndex = 0;
    const accordionItems = [
      {
        title: "How can my organisation get started?",
        content: `
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Sign Up for Existing Competitions</strong>
            <p class="text-gray-700 text-base md:text-lg">Participate in Bonzo\u2019s competitions \u2013 perfect for organizations looking to quickly launch interactive and impactful learning experiences.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Launch Your Own Competition</strong>
            <ul class='list-disc ml-5'>
                <li class="text-gray-700 text-base md:text-lg">Choose from our extensive library of interactive games.</li>
                <li class="text-gray-700 text-base md:text-lg">Host a competition using our ready-made competitions to engage your participants.</li>
                <li class="text-gray-700 text-base md:text-lg">Design and host your own games and competitions tailored to your specific needs.</li>
            </ul>
          </div>          
        `
      },
      {
        title: "What is the learner\u2019s journey?",
        content: `
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Introduction and Sign-up</strong>
            <p class="text-gray-700 text-base md:text-lg">Learners sign up and create their profiles on Bonzo.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Participate in Competitions</strong>
            <p class="text-gray-700 text-base md:text-lg">They engage in interactive games and challenges.</p>
          </div>
          <div class="mb-4">
             <strong class="text-base md:text-lg font-semibold">Track Progress and Earn Rewards</strong>
            <p class="text-gray-700 text-base md:text-lg">They track their progress, see their rankings, and earn rewards and badges.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Receive Feedback and Improve </strong>
            <p class="text-gray-700 text-base md:text-lg">They receive feedback on their performance to identify areas for improvement.</p>
          </div>
          <div class="mb-4">
             <strong class="text-base md:text-lg font-semibold"> Complete the Competition  </strong>
             <p class="text-gray-700 text-base md:text-lg">Learners finish the competition, review their results, and reflect on their journey.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">  Ongoing Learning and Engagement   </strong>
            <p class="text-gray-700 text-base md:text-lg"> They continue to engage with new games and competitions, promoting continuous learning and growth.</p>
          </div>
        `
      },
      {
        title: "How can you partner and sponsor with us?",
        content: `
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Co-Branding Opportunities</strong>
            <p class="text-gray-700 text-base md:text-lg">Partner with Bonzo to co-brand competitions and reach a broad audience of learners. Enhance your brand visibility with innovative, game-based learning. </p>
          </div>
          <div class="mb-4">
             <strong class="text-base md:text-lg font-semibold">Sponsor Prizes</strong>
            <p class="text-gray-700 text-base md:text-lg">Sponsor prizes for our competitions to motivate and reward participants. Your sponsorship can include branded merchandise, scholarships, or other valuable rewards.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Engage a Wide Network of Students</strong>
            <p class="text-gray-700 text-base md:text-lg">Use Bonzo to engage with a diverse network of students. Our proven success in driving engagement and learning outcomes ensures your partnership will have a meaningful impact. Our partnerships have consistently led to increased brand recognition and positive educational outcomes. Join us to contribute to and benefit from our success.</p>
          </div>
        `
      }
    ];
    const each_array = ensure_array_like(accordionItems);
    $$payload.out += `<div class="bg-white pt-16"><div class="px-4 lg:px-20"><h2 class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-full mx-auto leading-snug">${escape_html(getInstanceText(store_get($$store_subs ??= {}, "$t", t), "your_journey_main_title"))}</h2></div> <div class="px-4 mt-10 lg:px-20 space-y-2 relative max-w-7xl mx-auto pb-20"><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let item = each_array[index];
      $$payload.out += `<div class="rounded-[20px] overflow-hidden"><button class="w-full flex justify-between items-center px-6 py-5 text-lg md:text-xl font-semibold bg-[var(--primary-color-light)] border-b-3 border-white svelte-r2n1a2"><span class="font-semibold text-lg md:text-2xl">${escape_html(item.title)}</span> <span class="text-white bg-blue-900 rounded-full w-5 h-5 min-w-5 md:w-7 md:h-7 md:min-w-7 text-center text-base md:text-xl font-medium leading-[18px] md:leading-[25px]">${escape_html(openIndex === index ? "\u2212" : "+")}</span></button> <div class="overflow-hidden transition-all duration-500 ease-in-out"${attr("style", `max-height: ${stringify(openIndex === index ? "500px" : "0px")}; opacity: ${stringify(openIndex === index ? "1" : "0")}`)}><div class="p-6 bg-[var(--primary-color-light)] text-gray-700">${html(item.content)}</div></div></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function Carousel($$payload, $$props) {
    push();
    const defaultSettings = {
      keyboardDisabled: false,
      autoplayInterval: null,
      loop: false,
      align: "start",
      showNav: true,
      showDots: true,
      navBgColor: "bg-gray-100",
      navIconColor: "text-black"
    };
    let settings = fallback($$props["settings"], () => ({}), true);
    settings = {
      ...defaultSettings,
      ...settings
    };
    ({
      loop: settings.loop,
      align: settings.align
    });
    let selectedIndex = 0;
    let totalSlides = 0;
    let autoplayTimer;
    function stopAutoplay() {
      clearInterval(autoplayTimer);
    }
    onDestroy(() => {
      stopAutoplay();
    });
    $$payload.out += `<div class="embla max-w-full mx-auto relative py-3 overflow-hidden svelte-1v3rcho"><div class="embla__container flex items-center svelte-1v3rcho"><!---->`;
    slot($$payload, $$props, "default", {});
    $$payload.out += `<!----></div> `;
    if (settings.showNav) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button${attr("class", `embla__prev hidden sm:flex w-8 h-8 object-contain absolute left-2 top-1/2 transform -translate-y-1/2 ${stringify("")}`)} aria-label="Previous"><span${attr("class", `flex items-center justify-center w-10 h-10 min-w-10 rounded-full ${stringify(settings.navBgColor)} svelte-1v3rcho`)}><i${attr("class", `i i-left ${stringify(settings.navIconColor)} svelte-1v3rcho`)}></i></span></button> <button${attr("class", `embla__next hidden sm:flex w-8 h-8 object-contain absolute right-2 top-1/2 transform -translate-y-1/2 ${stringify("")}`)} aria-label="Next"><span${attr("class", `flex items-center justify-center w-10 h-10 min-w-10 rounded-full ${stringify(settings.navBgColor)} svelte-1v3rcho`)}><i${attr("class", `i i-right pl-1 ${stringify(settings.navIconColor)} svelte-1v3rcho`)}></i></span></button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (settings.showDots) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(Array(totalSlides));
      $$payload.out += `<div class="embla__dots flex sm:hidden justify-center space-x-2 mt-8 svelte-1v3rcho"><!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        each_array[index];
        $$payload.out += `<button${attr("class", `w-3 h-3 rounded-full ${stringify(index === selectedIndex ? "bg-white" : "bg-gray-900 opacity-50")} svelte-1v3rcho`)}${attr("aria-label", `Go to slide ${index + 1}`)}></button>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      settings
    });
    pop();
  }
  function TestimonialCard($$payload, $$props) {
    push();
    let data = $$props["data"];
    $$payload.out += `<div class="min-w-full w-full px-3"><div class="bg-white rounded-[20px] p-6 mx-auto max-w-md card-shadow min-w-full min-h-auto md:min-h-[300px] lg:min-h-[300px] svelte-1sj99of" role="article"${attr("aria-label", `Testimonial from ${data.name}`)}><div class="flex items-center mb-4"><div${attr("class", `${stringify(`flex-shrink-0 w-12 h-12 ${data.avatarColor} rounded-full flex items-center justify-center font-bold text-xl`)} svelte-1sj99of`)}>${escape_html(data.avatar)}</div> <div class="ml-4"><h3 class="font-bold text-lg">${escape_html(data.name)}</h3> <p class="text-sm text-gray-500">${escape_html(data.position)}</p></div></div> <div class="pt-3 md:pt-7"><p class="text-gray-500 font-normal text-sm md:text-base">${escape_html(data.content)}</p></div></div></div>`;
    bind_props($$props, {
      data
    });
    pop();
  }
  function UserTestimonials($$payload, $$props) {
    push();
    var $$store_subs;
    const testimonials = [
      {
        id: 1,
        name: "Maryam Shah",
        position: "Language Teacher at KGS",
        avatar: "M",
        avatarColor: "bg-amber-100 text-amber-900",
        content: "Adoption of Knowledge Platform was the best decision KGS ever made. It is an innovative system which is helping teachers to engage the students in grasping the concepts easily."
      },
      {
        id: 2,
        name: "Miss Nabila Anjum",
        position: "Primary Headmistress at Chiniot Islamia School & College, FSD",
        avatar: "A",
        avatarColor: "bg-purple-100 text-purple-900",
        content: "I thank Knowledge Platform for enhancing my skills and capabilities as a teacher, which will have a positive impact on my students."
      },
      {
        id: 3,
        name: "Miss Shazia Atta",
        position: "Teacher at Kohinoor Grammar School",
        avatar: "M",
        avatarColor: "bg-blue-100 text-blue-900",
        content: "Knowledge platform inculcates cognitive learning and integrated skills simultaneously. is a great and unique platform which provides us the facility to delve deep in the ocean of learning."
      },
      {
        id: 4,
        name: "Manzoor Ilahi",
        position: "Director at Alpine Grammar School, Sialkot",
        avatar: "M",
        avatarColor: "bg-amber-100 text-amber-900",
        content: "Thank you, KP for assisting us in developing our students to thrive in a competitive era. A supportive environment, active engagement, and effective learning empowered us to overcome the challenges of technological adaptation."
      },
      {
        id: 5,
        name: "Anonymous",
        position: "Teacher at Beaconhouse School System (BSS)",
        avatar: "A",
        avatarColor: "bg-purple-100 text-purple-900",
        content: "In the current tech era, the new learning experience is designed to benefit both students and teachers by being easy and convenient. For students, who are increasingly tech-savvy, this approach enhances their learning experience and make it enjoyable."
      }
    ];
    const carouselSettings = {
      autoplayInterval: 7e3,
      loop: true,
      navBgColor: "bg-[var(--primary-color)]",
      navIconColor: "text-white"
    };
    $$payload.out += `<div class="relative bg-white pt-10"><div class="absolute top-0 left-0 w-full overflow-hidden" style="transform: rotate(180deg)"><svg class="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none"><path class="fill-sky-50" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path></svg></div> <div class="relative mx-auto px-4 bg-sky-50 pb-8 md:pb-32"><div class="px-4 lg:px-20"><div class="text-center"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img" class="w-9 h-9 mx-auto mb-0 text-[var(--primary-color)]"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></div></div> <h2 class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-[500px] mx-auto leading-snug">${escape_html(store_get($$store_subs ??= {}, "$t", t)("our_community_main_title"))}</h2></div> <div class="mt-10">`;
    Carousel($$payload, {
      settings: carouselSettings,
      children: ($$payload2) => {
        const each_array = ensure_array_like(testimonials);
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let testimonial = each_array[$$index];
          $$payload2.out += `<div class="flex-[0_0_calc(100%/1)] md:flex-[0_0_calc(100%/2)] lg:flex-[0_0_calc(100%/3)] min-w-0 py-0 sm:py-3">`;
          TestimonialCard($$payload2, {
            data: testimonial
          });
          $$payload2.out += `<!----></div>`;
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: {
        default: true
      }
    });
    $$payload.out += `<!----></div></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function LearningPromoBanner($$payload, $$props) {
    push();
    var $$store_subs;
    const buttons = [
      {
        label: store_get($$store_subs ??= {}, "$t", t)("explore_free_competitions"),
        type: "primary",
        link: "/competitions",
        width: "w-[280px]"
      },
      {
        label: store_get($$store_subs ??= {}, "$t", t)("schedule_demo"),
        type: "secondary",
        link: "/contactus",
        width: "w-[280px]"
      }
    ];
    const each_array = ensure_array_like(buttons);
    $$payload.out += `<div class="relative w-full flex items-center justify-center min-h-[550px] bg-cover bg-center bg-no-repeat bg-fixed"><img${attr("src", IMAGES.EDUCATION_IMPACT_IMAGE)} alt="Background" class="absolute inset-0 w-full h-full object-cover z-0"> <div class="absolute inset-0 bg-black/70"></div> <div class="relative z-10 text-center text-white px-6"><h2 class="text-4xl md:text-5xl font-bold mb-10 leading-16">${escape_html(store_get($$store_subs ??= {}, "$t", t)("transform_learning_main_title_one"))} <br> ${escape_html(store_get($$store_subs ??= {}, "$t", t)("transform_learning_main_title_two"))} <span class="text-blue-400">${escape_html(store_get($$store_subs ??= {}, "$t", t)("competitions"))}</span></h2> <div class="mt-6 flex flex-wrap justify-center gap-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let button = each_array[$$index];
      Button($$payload, {
        label: button.label,
        type: button.type,
        link: button.link,
        width: button.width
      });
    }
    $$payload.out += `<!--]--></div></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function ContactUs($$payload, $$props) {
    push();
    var $$store_subs;
    const contactInfo = [
      {
        icon: "email",
        size: "text-3xl",
        title: store_get($$store_subs ??= {}, "$t", t)("email_us"),
        description: store_get($$store_subs ??= {}, "$t", t)("email_us_desc"),
        contact: "bonzo@knowledgeplatform.com",
        link: "/"
      },
      {
        icon: "phone-receiver",
        size: "text-4xl",
        title: store_get($$store_subs ??= {}, "$t", t)("call_us"),
        description: store_get($$store_subs ??= {}, "$t", t)("call_us_desc"),
        contact: "+92-332-0484200",
        link: "/"
      },
      {
        icon: "whatsapp",
        size: "text-3xl",
        title: store_get($$store_subs ??= {}, "$t", t)("whatsApp_now"),
        description: store_get($$store_subs ??= {}, "$t", t)("whatsApp_now_desc"),
        contact: "Chat Now",
        link: "https://wa.me/923320484200"
      }
    ];
    const each_array = ensure_array_like(contactInfo);
    $$payload.out += `<div class="bg-white pt-16"><div class="px-4 lg:px-20"><h2 class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-2xl mx-auto leading-snug">${escape_html(getInstanceText(store_get($$store_subs ??= {}, "$t", t), "contact_us_main_title"))}</h2> <p class="mt-4 text-gray-600 text-lg md:text-[22px] max-w-full md:max-w-3xl mx-auto text-center leading-snug">${escape_html(getInstanceText(store_get($$store_subs ??= {}, "$t", t), "contact_us_main_description"))}</p></div> <div class="container mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 px-4 md:px-0 xl:px-20 space-y-16 pb-20"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { icon, size, title, description, contact, link } = each_array[$$index];
      $$payload.out += `<div class="bg-sky-100 p-6 rounded-[20px] flex flex-col text-center lg:text-start w-full mb-0 border border-sky-300"><div class="bg-[var(--primary-color)] p-4 rounded-full w-14 h-14 min-w-14 flex items-center justify-center m-auto lg:m-0"><i${attr("class", `i ${stringify(`i-${icon}`)} text-white font-semibold ${stringify(size)}`)}></i></div> <h3 class="font-semibold text-gray-900 text-base md:text-xl mt-5">${escape_html(title)}</h3> <p class="text-gray-600 font-normal text-sm md:text-base">${escape_html(description)}</p> <p class="mt-2 font-bold underline">`;
      if (link !== "/") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<a${attr("href", link)} class="inline-block text-blue-900 whitespace-nowrap text-base lg:text-base xl:text-lg font-semibold items-center">${escape_html(contact)} <svg class="w-5 h-5 inline-block ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12h16m0 0l-5-5m5 5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<span class="inline-block text-blue-900 whitespace-nowrap text-base lg:text-base xl:text-lg font-semibold">${escape_html(contact)}</span>`;
      }
      $$payload.out += `<!--]--></p></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function Footer($$payload, $$props) {
    push();
    const config = get(systemSettingsStore);
    const socialMediaLinks = [
      {
        name: "Facebook",
        url: "https://www.facebook.com/knowledgeplatform/",
        icon: "facebook",
        size: "text-xl"
      },
      {
        name: "Twitter",
        url: "https://twitter.com/kplearning",
        icon: "twitter",
        size: "text-xl"
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/knowledge-platform",
        icon: "linkedIn",
        size: "text-xl"
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/channel/UC5LwaQtX1wKakNJqgUNG2jQ",
        icon: "youtube",
        size: "text-xl"
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/knowledge.platform/",
        icon: "instagram",
        size: "text-xl"
      }
    ];
    const navLinks = [
      {
        name: "Home",
        action: () => goto()
      },
      {
        name: "Sign up",
        action: () => goto(config?.principal_enabled ? "/account/signup" : "/account/user/signup")
      },
      {
        name: "Privacy Policy",
        action: () => goto()
      }
    ];
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const each_array = ensure_array_like(navLinks);
    const each_array_1 = ensure_array_like(socialMediaLinks);
    $$payload.out += `<footer class="bg-blue-900 text-white pt-10 pb-5"><div class="px-4 mt-10 lg:px-20 space-y-16 relative"><div class="flex flex-wrap items-center justify-between"><div class="w-full lg:w-1/4 flex justify-center lg:justify-start">`;
    Image($$payload, {
      src: IMAGES.BONZO_TAGLINE_WHITE_LOGO,
      alt: "Bonzo Logo",
      className: "w-52 lg:w-40"
    });
    $$payload.out += `<!----></div> <div class="w-full lg:w-2/4 flex flex-wrap justify-center lg:justify-center gap:4 md:gap-8 mt-6 lg:mt-0"><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let link = each_array[index];
      $$payload.out += `<button class="hover:underline">${escape_html(link.name)}</button>`;
    }
    $$payload.out += `<!--]--></div> <div class="w-full lg:w-1/4 flex justify-center lg:justify-end mt-6 lg:mt-0 items-center"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let link = each_array_1[$$index_1];
      $$payload.out += `<a${attr("href", link.url)} target="_blank" class="mx-4 hover:text-yellow-400"${attr("aria-label", link.name || "External link")}><i${attr("class", `i ${stringify(`i-${link.icon}`)} ${stringify(link.size)}`)}></i></a>`;
    }
    $$payload.out += `<!--]--></div></div> <div class="border-t border-white mt-6 pt-4"><p class="text-center text-base">\xA9${escape_html(currentYear)} <a href="http://www.knowledgeplatform.com/" class="text-yellow-400 hover:text-yellow-500" target="_blank">Knowledge Platform.</a> All rights reserved.</p></div></div></footer>`;
    pop();
  }
  function IconsSlider($$payload, $$props) {
    push();
    const icons = [
      IMAGES.SKILL_ICON_1,
      IMAGES.SKILL_ICON_2,
      IMAGES.SKILL_ICON_3,
      IMAGES.SKILL_ICON_4,
      IMAGES.SKILL_ICON_5,
      IMAGES.SKILL_ICON_6,
      IMAGES.SKILL_ICON_7,
      IMAGES.SKILL_ICON_8,
      IMAGES.SKILL_ICON_9,
      IMAGES.SKILL_ICON_10,
      IMAGES.SKILL_ICON_11,
      IMAGES.SKILL_ICON_12,
      IMAGES.SKILL_ICON_13,
      IMAGES.SKILL_ICON_14
    ];
    const carouselSettings = {
      autoplayInterval: 4e3,
      loop: true,
      showNav: false,
      showDots: false
    };
    $$payload.out += `<div class="bg-gray-100 px-5 md:px-8 py-2">`;
    Carousel($$payload, {
      settings: carouselSettings,
      children: ($$payload2) => {
        const each_array = ensure_array_like(icons);
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let icon = each_array[$$index];
          $$payload2.out += `<div class="icon-slide ms-11 me-11 animate__animated animate__delay-0-7s svelte-108eukk"><div>`;
          Image($$payload2, {
            src: icon,
            alt: "Skill Icon",
            className: "w-full"
          });
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: {
        default: true
      }
    });
    $$payload.out += `<!----></div>`;
    pop();
  }
  function DemoCompetitionCards($$payload, $$props) {
    push();
    var $$store_subs;
    let competition = fallback($$props["competition"], () => ({
      id: 1,
      title: "The Green Singapore Competition",
      image: "https://bonzo.knowledgeplatform.com/images/competitions/learning_playground_banner1.png",
      is_demo: false,
      banner_image_mobile: ""
    }), true);
    let onItemClick = $$props["onItemClick"];
    function handleClick(url) {
      onItemClick(url);
    }
    Card($$payload, {
      className: "border-3 border-gray-200 hover:border-[var(--primary-color)] rounded-[20px] cursor-pointer p-1",
      onClick: () => handleClick(competition.url),
      children: ($$payload2) => {
        $$payload2.out += `<div class="w-full"><div class="overflow-hidden p-2 w-full max-w-full md:max-w-[2000px] md:w-[640px] h-auto md:h-[170px] lg:w-[912px] lg:h-[240px]"><picture><source${attr("srcset", competition.banner_image_mobile)} media="(max-width: 768px)"> <img${attr("src", competition.image)}${attr("alt", competition.title)} class="w-full h-full object-cover rounded-[15px]"></picture></div> <div class="flex justify-between items-center px-4 py-2"><h3 class="text-lg md:text-xl font-semibold">${escape_html(competition.title)}</h3> <div class="flex items-center space-x-2"><div${attr("class", `w-3 h-3 rounded-full ${!competition.is_demo ? "bg-green-600" : "bg-cyan-500"}`)}></div> <span${attr("class", `text-sm font-medium ${!competition.is_demo ? "text-green-600" : "text-cyan-500"}`)}>${escape_html(competition.is_demo ? store_get($$store_subs ??= {}, "$t", t)("demo") : store_get($$store_subs ??= {}, "$t", t)("live"))}</span></div></div></div>`;
      },
      $$slots: {
        default: true
      }
    });
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      competition,
      onItemClick
    });
    pop();
  }
  function DemoCompetitions($$payload, $$props) {
    push();
    var $$store_subs;
    let competitions = fallback($$props["competitions"], () => [], true);
    let onItemClick = $$props["onItemClick"];
    function handleClick(name) {
      onItemClick(name);
    }
    const carouselSettings = {
      autoplayInterval: 7e3,
      loop: true,
      align: "center",
      navBgColor: "bg-[var(--primary-color)]",
      navIconColor: "text-white"
    };
    $$payload.out += `<div class="bg-white pt-16"><div class="px-4 lg:px-20"><h2 class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-2xl mx-auto leading-snug">${escape_html(getInstanceText(store_get($$store_subs ??= {}, "$t", t), "demo_competitions_title"))}</h2></div> <div class="px-0 mt-10 lg:px-2 space-y-16">`;
    if (competitions.length > 0) {
      $$payload.out += "<!--[-->";
      Carousel($$payload, {
        settings: carouselSettings,
        children: ($$payload2) => {
          const each_array = ensure_array_like(competitions);
          $$payload2.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let competition = each_array[$$index];
            $$payload2.out += `<div class="mx-3 w-full flex-[0_0_calc(100%/1)] md:flex-[0_0_calc(100%/3)] px-5 md:px-0">`;
            DemoCompetitionCards($$payload2, {
              competition,
              onItemClick: handleClick
            });
            $$payload2.out += `<!----></div>`;
          }
          $$payload2.out += `<!--]-->`;
        },
        $$slots: {
          default: true
        }
      });
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="text-center">`;
      NoDataFound($$payload, {
        noDataMsg: "No competitions found",
        backgroundColor: "bg-white",
        textColor: "text-gray-600",
        customClass: "shadow-none"
      });
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      competitions,
      onItemClick
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let competitions = [];
    const config_store = get(systemSettingsStore);
    console.log("config_store ==>", config_store);
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(config_store?.meta_settings?.title || store_get($$store_subs ??= {}, "$t", t)("bonzo_title"))}</title>`;
    });
    $$payload.out += `<div class="flex flex-col h-screen">`;
    BackToTop($$payload);
    $$payload.out += `<!----> <div class="w-full fixed top-0 z-50 shadow-md">`;
    NavBar($$payload);
    $$payload.out += `<!----></div> <div class="flex-1 mt-[84px]">`;
    Jumbotron($$payload, {
      title: getInstanceText(store_get($$store_subs ??= {}, "$t", t), "home_main_title"),
      description: getInstanceText(store_get($$store_subs ??= {}, "$t", t), "home_main_description"),
      buttons: mainSectionButtons
    });
    $$payload.out += `<!----></div> <div class="w-full">`;
    IconsSlider($$payload);
    $$payload.out += `<!----></div> <div class="w-full">`;
    DemoCompetitions($$payload, {
      competitions,
      onItemClick: (url) => {
        window.location.href = location.href + "competitions/" + url + "/home";
      }
    });
    $$payload.out += `<!----></div> <div class="w-full">`;
    Features($$payload);
    $$payload.out += `<!----></div> <div class="w-full">`;
    WhoUsesIt($$payload);
    $$payload.out += `<!----></div> <div class="w-full">`;
    EnhanceLearning($$payload);
    $$payload.out += `<!----></div> <div class="w-full">`;
    StartYourJourney($$payload);
    $$payload.out += `<!----></div> <div class="w-full">`;
    UserTestimonials($$payload);
    $$payload.out += `<!----></div> <div class="w-full">`;
    LearningPromoBanner($$payload);
    $$payload.out += `<!----></div> <div class="w-full">`;
    ContactUs($$payload);
    $$payload.out += `<!----></div> <div class="w-full">`;
    Footer($$payload);
    $$payload.out += `<!----></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
