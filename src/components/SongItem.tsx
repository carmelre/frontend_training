import * as React from 'react';

interface SongItemProps {
  title: string;
  artist: string;
  isCurrent: boolean;
}

const SongItem: React.SFC<SongItemProps> = ({ title, artist, isCurrent }) => (
  <div className={isCurrent ? 'currentSong' : ''}>
    <span>{title}</span>
    <span>{artist}</span>
  </div>
);

export default SongItem;
