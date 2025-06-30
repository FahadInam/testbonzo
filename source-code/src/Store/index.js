import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiService from 'Utils/axios.service';
import rootReducer from './ReduxReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const loggerMiddleware = (store) => (next) => (action) => {
  // console.log('Dispatching:', action);
  let result = next(action);
  // console.log('Next state:', store.getState());
  // console.log(result, "result");

  return result;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk.withExtraArgument(apiService), loggerMiddleware)));

const persistor = persistStore(store);

export { store, persistor };
