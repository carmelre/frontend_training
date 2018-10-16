import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../store/history';
import App from './App';

interface RootComponentProps {
  store: any;
}

const Root: React.SFC<RootComponentProps> = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default Root;
