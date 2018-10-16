import * as React from 'react';
import ConnectedSongList from './SongList';
import ConnectedControlBar from './ControlBar';
import ConnectedAudioPlayer from './AudioPlayer';
import ConnectedNavigationPane from './NavigationPane';
import { URLSync } from './urlSync/urlSync';

const App = () => (
  <div>
    <URLSync />
    <ConnectedNavigationPane />
    <ConnectedSongList />
    <ConnectedAudioPlayer />
    <ConnectedControlBar />
  </div>
);

export default App;
