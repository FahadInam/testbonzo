import { IMAGES } from "$lib/assets/images/images.constants";
import { CityList, CityList_England } from "./city.constants";

export const configurations = {
  "bonzo.knowledgeplatform.com": "bonzo",
  "1on1quiz.com": "1on1quiz",
  "globalclimateliteracy.org": "globalclimateliteracy",
  "healthx.knowledgeplatform.com": "healthx",
  "shupavugames.com": "shupavugames",
  "pocketgames.21c.digital": "pocketgames",
  "quotient.games": "quotientgames",
  localhost: "localhost",
};

export const custom_paths = {
  PROGRAM_SITAREY: "/program/sitarey",
  PROGRAM_GLC: "/program/glc",
  CONTACT_US: "/contactus",
  GCLC_RESULT: "/gclc-result",
  GREEN_STAR_SCHOOLS: "/green-star-school",
};

// Unique identifiers for various instances
export const INSTANCES_ID = {
  BONZO_ID: 1,
  GLOBAL_CLIMATE_LITERACY_ID: 5,
  HEALTHX_ID: 7,
  SHUPAVU_ID: 8,
  "1on1Quiz": 6,
  POCKET_GAMES_ID: 50001,
  QUOTIENT_ID: 10,
};

export const instanceConfig = {
  bonzo: {
    instance_id: 1,
    title: "bonzo",
    landing_page_url: "/main",
    is_mobile_otp: false,
    account_back_url: "/",
    navigate_to_public_route: false,
    page_title: "Bonzo",
    share_url: "https://bonzo.knowledgeplatform.com/",
    city_list: CityList,
    banner_text: true,
    is_voucher_allowed: true,
    logo: {
      web_dark: IMAGES.BONZO_WEB_LOGO,
      web_light: IMAGES.BONZO_WEB_LOGO,
      mobile_dark: IMAGES.BONZO_MOBILE_LOGO,
      mobile_light: IMAGES.BONZO_MOBILE_LOGO,
    },
    images: {
      coin_icon: IMAGES.COIN_IMAGE,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/"],
        allowedGG: 1,
      },
      {
        name: "Competitions",
        index: 1,
        ref: null,
        hasSubMenu: true,
        allowedGG: 0,
        subMenuItems: [
          {
            pathname: "/program/sitarey",
            name: "Sitarey",
            id: "PROGRAM_SITAREY",
            url: "https://knowledgeplatform.com.pk/sitarey/?embedded",
          },
          // Add other submenu items here if needed
        ],
      },
      {
        name: "Contact us",
        index: 2,
        pathname: "/contactus",
        ref: "https://knowledgeplatform.com.pk/contact/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "Bonzo - Competitive Gaming Platform",
      meta_description:
        "Up for a challenge? Head over to bonzo.com where you learn, engage, and challenge friends with fun games!",
      fav_icons: {
        "32x32": "/images/bonzo/favicon-32x32.png",
        "16x16": "/images/bonzo/favicon-16x16.png",
      },
      twitter_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/twitter-img.jpg",
      fb_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/fb-img.jpg",
    },
  },
  "1on1quiz": {
    instance_id: 6,
    title: "1on1quiz",
    landing_page_url: "/main",
    is_mobile_otp: false,
    account_back_url: "/",
    navigate_to_public_route: false,
    page_title: "1on1 Quiz",
    share_url: "https://1on1quiz.com/",
    city_list: CityList,
    banner_text: false,
    is_voucher_allowed: true,
    text_object: "",
    logo: {
      web_dark: IMAGES.BONZO_WEB_LOGO,
      web_light: IMAGES.BONZO_WEB_LOGO,
      mobile_dark: IMAGES.BONZO_MOBILE_LOGO,
      mobile_light: IMAGES.BONZO_MOBILE_LOGO,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/", "/program/glc"],
        allowedGG: 1,
      },
      {
        name: "Competitions",
        index: 1,
        ref: null,
        hasSubMenu: true,
        allowedGG: 0,
        subMenuItems: [
          {
            pathname: "/program/sitarey",
            name: "Sitarey",
            id: "PROGRAM_SITAREY",
            url: "https://knowledgeplatform.com.pk/sitarey/?embedded",
          },
          // Add other submenu items here if needed
        ],
      },
      {
        name: "Contact us",
        index: 2,
        pathname: "/contactus",
        ref: "https://knowledgeplatform.com.pk/contact/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "Bonzo - Competitive Gaming Platform",
      meta_description:
        "Up for a challenge? Head over to bonzo.com where you learn, engage, and challenge friends with fun games!",
      fav_icons: {
        "32x32": "/images/bonzo/favicon-32x32.png",
        "16x16": "/images/bonzo/favicon-16x16.png",
      },
      twitter_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/twitter-img.jpg",
      fb_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/fb-img.jpg",
    },
  },
  globalclimateliteracy: {
    instance_id: 5,
    title: "GCLC",
    landing_page_url: "/program/glc",
    is_mobile_otp: false,
    account_back_url: "/",
    navigate_to_public_route: false,
    page_title: "Global Climate Literacy Competitions",
    share_url: "https://globalclimateliteracy.org/",
    city_list: CityList,
    banner_text: true,
    is_voucher_allowed: true,
    logo: {
      web_dark: IMAGES.GCLC_WEB_LOGO,
      web_light: IMAGES.GCLC_WEB_LOGO,
      mobile_light: IMAGES.GCLC_MOBILE_LOGO,
      mobile_dark: IMAGES.GCLC_MOBILE_LOGO,
    },
    images: {
      coin_icon: IMAGES.COIN_IMAGE,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/program/glc"],
        allowedGG: 1,
      },
      {
        name: "Competition Results",
        index: 1,
        pathname: "/gclc-result",
        ref: "https://knowledgeplatform.com.pk/gclc-result/",
        id: "GCLC_RESULT",
        allowedGG: 1,
      },
      {
        name: "Green Star Schools",
        index: 2,
        pathname: "/green-star-school",
        ref: "https://knowledgeplatform.com.pk/green-star-school/",
        id: "GREEN_STAR_SCHOOLS",
        allowedGG: 1,
      },
      {
        name: "Contact Us",
        index: 3,
        pathname: "/contactus",
        ref: "https://knowledgeplatform.com.pk/contact-gclc/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "Global Climate Literacy Competitions",
      meta_description:
        "Welcome to Global Climate Literacy Competitions, an initiative that inspires students worldwide to build climate literacy and drive action through games and competitions!",
      fav_icons: {
        "32x32": "/images/gclc/favicon-32x32.png",
        "16x16": "/images/gclc/favicon-16x16.png",
      },
      twitter_image_url:
        "https://globalclimateliteracy.org/images/gclc/twitter-img.jpg",
      fb_image_url: "https://globalclimateliteracy.org/images/gclc/fb-img.jpg",
    },
  },
  healthx: {
    instance_id: 7,
    title: "healthX",
    landing_page_url: "/main",
    is_mobile_otp: false,
    account_back_url: "/",
    navigate_to_public_route: false,
    page_title: "HealthX",
    share_url: "https://healthx.knowledgeplatform.com/",
    city_list: CityList,
    banner_text: false,
    is_voucher_allowed: true,
    text_object: "",
    logo: {
      web_dark: IMAGES.BONZO_WEB_LOGO,
      web_light: IMAGES.BONZO_WEB_LOGO,
      mobile_light: IMAGES.BONZO_MOBILE_LOGO,
      mobile_dark: IMAGES.BONZO_MOBILE_LOGO,
    },
    images: {
      coin_icon: IMAGES.COIN_IMAGE,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/", "/program/glc"],
        allowedGG: 1,
      },
      {
        name: "Contact us",
        index: 2,
        pathname: "/contactus",
        ref: "https://knowledgeplatform.com.pk/contact/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "HealthX - Competitive Gaming Platform",
      meta_description:
        "Up for a challenge? Head over to healthx.knowledgeplatform.com where you learn, engage, and challenge friends with fun games!",
      fav_icons: {
        "32x32": "/images/healthx/favicon-32x32.png",
        "16x16": "/images/healthx/favicon-16x16.png",
      },
      twitter_image_url:
        "https://healthx.knowledgeplatform.com/images/healthx/twitter-img.jpg",
      fb_image_url:
        "https://healthx.knowledgeplatform.com/images/healthx/fb-img.jpg",
    },
  },
  shupavugames: {
    instance_id: 8,
    title: "Shupavu",
    landing_page_url: "/program/glc",
    is_mobile_otp: true,
    account_back_url: "https://shupavugames.com/",
    navigate_to_public_route: true,
    page_title: "Shupavu",
    share_url: "https://app.shupavugames.com/",
    city_list: CityList_England,
    banner_text: false,
    is_voucher_allowed: false,
    text_object: "",
    logo: {
      web_dark: IMAGES.SHUPAVU_WEB_LOGO,
      web_light: IMAGES.SHUPAVU_WEB_LOGO,
      mobile_light: IMAGES.SHUPAVU_MOBILE_LOGO,
      mobile_dark: IMAGES.SHUPAVU_MOBILE_LOGO,
    },
    images: {
      coin_icon: IMAGES.COIN_IMAGE,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/", "/program/glc"],
        allowedGG: 1,
      },
      {
        name: "Contact us",
        index: 2,
        pathname: "/contactus",
        ref: "https://knowledgeplatform.com.pk/contact/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "Shupavu Games",
      meta_description:
        "Up for a challenge? Head over to bonzo.com where you learn, engage, and challenge friends with fun games!",
      fav_icons: {
        "32x32": "/images/shupavu/favicon-32x32.png",
        "16x16": "/images/shupavu/favicon-16x16.png",
      },
      twitter_image_url:
        "https://app.shupavugames.com/images/shupavu/twitter-img.jpg",
      fb_image_url: "https://app.shupavugames.com/images/shupavu/fb-img.jpg",
    },
  },
  pocketgames: {
    instance_id: 50001,
    title: "Pocket Games",
    landing_page_url: "/main",
    is_mobile_otp: false,
    account_back_url: "https://www.21c.digital/pocketgames/",
    navigate_to_public_route: true,
    page_title: "Pocket Games",
    share_url: "https://pocketgames.21c.digital/",
    city_list: CityList_England,
    banner_text: false,
    is_voucher_allowed: true,
    text_object: "",
    logo: {
      web_dark: IMAGES.POCKET_GAMES_WEB_LOGO,
      web_light: IMAGES.POCKET_GAMES_WEB_LOGO_WHITE,
      mobile_dark: IMAGES.POCKET_GAMES_MOBILE_LOGO,
      mobile_light: IMAGES.POCKET_GAMES_MOBILE_LOGO_WHITE,
    },
    images: {
      coin_icon: IMAGES.POCKET_GAMES_COIN_IMAGE,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/", "/program/glc"],
        allowedGG: 1,
      },
      {
        name: "Contact us",
        index: 2,
        pathname: "/contactus",
        ref: "https://knowledgeplatform.com.pk/contact/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "Pocket Games",
      meta_description:
        "Up for a challenge? Head over to pocketgames.knowledgeplatform.com where you learn, engage, and challenge friends with fun games!",
      fav_icons: {
        "32x32": "/images/pocket-games/favicon-32x32.svg",
        "16x16": "/images/pocket-games/favicon-16x16.svg",
      },
      twitter_image_url:
        "https://pocketgames.21c.digital/images/pocket-games/twitter-img.jpg",
      fb_image_url:
        "https://pocketgames.21c.digital/images/pocket-games/fb-img.jpg",
    },
  },
  quotientgames: {
    instance_id: 10,
    title: "Quotient",
    landing_page_url: "/program/glc",
    is_mobile_otp: false,
    account_back_url: "https://quotient.games/",
    navigate_to_public_route: true,
    page_title: "Quotient",
    domain_name: "app.quotient.games",
    safaricom_domain: null,
    share_url: "https://app.quotient.games/",
    city_list: CityList,
    banner_text: false,
    text_object: "",
    logo: {
      web_dark: IMAGES.QUOTIENT_WEB_LOGO,
      web_light: IMAGES.QUOTIENT_WEB_LOGO_LIGHT,
      mobile_light: IMAGES.QUOTIENT_MOBILE_LOGO_LIGHT,
      mobile_dark: IMAGES.QUOTIENT_MOBILE_LOGO,
    },
    images: {
      coin_icon: IMAGES.COIN_IMAGE,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/", "/program/glc"],
        allowedGG: 1,
      },
      {
        name: "Contact us",
        index: 2,
        pathname: "/contact-us",
        ref: "https://knowledgeplatform.com.pk/contact/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "Quotient Games",
      meta_description:
        "Up for a challenge? Head over to bonzo.com where you learn, engage, and challenge friends with fun games!",
      fav_icons: {
        "32x32": "/images/quotient-games/favicon-32x32.svg",
        "16x16": "/images/quotient-games/favicon-16x16.svg",
      },
      twitter_image_url:
        "https://app.shupavugames.com/images/quotient-games/twitter-img.jpg",
      fb_image_url:
        "https://app.shupavugames.com/images/quotient-games/fb-img.jpg",
    },
  },
  sprint2: {
    instance_id: 3,
    title: "bonzo",
    landing_page_url: "/main",
    is_mobile_otp: false,
    account_back_url: "/",
    navigate_to_public_route: false,
    page_title: "Bonzo",
    share_url: "https://bonzo.knowledgeplatform.com/",
    city_list: CityList,
    banner_text: true,
    is_voucher_allowed: true,
    logo: {
      web_dark: IMAGES.BONZO_WEB_LOGO,
      web_light: IMAGES.BONZO_WEB_LOGO,
      mobile_dark: IMAGES.BONZO_MOBILE_LOGO,
      mobile_light: IMAGES.BONZO_MOBILE_LOGO,
    },
    images: {
      coin_icon: IMAGES.COIN_IMAGE,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/", "/program/glc"],
        allowedGG: 1,
      },

      {
        name: "Competitions",
        index: 1,
        ref: null,
        hasSubMenu: true,
        allowedGG: 0,
        subMenuItems: [
          {
            pathname: "/program/sitarey",
            name: "Sitarey",
            id: "PROGRAM_SITAREY",
            url: "https://knowledgeplatform.com.pk/sitarey/?embedded",
          },
          // Add other submenu items here if needed
        ],
      },
      {
        name: "Contact us",
        index: 2,
        pathname: "/contactus",
        ref: "https://knowledgeplatform.com.pk/contact/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "Bonzo - Competitive Gaming Platform",
      meta_description:
        "Up for a challenge? Head over to bonzo.com where you learn, engage, and challenge friends with fun games!",
      fav_icons: {
        "32x32": "/images/bonzo/favicon-32x32.png",
        "16x16": "/images/bonzo/favicon-16x16.png",
      },
      twitter_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/twitter-img.jpg",
      fb_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/fb-img.jpg",
    },
  },
  qa: {
    instance_id: 12,
    title: "bonzo",
    landing_page_url: "/main",
    is_mobile_otp: false,
    account_back_url: "/",
    navigate_to_public_route: false,
    page_title: "Bonzo",
    share_url: "https://bonzo.knowledgeplatform.com/",
    city_list: CityList,
    banner_text: true,
    is_voucher_allowed: true,
    logo: {
      web_dark: IMAGES.BONZO_WEB_LOGO,
      web_light: IMAGES.BONZO_WEB_LOGO,
      mobile_dark: IMAGES.BONZO_MOBILE_LOGO,
      mobile_light: IMAGES.BONZO_MOBILE_LOGO,
    },
    images: {
      coin_icon: IMAGES.COIN_IMAGE,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/", "/program/glc"],
        allowedGG: 1,
      },

      {
        name: "Competitions",
        index: 1,
        ref: null,
        hasSubMenu: true,
        allowedGG: 0,
        subMenuItems: [
          {
            pathname: "/program/sitarey",
            name: "Sitarey",
            id: "PROGRAM_SITAREY",
            url: "https://knowledgeplatform.com.pk/sitarey/?embedded",
          },
          // Add other submenu items here if needed
        ],
      },
      {
        name: "Contact us",
        index: 2,
        pathname: "/contactus",
        ref: "https://knowledgeplatform.com.pk/contact/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "Bonzo - Competitive Gaming Platform",
      meta_description:
        "Up for a challenge? Head over to bonzo.com where you learn, engage, and challenge friends with fun games!",
      fav_icons: {
        "32x32": "/images/bonzo/favicon-32x32.png",
        "16x16": "/images/bonzo/favicon-16x16.png",
      },
      twitter_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/twitter-img.jpg",
      fb_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/fb-img.jpg",
    },
  },
  localhost: {
    instance_id: 1,
    title: "bonzo",
    landing_page_url: "/main",
    is_mobile_otp: false,
    account_back_url: "/",
    navigate_to_public_route: false,
    page_title: "Bonzo",
    share_url: "https://bonzo.knowledgeplatform.com/",
    city_list: CityList,
    banner_text: true,
    is_voucher_allowed: true,
    logo: {
      web_dark: IMAGES.BONZO_WEB_LOGO,
      web_light: IMAGES.BONZO_WEB_LOGO,
      mobile_dark: IMAGES.BONZO_MOBILE_LOGO,
      mobile_light: IMAGES.BONZO_MOBILE_LOGO,
    },
    images: {
      coin_icon: IMAGES.COIN_IMAGE,
    },
    landing_navigation: [
      {
        name: "Home",
        index: 0,
        ref: null,
        pathname: ["/"],
        allowedGG: 1,
      },
      {
        name: "Competitions",
        index: 1,
        ref: null,
        hasSubMenu: true,
        allowedGG: 0,
        subMenuItems: [
          {
            pathname: "/program/sitarey",
            name: "Sitarey",
            id: "PROGRAM_SITAREY",
            url: "https://knowledgeplatform.com.pk/sitarey/?embedded",
          },
          // Add other submenu items here if needed
        ],
      },
      {
        name: "Contact us",
        index: 2,
        pathname: "/contactus",
        ref: "https://knowledgeplatform.com.pk/contact/?embedded",
        id: "CONTACT_US",
        allowedGG: 1,
      },
    ],
    meta_settings: {
      title: "Bonzo - Competitive Gaming Platform",
      meta_description:
        "Up for a challenge? Head over to bonzo.com where you learn, engage, and challenge friends with fun games!",
      fav_icons: {
        "32x32": "/images/bonzo/favicon-32x32.png",
        "16x16": "/images/bonzo/favicon-16x16.png",
      },
      twitter_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/twitter-img.jpg",
      fb_image_url:
        "https://bonzo.knowledgeplatform.com/images/bonzo/fb-img.jpg",
    },
  },
};
