'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow
let config = {}
let willQuitApp = false;

if (!!process.env.NODE_ENV) {} else {
  process.env.NODE_ENV = 'production'
}

if (process.env.NODE_ENV === 'developmentHot') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    minHeight: 600,
    minWidth: 800
  })

  mainWindow.maximize()

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV.indexOf('development') !== -1) {
    BrowserWindow.addDevToolsExtension(path.join(__dirname,
      '../node_modules/devtron'))
    BrowserWindow.addDevToolsExtension(path.join(__dirname,
      '../node_modules/vue-devtools'))

    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    console.log('mainWindow closed')
    mainWindow = null
    app.quit()
  })

  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('before-quit', () => {
  console.log('before quit....')
  willQuitApp = true
})
