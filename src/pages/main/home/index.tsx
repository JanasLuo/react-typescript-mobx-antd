import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { UserStore } from 'src/stores/modules/user'
import { RouteComponentProps } from 'react-router'
import { Scene, LineLayer } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
import mapboxgl from 'mapbox-gl'
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
  public componentDidMount() {
    const coordinates = [
      [
        [117.4219, 40.21],
        [117.334, 40.1221],
        [117.2461, 40.0781],
        [116.8066, 39.9902],
        [116.8945, 39.8145],
        [116.8945, 39.6826],
        [116.8066, 39.5947],
        [116.543, 39.5947],
        [116.3672, 39.4629],
        [116.1914, 39.5947],
        [115.752, 39.5068],
        [115.4883, 39.6387],
        [115.4004, 39.9463],
        [115.9277, 40.2539],
        [115.752, 40.5615],
        [116.1035, 40.6055],
        [116.1914, 40.7813],
        [116.4551, 40.7813],
        [116.3672, 40.9131],
        [116.6309, 41.0449],
        [116.9824, 40.6934],
        [117.4219, 40.6494],
        [117.2461, 40.5176],
        [117.4219, 40.21]
      ]
    ]
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        pitch: 30,
        style: 'mapbox://styles/mapbox/streets-v11', // 样式URL
        center: [116.4551, 40.2539],
        zoom: 12,
        token:
          'pk.eyJ1IjoiamFuYXNsdW8iLCJhIjoiY2p6d2R0dnQxMGw1OTNjcWltdzg5NzRzeCJ9.OQx44V543mOsS8RerbiIdQ'
      })
    })

    const map: any = scene.map // 原始mapbox的map对象
    /* 直接用原始mapbox对象进行图层添加 */
    map.on('load', () => {
      console.log('scene', scene)
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {
            id: '11',
            size: '5000',
            name: '北京市',
            cp: [116.4551, 40.2539],
            childNum: 19
          },
          geometry: { type: 'Polygon', coordinates }
        }
      })
      map.addLayer({
        id: 'route',
        type: 'fill',
        source: 'route',
        paint: {
          'fill-color': 'rgb(0, 255, 255)' /* 填充的颜色 */,
          'fill-opacity': 0.7 /* 透明度 */
        }
      })
    })
    /* 原始map中layer的点击事件 */
    map.on('click', 'route', (e: any) => {
      debugger
      console.log('e', e)
    })
    fetch(
      'https://gw.alipayobjects.com/os/basement_prod/a5ac7bce-181b-40d1-8a16-271356264ad8.json'
    )
      .then(res => res.text())
      .then(flyline => {
        const flydata = eval(flyline).map((item: any) => {
          const latlng1 = item.from.split(',').map((e: any) => e * 1)
          const latlng2 = item.to.split(',').map((e: any) => e * 1)
          return { coord: [latlng1, latlng2] }
        })
        const flyLine = new LineLayer()
          .source(flydata, {
            parser: {
              type: 'json',
              coordinates: 'coord'
            }
          })
          .shape('arc3d')
          .size(10)
          .active(true)
          .color('#0C47BF')
          .animate({
            interval: 0.5,
            trailLength: 0.5,
            duration: 5
          })
          .style({
            opacity: 1
          })
        scene.addLayer(flyLine)
        /* L7 图层点击事件 */
        flyLine.on('click', (e: any) => {
          console.log('e', e)
          const lngLat = e.lngLat

          new mapboxgl.Marker().setLngLat([lngLat.lng, lngLat.lat]).addTo(map)
        })
      })
  }
  public render() {
    return <div className="home-main" id="map"></div>
  }
}
