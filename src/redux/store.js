import { createStore } from 'redux';
import rootReducer from './reducers';

export const store = createStore(
  rootReducer,
  // To enable the usage of Redux DevTools in Chrome
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
