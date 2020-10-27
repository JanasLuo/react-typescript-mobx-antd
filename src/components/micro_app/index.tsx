import React, { useEffect, useRef } from 'react';
import { loadMicroApp } from 'qiankun'

const MicroApp = (props: any) => {
  const container: React.RefObject<any>  = useRef()
  useEffect(() => {
    debugger
    const microApp = loadMicroApp({
      name: props.name,
      entry: props.url,
      container: container.current
    })
    return () => {
      microApp.mountPromise.then(() => microApp.unmount())
    }
  }, [])
  return <div ref={container} style={{ height: '400px'}}></div>
}
export default MicroApp