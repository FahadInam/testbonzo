import { defaultState } from 'Constants';

let currentState = {};
const Init = (state = defaultState) => {
  currentState = { ...state };
};

const Set = (newData, mustSave) => {
  if (mustSave) {
    currentState = { ...currentState, ...newData };
  }
  return currentState;
};

const Info = () => {
  return currentState;
};

const Override = (nState) => {
  currentState = { ...nState };
  return currentState;
};

const Clear = () => {
  currentState = {};
};

const State = {
  Init,
  Set,
  Info,
  Clear,
  Override,
};

export default State;
