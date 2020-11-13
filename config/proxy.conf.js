const target = "http://39.106.114.130"
module.exports = {
  "/api": {
    "target": target,
    "changeOrigin": true,
    "ws": false,
    "pathRewrite": {
      "^/api": "/api"
    }
  }
}