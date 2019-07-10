import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Loading from '../components/loading'
import { observable } from 'mobx';
import { LoaderStore } from '../stores/modules/loader'

@inject('loaderStore', 'userStore')
@observer
class App extends React.Component<{}, {}> {

  @observable public loaderStore: LoaderStore

  constructor (props: any) {
    super(props)
    this.loaderStore = props.loaderStore
    if (!props.userStore.getAccount()) {
      if (location.pathname !== '/login') {
        location.replace('/login')
      }
    }
  }

  public render () {
    return (
      <div className="app">
        {this.props.children}
        <div className={`loading-box ${(this.loaderStore.getLoading) ? ('show') : ('')}`}>
          <Loading />
        </div>
      </div>
    )
  }
}

export default App