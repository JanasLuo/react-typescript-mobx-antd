import { observer, inject } from 'mobx-react'
import * as React from 'react'
import { Menu, message } from 'antd'
import { RouteComponentProps } from 'react-router'
import { observable } from 'mobx'
import MainRoute from './route'
import HeaderNav from 'src/components/header'

import { UserService } from 'src/services/user'
import { UserStore } from 'src/stores/modules/user'
// import MicroApp from '../../components/micro_app'
// import style from '../../styles/stylus/main.styl'
@inject('userService', 'userStore')
@observer
class Main extends React.Component<RouteComponentProps<{}>, {}> {
  public userService: UserService
  public userStore: UserStore

  @observable public menuList: any[] = []
  @observable public selectItem: string[]
  @observable public selectExpand: string[] = []

  constructor(props: any) {
    super(props)
    this.initConfig(props)
  }

  public initConfig(props: any): void {
    this.userService = props.userService
    this.userStore = props.userStore
  }

  public chooseMenu = async (path: any) => {
    debugger
    this.props.history.push(path)
  }

  public sigout = async (): Promise<any> => {
    const res = await this.userService.sigout()
    if (res.status === 0) {
      this.userStore.sigout()
    } else {
      message.error(res.msg || '操作失败')
    }
  }
  public changeMenu = (e: any) => {
    debugger
    console.log('click ', e)
    this.selectItem = [e.key]
  }
  public render() {
    return (
      <div className="main">
        <HeaderNav sigout={this.sigout} />
        <div className="main-body">
          <div className="menu-slide"></div>
          <div className="left-menu">
            <Menu
              onClick={this.changeMenu}
              selectedKeys={this.selectItem}
              openKeys={this.selectExpand}
              mode="inline"
              theme="dark"
            >
              <Menu.Item
                onClick={this.chooseMenu.bind(this, '/main/home')}
                key={'home'}
                title={'首页'}
              >
                <span className="menu-name">首页</span>
              </Menu.Item>
              <Menu.Item
                onClick={this.chooseMenu.bind(this, '/main/work')}
                key={'work'}
                title={'工作台'}
              >
                <span className="menu-name">工作台</span>
              </Menu.Item>
              <Menu.Item
                onClick={this.chooseMenu.bind(this, '/dpadmin')}
                key={'dpadmin'}
                title={'后台管理'}
              >
                <span className="menu-name">后台管理</span>
              </Menu.Item>
              <Menu.Item
                onClick={this.chooseMenu.bind(this, '/keyperson')}
                key={'keyperson'}
                title={'重点人'}
              >
                <span className="menu-name">重点人</span>
              </Menu.Item>
            </Menu>
          </div>
          {/* <div className="micro-app" style={{ width: '100%', height: '100%' }}>
           
          </div> */}
          <div className="right-body">
            <div id="dpadmin"></div>
            <div id="keyperson"></div>
            <MainRoute {...this.props}></MainRoute>
            {/* <MicroApp name="dpadmin" url="//localhost:30000"></MicroApp> */}
            {/* <MicroApp name="keyperson" url="//localhost:3001"></MicroApp> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Main
