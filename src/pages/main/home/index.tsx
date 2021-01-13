import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { UserStore } from 'src/stores/modules/user'
import { RouteComponentProps } from 'react-router'
import './index.styl'
import HeaderNav from 'src/components/header'
interface HomePorps extends RouteComponentProps {
  userStore: UserStore
}

@inject('userStore')
@observer
export default class Home extends React.Component<HomePorps, {}> {
  public userStore: UserStore

  constructor(props: any) {
    super(props)
    this.userStore = props.userStore
  }
  public sigout = async () => {
    //
  }
  public render() {
    return (
      <div className="home-main">
        home页
        <HeaderNav sigout={this.sigout} />
        {/* <div id="reactApp" style={{ height: '400px'}}></div>
        <div id="vueApp" style={{ height: '400px'}}></div> */}
      </div>
    )
  }
}
