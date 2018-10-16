import * as React from 'react';
import { getCurrentFileName } from '../reducers';
import { connect } from 'react-redux';

interface AudioPlayerProps {
  fileName: string;
}

const baseMusicURL = 'http://localhost:3000/audio';

const AudioPlayer: React.SFC<AudioPlayerProps> = ({ fileName }) => {
  return (
    <div>
      <audio controls={true} key={fileName}>
        <source src={`${baseMusicURL}/${fileName}`} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

export const mapStateToAudioPlayerProps = state => ({
  fileName: getCurrentFileName(state),
});

const ConnectedAudioPlayer = connect(mapStateToAudioPlayerProps)(AudioPlayer);

export default ConnectedAudioPlayer;
