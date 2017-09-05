import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers'
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();

export default function configureStore() {
 const logger = createLogger();
 const store = createStore(
   rootReducer,
   persistedState,
   applyMiddleware(thunk, promise, logger)
 );
   
 store.subscribe(throttle(() => {
  saveState({
   auth: store.getState().auth
  });
 }, 1000)) 
 
 if (module.hot) {
  // Enable hot module replacement for reducers
  module.hot.accept('../reducers', () => {
   const nextRootReducer = require('../reducers');
   store.replaceReducer(nextRootReducer);
  });
 }
 return store;
}
