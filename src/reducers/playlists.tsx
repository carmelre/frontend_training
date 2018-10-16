import * as _ from 'lodash';

const playlists = (state = {}, action: any) => {
  switch (action.type) {
    case 'RECEIVE_PLAYLISTS':
      const nextState = { ...state };
      action.response.forEach(playlist => {
        nextState[playlist.id] = playlist;
      });
      return nextState;
    default:
      return state;
  }
};

export default playlists;

export const getPlaylistSongs = (state, currentPlaylist: number) => {
  const playlist = _.get(state, currentPlaylist);
  return _.get(playlist, 'songs', []);
};
