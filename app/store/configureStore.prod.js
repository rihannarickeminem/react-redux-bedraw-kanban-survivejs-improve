import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const middleware = [
    thunk, 
    createLogger()
  ];
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    f => f
  ))
}
