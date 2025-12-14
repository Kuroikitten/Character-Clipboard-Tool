const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    readFolder: (folderPath) => ipcRenderer.invoke('read-folder', folderPath),
    onSavedFolderPath: (callback) => ipcRenderer.on('saved-folder-path', (event, path) => callback(path))
});