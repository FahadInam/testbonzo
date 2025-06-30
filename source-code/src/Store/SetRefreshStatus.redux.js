import { REFRESH_STATUS } from "Constants";


const initialState  = {
    isRefreshingToken: false,
};

const RefreshStatus = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_STATUS.START_REFRESH_TOKEN:
      return {
        ...state,
        isRefreshingToken: true,
      };
      case REFRESH_STATUS.END_REFRESH_TOKEN:
        return {
        ...state,
        isRefreshingToken: false,
      };
    default:
      return state;
  }
};

export default RefreshStatus;
