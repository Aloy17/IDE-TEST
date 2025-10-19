const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  executeRID: (code) => ipcRenderer.invoke('execute-rid', code),
  getFiles: (subPath) => ipcRenderer.invoke('get-files', subPath),
  loadFile: (filename) => ipcRenderer.invoke('load-file', filename),
  saveFile: (filename, content) => ipcRenderer.invoke('save-file', filename, content),
  saveFileDialog: (content) => ipcRenderer.invoke('save-file-dialog', content),
  deleteFile: (filename) => ipcRenderer.invoke('delete-file', filename),
  createFolder: (folderName) => ipcRenderer.invoke('create-folder', folderName),
  moveFile: (sourcePath, targetFolderPath) => ipcRenderer.invoke('move-file', sourcePath, targetFolderPath)
});
