import { writable } from "svelte/store";

export const competitionStore = writable({
  url: null,
  name: null,
  current_grade: null,
  competition_id: null,
  is_lesson_page_hide: null,
  is_games_page: null,
  is_premium: null,
});
