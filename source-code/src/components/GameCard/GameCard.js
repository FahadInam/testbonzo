// src/lib/gameIcons.js

// Dynamically import all images from the static folder
export const gameTypeIcons = import.meta.glob(
  "$lib/assets/images/game_type/*.png",
  { eager: true }
);

// Convert gameTypeIcons into a simplified key-value object
const icons = Object.fromEntries(
  Object.entries(gameTypeIcons).map(([path, mod]) => {
    const key = path.split("/").pop().replace(".png", "");
    return [key, mod.default];
  })
);

export const defaultGameIcon = "$lib/assets/images/game_type/default.png"; // Default image

// Predefine game types with their labels
const gameTypeMap = new Map([
  ["clue_on", "Clue On"],
  ["crack_the_code", "Crack the code"],
  ["crossword", "Crossword"],
  ["dino_eggs", "Dino eggs"],
  ["drag_and_drop", "Drag & drop"],
  ["financial_fib", "Financial"],
  ["kampong", "Kampong"],
  ["link", "Dino eggs"],
  ["matching", "Card Matching"],
  ["matching_flip", "Matching Flip"],
  ["mcq_short", "MCQ"],
  ["non_over_classification", "Drag & drop"],
  ["rumble_in_the_jumble", "Game bundle"],
  ["single_container_non_overlapping_classification", "Single"],
  ["sorting", "Sorting"],
  ["tabular_fib", "Tabular"],
  ["ruby_spidey", "Ruby Spidey"],
  ["number_battle", "Number Battle"],
  ["sumo_mochi", "Sumo Mochi"],
  ["puzzle", "Puzzle"],
  ["martian_multiples", "Martian Multiples"],
  ["factor_monsters", "Factor Monster"],
  ["sets_challenge", "Sets Challenge"],
  ["sheep_run", "Sheep run"],
  ["mystery_word", "Mystery Word"],
  ["change_game", "Change Game"],
]);

// Function to get game content type
/**
 * @param {object} item
 */
export function getGameContentType(item) {
  return {
    content_type_label: gameTypeMap.get(item.type) || item.type,
    content_type_image: icons[item.type] || defaultGameIcon,
  };
}

const colorsList = [
  "#9B1340",
  "#BC2F47",
  "#DB6800",
  "#DD9C0B",
  "#59A500",
  "#18A063",
  "#00A894",
  "#0084A3",
  "#1E529E",
  "#3B1CBA",
  "#7315AF",
  "#A80F5C",
];

// Automatically import all images from subject folders
const subject_images = {
  science: import.meta.glob(
    "$lib/assets/images/subjects/science/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  physics: import.meta.glob(
    "$lib/assets/images/subjects/physics/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  mathematics: import.meta.glob(
    "$lib/assets/images/subjects/mathematics/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  english: import.meta.glob(
    "$lib/assets/images/subjects/english/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  chemistry: import.meta.glob(
    "$lib/assets/images/subjects/chemistry/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  biology: import.meta.glob(
    "$lib/assets/images/subjects/biology/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  data_science: import.meta.glob(
    "$lib/assets/images/subjects/data_science/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  environmental_literacy: import.meta.glob(
    "$lib/assets/images/subjects/environmental_literacy/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  financial_literacy: import.meta.glob(
    "$lib/assets/images/subjects/financial_literacy/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  problem_solving: import.meta.glob(
    "$lib/assets/images/subjects/problem_solving/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  urdu: import.meta.glob("$lib/assets/images/subjects/urdu/*.{jpg,png,gif}", {
    eager: true,
  }),
  health_and_wellness: import.meta.glob(
    "$lib/assets/images/subjects/health_and_wellness/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  computational_thinking: import.meta.glob(
    "$lib/assets/images/subjects/computational_thinking/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
  computer_science: import.meta.glob(
    "$lib/assets/images/subjects/computer_science/*.{jpg,png,gif}",
    {
      eager: true,
    }
  ),
};

// Convert imported objects to an array of image URLs
const processedImages = Object.fromEntries(
  Object.entries(subject_images).map(([subject, files]) => [
    subject,
    Object.values(files).map((mod) => mod.default),
  ])
);

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomSubjectImage(name) {
  let subject = name ? name.toLowerCase() : "english";
  if (!processedImages[subject] || processedImages[subject].length === 0)
    return null;

  return {
    image: getRandomElement(processedImages[subject]),
    color: getRandomElement(colorsList),
  };
}
