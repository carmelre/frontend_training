import * as _ from 'lodash';
import { combineReducers } from 'redux';
import currentSong from './currentSong';
import songs from './songs';
import currentPlaylist from './currentPlaylist';
import viewState from './viewState';
import idsInOrder from './idsInOrder';
import playlists, * as fromPlaylists from './playlists';
import * as fromSongs from './songs';
import * as fromViewState from './viewState';
import * as fromCurrentPlaylist from './currentPlaylist';
import * as views from '../constants/views';
import { routerReducer } from 'react-router-redux';

const musicApp = combineReducers({
  songs,
  idsInOrder,
  viewState,
  playlists,
  currentSong,
  currentPlaylist,
  router: routerReducer,
});

export default musicApp;

export const getVisibleSongs = (state: any) => {
  switch (getCurrentView(state)) {
    case views.ALL_SONGS:
      return state.idsInOrder.map(id => state.songs.ByID[id]);
    case views.PLAYLISTS:
      if (state.currentPlaylist ) {
        const songIDS = fromPlaylists.getPlaylistSongs(state.playlists, state.currentPlaylist);
        const availableSongsIDS = songIDS.filter(id => _.has(state.songs.ByID, id));
        return availableSongsIDS.map(id => state.songs.ByID[id]);
      } else {
        return null;
      }

    default:
      throw new Error(`Unknown view: ${state.currentView}.`);
  }
};

export const getIsLoading = state => {
  switch (getCurrentView(state)) {
    case views.ALL_SONGS:
      return fromViewState.getIsAllSongsLoading(state.viewState);
    case views.PLAYLISTS:
      return;
  }
};

export const getCurrentFileName = (state: any) => {
  switch (state.currentSong) {
    case null:
      return null;
    default:
      return state.songs.ByID[state.currentSong].fileName;
  }
};

export const getAllIdsOnClient = state => state.idsInOrder;

export const getSongsVisibilityState = state => fromSongs.getSongsVisibilityState(state.songs);

export const getCurrentSongID = state => state.currentSong;

export const getCurrentView = state => fromViewState.getCurrentView(state.viewState);

export const getCurrentPlaylist = state => fromCurrentPlaylist.getCurrentPlaylist(state.currentPlaylist);

export const getVisiblePlaylist = state => {
  switch (getCurrentView(state)) {
    case views.PLAYLISTS:
      return getCurrentPlaylist(state);
    default:
      return null;
  }
};

export const getLocation = state => state.router.location;

export const getCurrentPlaylistSongs = state => {
  if (state.currentPlaylist) {
    return fromPlaylists.getPlaylistSongs(state.playlists, state.currentPlaylist);
  } else {
    return null;
  }
};

export const getPlaylists = state => state.playlists;
