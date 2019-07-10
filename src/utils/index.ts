import moment from 'moment'

export default class Util {

  public static getHrefMap (search: string) {
    if (search) {
      const searchCon: string = search.split('?')[1]
      const searchItem: string[] = searchCon.split('&')
      const res: any = {}

      searchItem.forEach((item: string) => {
        const key: string = item.split('=')[0]
        const val: string = item.split('=')[1]
        res[key] = val
      })
      return res
    }
    return null
  }

  public static setMenu (list: any[], parentId: string[] = []) {
    list.forEach((item: any) => {
      item.parent_id = []
      if (parentId && parentId.length > 0) {
        item.parent_id = [...parentId]
      }
      if (item.children && item.children.length > 0) {
        this.setMenu(item.children, [...item.parent_id, item.id])
      }
    })
  }

  public static momentDate (num: any, type: string = 'date_time'): string {
    if (num) {
      if (Object.prototype.toString.call(num) === '[object Date]') {
        num = num.getTime()
      }
      switch (type) {
        case 'date':
          return moment(parseInt(num, 10)).format('YYYY-MM-DD')
        case 'date_h':
          return moment(parseInt(num, 10)).format('YYYY/MM/DD')
        case 'date_time':
          return moment(parseInt(num, 10)).format('YYYY-MM-DD HH:mm:ss')
        case 'data_h_time':
          return moment(parseInt(num, 10)).format('YYYY/MM/DD HH:mm:ss')
        case 'data_h_time_h':
          return moment(parseInt(num, 10)).format('YYYY/MM/DD HH:mm')
        case 'time':
          return moment(parseInt(num, 10)).format('HH:mm:ss')
        case 'time_h':
          return moment(parseInt(num, 10)).format('HH:mm')
        default:
          return moment(parseInt(num, 10)).format('YYYY-MM-DD HH:mm:ss')
      }
    } else {
      return ''
    }
  }

  public static findMenuByName (name: string, menuList: any): any {
    const menuListArray: [] = menuList.slice()
    const len: number = menuListArray.length
    for (let i = 0; i < len; i ++) {
      const menuItem: any = menuListArray[i]
      if (menuItem.name === name) {
        return {...menuItem}
      }
      if (menuItem.children) {
       const targetMenuObj = this.findMenuByName (name, menuItem.children)
       if (targetMenuObj) {
        return targetMenuObj
       }
      }
    }
  }

}
