import * as React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import * as views from '../constants/views';
import { getCurrentView, getPlaylists } from '../reducers';
import { setCurrentView as setCurrentViewAction } from '../actions/currentView';
import { fetchPlaylists as fetchPlaylistsAction } from '../actionCreators';
import { showPlaylist as showPlaylistAction} from '../actions/playlists';
import * as _ from 'lodash';

const SubMenu = Menu.SubMenu;

interface Playlist {
  id: string;
  title: string;
  songs: any[];
}

interface StateProps {
  currentView: string;
  playlists: { string: Playlist };
}

interface DispatchProps {
  setCurrentView: (view: string) => void;
  fetchPlaylists: () => void,
  showPlaylist: (id:string) => void;
}

type NavigationPaneProps = StateProps & DispatchProps;

class NavigationPane extends React.Component<NavigationPaneProps> {
  componentDidMount() {
    this.fetchPlaylists();
  }

  componentWillUpdate() {
    if (!this.props.playlists) {
      this.fetchPlaylists();
    }
  }

  fetchPlaylists = () => {
    this.props.fetchPlaylists();
  };

  onTopLevelClick = (item: any) => {
    const { setCurrentView, showPlaylist} = this.props;
    const keyPath = item.keyPath;
    if (keyPath.length === 2) {
      const nextView = keyPath[1];
      setCurrentView(nextView);
      if (nextView === views.PLAYLISTS){
        showPlaylist(keyPath[0])
      }
    }
    else {
      const nextView = item.key;
      setCurrentView(nextView);
    }
  };

  render() {
    const { playlists } = this.props;
    return (
      <div>
        <Menu mode="horizontal"
              selectedKeys={[this.props.currentView]} defaultOpenKeys={[]}
              onClick={this.onTopLevelClick}>
          <Menu.Item key={views.ALL_SONGS}>
            <Icon type="sound" />
            All Songs
          </Menu.Item>
          <SubMenu key={views.PLAYLISTS}
                   title={<span><Icon type="heart" />Playlists</span>}>
            {_.map(playlists, (playlist, id) => (
              <Menu.Item key={playlist.id}>{playlist.title}</Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentView: getCurrentView(state),
  playlists: getPlaylists(state),
});

const mapDispatchToProps = {
  setCurrentView: setCurrentViewAction,
  fetchPlaylists: fetchPlaylistsAction,
  showPlaylist: showPlaylistAction
};

const ConnectedNavigationPane = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationPane);

export default ConnectedNavigationPane;
