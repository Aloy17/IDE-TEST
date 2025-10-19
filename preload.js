const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  executeRID: (code) => ipcRenderer.invoke('execute-rid', code),
  getFiles: () => ipcRenderer.invoke('get-files'),
  loadFile: (filename) => ipcRenderer.invoke('load-file', filename),
  saveFile: (filename, content) => ipcRenderer.invoke('save-file', filename, content),
  saveFileDialog: (content) => ipcRenderer.invoke('save-file-dialog', content)
});
