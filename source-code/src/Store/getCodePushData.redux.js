import { COMPETITION } from 'Constants/competitions.constants';
import { USER } from 'Constants';

const GetCodePushData = (state = null, action) => {
  switch (action.type) {
    case COMPETITION.SET_CODE_PUSH_DOWNLOAD_DATA:
      return action.payload;
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default GetCodePushData;