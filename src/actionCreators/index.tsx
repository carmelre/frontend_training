import * as _ from 'lodash';
import * as api from '../api';
import {
  getAllIdsOnClient,
  getVisibleSongs,
  getCurrentSongID,
  getCurrentView,
  getVisiblePlaylist,
  getCurrentPlaylistSongs,
} from '../reducers';
import { getNextSongID, getPreviousSongID } from '../utils/SongHelpers';
import * as views from '../constants/views';

const _setCurrentSong = id => ({
  type: 'SET_CURRENT_SONG',
  id,
});

const _requestSongs = (currentView, currentPlaylist) => ({
  type: 'FETCH_SONGS',
  view: currentView,
  playlist: currentPlaylist,
});

const _receiveSongs = (currentView, currentPlaylist, response) => ({
  type: 'RECEIVE_SONGS',
  view: currentView,
  playlist: currentPlaylist,
  response,
});

export const fetchPlaylists = () => dispatch => {
  dispatch({
    type: 'FETCH_PLAYLISTS',
  });
  return api.fetchPlaylists().then(response => {
    dispatch({
      type: 'RECEIVE_PLAYLISTS',
      response,
    });
  });
};

export const fetchSongs = () => (dispatch, getState) => {
  // if is fetching promise resolve
  // fetch songs from playlist
  const state = getState();
  const currentView = getCurrentView(state);
  const currentPlaylist = getVisiblePlaylist(state);
  switch (currentView) {
    case views.ALL_SONGS:
      dispatch(_requestSongs(currentView, currentPlaylist));
      const idsOnClient = getAllIdsOnClient(state);
      return api.fetchMissingSongs(idsOnClient).then(response => {
        dispatch(_receiveSongs(currentView, currentPlaylist, response));
        dispatch(setCurrentSongToFirst());
      });
    case views.PLAYLISTS:
      if (currentPlaylist) {
        const playlistSongs = getCurrentPlaylistSongs(state);
        dispatch(_requestSongs(currentView, currentPlaylist));
        return api.fetchPlaylist(currentPlaylist, playlistSongs).then(response => {
          dispatch(_receiveSongs(currentView, currentPlaylist, response));
          dispatch(setCurrentSongToFirst());
        });
      }

    default:
      return null;
  }
};

export const setCurrentSongToFirst = () => (dispatch, getState) => {
  const state = getState();
  const visibleSongs = getVisibleSongs(state);
  if (visibleSongs) {
    dispatch(_setCurrentSong(_.get(visibleSongs[0], 'id', null)));
  } else {
    dispatch(_setCurrentSong(null));
  }
};

export const setNextSong = () => (dispatch, getState) => {
  const state = getState();
  const visibleSongs = getVisibleSongs(state);
  if (visibleSongs) {
    const nextSong = getNextSongID(getCurrentSongID(state), visibleSongs);
    dispatch(_setCurrentSong(nextSong));
  }
};

export const setPreviousSong = () => (dispatch, getState) => {
  const state = getState();
  const visibleSongs = getVisibleSongs(state);
  if (visibleSongs) {
    const nextSong = getPreviousSongID(getCurrentSongID(state), visibleSongs);
    dispatch(_setCurrentSong(nextSong));
  }
};
