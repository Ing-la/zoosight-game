const { contextBridge, ipcRenderer } = require('electron');

// 安全地暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 存储相关 API
  saveData: (key, data) => {
    return ipcRenderer.invoke('save-data', key, data);
  },
  loadData: (key) => {
    return ipcRenderer.invoke('load-data', key);
  },
  // 文件操作 API（如果需要）
  readFile: (filePath) => {
    return ipcRenderer.invoke('read-file', filePath);
  }
});





