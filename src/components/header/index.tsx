/* hooks组件 */

import React, { useState, useEffect, 
  useRef, 
  useCallback
} from 'react'
// import { inject } from 'mobx-react'
import { observer, useLocalStore } from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0
import moment from 'moment'
import userStore from 'src/stores/modules/user'
// import { useHistory } from 'react-router';

export interface HeaderProps {
  sigout: () => Promise<any>
}

const Header = (props: HeaderProps) => {
    const store = useLocalStore(() => userStore)
    const [count, setCount] = useState(0);
    const timeStamp: React.RefObject<any> = useRef(null);
   
    /* 集成Mobx测试 */
    const back = useCallback(() => store.sigout(), [])
    function sigoutByMobx () {
      back()
    }
    /* 集成react-router测试 */
    // const history = useHistory();
    // function sigoutByRouter () {
    //   history.push('/login');
    // }
    useEffect(() => {
      const update = () => {
        timeStamp.current.innerHTML = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        setCount(c => c + 1)
        // setCount(count + 1)
      }
      // update()
      const timer = setInterval(update, 1000)
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
              <span className="place">{count}</span>
              <span className="place">派出所</span>
            </span>       
            <span className="time" ref={timeStamp}></span>
          <span className="logout" onClick={() => sigoutByMobx()}>退出</span>
          {/* <span className="logout" onClick={() => sigoutByRouter()}>退出</span> */}
        </div>
      </div>
    )
}

export default observer(Header)
