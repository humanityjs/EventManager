import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import allReducers from './reducers/reducersIndex';


// export default function reduxStore() {
//   return createStore(
//     allReducers,
//     compose(
//       applyMiddleware(thunk),
//       window.devToolsExtension ? window.devToolsExtension() : f => f,
//     ),
//   );
// }

const middleware = compose(
         applyMiddleware(thunk, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
      );

export default createStore(allReducers, middleware);


