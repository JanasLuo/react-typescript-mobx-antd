/* hooks组件 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { inject } from 'mobx-react'
import { observer, useLocalStore } from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0
// import { useLocalStore } from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0
import moment from 'moment'
import userStore from 'src/stores/modules/user'
import { useHistory } from 'react-router' // 5.1.0以上
import { withRouter } from 'react-router-dom'
// import CSSModules from 'react-css-modules'
import style from './header.styl'
export interface HeaderProps {
  sigout: () => Promise<any>
}

const Header = (props: any) => {
  const store: any = useLocalStore(() => userStore)
  const [count, setCount] = useState(0)

  const timeStamp: React.RefObject<any> = useRef(null)
  const testObj = {
    current: 0
  }
  console.log('update testObj', testObj)
  /* 集成Mobx测试 */
  const back = useCallback(() => store.sigout(), [])
  function sigoutByMobx() {
    back()
  }
  /* 集成react-router测试 */
  const history = useHistory()
  function sigoutByRouter() {
    history.push('/login')
  }

  function sigoutByWithRouter() {
    props.history.push('/login')
  }
  function changeName() {
    store.account.name = '李四'
  }
  useEffect(() => {
    const update = () => {
      timeStamp.current.innerHTML = moment(new Date()).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      setCount(c => c + 1)
      // setCount(count + 1)
      testObj.current++
      console.log('testObj.current', testObj.current)
    }
    // update()
    const timer = setInterval(update, 4000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  useEffect(() => {
    // alert(store.account.name);
    console.log(count)
  }, [store.account.name])
  return (
    <div className={`${'header-main'} ${style.header}`}>
      <div className="left-box">
        <div className="op-box">
          <i className="menu"></i>
          <span>菜单</span>
        </div>
      </div>
      <div className="mid-box">
        <div className="title">
          <i className="home-logo"></i>
          <span className="title-text">南昌市公安局数字天网</span>
        </div>
      </div>
      <div className="right-box">
        <span>
          <span className="place">{store.getAccount().name}</span>
          <span className="place">{count}</span>
          <span className="place" onClick={() => changeName()}>
            {store.account && store.account.name}
          </span>
        </span>
        <span className="time" ref={timeStamp}></span>
        <span className="logout" onClick={() => sigoutByMobx()}>
          退出1
        </span>
        <span className="logout" onClick={() => sigoutByRouter()}>
          退出2
        </span>
        <span className="logout" onClick={() => sigoutByWithRouter()}>
          退出3
        </span>
      </div>
    </div>
  )
}

// export default CSSModules(Header, styles, {
//   allowMultiple: true
// })
export default withRouter(observer(Header))
