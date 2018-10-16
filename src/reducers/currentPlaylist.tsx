import * as defaultState from '../constants/state';

const currentPlaylist = (state = defaultState.currentPlaylist, action: any) => {
  switch(action.type) {
    case ('SET_CURRENT_PLAYLIST'):
      return action.id;
    default:
      return state;
  }
};

export const getCurrentPlaylist = state => state;

export default currentPlaylist;
