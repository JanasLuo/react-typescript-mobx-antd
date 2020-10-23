import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './pages/App'
import registerServiceWorker from './pwa/registerServiceWorker'
import AppRouter from './routers'
import stores from './stores'
import services from './services'

import 'antd/dist/antd.css'
import './styles/stylus/index.styl'

import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:9009',
    container: '#yourContainer',
    activeRule: '/yourActiveRule',
  },
  {
    name: 'vue app',
    entry: '//localhost:9010',
    container: '#yourContainer2',
    activeRule: '/yourActiveRule2',
  },
]);
start();

ReactDOM.render(
  <Provider {...stores} {...services}>
    <App>
      <AppRouter />
    </App>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
