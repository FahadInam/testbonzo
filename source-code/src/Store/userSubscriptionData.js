import { USER_SUBSCRIPTION } from "Constants";


const defaultState = {
  data: null,
};

const UserSubscription = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case USER_SUBSCRIPTION.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case USER_SUBSCRIPTION.CLEAR_DATA:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

export default UserSubscription;
