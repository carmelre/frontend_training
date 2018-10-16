import * as React from 'react';
import { Button, Icon } from 'antd';
import * as actions from '../actionCreators';
import { connect } from 'react-redux';

type DispatchProps = {
  setNextSong: () => void;
  setPreviousSong: () => void;
};

const ControlBar: React.SFC<DispatchProps> = ({ setNextSong, setPreviousSong }) => {
  return (
    <div>
      <Button onClick={setPreviousSong}>
        <Icon type="left" />
        Previous Song
      </Button>
      <Button onClick={setNextSong}>
        Next Song
        <Icon type="right" />
      </Button>
    </div>
  );
};

const ConnectedControlBar = connect(
  null,
  actions,
)(ControlBar);

export default ConnectedControlBar;
