import { CONFIG } from 'Constants';

const defaultX = {
  instConfig: false,
};

const GetInstConfig = (state = { ...defaultX }, action) => {
  switch (action.type) {
    case CONFIG.SET:
      return {
        instConfig: action.payload,
      };
    default:
      return state;
  }
};

export default GetInstConfig;
