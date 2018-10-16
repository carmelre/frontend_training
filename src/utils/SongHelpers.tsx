interface Song {
  id: number;
  title: string;
  artist: string;
}

export const getNextSongID = (currentSongID: number | null, songsList: Song[]) => {
  const currentSongIndex = songsList.findIndex(song => song.id === currentSongID);
  const nextSong = songsList[(currentSongIndex + 1) % songsList.length];
  return nextSong.id;
};

export const getPreviousSongID = (currentSongID: number | null, songsList: Song[]) => {
  const currentSongIndex = songsList.findIndex(song => song.id === currentSongID);
  const nextSong = songsList[(currentSongIndex + songsList.length - 1) % songsList.length];
  return nextSong.id;
};

export const getCurrentSongItem = (currentSongID: number | null, songsList: Song[]) => {
  return songsList.find(song => song.id === currentSongID);
};
