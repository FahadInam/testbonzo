const crypto = require('crypto');
const importAll = (require) =>
  require.keys().reduce((acc, next) => {
    acc[next.replace('./', '')] = require(next);
    return acc;
  }, {});

const subjectIcons = {
  science: importAll(require.context('Assets/images/subjects/science', false, /\.(png)$/)),
  physics: importAll(require.context('Assets/images/subjects/physics', false, /\.(png)$/)),
  mathematics: importAll(require.context('Assets/images/subjects/math', false, /\.(png)$/)),
  english: importAll(require.context('Assets/images/subjects/english', false, /\.(png)$/)),
  chemistry: importAll(require.context('Assets/images/subjects/chemistry', false, /\.(png)$/)),
  biology: importAll(require.context('Assets/images/subjects/biology', false, /\.(png)$/)),
  computer_science: importAll(require.context('Assets/images/subjects/computer_science', false, /\.(png)$/)),
  computational_thinking: importAll(require.context('Assets/images/subjects/computer_science', false, /\.(png)$/)),
  data_science: importAll(require.context('Assets/images/subjects/data_science', false, /\.(png)$/)),
  environmental_literacy: importAll(require.context('Assets/images/subjects/environmental_literacy', false, /\.(png)$/)),
  financial_literacy: importAll(require.context('Assets/images/subjects/financial_literacy', false, /\.(png)$/)),
  problem_solving: importAll(require.context('Assets/images/subjects/problem_solving', false, /\.(png)$/)),
  urdu: importAll(require.context('Assets/images/subjects/urdu', false, /\.(png)$/)),
  health_and_wellness: importAll(require.context('Assets/images/subjects/health_and_wellness', false, /\.(png)$/)),
};

const colorsList = [
  '#9B1340',
  '#BC2F47',
  '#DB6800',
  '#DD9C0B',
  '#59A500',
  '#18A063',
  '#00A894',
  '#0084A3',
  '#1E529E',
  '#3B1CBA',
  '#7315AF',
  '#A80F5C',
];

const defaultColor = '#9B1340'; // Default background color
const defaultIcon = require('Assets/images/subjects/default.png'); // Path to default image

function getConsistentHash(value, maxValue) {
  const hash = crypto.createHash('sha256').update(value).digest('hex');
  const hashValue = parseInt(hash, 16);
  return hashValue % maxValue;
}

function getUserColorAndIcon(userId, competition_id, subject, selectedSubjectIcons, content_id, Topic, index) {
  let string_without_spaces = Topic.replace(' ', '');

  const combinedString = `${index}-${content_id}-${string_without_spaces}-${competition_id}-${userId}-${subject}`;

  const colorIndex = getConsistentHash(combinedString, colorsList.length);
  const iconIndex = getConsistentHash(combinedString, selectedSubjectIcons.length);

  // console.log(colorIndex, iconIndex);

  const color = colorsList[colorIndex];
  const icon = selectedSubjectIcons[iconIndex];
  return { color, icon };
}

export const getSubjectStyle = (item, userID, competition_id, content_id, index) => {
  let subject_name = item.subject.toLowerCase().replace(/ /g, '_');
  if (!(subject_name in subjectIcons)) {
    return { color: defaultColor, icon: defaultIcon, subjectName: item.subject, Topic: item.topic };
  }

  const selectedSubjectIcons = Object.keys(subjectIcons[subject_name]);
  const ChosenItem = getUserColorAndIcon(userID, competition_id, item.subject, selectedSubjectIcons, content_id, item.topic, index);
  const SubjectData = subjectIcons[subject_name];
  const icon = SubjectData[ChosenItem.icon];
  const color = ChosenItem.color;
  const subjectName = item.subject;
  const Topic = item.topic;

  return { color, icon, subjectName, Topic };
};

const gameTypeIcons = importAll(require.context('Assets/images/game_type', false, /\.(png)$/));
const gameTypeList = [
  {
    value: 'clue_on',
    label: 'Clue On',
  },
  {
    value: 'crack_the_code',
    label: 'Crack the code',
  },
  {
    value: 'crossword',
    label: 'Crossword',
  },
  {
    value: 'dino_eggs',
    label: 'Dino eggs',
  },
  {
    value: 'drag_and_drop',
    label: 'Drag & drop',
  },
  {
    value: 'financial_fib',
    label: 'Financial',
  },
  {
    value: 'kampong',
    label: 'Kampong',
  },
  {
    value: 'link',
    label: 'Dino eggs',
  },
  {
    value: 'matching',
    label: 'Card Matching',
  },
  {
    value: 'matching_flip',
    label: 'Matching Flip',
  },
  {
    value: 'mcq_short',
    label: 'MCQ',
  },
  {
    value: 'non_over_classification',
    label: 'Drag & drop',
  },
  {
    value: 'rumble_in_the_jumble',
    label: 'Game bundle',
  },
  {
    value: 'single_container_non_overlapping_classification',
    label: 'Single',
  },
  {
    value: 'sorting',
    label: 'Sorting',
  },
  {
    value: 'tabular_fib',
    label: 'Tabular',
  },
  {
    value: 'ruby_spidey',
    label: 'Ruby Spidey',
  },
  {
    value: 'number_battle',
    label: 'Number Battle',
  },
  {
    value: 'sumo_mochi',
    label: 'Sumo Mochi',
  },

  {
    value: 'puzzle',
    label: 'Puzzle',
  },
  {
    value: 'martian_multiples',
    label: 'Martian Multiples',
  },
  {
    value: 'factor_monsters',
    label: 'Factor Monster',
  },
  {
    value: 'sets_challenge',
    label: 'Sets Challenge',
  },
  {
    value: 'sheep_run',
    label: 'Sheep run',
  },
  {
    value: 'mystery_word',
    label: 'Mystery Word',
  },
  {
    value: 'change_game',
    label: 'Change Game',
  },
  {
    value: 'ai_bot',
    label: 'Simulation',
  },
  {
    value: 'matching_drag_drop',
    label: 'Matching Drag & Drop',
  },
  {
    value: 'sorting_vertical',
    label: 'Sorting Vertical',
  },
];

const defaultGameIcon = require('Assets/images/game_type/default.png'); // Path to default image

export const getGameContentType = (item) => {
  // console.log('gameTypeList', gameTypeList);
  // Find the matching game type object
  const gameType = gameTypeList?.find((game) => game.value === item.type);

  if (gameType) {
    const icon = gameTypeIcons[`${item.type}.png`]; // Assuming icons are named with the type and .png extension
    return {
      content_type_label: gameType.label, // Use the label from the gameTypeList
      content_type_image: icon || defaultGameIcon, // Use defaultIcon if the specific game type icon is not found
    };
  } else {
    return {
      content_type_label: item.type, // Use the label from the gameTypeList
      content_type_image: defaultGameIcon, // Use defaultIcon if the specific game type icon is not found
    };
  }
};
