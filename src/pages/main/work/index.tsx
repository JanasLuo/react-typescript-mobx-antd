import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { UserStore } from 'src/stores/modules/user'
import { RouteComponentProps } from 'react-router'
import { observable } from 'mobx'
import './index.styl'
interface HomePorps extends RouteComponentProps {
  userStore: UserStore
}

@inject('userStore')
@observer
export default class Home extends React.Component<HomePorps, {}> {
  public userStore: UserStore
  @observable public strokeDasharray: any = '10 314'
  constructor(props: any) {
    super(props)
    this.userStore = props.userStore
  }
  public render() {
    return (
      <div className="home-main">
        <iframe
          src="http://localhost:30000/main/group"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    )
  }
}
