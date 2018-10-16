import * as defaultState from '../constants/state';
import { combineReducers } from 'redux';
import * as views from '../constants/views';

const currentView = (state = defaultState.currentView, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_VIEW':
      return action.viewName;
    default:
      return state;
  }
};

const allSongsIsLoading = (state = false, action) => {
  if (action.type === 'RECEIVE_SONGS' && action.view === views.ALL_SONGS) {
    return false;
  } else if (action.type === 'FETCH_SONGS' && action.view === views.ALL_SONGS) {
    return true;
  } else {
    return state;
  }
};

export const getCurrentView = state => {
  return state.currentView;
};

const viewState = combineReducers({ currentView, allSongsIsLoading });

export const getIsAllSongsLoading = state => {
  return state.allSongsIsLoading;
};

export default viewState;
