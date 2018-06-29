const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const about = require('./package.json')

module.exports = (env, argv) => {
  let webpackConfig = {
    entry: { app: './index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
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

  if (argv.mode === 'development') {
    // Automatically copy output directly into BetterDiscord plugins
    // process.env.APPDATA: 'C:\\Users\\user\\AppData\\Roaming', Windows only
    // process.env.HOME: '/home/user' on Linux, '/Users/user' on MacOS, Linux and MacOS only
    let appdata = process.env.APPDATA || path.resolve(process.env.HOME, (process.platform === 'darwin' ? 'Library/Preferences' : '.config'))
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([{from: webpackConfig.output.path, to: path.resolve(appdata, 'BetterDiscord/plugins')}])
    )
  }
  return webpackConfig
}
