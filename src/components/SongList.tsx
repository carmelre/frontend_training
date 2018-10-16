import * as _ from 'lodash';
import * as React from 'react';
import SongItem from './SongItem';
import { getVisibleSongs } from '../reducers';
import * as actions from '../actionCreators';
import { connect } from 'react-redux';
import { getSongsVisibilityState } from '../reducers';

interface Song {
  title: string;
  artist: string;
  id: string;
}

type StateProps = {
  songs: { number: Song };
  currentSong: string | null;
  fromVisibilityState: object;
};

type DispatchProps = {
  fetchSongs: () => void;
};

type SongListProps = StateProps & DispatchProps;

class SongList extends React.Component<SongListProps> {
  componentDidMount() {
    this.fetchData();
  }

  componentWillUpdate(prevProps: SongListProps) {
    if (!_.isEqual(this.props.fromVisibilityState, prevProps.fromVisibilityState)) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { fetchSongs } = this.props;
    fetchSongs();
  };

  render() {
    const { songs, currentSong } = this.props;
    return (
      <ul>
        {_.map(songs, song => (
          <li key={song.id}>
            <SongItem title={song.title} isCurrent={currentSong === song.id} artist={song.artist} />
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state: any) => ({
  songs: getVisibleSongs(state),
  fromVisibilityState: getSongsVisibilityState(state),
  currentSong: state.currentSong,
});

const ConnectedSongList = connect(
  mapStateToProps,
  actions,
)(SongList);

export default ConnectedSongList;
