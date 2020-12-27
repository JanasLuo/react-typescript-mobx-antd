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
// @ts-ignore
window.a = 'a'
console.log('root window', window)
window.addEventListener('message', (e: any) => {
  if (e.data.type === 'fullScreenMap') {
    console.log('e', e)
  }
})
registerMicroApps([
  {
    name: 'dpadmin', // 要和微应用webpack打包的output.library名字一致
    entry: '//localhost:9015',
    container: '#dpadmin',
    activeRule: '/dpadmin',
    props: { name: 'qiankun' }
  },
  {
    name: 'vueApp',
    entry: '//localhost:10000',
    container: '#vueApp',
    activeRule: '/vueApp'
  },
  {
    name: 'keyperson',
    entry: '//localhost:9016',
    container: '#keyperson',
    activeRule: '/keyperson',
    props: { name: 'qiankun' }
  }
])
start()
// {
//   sandbox: { strictStyleIsolation: true } // 严格的样式隔离 shadow dom
// }
ReactDOM.render(
  <Provider {...stores} {...services}>
    <App>
      <AppRouter />
    </App>
  </Provider>,
  document.getElementById('baseroot') as HTMLElement
)
registerServiceWorker()
