/**
 * @param {Array<{ topic: string }>} items
 * @param {string} topicName
 */
export function getItemsByTopic(items, topicName) {
  return items.filter(
    (/** @type {{ topic: string }} */ item) => item.topic === topicName
  );
}

/**
 * @param {Array<{ topic: string }>} list
 * @param {string} title
 */
export const preProcessLessonGames = (title, list) => {
  const filteredByskill = list.filter((item) => item.skill === title);
  if (filteredByskill.length <= 1) return filteredByskill;

  let singleMcqIndex = filteredByskill.findIndex(
    (item) => item.type.toLowerCase() === "mcq"
  );

  if (singleMcqIndex !== -1) {
    const [singleMcq] = filteredByskill.splice(singleMcqIndex, 1);
    filteredByskill.push(singleMcq);
  }

  return filteredByskill;
};
