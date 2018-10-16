import { routerMiddleware } from 'react-router-redux';
import { createStore } from 'redux';
import musicApp from '../reducers/index';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { history } from './history';

const configureStore = () => {
  const router = routerMiddleware(history);
  const middlewares = [thunk, router];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger);
  }
  return createStore(musicApp, applyMiddleware(...middlewares));
};

export default configureStore;
