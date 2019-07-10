module.exports = {
  "/api": {
    "target": "http://192.168.18.93:8080",
    "changeOrigin": true,
    "ws": false,
    "pathRewrite": {
      "^/api": "/api"
    }
  }
}