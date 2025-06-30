import { MCD } from 'Constants';

const defaultX = {
  mcd_user: false,
  mcd_fullscreen: false,
};

const McdUser = (state = { ...defaultX }, action) => {
  const nState = { ...state };
  switch (action.type) {
    case MCD.MCD_USER:
      nState.mcd_user = action.payload;
      return nState;
    case MCD.MCD_FULLSCREEN:
      nState.mcd_fullscreen = action.payload;
      return nState;
    default:
      return nState;
  }
};

export default McdUser;
