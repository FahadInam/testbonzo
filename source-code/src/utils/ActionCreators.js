import { store } from 'Store';

export const actionCreator = (t, p) => {
  return {
    type: t,
    payload: p,
  };
};

export const actionDispatch = (action) => {
  store.dispatch(action);
};

export const gameDispatch = (t, p) => {
  actionDispatch(actionCreator(t, p));
};
