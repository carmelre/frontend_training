import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './index.css';
import './App.css';
import configureStore from './store/configureStore';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
