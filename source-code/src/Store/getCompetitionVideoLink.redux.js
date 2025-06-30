import { COMPETITION } from 'Constants/competitions.constants';
import { USER } from 'Constants';

const GetCompetitionVideoLink = (state = null, action) => {
  switch (action.type) {
    case COMPETITION.SET_VIDEO:
      return action.payload;
    case COMPETITION.CLEAR_VIDEO:
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetCompetitionVideoLink;
