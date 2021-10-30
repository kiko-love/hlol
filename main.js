const { app, BrowserWindow, BrowserView, Menu, ipcMain } = require('electron')

const path = require('path')
const eggLauncher = require('./electron/lib/lanucher')
const setup = require('./electron/setup')
const electronConfig = require('./electron/config')
const storage = require('./electron/lib/storage')
const preferences = require('./electron/preferences')
const helper = require('./electron/lib/helper')

// main window
global.MAIN_WINDOW = null;
global.APP_TRAY = null;
global.CAN_QUIT = false;

// Initialize 
setup()

// argv
let ENV = 'prod'
for (let i = 0; i < process.argv.length; i++) {
  const tmpArgv = process.argv[i]
  if (tmpArgv.indexOf('--env=') !== -1) {
    ENV = tmpArgv.substr(6)
  }
}
const eggConfig = electronConfig.get('egg', ENV)
eggConfig.env = ENV

// eLogger
const eLogger = require('./electron/lib/eLogger').get()

async function initialize() {
  app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })

  app.commandLine.appendSwitch("--disable-http-cache")

  app.on('window-all-closed', function () {
    if (process.platform !== 'win32') {
      eLogger.info('[main] [initialize] window-all-closed quit')
      helper.appQuit()
    }
  })


}

async function createWindow() {
  const winOptions = electronConfig.get('windowsOption')
  MAIN_WINDOW = new BrowserWindow(winOptions)


  //  新增三块 1 2 3； MAIN_WINDOW 是 MAIN_WINDOW = new BrowserWindow({......})来的。
  // 1. 窗口 最小化
  ipcMain.on('window-min', function () { // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
    MAIN_WINDOW.minimize();
  })
  // 2. 窗口 最大化、恢复
  ipcMain.on('window-max', function () {
    if (MAIN_WINDOW.isMaximized()) { // 为true表示窗口已最大化
      MAIN_WINDOW.restore();// 将窗口恢复为之前的状态.
    } else {
      MAIN_WINDOW.maximize();
    }
  })
  // 3. 关闭窗口
  ipcMain.on('window-close', function () {
    // eLogger.info(process.platform);
    MAIN_WINDOW.close();
  })


  // loading html
  loadingView(winOptions)
  eLogger.info('---------------------------------', eggConfig.env)
  if (eggConfig.env === 'prod' || eggConfig.env === 'local') {
    // hidden menu
    Menu.setApplicationMenu(null)

    // dynamic port
    await storage.setDynamicPort()
    eggConfig.port = electronConfig.get('egg', eggConfig.env).port
  }

  // options register
  await preferences()

  // egg server
  await startServer(eggConfig)

  return MAIN_WINDOW
}

async function startServer(options) {
  eLogger.info('[main] [startServer] options', options)
  const protocol = 'http://'
  let startRes = null
  let url = null
  const remoteConfig = electronConfig.get('remoteUrl');

  if (remoteConfig.enable) {
    url = remoteConfig.url
    loadMainUrl(url)
    return true
  }

  if (ENV === 'prod') {
    url = protocol + options.hostname + ':' + options.port
  } else {
    const developmentModeConfig = electronConfig.get('developmentMode', ENV)
    const selectMode = developmentModeConfig.default
    const modeInfo = developmentModeConfig.mode[selectMode]
    switch (selectMode) {
      case 'vue':
        url = protocol + modeInfo.hostname + ':' + modeInfo.port
        break
      case 'react':
        url = protocol + modeInfo.hostname + ':' + modeInfo.port
        break
      case 'ejs':
        url = protocol + modeInfo.hostname + ':' + modeInfo.port
        break
    }
  }
  eLogger.info('[main] [url]:', url)
  startRes = await eggLauncher.start(options).then((res) => res, (err) => err)
  eLogger.info('[main] [startServer] startRes:', startRes)
  if (startRes === 'success') {
    loadMainUrl(url)
    return true
  }

  app.relaunch()
}

/**
 * White screen optimization
 */
function loadingView(winOptions) {
  const loadingBrowserView = new BrowserView()
  MAIN_WINDOW.setBrowserView(loadingBrowserView)
  loadingBrowserView.setBounds({
    x: 0,
    y: 0,
    width: winOptions.width,
    height: winOptions.height
  });

  // loading html
  const loadingHtml = path.join('file://', __dirname, '/asset/loading.html')
  loadingBrowserView.webContents.loadURL(loadingHtml)

  MAIN_WINDOW.webContents.on('dom-ready', async (event) => {
    MAIN_WINDOW.removeBrowserView(loadingBrowserView)
  });
}

function loadMainUrl(url) {
  MAIN_WINDOW.loadURL(url)
}

initialize()