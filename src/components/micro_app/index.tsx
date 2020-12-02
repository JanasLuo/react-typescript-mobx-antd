import React, { useEffect, useRef } from 'react'
import { loadMicroApp } from 'qiankun'

const MicroApp = (props: any) => {
  const container: React.RefObject<any> = useRef()
  useEffect(() => {
    let microApp: any = null
    setTimeout(() => {
      microApp = loadMicroApp(
        {
          name: props.name,
          entry: props.url,
          container: container.current
        }
        // { sandbox: { strictStyleIsolation: true } }
      )
    }, 100)
    return () => {
      microApp.mountPromise.then(() => microApp.unmount())
    }
  }, [])
  return (
    <div ref={container} style={{ height: '500px', overflow: 'auto' }}></div>
  )
}
export default MicroApp
