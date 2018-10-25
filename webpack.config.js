const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const about = require('./package.json')

module.exports = (_, argv) => {
  // Automatically copy output directly into BetterDiscord plugins
  // process.env.APPDATA: 'C:\\Users\\user\\AppData\\Roaming', Windows only
  // process.env.HOME: '/home/user' on Linux, '/Users/user' on MacOS, Linux and MacOS only
  let appdata = process.env.APPDATA || path.resolve(process.env.HOME, (process.platform === 'darwin' ? 'Library/Preferences' : '.config'))

  let config = {
    entry: { app: './index-betterdiscord.js' },
    output: {
      path: path.resolve(appdata, 'BetterDiscord/plugins'),
      filename: `${about.id}.plugin.js`,
      library: '_' + about.id, // Expose the bundle as variable
      libraryTarget: 'var'
    },
    resolve: {
      extensions: ['.js', '.css', '.sass', '.scss', '.pug'],
      alias: { '#': __dirname }
    },
    plugins: [
      // Add BetterDiscord plugin metadata at the top of the bundle
      // ID with an underscore on purpose, upon class instantiation, will assign instantiated class to non-underscored variable
      new webpack.BannerPlugin({ banner: `//META{"name":"_${about.id}"}*//`, raw: true, entryOnly: true })
    ],
    module: {
      rules: [
        { test: /\.scss$/, use: ['to-string-loader', 'css-loader', 'sass-loader'] },
        { test: /\.pug$/, use: ['pug-loader'] }
      ]
    }
  }

  if (argv.mode !== 'development') {
    // Production mode as is seems to put it's plugins after the banner,
    // one of those plugins is JS uglifier, so the banner is getting stripped out of output
    config = {
      ...config,
      performance: { hints: 'warning' },
      output: {
        ...config.output,
        pathinfo: false
      },
      optimization: {
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'production',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        splitChunks: {
          hidePathInfo: true,
          minSize: 30000,
          maxAsyncRequests: 5,
          maxInitialRequests: 3
        },
        noEmitOnErrors: true,
        checkWasmTypes: true
      },
      plugins: [
        new UglifyJsPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ].concat(config.plugins)
    }
  }

  return config
}
