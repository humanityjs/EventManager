import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
// import { autoRehydrate, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import allReducers from './reducers/reducersIndex.jsx';
import { asyncLocalStorage } from 'redux-persist/storages';


function reduxStore() {
  return createStore(
    allReducers,
    compose(
      applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      // autoRehydrate(),
    ),
  );
}
const store = reduxStore();
// persistStore(store, { storage: asyncLocalStorage });
export default store;

// let store = compose(
//   applyMiddleware(thunk, logger),
//   window.devToolsExtension ? window.devToolsExtension() : f => f,
//   autoRehydrate(),
// );

// persistStore(store);

// export default createStore(allReducers, store);


