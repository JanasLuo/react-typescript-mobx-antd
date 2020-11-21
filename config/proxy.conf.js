/*
 * @Descripttion: 
 * @version: 
 * @Author: luolei
 * @Date: 2020-11-21 10:59:50
 * @LastEditors: luolei
 * @LastEditTime: 2020-11-21 23:22:07
 */
const target = "http://39.106.114.130"
module.exports = {
  "/dpadmin/api": {
    "target": target,
    "changeOrigin": true,
    "ws": false,
    "pathRewrite": {
      "^/dpadmin/api": "/api"
    }
  },
  "/api": {
    "target": target,
    "changeOrigin": true,
    "ws": false,
    "pathRewrite": {
      "^/api": "/"
    }
  }
}