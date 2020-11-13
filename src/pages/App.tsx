import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Loading from '../components/loading'
import MicroApp from '../components/micro_app'
import { observable } from 'mobx'
import { LoaderStore } from '../stores/modules/loader'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

@inject('loaderStore', 'userStore')
@observer
class App extends React.Component<{}, {}> {
  @observable public loaderStore: LoaderStore

  constructor(props: any) {
    super(props)
    this.loaderStore = props.loaderStore
    if (!props.userStore.getAccount()) {
      if (location.pathname !== '/login') {
        location.replace('/login')
      }
    }
  }

  public render() {
    return (
      <ConfigProvider locale={zh_CN}>
        <div className="app">
          {/* {this.props.children} */}
          <div
            className={`loading-box ${
              this.loaderStore.getLoading ? 'show' : ''
            }`}
          >
            <Loading />
          </div>
          {/* <div id="reactApp"></div> */}
          {/* <div id="vueApp" style={{ height: '400px'}}></div> */}
          {/* <MicroApp name="react-app" url="//localhost:20000"></MicroApp> */}
          <MicroApp name="dpadmin" url="//localhost:30000"></MicroApp>
          <MicroApp name="vueApp" url="//localhost:10000"></MicroApp>
        </div>
      </ConfigProvider>
    )
  }
}

export default App
