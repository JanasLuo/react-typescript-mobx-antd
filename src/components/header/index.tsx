/* hooks组件 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { inject } from 'mobx-react'
import { observer, useLocalStore } from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0
import moment from 'moment'
import userStore from 'src/stores/modules/user'

export interface HeaderProps {
  sigout: () => Promise<any>
}

const Header = (props: HeaderProps) => {
    const store = useLocalStore(() => userStore)
    const [timer, setTimer] = useState();
    const timeStamp: React.RefObject<any> = useRef(null);

    function sigout () {
      store.sigout()
    }

    useEffect(() => {
      const update = () => {
        timeStamp.current.innerHTML = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
      update()
      setTimer(setInterval(update, 1000))
      return () => {
        clearInterval(timer)
      }
    }, [])
    return (
      <div className="header-main">
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
              <span className="place">026000</span>
              <span className="place">派出所</span>
            </span>       
            <span className="time" ref={timeStamp}></span>
          <span className="logout" onClick={useCallback(() => sigout(), [])}>退出</span>
        </div>
      </div>
    )
}

export default observer(Header)
