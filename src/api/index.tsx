import { includes } from 'lodash';
// import { v4 } from 'node-uuid';
import * as _ from 'lodash';

type songType = {
  id: string;
  title: string;
  artist: string;
  fileName: string;
};

type playlistType = {
  id: string;
  title: string;
  songs: any[];
};

type fakeDB = {
  songs: songType[];
  playlists: [] | playlistType[];
};

const SongsDB = {
  songs: [
    {
      id: '1',
      title: 'Beat',
      artist: 'Some Beat Guy',
      fileName: 'beat.mp3',
    },
    {
      id: '2',
      title: 'Dylan',
      artist: 'Dylan',
      fileName: 'dylan_song.mp3',
    },
    {
      id: '3',
      title: 'Latino',
      artist: 'Jose Gonzales',
      fileName: 'latino_hip_hop.mp3',
    },
    {
      id: '4',
      title: 'Now or Never',
      artist: 'Someone',
      fileName: 'now_or_never.mp3',
    },
  ],
  playlists: [],
};

const addPlaylistsToDB = (db: fakeDB) => {
  db.playlists = [
    {
      id: '1',
      title: 'On My Way',
      songs: _.slice(db.songs, 0, 2).map(song => song.id),
    },
  ];
  return db;
};

const fakeDB = addPlaylistsToDB(SongsDB);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMissingSongs = idList =>
  delay(250).then(() => {
    return fakeDB.songs.filter(song => !includes(idList, song.id));
  });

export const fetchPlaylist = (playlistID, songsOnClient) =>
  delay(250).then(() => {
    const playlistInfo = _.find(fakeDB.playlists, { id: playlistID });
    if (playlistInfo) {
      return fakeDB.songs.filter(
        song => !includes(songsOnClient, song.id) && includes(_.get(playlistInfo, 'songs'), song.id),
      );
    } else {
      return [];
    }
  });

export const fetchPlaylists = () =>
  delay(250).then(() => {
    return fakeDB.playlists;
  });
