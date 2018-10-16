import { combineReducers } from 'redux';
import { currentPlaylist, currentView } from '../constants/state';

const ByID = (state = {}, action: any) => {
  switch (action.type) {
    case 'RECEIVE_SONGS':
      const nextState = { ...state };
      action.response.forEach(song => {
        nextState[song.id] = song;
      });
      return nextState;
    default:
      return state;
  }
};

const fromState = (state = { currentView, currentPlaylist }, action) => {
  switch (action.type) {
    case 'SET_CURRENT_VIEW':
      return {
        ...state,
        currentView: action.viewName,
      };
    case 'SET_CURRENT_PLAYLIST':
      return {
        ...state,
        currentPlaylist: action.id,
      };
    default:
      return state;
  }
};

const songs = combineReducers({ ByID, fromState });

export const getSongsVisibilityState = state => state.fromState;

export default songs;
