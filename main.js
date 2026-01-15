const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false, // 安全：禁用 Node.js 集成
      contextIsolation: true, // 安全：启用上下文隔离
      preload: path.join(__dirname, 'preload.js'), // 预加载脚本
      enableRemoteModule: false, // 安全：禁用远程模块
      webSecurity: true // 启用 Web 安全
    },
    icon: path.join(__dirname, 'public/assets/images/icon.png'),
    titleBarStyle: 'default',
    backgroundColor: '#f0f0f0'
  });

  // 加载打包后的应用
  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));

  // 窗口关闭事件
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Electron 初始化完成后创建窗口
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // macOS: 当点击 dock 图标且没有其他窗口打开时，重新创建窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出应用（macOS 除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 安全：防止新窗口打开
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});
