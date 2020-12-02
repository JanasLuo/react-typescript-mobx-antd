import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { UserStore } from 'src/stores/modules/user'
import { RouteComponentProps } from 'react-router'
import { observable } from 'mobx'
import style from './index.styl'
import { Button } from 'antd'
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
  public componentDidMount() {
    setTimeout(() => {
      this.strokeDasharray = '314 314'
    }, 1000)
  }
  public render() {
    return (
      <div className={style['home-main']}>
        <div>基座路由页面</div>
        <div>首页</div>
        <Button>按钮</Button>
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* 2*3.14*r = 314 */}
          {/* <circle
            id="circle"
            cx="100"
            cy="80"
            r="50"
            fill="gray"
            stroke-width="5"
            stroke="green"
            stroke-dasharray={this.strokeDasharray}
          /> */}
        </svg>
      </div>
    )
  }
}
