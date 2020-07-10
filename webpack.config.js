const proxyObject = require('./proxy.conf')

module.exports = {
  webpack: (config, env) => {
    config.module.rules = config.module.rules.map(rule => {
      if (rule.oneOf instanceof Array) {
        return {
          ...rule,
          oneOf: [
            // {
            //   test: /\.(js|mjs|jsx|ts|tsx)$/,
            //   // include: paths.appSrc,
            //   loader: require.resolve('babel-loader'),
            //   plugins: [
            //     [
            //       'react-css-modules',
            //       {
            //         generateScopedName: '[local]-[hash:base64:10]',   //  这个要和 2. 里的 "localIdentName" 一致
            //         filetypes: {
            //           '.styl': {                                       //  .css || .less || .scss || .styl
            //             syntax: 'sugarss'                         //  less = postcss-less   scss = postcss-sess
            //           }
            //         }
            //       }
            //     ]
            //   ]
            // },
            // {
            //   test: /\.css$/,
            //   loader: "style-loader!css-loader?modules&localIdentName=[path]__[name]__[local]__[hash:base64:10]"
            // },
            {
              test: /\.styl$/,
              loader: 'style-loader!css-loader?modules!stylus-loader'
              // loader: 'style-loader!css-loader?modules&localIdentName=[path]__[name]__[local]__[hash:base64:10]!stylus-loader'
              // loaders: [
              //   'style-loader',
              //   'css-loader?modules&localIdentName=[name]-[hash:base64:5]',
              //   'stylus-loader'
              // ]
            },
            ...rule.oneOf
          ]
        };
      }
      return rule;
    });
    config.externals = ['canvas']
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