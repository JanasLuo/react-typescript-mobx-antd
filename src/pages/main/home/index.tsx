import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { UserStore } from 'src/stores/modules/user'
import { RouteComponentProps } from 'react-router'
import './index.styl'
// import HeaderNav from 'src/components/header'
import test from './test'
import { Rnd } from 'react-rnd'
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
    test()
  }
  public sigout = async () => {
    //
  }
  public onResizeStop = (e: any, pos: string, data: any, start: any, end: any) => {
    debugger
    console.log('onResizeStop', data)
  }
  public onDragStop = (e: any, data: any) => {
    console.log('onDragStop', data)
  }
  public render() {
    return (
      <div className="home-main">
        home页
        <Rnd
          className="rnd"
          default={{
            x: 10,
            y: 0,
            width: 320,
            height: 200
          }}
          onResizeStop={this.onResizeStop}
          onDragStop={this.onDragStop}
        >
          Rnd
        </Rnd>
        {/* <div id="reactApp" style={{ height: '400px'}}></div>
        <div id="vueApp" style={{ height: '400px'}}></div> */}
      </div>
    )
  }
}
