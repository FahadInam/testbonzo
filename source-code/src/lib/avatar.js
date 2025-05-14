import { getRandomInt } from "./utils";

const images = Object.fromEntries(
  Object.entries(
    import.meta.glob("$lib/assets/images/profiles/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ).map(([path, url]) => [path.split("/").pop(), url]),
);

const colorsList = [
  "#48f7f5",
  "#c97820",
  "#a95c03",
  "#2ed354",
  "#994727",
  "#5b00eb",
  "#f66e3b",
  "#947ad9",
  "#065c84",
  "#542a65",
  "#8fc8ff",
  "#95d814",
  "#4345f2",
  "#0d6024",
  "#9ea29f",
  "#9e4407",
  "#e4695a",
  "#640a8b",
  "#b39d5f",
  "#20bc91",
  "#5a274f",
  "#1c9062",
  "#0824f4",
  "#cd71ba",
  "#db8e29",
  "#bc4958",
  "#f40dca",
  "#ef2031",
  "#dcb553",
  "#5ce9ca",
  "#162648",
  "#92e148",
  "#2bb73b",
  "#136c4b",
  "#49f34d",
  "#b6d2f9",
  "#e71729",
  "#e03020",
  "#69baca",
  "#9303f5",
  "#e00b7f",
  "#5cdd48",
  "#fdb7c3",
  "#d4ee0b",
  "#5d3a54",
  "#895782",
  "#ae89bc",
  "#5bf467",
  "#cd695c",
  "#ca133f",
  "#12ab1c",
  "#89d1d2",
  "#8273db",
  "#f56c55",
  "#6b8c65",
  "#0afdd1",
  "#2b732e",
  "#1e3752",
  "#b90956",
  "#d6e108",
  "#9d8a6f",
  "#2ceece",
  "#29bfe9",
  "#392c20",
  "#25ec96",
  "#9a8eaf",
];

const avatar = (/** @type {string} */ t) => {
  const num = parseInt(t, 10);

  // If t is '0', add 1 to num; otherwise, use num directly
  if (!isNaN(num) && num >= 0 && num < 70) {
    return images[`a${num === 0 ? num + 1 : num}.png`];
  }

  return t;
};

export { images, colorsList, avatar };

// Import utility function for random number generation

// Define the avatar sets
export const AVATAR_SET = [
  {
    id: 0,
    name: "Clever",
    color: "#ff6700",
  },
  {
    id: 1,
    name: "Smart",
    color: "#2ba000",
  },
  {
    id: 2,
    name: "Clever",
    color: "#0093dd",
  },
  {
    id: 3,
    name: "Smart",
    color: "#0093dd",
  },
  {
    id: 4,
    name: "Clever",
    color: "#af6923",
  },
  {
    id: 5,
    name: "Smart",
    color: "#a61ed8",
  },
  {
    id: 6,
    name: "Happy",
    color: "#ffd700",
  },
  {
    id: 7,
    name: "Sad",
    color: "#0000ff",
  },
  {
    id: 8,
    name: "Excited",
    color: "#ff4500",
  },
  {
    id: 9,
    name: "Calm",
    color: "#00ff7f",
  },
  {
    id: 10,
    name: "Anxious",
    color: "#8b0000",
  },
  {
    id: 11,
    name: "Content",
    color: "#dda0dd",
  },
  {
    id: 12,
    name: "Angry",
    color: "#ff0000",
  },
  {
    id: 13,
    name: "Bored",
    color: "#808080",
  },
  {
    id: 14,
    name: "Energetic",
    color: "#00ff00",
  },
  {
    id: 15,
    name: "Peaceful",
    color: "#1e90ff",
  },
  {
    id: 16,
    name: "Joyful",
    color: "#ff1493",
  },
  {
    id: 17,
    name: "Nervous",
    color: "#ffa07a",
  },
  {
    id: 18,
    name: "Relieved",
    color: "#98fb98",
  },
  {
    id: 19,
    name: "Frustrated",
    color: "#d2691e",
  },
  {
    id: 20,
    name: "Grateful",
    color: "#ff69b4",
  },
  {
    id: 21,
    name: "Confused",
    color: "#7fffd4",
  },
  {
    id: 22,
    name: "Proud",
    color: "#daa520",
  },
  {
    id: 23,
    name: "Disappointed",
    color: "#4682b4",
  },
  {
    id: 24,
    name: "Surprised",
    color: "#ff6347",
  },
  {
    id: 25,
    name: "Hopeful",
    color: "#00fa9a",
  },
  {
    id: 26,
    name: "Lonely",
    color: "#696969",
  },
  {
    id: 27,
    name: "Inspired",
    color: "#ff8c00",
  },
  {
    id: 28,
    name: "Worried",
    color: "#ffb6c1",
  },
  {
    id: 29,
    name: "Amused",
    color: "#87ceeb",
  },
  {
    id: 30,
    name: "Determined",
    color: "#b22222",
  },
  {
    id: 31,
    name: "Guilty",
    color: "#8a2be2",
  },
  {
    id: 32,
    name: "Apathetic",
    color: "#cd5c5c",
  },
  {
    id: 33,
    name: "Euphoric",
    color: "#adff2f",
  },
  {
    id: 34,
    name: "Annoyed",
    color: "#ff00ff",
  },
  {
    id: 35,
    name: "Optimistic",
    color: "#7cfc00",
  },
  {
    id: 36,
    name: "Jealous",
    color: "#006400",
  },
  {
    id: 37,
    name: "Ecstatic",
    color: "#ffdab9",
  },
  {
    id: 38,
    name: "Envious",
    color: "#8b0000",
  },
  {
    id: 39,
    name: "Sympathetic",
    color: "#40e0d0",
  },
  {
    id: 40,
    name: "Cheerful",
    color: "#ffe4b5",
  },
  {
    id: 41,
    name: "Resentful",
    color: "#800000",
  },
  {
    id: 42,
    name: "Passionate",
    color: "#ff4500",
  },
  {
    id: 43,
    name: "Shy",
    color: "#b0c4de",
  },
  {
    id: 44,
    name: "Fearful",
    color: "#bc8f8f",
  },
  {
    id: 45,
    name: "Embarrassed",
    color: "#ff6347",
  },
  {
    id: 46,
    name: "Grumpy",
    color: "#808000",
  },
  {
    id: 47,
    name: "Horrified",
    color: "#f08080",
  },
  {
    id: 48,
    name: "Silly",
    color: "#da70d6",
  },
  {
    id: 49,
    name: "Tired",
    color: "#2f4f4f",
  },
  {
    id: 50,
    name: "Curious",
    color: "#4682b4",
  },
  {
    id: 51,
    name: "Doubtful",
    color: "#5f9ea0",
  },
  {
    id: 52,
    name: "Hopeful",
    color: "#00fa9a",
  },
  {
    id: 53,
    name: "Relaxed",
    color: "#b0e0e6",
  },
  {
    id: 54,
    name: "Confident",
    color: "#daa520",
  },
  {
    id: 55,
    name: "Motivated",
    color: "#ff7f50",
  },
  {
    id: 56,
    name: "Excited",
    color: "#ff6347",
  },
  {
    id: 57,
    name: "Bored",
    color: "#808080",
  },
  {
    id: 58,
    name: "Elated",
    color: "#ff00ff",
  },
  {
    id: 59,
    name: "Anxious",
    color: "#8b0000",
  },
  {
    id: 60,
    name: "Furious",
    color: "#dc143c",
  },
  {
    id: 61,
    name: "Pleased",
    color: "#ff6347",
  },
  {
    id: 62,
    name: "Jubilant",
    color: "#ffd700",
  },
  {
    id: 63,
    name: "Regretful",
    color: "#ff4500",
  },
  {
    id: 64,
    name: "Blissful",
    color: "#98fb98",
  },
  // {
  //   id: 65,
  //   name: 'Melancholic',
  //   color: '#4682b4',
  // },
  // {
  //   id: 66,
  //   name: 'School',
  //   color: '#4682b4',
  // },
];

// Generic avatar subset
export const GENERIC_AVATAR_SET = AVATAR_SET.slice(0, 14);

// Function to get a random avatar
export const getRandomAvatar = () =>
  AVATAR_SET[getRandomInt(0, AVATAR_SET.length - 1)].id;

// Function to get a random generic avatar
export const getRandomGenericAvatar = () =>
  GENERIC_AVATAR_SET[getRandomInt(0, GENERIC_AVATAR_SET.length - 1)];
