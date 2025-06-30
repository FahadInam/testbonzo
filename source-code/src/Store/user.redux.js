import { USER } from 'Constants/user.constants';

const User = (state = null, action) => {
  switch (action.type) {
    case USER.SET:
      return action.payload;
    case USER.CLEAR:
      return null;
    default:
      return state;
  }
};

export default User;
