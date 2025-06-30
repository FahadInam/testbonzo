import { DIRECT_LAUNCH_USER } from 'Constants';

const defaultX = {
  directLaunch_user: false,
};

const DirectLaunch = (state = { ...defaultX }, action) => {
  const nState = { ...state };
  switch (action.type) {
    case DIRECT_LAUNCH_USER.DIRECT_LAUNCH_USER:
      nState.directLaunch_user = action.payload;
      return nState;
    default:
      return nState;
  }
};

export default DirectLaunch;
