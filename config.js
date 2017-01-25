'use strict'

const path = require('path')

let config = {
  // Name of electron app
  // Will be used in production builds
  name: 'orElectronVue',

  // webpack-dev-server port
  port: 8080,

  // electron-packager options
  // https://iconverticons.com/online/
  building: {
    arch: 'x64',
    asar: true,
    dir: path.join(__dirname, 'app'),
    icon: path.join(__dirname, 'app/icons/icon'),
    ignore: /^\/(icons|shell|src|index\.ejs)/,
    prune: false,
    overwrite: true,
    platform: require('os').platform(),
    out: path.join(__dirname, 'packages'),
  }
}

config.building.name = config.name

module.exports = config
