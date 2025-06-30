import { COMPETITION } from 'Constants/competitions.constants';
import { USER } from 'Constants';

const Competition = (state = null, action) => {
  switch (action.type) {
    case COMPETITION.SET:
      // console.log(action.payload, "defaultCompetition")
      return action.payload;
    case COMPETITION.CLEAR:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default Competition;
