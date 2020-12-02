import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { UserStore } from 'src/stores/modules/user'
import { RouteComponentProps } from 'react-router'
import MicroApp from 'src/components/micro_app'
import './index.styl'
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
  public render() {
    return (
      <div className="home-main">
        {/* <MicroApp name="dpadmin" url="//localhost:30000"></MicroApp> */}
        {/* <MicroApp name="keyperson" url="//localhost:3001/login"></MicroApp> */}
        <MicroApp name="vueApp" url="//localhost:10000"></MicroApp>
        {/* <MicroApp name="reactApp" url="//localhost:20000"></MicroApp> */}
      </div>
    )
  }
}
