import axios from 'axios'
import 'reflect-metadata'
import loaderStore, { LoaderStore } from '../stores/modules/loader'
import { message } from 'antd'
import user from '../stores/modules/user'

interface HttpBase {
  http: any,
  get (str: string, data: object, resolve: any): Promise<any>,
  delete (str: string, data: object, resolve: any): Promise<any>,
  put (str: string, data: object, resolve: any): Promise<any>,
  post (str: string, data: object, resolve: any): Promise<any>
}

class AxiosUtil {

  public static http: any
  public static loader: LoaderStore = loaderStore
  public static reqCount: number = 0

  public static getAxios (): any {
    if (!this.http) {
      this.http = axios
      this.http.timeout = 45000

      this.http.interceptors.request.use((config: any) => {
        if (this.reqCount === 0) {
          this.loader.loaderStart()
        }
        const account: any = user.getAccount()
        if (account) {
          config.headers.Authorization = `Bearer ${account.access_token}`
        }
        this.reqCount++
        return config
      }, (error: any) => {
        this.reqCount--
        if (this.reqCount === 0) {
          this.loader.loaderEnd()
        }
        return Promise.reject(error)
      })

      this.http.interceptors.response.use((response: any) => {
        this.reqCount--
        if (this.reqCount === 0) {
          this.loader.loaderEnd()
        }
        return response
      }, (error: any) => {
        this.reqCount--
        if (this.reqCount === 0) {
          this.loader.loaderEnd()
        }
        if (error.response) {
          switch (error.response.status) {
            case 401:
            case 403:
              message.error('登录已经失效，请重新登录')
              user.sigout()
              break
            default:
              break
          }
        }
        return Promise.reject(error)
      })
    }
    return this.http
  }
}

export class Service implements HttpBase {

  public http: any
  public ROOT_URL: string

  constructor (path: string) {
    this.http = AxiosUtil.getAxios()
    this.ROOT_URL = path
  }

  public async get (str: string, data: Map<string, any>): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(`${this.ROOT_URL}${str}`, {
        params: data || {}
      }).then((res: any): any => {
        if (res.status === 200 && res.data.status === 0) {
          resolve(res.data)
        } else {
          resolve(res.data || {
            msg: '请求失败',
            status: 1
          })
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  public async delete (str: string, data: Map<string, any>): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(`${this.ROOT_URL}${str}`, {
        params: data || {}
      }).then((res: any): any => {
        if (res.status === 200 && res.data.status === 0) {
          resolve(res.data)
        } else {
          resolve(res.data || {
            msg: '请求失败',
            status: 1
          })
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  public async put (str: string, data: Map<string, any>): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.http.put(`${this.ROOT_URL}${str}`, data).then((res: any): any => {
        if (res.status === 200 && res.data.status === 0) {
          resolve(res.data)
        } else {
          resolve(res.data || {
            msg: '请求失败',
            status: 1
          })
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  public async post (str: string, data: Map<string, any>): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.http.post(`${this.ROOT_URL}${str}`, data).then((res: any): any => {
        if (res.status === 200 && res.data.status === 0) {
          resolve(res.data)
        } else {
          resolve(res.data || {
            msg: '请求失败',
            status: 1
          })
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

}

const servicesMap: any = require.context('./', true, /\.ts$/)
const services = {}

servicesMap.keys().forEach((key: string) => {
  if (key.indexOf('index.ts') > -1) {
    if (key.indexOf('./index.ts') === -1) {
      const tmpKey: string = key.replace('./', '').replace('/index.ts', 'Service')
      services[tmpKey] = servicesMap(key).default
    }
  }
})

export default services