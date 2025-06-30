import { COMING_FROM_PUBLIC } from 'Constants';

const defaultX = {
  is_coming_from_sitarey: false,
};

const ComingFromPublic = (state = { ...defaultX }, action) => {
  switch (action.type) {
    case COMING_FROM_PUBLIC.COMING_FROM_SITAREY:
      return {
        is_coming_from_sitarey: action.payload,
      };
    default:
      return state;
  }
};

export default ComingFromPublic;
