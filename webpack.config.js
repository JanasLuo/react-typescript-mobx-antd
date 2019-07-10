const proxyObject = require('./proxy.conf')

module.exports = { 
  webpack: (config, env) => {
    config.module.rules = config.module.rules.map(rule => {
      if (rule.oneOf instanceof Array) {
        return {
          ...rule,
          oneOf: [
            {
              test: /\.styl$/, 
              loader: 'style-loader!css-loader!stylus-loader' 
            },
            ...rule.oneOf
          ]
        };
      }
      return rule;
    });

    return config;
  },
  devServer: function (configFunction, env) {
    if (env === 'development') {
      return (proxy, allowedHost) => {
        const config = configFunction(
          {
            ...proxy, 
            ...proxyObject
          },
          allowedHost);
        return config;
      };
    }
  }
}