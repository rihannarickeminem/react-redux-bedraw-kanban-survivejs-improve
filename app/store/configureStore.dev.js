import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';


function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

  return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState) {
  const middleware = [
    thunk, 
    createLogger()
  ];


  let store;
  store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));


  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
