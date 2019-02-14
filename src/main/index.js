import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import{ ipcMain } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    frame: false,
    useContentSize: true,
    width: 1366,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    show: false,
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // mainWindow.maximize();

  // 加载好html再呈现window，避免白屏
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });
}

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdatesAndNotify();
  // autoUpdater.checkForUpdatesAndNotify();
  createWindow();
});

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
// 检测更新，在你想要检查更新的时候执行
!function updateHandle() {    
  let message = {        
    error: '检查更新出错',        
    checking: '正在检查更新……',        
    updateAva: '检测到新版本，正在下载……',        
    updateNotAva: '现在使用的就是最新版本，不用更新',    
  };    
  const os = require('os');    
  const uploadUrl = "http://localhost:8080/verson/"; // 下载地址，不加后面的.exe    
  autoUpdater.setFeedURL(uploadUrl);    
  autoUpdater.on('error', function (error) {        
    sendUpdateMessage(message.error)
    alert(message.error)    
  });    
    autoUpdater.on('checking-for-update', function () {        
      sendUpdateMessage(message.checking)    
      alert(message.checking)    
    });    autoUpdater.on('update-available', function (info) {        
      sendUpdateMessage(message.updateAva)   
      alert(message.updateAva)     
    });    
    autoUpdater.on('update-not-available', function (info) {        
      sendUpdateMessage(message.updateNotAva)  
      alert(message.updateNotAva)      
    });// 更新下载进度事件    
    autoUpdater.on('download-progress', function (progressObj) {        
      mainWindow.webContents.send('downloadProgress', progressObj)    
    })    
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {        
      ipcMain.on('isUpdateNow', (e, arg) => {            
        console.log(arguments);        
        console.log("开始更新");     
        alert('开始更新')   //some code here to handle event        
        autoUpdater.quitAndInstall();    
      });    
      mainWindow.webContents.send('isUpdateNow')});ipcMain.on("checkForUpdate",()=>{    
        //执行自动更新检查    
        autoUpdater.checkForUpdates();
      })
    }()
        // 通过main进程发送事件给renderer进程，提示更新信息
        function sendUpdateMessage(text) {    
          mainWindow.webContents.send('message', text)
        }

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
