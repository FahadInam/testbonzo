
import { PREMIUM_COMPETITION } from "Constants";

const defaultState = {
  data: null,
};

const PremiumCompetition = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case PREMIUM_COMPETITION.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case PREMIUM_COMPETITION.CLEAR_DATA:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

export default PremiumCompetition;

