import { action, observable } from 'mobx'
import Cookies from 'js-cookie'

export class UserStore {

  @observable private isLogin: boolean
  @observable private account !: Map<string, any> | undefined

  constructor () {
    this.isLogin = false
  }

  public get getIsLogin (): boolean {
    return this.isLogin
  }

  public getAccount (): Map<string, any> | boolean {
    if (this.account) {
      return this.account
    } else if (Cookies.get('account_info')) {
      let accountInfo !: Map<string, any>
      try {
        accountInfo = JSON.parse(decodeURIComponent(Cookies.get('account_info') as string))
      } catch (e) {
        console.log(e)
      }
      return accountInfo
    } else {
      return false
    }
  }

  @action public saveLoginData (accountInfo: Map<string, any>) {
    Cookies.set('account_info', encodeURIComponent(JSON.stringify(accountInfo)))
    this.account = accountInfo
    this.isLogin = true
  }

  @action public sigout () {
    Cookies.remove('account_info')
    Cookies.remove('menu_cache')
    this.account = undefined
    this.isLogin = false
    location.replace('/login')
  }
}

export default new UserStore()