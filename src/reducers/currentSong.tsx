const currentSong = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SONG':
      return action.id;
    default:
      return state;
  }
};

export default currentSong;
