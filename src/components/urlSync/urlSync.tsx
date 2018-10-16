import * as React from 'react';
import { connect } from 'react-redux';
// import * as views from '../../constants/views'
import * as UrlPattern from 'url-pattern';
import { push as pushAction } from 'react-router-redux';
import { showPlaylist as showPlaylistAction } from '../../actions/playlists';
import { setCurrentView as setCurrentViewAction } from '../../actions/currentView';
import { getLocation } from '../../reducers';
import { getCurrentView, getCurrentPlaylist } from '../../reducers';

const VIEW_ONLY_URL = new UrlPattern('/:currentView');
const VIEW_WITH_OBJECT_ID_URL = new UrlPattern('/:currentView/:objectId');

type StateProps = {
  currentView: string | null;
  currentPlaylist: string | null;
  location: {
    pathname: string;
  };
};

type DispatchProps = {
  push: (url: string) => void;
  setCurrentView: (view: string) => void;
  showPlaylist: (objectId: string) => void;
};

type Props = StateProps & DispatchProps;

class URLSync extends React.Component<Props> {
  updateStateFromUrl = () => {
    const { location, setCurrentView, showPlaylist } = this.props;
    let matchResult;
    const locationPathname = encodeURI(location.pathname);

    matchResult = VIEW_WITH_OBJECT_ID_URL.match(locationPathname);

    if (matchResult !== null) {
      setCurrentView(matchResult.currentView);
      if (matchResult.currentView === 'playlists') {
        showPlaylist(decodeURI(matchResult.objectId));
      }
      return;
    }

    matchResult = VIEW_ONLY_URL.match(locationPathname);

    if (matchResult !== null) {
      setCurrentView(matchResult.currentView);
      return;
    }

    throw new Error(`Invalid URL was given
     ${locationPathname}`);
  };

  updateUrlFromState = () => {
    const { currentView, currentPlaylist, location, push } = this.props;
    let expectedUrl;

    if (currentView === 'playlists' && currentPlaylist) {
      expectedUrl = VIEW_WITH_OBJECT_ID_URL.stringify({ currentView, objectId: currentPlaylist });
    } else if (currentView) {
      expectedUrl = VIEW_ONLY_URL.stringify({ currentView });
    } else {
      throw new Error(`Invalid state was provided ${JSON.stringify(this.props)}, URL cannot be computed`);
    }

    expectedUrl = decodeURI(expectedUrl);
    if (expectedUrl !== location.pathname) {
      push(expectedUrl);
    }
  };

  componentWillMount() {
    const { location } = this.props;

    // Before mounting (when the app is starting) we parse the URL and update the state (if the URL is not just '/').
    if (location.pathname === '/') {
      // Default values are set by the reducers, we just need to update the URL.
      this.updateUrlFromState();
    } else {
      this.updateStateFromUrl();
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;

    // On location updates (back/forward by the user), we update the state.
    // Other updates are to the state, for which we update the URL.
    if (prevLocation !== location) {
      this.updateStateFromUrl();
    } else {
      this.updateUrlFromState();
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  const currentView = getCurrentView(state);
  const currentPlaylist = getCurrentPlaylist(state);
  const location = getLocation(state);

  return {
    currentView,
    currentPlaylist,
    location,
  };
};

const ConnectedURLSync = connect<StateProps, DispatchProps>(
  mapStateToProps,
  {
    push: pushAction,
    setCurrentView: setCurrentViewAction,
    showPlaylist: showPlaylistAction,
  },
)(URLSync);

export { ConnectedURLSync as URLSync };
