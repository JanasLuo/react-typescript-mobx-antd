import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './pages/App'
import registerServiceWorker from './pwa/registerServiceWorker'
import AppRouter from './routers'
import stores from './stores'
import services from './services'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import 'antd/dist/antd.css'
import './styles/stylus/index.styl'

import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'dpadmin', // app name registered
    entry: '//localhost:30000',
    container: '#reactApp',
    activeRule: '/dpadmin'
  },
  {
    name: 'vueApp',
    entry: '//localhost:10000',
    container: '#vueApp',
    activeRule: '/vueApp'
  },
  {
    name: 'react-app',
    entry: '//localhost:20000',
    container: '#reactApp',
    activeRule: '/vueApp'
  }
])
start()
ReactDOM.render(
  <Provider {...stores} {...services}>
    <App>
      <AppRouter />
    </App>
  </Provider>,
  document.getElementById('baseroot') as HTMLElement
)
registerServiceWorker()
